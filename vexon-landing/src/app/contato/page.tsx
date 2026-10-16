import type { Metadata } from "next";
import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactMotion } from "@/components/sections/contact-motion";
import { ProjectCtaCard } from "@/components/shared/project-cta-card";
import { SiteHeader } from "@/components/layout/site-header";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Converse com a Vexon sobre sites, lojas virtuais e sistemas em Ituiutaba e região.",
  alternates: { canonical: "/contato/" },
};

export default function ContactPage() {
  const phoneHref = `tel:${siteConfig.telephone}`;
  const phoneLabel = siteConfig.telephoneDisplay;

  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="overflow-hidden bg-white">
        <ContactMotion />
        <section className="relative isolate pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-24 top-16 size-72 rotate-[-28deg] border border-red-500/55" />
            <div className="absolute right-[7%] top-12 h-px w-96 rotate-[-28deg] bg-red-500/75" data-contact-line />
            <div className="absolute -right-16 bottom-20 size-64 rotate-[-28deg] border border-red-500/45" />
            <div className="absolute left-[45%] top-[30rem] h-px w-72 rotate-[-28deg] bg-red-500/55" data-contact-line />
          </div>

          <div className="site-container">
            <div className="max-w-4xl" data-contact-hero>
              <p className="eyebrow">VAMOS CONVERSAR</p>
              <h1 className="font-display text-[clamp(3rem,6.4vw,6rem)] font-extrabold leading-[.94] tracking-[-.075em] text-zinc-950">
                Pronto para impulsionar seu negócio?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Escolha o canal que fizer mais sentido ou conte um pouco sobre sua necessidade pelo formulário.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-center" data-contact-section>
              <aside className="relative overflow-hidden rounded-[20px] bg-zinc-950 p-7 text-white sm:p-9">
                <div className="pointer-events-none absolute -left-12 top-4 size-36 rotate-[-28deg] border border-red-500/65" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-16 right-2 size-48 rotate-[-28deg] border border-red-500/55" aria-hidden="true" />
                <div className="relative">
                  <h2 className="font-display text-3xl font-bold tracking-[-.05em]">Fale do jeito que preferir.</h2>
                  <p className="mt-4 max-w-md leading-7 text-zinc-300">Respondemos com clareza para entender o melhor próximo passo para sua empresa.</p>
                  <ul className="mt-9 grid gap-3">
                    <li><a className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[.04] p-4 transition hover:border-red-300/50 hover:bg-white/[.08]" href={siteConfig.instagramUrl}><AtSign className="size-5 text-red-200" aria-hidden="true" /><span><strong className="block">Instagram</strong><span className="text-sm text-zinc-300">@vexonsistemas</span></span></a></li>
                    <li><a className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[.04] p-4 transition hover:border-red-300/50 hover:bg-white/[.08]" href={`mailto:${siteConfig.email}`}><Mail className="size-5 text-red-200" aria-hidden="true" /><span><strong className="block">E-mail</strong><span className="text-sm text-zinc-300">{siteConfig.email}</span></span></a></li>
                    <li><a className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[.04] p-4 transition hover:border-red-300/50 hover:bg-white/[.08]" href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}><MessageCircle className="size-5 text-red-200" aria-hidden="true" /><span><strong className="block">WhatsApp</strong><span className="text-sm text-zinc-300">Iniciar uma conversa</span></span></a></li>
                    <li><a className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[.04] p-4 transition hover:border-red-300/50 hover:bg-white/[.08]" href={phoneHref}><Phone className="size-5 text-red-200" aria-hidden="true" /><span><strong className="block">Telefone</strong><span className="text-sm text-zinc-300">{phoneLabel}</span></span></a></li>
                  </ul>
                </div>
              </aside>
              <div>
                <p className="mb-5 text-right font-display text-2xl font-bold tracking-[-.04em] text-zinc-950 sm:text-3xl">Responderemos o mais breve possível.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 sm:pb-20" data-contact-section>
          <div className="site-container"><ProjectCtaCard /></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
