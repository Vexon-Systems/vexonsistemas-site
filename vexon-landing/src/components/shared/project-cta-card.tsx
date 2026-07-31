import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** CTA compartilhado para encerrar páginas institucionais com uma próxima ação clara. */
export function ProjectCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-zinc-950 px-6 py-10 text-center text-white sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -left-10 top-5 size-36 rotate-[-28deg] border border-red-500/70" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 right-10 size-48 rotate-[-28deg] border border-red-500/55" aria-hidden="true" />
      <div className="relative">
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,4vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-.06em]">
          Pronto para elevar seu projeto ao <span className="text-red-200 italic">nível Vexon?</span>
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold transition hover:bg-[var(--brand-700)]" href="/contato">
            Começar um projeto <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/30 px-5 font-semibold transition hover:border-white hover:bg-white hover:text-zinc-950" href="/projetos">
            Ver nosso portfólio
          </Link>
        </div>
      </div>
    </div>
  );
}
