import { contactSchema } from "../contact-schema.ts";

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
};

const requests = new Map<string, { count: number; expires: number }>();
const MAX_BODY_BYTES = 24_000;

function json(body: object, status = 200, extra: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      ...extra,
    },
  });
}

// Best effort per isolate; configure Cloudflare rules for a global rate limit.
function limited(ip: string) {
  const now = Date.now();
  for (const [key, item] of requests) if (item.expires <= now) requests.delete(key);
  const entry = requests.get(ip);
  if (entry) return ++entry.count > 5;
  if (requests.size >= 10_000) return true;
  requests.set(ip, { count: 1, expires: now + 600_000 });
  return false;
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError("body_too_large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

export async function handleContact(request: Request, env: ContactEnv, send: typeof fetch = fetch) {
  if (request.method !== "POST")
    return json({ error: "method_not_allowed" }, 405, { Allow: "POST" });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json({ error: "invalid_origin" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return json({ error: "invalid_content_type" }, 415);
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES)
    return json({ error: "body_too_large" }, 413);
  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  if (limited(ip)) return json({ error: "rate_limited" }, 429, { "Retry-After": "600" });
  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return json(
      { error: error instanceof RangeError ? "body_too_large" : "invalid_data" },
      error instanceof RangeError ? 413 : 400,
    );
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json({ error: "invalid_data" }, 400);
  const { name, company, phone, email, solution, message, _gotcha, turnstileToken } = parsed.data;
  if (_gotcha) return json({ ok: true });
  if (
    !env.RESEND_API_KEY ||
    !env.CONTACT_FROM_EMAIL ||
    !env.CONTACT_TO_EMAIL ||
    !env.TURNSTILE_SECRET_KEY
  )
    return json({ error: "configuration" }, 503);
  if (!turnstileToken) return json({ error: "turnstile_failed" }, 400);
  try {
    const response = await send("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        ...(ip !== "local" ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
    };
    const hostnames = (env.TURNSTILE_HOSTNAMES ?? new URL(request.url).hostname)
      .split(",")
      .map((host) => host.trim());
    if (
      !response.ok ||
      result.success !== true ||
      result.action !== "contact" ||
      !result.hostname ||
      !hostnames.includes(result.hostname)
    )
      return json({ error: "turnstile_failed" }, 400);
  } catch {
    return json({ error: "verification_unavailable" }, 502);
  }
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        ...(email ? { reply_to: email } : {}),
        subject: `Novo contato: ${solution}`,
        text: [
          "Novo contato pelo site da Vexon",
          "",
          `Nome: ${name}`,
          `Empresa: ${company || "Não informada"}`,
          `WhatsApp: ${phone}`,
          `E-mail: ${email}`,
          `Solução procurada: ${solution}`,
          "",
          "Mensagem:",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return json({ error: "delivery_failed" }, 502);
    const result = (await response.json()) as { id?: string };
    if (!result.id) return json({ error: "delivery_failed" }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "delivery_failed" }, 502);
  }
}
