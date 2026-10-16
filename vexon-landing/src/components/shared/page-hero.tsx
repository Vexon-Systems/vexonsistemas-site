import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { getWhatsAppUrl } from "@/config/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  message?: string;
  primaryHref?: string;
  visual?: ReactNode;
  motionTarget?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  message = "Olá! Quero conversar sobre meu projeto.",
  primaryHref = "/contato",
  visual,
  motionTarget,
}: PageHeroProps) {
  return (
    <section
      data-primary-hero
      className={`diagonal bg-zinc-950 text-white ${visual ? "pb-16 pt-24 sm:pb-20 sm:pt-28" : "pb-20 pt-36 sm:pb-28 sm:pt-44"}`}
      data-motion-target={motionTarget}
    >
      <div
        className={
          visual
            ? "site-container grid items-center gap-10 lg:grid-cols-[1fr_.82fr]"
            : "site-container"
        }
      >
        <div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1
            className={`max-w-4xl font-display font-extrabold leading-[1.03] tracking-[-.06em] ${visual ? "text-[clamp(2.35rem,4vw,3.75rem)]" : "text-[clamp(2.6rem,5vw,4.5rem)]"}`}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-(--brand-600) px-5 font-semibold text-white transition hover:bg-(--brand-700)"
              data-conversion-event="solution_cta_click"
              href={primaryHref}
            >
              <ArrowRight size={18} aria-hidden="true" /> Conversar sobre meu projeto
            </a>
            <a
              className="inline-flex min-h-12 items-center gap-2 rounded-[10px] border border-white/20 px-5 font-semibold text-white transition hover:bg-white/10"
              data-conversion-event="whatsapp_nav_click"
              href={getWhatsAppUrl(message)}
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
        {visual && <div className="mt-10 lg:mt-0">{visual}</div>}
      </div>
    </section>
  );
}
