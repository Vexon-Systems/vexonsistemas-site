import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="grid min-h-[70vh] place-items-center bg-zinc-950 px-5 text-center text-white">
        <section className="max-w-2xl">
          <p className="eyebrow eyebrow-light">ERRO 404</p>
          <h1 className="font-display text-5xl font-extrabold tracking-[-.06em] sm:text-7xl">Esta página não foi encontrada.</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">O endereço pode ter mudado ou não existir mais. Volte ao início ou fale com a Vexon.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="inline-flex min-h-12 items-center rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold hover:bg-[var(--brand-700)]" href="/">Voltar ao início</Link>
            <Link className="inline-flex min-h-12 items-center rounded-[10px] border border-white/30 px-5 font-semibold hover:bg-white hover:text-zinc-950" href="/contato">Entrar em contato</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
