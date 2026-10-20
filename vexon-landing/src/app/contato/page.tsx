import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { GuidedBriefing } from "@/components/guided-briefing";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { heroImages } from "@/content/hero-images";
import { SiteHeader } from "@/components/layout/site-header";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Converse com a Vexon sobre sites, lojas virtuais e sistemas em Ituiutaba e região.",
  alternates: { canonical: "/contato/" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="overflow-hidden bg-white">
        <PageHero
          eyebrow="VAMOS CONVERSAR"
          title="Vamos entender seu próximo projeto."
          description="Pode ser uma ideia pronta ou um problema da rotina. Escolha como prefere começar."
          background={heroImages.planning}
          primaryHref="#fale-com-a-vexon"
          primaryLabel="Enviar uma mensagem"
        />
        <section id="fale-com-a-vexon" className="section">
          <div className="site-container grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">CONVERSA DIRETA</p>
              <h2 className="section-title">Do seu jeito, sem complicar.</h2>
              <p className="mt-5 leading-7 text-zinc-600">
                Prefere conversar? Comece pelo WhatsApp. Para deixar uma solicitação por e-mail, use
                o formulário ao lado.
              </p>
              <a
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[var(--brand-600)] px-5 py-3 font-semibold text-white hover:bg-[var(--brand-700)]"
                href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
                data-conversion-event="whatsapp_content_click"
              >
                Conversar pelo WhatsApp
              </a>
              <div className="mt-9 border-t border-zinc-200 pt-7">
                <h3 className="font-display text-xl font-bold">Ainda está organizando a ideia?</h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  Responda algumas perguntas no briefing guiado e leve um resumo para a conversa.
                </p>
                <a
                  className="mt-3 inline-flex min-h-12 items-center font-semibold text-[var(--brand-600)] underline underline-offset-4"
                  href="#briefing"
                >
                  Montar meu briefing
                </a>
              </div>
              <address className="mt-8 space-y-3 border-t border-zinc-200 pt-7 text-sm not-italic text-zinc-600">
                <p>Ituiutaba e região · Atendimento remoto</p>
                <p>
                  <a
                    className="break-all underline underline-offset-4"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                    href={`tel:${siteConfig.telephone}`}
                  >
                    {siteConfig.telephoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                    href={siteConfig.instagramUrl}
                  >
                    Instagram da Vexon
                  </a>
                </p>
              </address>
            </div>
            <ContactForm />
          </div>
          <div id="briefing" className="site-container mt-14">
            <Suspense fallback={<p>Carregando briefing…</p>}>
              <GuidedBriefing />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
