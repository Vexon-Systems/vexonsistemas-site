import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "Informe um nome mais curto."),
  company: z.string().trim().max(160, "Informe um nome de empresa mais curto.").optional(),
  phone: z
    .string()
    .trim()
    .max(25, "Informe um WhatsApp válido.")
    .refine(
      (value) => /^\d{10,11}$/.test(value.replace(/\D/g, "")),
      "Informe um WhatsApp com DDD.",
    ),
  email: z.union([
    z.string().trim().email("Informe um e-mail válido.").max(320, "Informe um e-mail válido."),
    z.literal(""),
  ]),
  solution: z.enum(
    [
      "Site institucional",
      "Landing Page",
      "Loja virtual",
      "Sistema personalizado",
      "Ainda não sei",
      "Outro",
    ],
    "Selecione uma solução válida.",
  ),
  message: z
    .string()
    .trim()
    .min(12, "Conte um pouco mais sobre a sua necessidade.")
    .max(5_000, "A mensagem pode ter no máximo 5.000 caracteres."),
  _gotcha: z.string().max(100).optional(),
  turnstileToken: z.string().max(2_048, "Não foi possível validar a verificação.").optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
