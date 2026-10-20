import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { serviceHeroImages } from "@/content/hero-images";
import { serviceGuidance } from "@/content/project-guide";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { VexonAccordion } from "@/components/ui/accordion";
import type { Service } from "@/content/services";

export function ServicePage({ service }: { service: Service }) {
  const guidance = serviceGuidance[service.slug];
  return (
    <>
      <PageHero
        eyebrow={service.heroLabel}
        title={`${service.heroTitle} ${service.heroHighlight}`}
        description={service.heroDescription}
        message={service.whatsappMessage}
        primaryHref="#contato"
        background={serviceHeroImages[service.slug]}
      />

      <section className="section bg-zinc-50">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="PARA QUEM FAZ SENTIDO"
              title={service.howItWorks.title}
              description={guidance.audience}
            />
            <p className="mt-5 leading-7 text-zinc-600">{service.howItWorks.description}</p>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold">Reconhece alguma destas situações?</h3>
            <ul className="mt-5 divide-y divide-zinc-200">
              {service.problem.points.map((point) => (
                <li className="flex gap-3 py-4 leading-7" key={point}>
                  <Check
                    className="mt-1 shrink-0 text-[var(--brand-600)]"
                    size={18}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeader
            eyebrow="NA PRÁTICA"
            title="Um caminho simples para quem vai usar."
            description="Exemplo de estrutura para orientar a conversa. O projeto final é definido com você."
          />
          <ol className="mt-10 grid gap-0 border-y border-zinc-200 md:grid-cols-3">
            {guidance.example.map((item, index) => (
              <li
                className="flex items-center gap-4 border-b border-zinc-200 px-2 py-7 last:border-0 md:border-b-0"
                key={item}
              >
                <span className="font-mono text-sm text-[var(--brand-600)]">0{index + 1}</span>
                <span className="flex-1 font-display text-xl font-bold">{item}</span>
                {index < 2 && (
                  <ArrowRight
                    className="hidden shrink-0 text-zinc-400 md:block"
                    size={20}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div key={benefit.title}>
                <h3 className="font-display text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 leading-7 text-zinc-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-zinc-950 text-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-light">O QUE PODE ENTRAR NO ESCOPO</p>
            <h2 className="section-title text-white">Entregas claras desde a proposta.</h2>
            <p className="mt-5 leading-7 text-zinc-300">
              A lista orienta o planejamento. Itens, quantidade de páginas, integrações e critérios
              de entrega ficam definidos na proposta aprovada.
            </p>
            <ul className="mt-7 divide-y divide-white/15">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 py-4">
                  <Check className="shrink-0 text-red-300" size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-9 lg:pt-12">
            <div>
              <h3 className="font-display text-xl font-bold">O que preparar para começar</h3>
              <p className="mt-3 leading-7 text-zinc-300">{guidance.prepare}</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">O que avaliamos à parte</h3>
              <p className="mt-3 leading-7 text-zinc-300">{guidance.extras}</p>
            </div>
            <div className="border-t border-white/15 pt-7">
              <h3 className="font-display text-xl font-bold">E o prazo e o investimento?</h3>
              <p className="mt-3 leading-7 text-zinc-300">
                Dependem do escopo e dos materiais disponíveis. Primeiro entendemos sua necessidade;
                depois apresentamos as condições para você avaliar.
              </p>
              <Link
                className="mt-4 inline-flex min-h-12 items-center gap-3 font-semibold underline underline-offset-4"
                href={`/contato/?solucao=${service.slug}#briefing`}
              >
                Organizar minha ideia <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-zinc-50">
        <div className="site-container max-w-[820px]">
          <SectionHeader
            eyebrow="DÚVIDAS FREQUENTES"
            title={`Perguntas sobre ${service.shortTitle.toLowerCase()}`}
          />
          <VexonAccordion className="mt-9" items={service.faqs} variant="home" />
          <details className="mt-8 border-t border-zinc-200 py-5">
            <summary className="cursor-pointer py-3 font-semibold">
              Como o projeto acontece?
            </summary>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-zinc-600">
              <li>Conversamos sobre o negócio e definimos escopo e proposta.</li>
              <li>Planejamos a experiência, validamos o protótipo e desenvolvemos.</li>
              <li>Testamos com você, ajustamos e orientamos a implantação.</li>
            </ol>
            <p className="mt-4 leading-7 text-zinc-600">
              Suporte, manutenção e evolução podem ser contratados conforme a necessidade.
            </p>
          </details>
        </div>
      </section>

      <section id="contato" className="section bg-zinc-950 text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-light">VAMOS CONVERSAR?</p>
            <h2 className="section-title text-white">Conte o que sua empresa precisa agora.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Podemos começar entendendo sua realidade e avaliando se esta é a melhor próxima etapa.
            </p>
            <Link
              href={`/contato/?solucao=${service.slug}#briefing`}
              className="mt-6 inline-flex min-h-12 items-center font-semibold underline underline-offset-4"
            >
              Prefiro montar um briefing guiado
            </Link>
          </div>
          <ContactForm initialSolution={service.formSolution} />
        </div>
      </section>
    </>
  );
}
