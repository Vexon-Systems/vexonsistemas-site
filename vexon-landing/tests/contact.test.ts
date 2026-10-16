import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContact, type ContactEnv } from "../src/lib/contact/handle-contact.ts";
import { contactSchema } from "../src/lib/contact-schema.ts";

const env: ContactEnv = {
  RESEND_API_KEY: "test",
  CONTACT_FROM_EMAIL: "sender@example.com",
  CONTACT_TO_EMAIL: "team@example.com",
  TURNSTILE_SECRET_KEY: "test",
};
const valid = {
  name: "Pessoa Teste",
  company: "",
  phone: "(34) 99999-9999",
  email: "",
  solution: "Site institucional",
  message: "Preciso de um site para minha empresa.",
  turnstileToken: "test-token",
};
let ip = 0;
function request(data: unknown, headers = {}) {
  return new Request("https://vexon.example/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": `192.0.2.${++ip}`,
      ...headers,
    },
    body: JSON.stringify(data),
  });
}
const unexpected: typeof fetch = async () => {
  throw new Error("Unexpected provider call");
};

test("schema accepts an optional email and rejects invalid phone or email", () => {
  assert.equal(contactSchema.safeParse(valid).success, true);
  assert.equal(contactSchema.safeParse({ ...valid, phone: "123" }).success, false);
  assert.equal(contactSchema.safeParse({ ...valid, email: "invalid" }).success, false);
});
test("invalid data, oversized body, cross-origin and unsupported methods are rejected", async () => {
  assert.equal((await handleContact(request({}), env, unexpected)).status, 400);
  assert.equal(
    (await handleContact(request({ ...valid, message: "a".repeat(25_000) }), env, unexpected))
      .status,
    413,
  );
  assert.equal(
    (await handleContact(request(valid, { Origin: "https://attacker.example" }), env, unexpected))
      .status,
    403,
  );
  assert.equal(
    (await handleContact(new Request("https://vexon.example/api/contact"), env, unexpected)).status,
    405,
  );
});
test("honeypot succeeds silently without provider calls", async () => {
  assert.equal(
    (await handleContact(request({ ...valid, _gotcha: "bot" }), env, unexpected)).status,
    200,
  );
});
test("missing configuration and missing token never send email", async () => {
  assert.equal((await handleContact(request(valid), {}, unexpected)).status, 503);
  assert.equal(
    (await handleContact(request({ ...valid, turnstileToken: "" }), env, unexpected)).status,
    400,
  );
});
test("Turnstile must validate success, action and hostname", async () => {
  for (const result of [
    { success: false },
    { success: true, hostname: "evil.example", action: "contact" },
    { success: true, hostname: "vexon.example", action: "other" },
  ]) {
    let calls = 0;
    const send: typeof fetch = async () => {
      calls++;
      return Response.json(result);
    };
    assert.equal((await handleContact(request(valid), env, send)).status, 400);
    assert.equal(calls, 1);
  }
});
test("verified contact sends once with reply_to when provided", async () => {
  const calls: { url: string; body: string }[] = [];
  const send: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), body: String(init?.body) });
    return Response.json(
      calls.length === 1
        ? { success: true, hostname: "vexon.example", action: "contact" }
        : { id: "email-id" },
    );
  };
  const result = await handleContact(request({ ...valid, email: "lead@example.com" }), env, send);
  assert.equal(result.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://api.resend.com/emails");
  assert.equal(JSON.parse(calls[1].body).reply_to, "lead@example.com");
  assert.equal(result.headers.get("cache-control"), "no-store");
});
test("provider failure returns an error instead of a false success", async () => {
  let calls = 0;
  const send: typeof fetch = async () =>
    ++calls === 1
      ? Response.json({ success: true, hostname: "vexon.example", action: "contact" })
      : Response.json({ error: "private provider details" }, { status: 500 });
  const result = await handleContact(request(valid), env, send);
  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), { error: "delivery_failed" });
});
test("network failure is handled and a sixth request is throttled", async () => {
  assert.equal((await handleContact(request(valid), env, unexpected)).status, 502);
  const headers = { "CF-Connecting-IP": "198.51.100.10" };
  for (let i = 0; i < 5; i++) await handleContact(request({}, headers), env, unexpected);
  assert.equal((await handleContact(request({}, headers), env, unexpected)).status, 429);
});
