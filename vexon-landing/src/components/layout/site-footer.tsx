import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

const links = [
  ["Início", "/"],
  ["Soluções", "/#solucoes"],
  ["Projetos", "/projetos"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="site-container grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-vexon-white.png"
            alt="Vexon"
            width={160}
            height={58}
            className="h-auto w-32"
          />
          <p className="mt-5 max-w-60 text-sm leading-6 text-zinc-400">
            Tecnologia aplicada a problemas reais.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Navegação</h2>
          <ul className="mt-4 grid gap-3">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link className="text-sm text-zinc-400 hover:text-white" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Contato</h2>
          <ul className="mt-4 grid gap-3 text-sm text-zinc-400">
            <li>
              <a href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}>WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>Ituiutaba — Minas Gerais</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-wrap justify-between gap-4 py-5 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Vexon. Todos os direitos reservados.</span>
          <span className="flex gap-4">
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link href="/termos-de-uso">Termos de Uso</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
