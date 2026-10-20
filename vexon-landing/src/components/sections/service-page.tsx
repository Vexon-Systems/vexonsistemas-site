import {
  AlignLeft,
  Check,
  Database,
  LayoutTemplate,
  Map,
  MessageSquareMore,
  PanelsTopLeft,
  RefreshCw,
  Search,
  ShoppingCart,
  Smartphone,
  Waypoints,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { serviceHeroImages } from "@/content/hero-images";
import { SolutionPageMotion } from "@/components/sections/solution-page-motion";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceGantt } from "@/components/shared/service-gantt";
import { VexonAccordion } from "@/components/ui/accordion";
import type { Service } from "@/content/services";

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;
  const presentation = {
    "sites-institucionais": {
      label: undefined,
      icons: [LayoutTemplate, Smartphone, PanelsTopLeft, MessageSquareMore, Waypoints],
    },
    "landing-pages": {
      label: "LANDING PAGE RESPONSIVA",
      icons: [LayoutTemplate, AlignLeft, PanelsTopLeft, MessageSquareMore, Smartphone],
    },
    "lojas-virtuais": {
      label: "LOJA RESPONSIVA",
      icons: [LayoutTemplate, PanelsTopLeft, ShoppingCart, Waypoints, Smartphone],
    },
    "sistemas-sob-medida": {
      label: "SISTEMA SOB MEDIDA",
      icons: [Search, Map, PanelsTopLeft, Database, RefreshCw],
    },
  }[service.slug];

  return (
    <>
      <SolutionPageMotion />
      <PageHero
        eyebrow={service.heroLabel}
        title={`${service.heroTitle} ${service.heroHighlight}`}
        description={service.heroDescription}
        message={service.whatsappMessage}
        primaryHref="#contato"
        background={serviceHeroImages[service.slug]}
      />

      <section className="section bg-zinc-50" data-solution-section>
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="O DESAFIO"
              title={service.problem.title}
              description={service.problem.description}
            />
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-2">
            {service.problem.points.map((point, index) => (
              <li
                className="group relative min-h-36 border border-zinc-200 bg-white p-5 leading-6 shadow-[0_8px_24px_rgb(0_0_0_/_0.035)] transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_16px_32px_rgb(0_0_0_/_0.1)] motion-reduce:transform-none motion-reduce:transition-none"
                key={point}
              >
                <>
                  <span className="font-mono text-xs font-bold tracking-[.14em] text-[var(--brand-600)]">
                    0{index + 1}
                  </span>
                  <p className="mt-7 font-display text-lg font-bold tracking-[-.025em] text-zinc-900">
                    {point}
                  </p>
                  <span
                    className="absolute bottom-0 left-0 h-1 w-12 bg-[var(--brand-600)] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-zinc-50" data-solution-section>
        <div className="site-container">
          <SectionHeader
            eyebrow="O QUE ESTA SOLUÇÃO PODE ORGANIZAR"
            title={service.howItWorks.title}
            description={service.howItWorks.description}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {service.benefits.map((benefit) => (
              <article
                className="rounded-[14px] border border-zinc-200 bg-white p-6"
                key={benefit.title}
              >
                <Icon className="text-[var(--brand-600)]" size={24} aria-hidden="true" />
                <h3 className="mt-6 font-display text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 leading-6 text-zinc-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-solution-section>
        <div className="site-container">
          <SectionHeader
            className="mx-auto max-w-2xl text-center [&_.eyebrow]:justify-center"
            eyebrow="ENTREGÁVEIS"
            title="Um projeto planejado de acordo com sua realidade"
          />
          <div className="mx-auto mt-10 max-w-5xl">
            <BentoGrid className="md:auto-rows-[10rem]">
              {service.deliverables.map((item, index) => {
                const DeliverableIcon = presentation.icons[index] ?? Check;
                return (
                  <article
                    className={`group relative flex min-h-40 flex-col justify-between overflow-hidden border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_14px_32px_rgb(0_0_0_/_0.08)] motion-reduce:transform-none motion-reduce:transition-none ${index === 0 ? "md:col-span-2 md:bg-zinc-950 md:text-white" : ""}`}
                    key={item}
                  >
                    <DeliverableIcon
                      className={`relative z-10 ${index === 0 ? "text-red-300" : "text-[var(--brand-600)]"}`}
                      size={23}
                      aria-hidden="true"
                    />
                    <h3 className="relative z-10 max-w-[17rem] font-display text-xl font-bold tracking-[-.035em]">
                      {item}
                    </h3>
                    <span
                      className={`absolute -bottom-6 -right-3 font-display text-8xl font-extrabold leading-none transition group-hover:-translate-y-1 motion-reduce:transform-none ${index === 0 ? "text-zinc-800 group-hover:text-zinc-700" : "text-zinc-100 group-hover:text-red-50"}`}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </article>
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </section>

      <section className="section bg-zinc-950 text-white" data-solution-section>
        <div className="site-container">
          <p className="eyebrow eyebrow-light">PROCESSO CLARO</p>
          <h2 className="section-title text-white">Do primeiro contato à próxima evolução</h2>
          <ServiceGantt />
        </div>
      </section>

      <section className="section bg-zinc-50" data-solution-section>
        <div className="site-container max-w-[820px]">
          <SectionHeader
            eyebrow="DÚVIDAS FREQUENTES"
            title={`Perguntas sobre ${service.shortTitle.toLowerCase()}`}
          />
          <VexonAccordion className="mt-9" items={service.faqs} variant="home" />
        </div>
      </section>

      <section id="contato" className="section bg-zinc-950 text-white" data-solution-section>
        <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-light">VAMOS CONVERSAR?</p>
            <h2 className="section-title text-white">Conte o que sua empresa precisa agora.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-100">
              Podemos começar entendendo sua realidade e avaliando se esta é a melhor próxima etapa.
            </p>
          </div>
          <ContactForm initialSolution={service.formSolution} />
        </div>
      </section>
    </>
  );
}
