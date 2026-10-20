"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { trackConversion } from "@/lib/analytics";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { Turnstile } from "@/components/turnstile";
import { getWhatsAppUrl } from "@/config/site";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const fieldClass =
  "mt-2 min-h-12 w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-[var(--brand-600)] focus:ring-3 focus:ring-red-900/15";

function formatBrazilPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";

  const areaCode = digits.slice(0, 2);
  const localNumber = digits.slice(2);
  if (localNumber.length <= 4) return `(${areaCode}) ${localNumber}`;

  const firstPartLength = digits.length <= 10 ? 4 : 5;
  return `(${areaCode}) ${localNumber.slice(0, firstPartLength)}-${localNumber.slice(firstPartLength)}`;
}

export function ContactForm({ initialSolution = "" }: { initialSolution?: string }) {
  const formId = useId();
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "configuration" | "verification"
  >("idle");
  const [turnstileInstance, setTurnstileInstance] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const parsedInitialSolution = contactSchema.shape.solution.safeParse(initialSolution);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      solution: parsedInitialSolution.success ? parsedInitialSolution.data : undefined,
      message: "",
      _gotcha: "",
      turnstileToken: "",
    },
  });

  const values = useWatch({ control });
  const whatsappMessage = [
    "Olá! Quero conversar sobre meu projeto.",
    values.name?.trim() && `Nome: ${values.name.trim()}`,
    values.company?.trim() && `Empresa: ${values.company.trim()}`,
    values.phone?.trim() && `WhatsApp: ${values.phone.trim()}`,
    values.email?.trim() && `E-mail: ${values.email.trim()}`,
    values.solution && `Solução: ${values.solution}`,
    values.message?.trim() && `Mensagem: ${values.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const handleTurnstileToken = useCallback(
    (token: string) => setValue("turnstileToken", token, { shouldValidate: true }),
    [setValue],
  );
  const handleVerificationError = useCallback(() => setStatus("error"), []);

  async function onSubmit(data: ContactValues) {
    if (!turnstileSiteKey) {
      setStatus("configuration");
      return;
    }
    if (!data.turnstileToken) {
      setStatus("verification");
      return;
    }

    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        setHasStarted(false);
        setStatus("success");
        trackConversion("contact_form_submit");
      } else {
        const result: unknown = await response.json().catch(() => null);
        const isConfigurationError =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          result.error === "configuration";
        setStatus(isConfigurationError ? "configuration" : "error");
      }
    } catch {
      setStatus("error");
    } finally {
      setValue("turnstileToken", "");
      setTurnstileInstance((instance) => instance + 1);
    }
  }
  const error = (field: keyof ContactValues, message?: string) =>
    message && (
      <span id={`${formId}-${field}-error`} className="mt-1 block text-xs font-medium text-red-700">
        {message}
      </span>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={() => {
        if (hasStarted) return;
        setHasStarted(true);
        trackConversion("contact_form_start");
      }}
      className="rounded-[14px] border border-zinc-200 bg-white p-5 text-zinc-900 shadow-[0_12px_32px_rgb(0_0_0_/_0.10)] sm:p-7"
    >
      <input
        aria-hidden="true"
        className="absolute -left-[10000px] size-px overflow-hidden opacity-0"
        tabIndex={-1}
        autoComplete="off"
        {...register("_gotcha")}
      />
      <h3 className="font-display text-2xl font-bold tracking-[-.04em]">
        Conte um pouco sobre seu projeto
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Nome (obrigatório)
          <input
            className={fieldClass}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            required
            {...register("name")}
          />
          {error("name", errors.name?.message)}
        </label>
        <label className="text-sm font-semibold">
          Empresa (opcional)
          <input
            className={fieldClass}
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${formId}-company-error` : undefined}
            {...register("company")}
          />
          {error("company", errors.company?.message)}
        </label>
        <label className="text-sm font-semibold">
          WhatsApp (obrigatório)
          <input
            className={fieldClass}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(34) 99999-9999"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            required
            {...register("phone", {
              onChange: (event) => {
                event.target.value = formatBrazilPhone(event.target.value);
              },
            })}
          />
          {error("phone", errors.phone?.message)}
        </label>
        <label className="text-sm font-semibold">
          E-mail (opcional)
          <input
            className={fieldClass}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            {...register("email")}
          />
          {error("email", errors.email?.message)}
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold">
        Solução procurada (obrigatório)
        <select
          className={fieldClass}
          aria-invalid={Boolean(errors.solution)}
          aria-describedby={errors.solution ? `${formId}-solution-error` : undefined}
          required
          {...register("solution")}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option>Site institucional</option>
          <option>Landing Page</option>
          <option>Loja virtual</option>
          <option>Sistema personalizado</option>
          <option>Ainda não sei</option>
          <option>Outro</option>
        </select>
        {error("solution", errors.solution?.message)}
      </label>
      <label className="mt-5 block text-sm font-semibold">
        Mensagem (obrigatório)
        <textarea
          className={fieldClass}
          rows={5}
          placeholder="Conte brevemente sobre sua empresa, o problema que deseja resolver e o resultado esperado."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          required
          {...register("message")}
        />
        {error("message", errors.message?.message)}
      </label>
      <div className="mt-5">
        {turnstileSiteKey ? (
          <Turnstile
            key={turnstileInstance}
            siteKey={turnstileSiteKey}
            onTokenChange={handleTurnstileToken}
            onError={handleVerificationError}
          />
        ) : (
          <p className="rounded-[10px] bg-amber-50 p-3 text-sm text-amber-900">
            O envio por e-mail está indisponível no momento. Você pode preencher sua mensagem e
            continuar pelo WhatsApp.
          </p>
        )}
      </div>
      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold text-white transition hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        disabled={isSubmitting || !turnstileSiteKey}
        type="submit"
      >
        {isSubmitting ? "Enviando…" : "Enviar solicitação"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <div className="mt-4 text-sm" aria-live="polite">
        {status === "success" && (
          <p className="rounded-[10px] bg-green-50 p-3 text-green-800">
            Recebemos sua solicitação. Retornaremos em breve.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-[10px] bg-red-50 p-3 text-red-800">
            Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.
          </p>
        )}
        {status === "verification" && (
          <p className="rounded-[10px] bg-amber-50 p-3 text-amber-900">
            Conclua a verificação de segurança antes de enviar.
          </p>
        )}
        {status === "configuration" && (
          <p className="rounded-[10px] bg-amber-50 p-3 text-amber-900">
            O formulário ainda não está configurado. Fale conosco pelo WhatsApp.
          </p>
        )}
      </div>
      {status !== "success" && (
        <a
          className="mt-4 inline-flex min-h-12 items-center font-semibold text-[var(--brand-600)] underline underline-offset-4"
          href={getWhatsAppUrl(whatsappMessage)}
          data-conversion-event="whatsapp_nav_click"
        >
          Continuar pelo WhatsApp
        </a>
      )}
      {status !== "success" && (
        <p className="mt-1 text-xs leading-5 text-zinc-600">
          O WhatsApp abre com os campos preenchidos. Revise e envie a mensagem na conversa.
        </p>
      )}
      <p className="mt-4 text-xs leading-5 text-zinc-500">
        Seus dados serão utilizados somente para responder à solicitação. Consulte a{" "}
        <Link className="underline" href="/politica-de-privacidade">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
