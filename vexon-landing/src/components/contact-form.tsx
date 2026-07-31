"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useSubmit } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackConversion } from "@/lib/analytics";

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";
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

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  company: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Informe um WhatsApp com DDD."),
  email: z.string().trim().email("Informe um e-mail válido."),
  solution: z.string().min(1, "Selecione uma solução."),
  message: z.string().trim().min(12, "Conte um pouco mais sobre a sua necessidade."),
  _gotcha: z.string().optional(),
});
type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm({ initialSolution = "" }: { initialSolution?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "configuration">("idle");
  const submit = useSubmit<ContactValues>(formId || "unconfigured", {
    extraData: { subject: "Novo contato pelo site da Vexon" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      solution: initialSolution,
      message: "",
      _gotcha: "",
    },
  });

  async function onSubmit(data: ContactValues) {
    if (!formId) {
      setStatus("configuration");
      return;
    }
    setStatus("idle");
    try {
      const response = await submit(data);
      if (response.kind === "success") {
        reset();
        setStatus("success");
        trackConversion("contact_form_submit");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }
  const error = (message?: string) =>
    message && <span className="mt-1 block text-xs font-medium text-red-700">{message}</span>;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[14px] border border-zinc-200 bg-white p-5 text-zinc-900 shadow-[0_12px_32px_rgb(0_0_0_/_0.10)] sm:p-7"
    >
      <input
        aria-hidden="true"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("_gotcha")}
      />
      <h3 className="font-display text-2xl font-bold tracking-[-.04em]">
        Conte um pouco sobre seu projeto
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Nome
          <input
            className={fieldClass}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {error(errors.name?.message)}
        </label>
        <label className="text-sm font-semibold">
          Empresa
          <input className={fieldClass} autoComplete="organization" {...register("company")} />
        </label>
        <label className="text-sm font-semibold">
          WhatsApp
          <input
            className={fieldClass}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(34) 99999-9999"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone", {
              onChange: (event) => {
                event.target.value = formatBrazilPhone(event.target.value);
              },
            })}
          />
          {error(errors.phone?.message)}
        </label>
        <label className="text-sm font-semibold">
          E-mail
          <input
            className={fieldClass}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {error(errors.email?.message)}
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold">
        Solução procurada
        <select
          className={fieldClass}
          aria-invalid={Boolean(errors.solution)}
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
        {error(errors.solution?.message)}
      </label>
      <label className="mt-5 block text-sm font-semibold">
        Mensagem
        <textarea
          className={fieldClass}
          rows={5}
          placeholder="Conte brevemente sobre sua empresa, o problema que deseja resolver e o resultado esperado."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {error(errors.message?.message)}
      </label>
      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold text-white transition hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        disabled={isSubmitting}
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
        {status === "configuration" && (
          <p className="rounded-[10px] bg-amber-50 p-3 text-amber-900">
            O formulário ainda não está configurado. Fale conosco pelo WhatsApp.
          </p>
        )}
      </div>
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
