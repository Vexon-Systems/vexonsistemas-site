import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Activity,
  Database,
  Eye,
  Headphones,
  Lightbulb,
  MapPin,
  MessageCircle,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeMotion } from "@/components/home/home-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceGantt } from "@/components/shared/service-gantt";
import { JsonLd } from "@/components/seo/json-ld";
import { TelemetryVisual } from "@/components/shared/telemetry-visual";
import { VexonAccordion } from "@/components/ui/accordion";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { getWhatsAppUrl } from "@/config/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const challenges = [
  ["Caos de informação", "Informações espalhadas entre papéis, planilhas e WhatsApp."],
  ["Esforço manual", "Tarefas repetitivas consomem tempo da equipe todos os dias."],
  ["Gestão limitada", "Vendas, clientes ou processos são difíceis de acompanhar."],
  ["Invisibilidade digital", "Clientes têm dificuldade para encontrar ou entender seus serviços."],
] as const;
const faqs = [
  [
    "Quanto custa um projeto?",
    "O valor depende do tipo de solução, escopo, nível de personalização e serviços envolvidos. Depois da conversa inicial, apresentamos uma proposta clara.",
  ],
  [
    "Quanto tempo demora?",
    "O prazo varia conforme a complexidade e a disponibilidade de conteúdo e validações. O cronograma é acordado antes do início.",
  ],
  [
    "Preciso saber exatamente o que quero?",
    "Não. Você pode chegar com um problema, uma dificuldade ou uma ideia inicial. Ajudamos a organizar a necessidade.",
  ],
  [
    "A Vexon atende apenas Ituiutaba?",
    "Não. Nosso foco inicial é Ituiutaba e região, mas projetos digitais também podem ser realizados remotamente.",
  ],
  [
    "Existe suporte depois da entrega?",
    "Sim, quando contratado. Hospedagem, suporte, manutenção e evolução são definidos conforme o projeto.",
  ],
  [
    "Vocês desenvolvem tudo do zero?",
    "Não necessariamente. Podemos usar ferramentas existentes, personalizá-las ou desenvolver uma solução própria.",
  ],
].map(([question, answer]) => ({ question, answer }));

const differentiators = [
  ["Entendimento antes da solução", "Primeiro entendemos o problema e o impacto esperado."],
  ["Comunicação próxima", "Explicamos decisões sem linguagem técnica desnecessária."],
  ["Solução proporcional", "Evitamos complexidade e custos que não geram valor agora."],
  ["Transparência", "Escopo, limites, riscos e responsabilidades são apresentados com clareza."],
  ["Visão de continuidade", "Pensamos em manutenção e evolução desde o início."],
  ["Conhecimento regional", "Estamos em Ituiutaba e próximos da realidade dos negócios locais."],
] as const;

const continuityItems = [
  "Hospedagem",
  "Manutenção",
  "Suporte",
  "Backups",
  "Atualizações",
  "Monitoramento",
  "Correções",
  "Novas funcionalidades",
] as const;

const differentiatorIcons = [MessageCircle, Lightbulb, Scale, ShieldCheck] as const;
const continuityIcons = [
  Server,
  Wrench,
  Headphones,
  Database,
  RefreshCw,
  Activity,
  ShieldCheck,
  Sparkles,
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }}
        />
        <HomeMotion />
        <section data-primary-hero className="diagonal relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-zinc-950 py-16 text-white sm:py-20">
          <Image
            fill
            priority
            sizes="100vw"
            src="/assets/hero/vexon-team-working-2400.webp"
            alt="Profissionais colaborando em ambiente de trabalho"
            className="-z-20 object-cover object-[66%_center] md:object-center"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950/95 via-zinc-950/85 to-zinc-950/65 md:from-zinc-950 md:via-zinc-950/85 md:to-zinc-950/10"
            aria-hidden="true"
          />
          <div className="site-container relative z-10 w-full" data-home-hero-copy>
            <div className="max-w-2xl">
              <h1 className="max-w-3xl font-display text-[clamp(2.35rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-.065em]">
                Sites e sistemas para sua empresa evoluir
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                A Vexon cria sites, lojas virtuais e sistemas sob medida para pequenas empresas que
                querem vender melhor, reduzir tarefas manuais e evoluir com segurança.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
                  data-conversion-event="hero_primary_click"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold transition hover:bg-[var(--brand-700)] sm:w-auto"
                >
                  <MessageCircle size={18} aria-hidden="true" /> Conversar sobre meu projeto
                </a>
                <Link
                  href="/#solucoes"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-white/20 px-5 font-semibold hover:bg-white/10 sm:w-auto"
                >
                  Conhecer as soluções <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-400">
                Atendimento próximo em Ituiutaba e região, com planejamento claro e soluções
                adequadas à realidade de cada negócio.
              </p>
            </div>
          </div>
        </section>
        <section className="section" data-home-section>
          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <p className="eyebrow">SUA EMPRESA PODE FUNCIONAR MELHOR</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[1.06] tracking-[-.055em]">
                Sua empresa pode estar perdendo tempo e oportunidades{" "}
                <span className="text-[var(--brand-600)]">sem perceber</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
                Muitos negócios ainda dependem de processos manuais, planilhas desorganizadas e
                ferramentas que não acompanham seu crescimento.
              </p>
            </div>
            <p className="mt-10 text-center font-display text-xl font-bold tracking-[-.03em]">
              Sua empresa enfrenta alguma dessas situações?
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {challenges.map(([title, description]) => (
                <li className="border-t-2 border-[var(--brand-600)] pt-4 text-center" key={title}>
                  <h3 className="font-display text-xl font-bold tracking-[-.035em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-12 max-w-2xl rounded-[18px] bg-zinc-100 px-6 py-7 text-center sm:px-10">
              <p className="text-xs font-bold tracking-[.12em] text-[var(--brand-600)]">
                A SOLUÇÃO COMEÇA AQUI
              </p>
              <p className="mt-3 font-display text-xl font-bold italic leading-7 tracking-[-.035em]">
                Nosso papel é entender sua realidade e encontrar a solução mais adequada para o seu
                negócio.
              </p>
              <a
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                href={getWhatsAppUrl("Olá! Preciso entender minhas possibilidades.")}
              >
                Quero entender minhas possibilidades <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section id="solucoes" className="section bg-zinc-50" data-home-section>
          <div className="site-container">
            <SectionHeader
              eyebrow="SOLUÇÕES PARA CADA MOMENTO"
              title="A tecnologia certa depende do desafio do seu negócio"
              description="Planejamos cada projeto considerando objetivo, urgência, capacidade de investimento e impacto esperado."
            />
            <BentoGrid className="mt-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                const layout = [
                  "md:col-span-2 bg-zinc-950 text-white [--bento-copy:#d4d4d8] [--bento-icon:#fecaca] [--bento-link:#fecaca]",
                  "bg-zinc-50",
                  "bg-white",
                  "md:col-span-2 bg-white",
                ][index];
                return (
                  <BentoCard
                    background={
                      <div
                        className={
                          index === 0
                            ? "absolute -right-16 -top-24 size-72 rotate-[-28deg] border border-[var(--brand-500)]/80"
                            : "absolute -right-14 -top-14 size-40 rotate-45 border border-zinc-200"
                        }
                      />
                    }
                    className={layout}
                    cta={
                      service.slug === "sites-institucionais"
                        ? "Criar meu site"
                        : service.slug === "landing-pages"
                          ? "Planejar minha Landing Page"
                          : service.slug === "lojas-virtuais"
                            ? "Avaliar minha loja virtual"
                            : "Entender meu sistema"
                    }
                    description={service.description}
                    conversionDetail={service.slug}
                    href={`/solucoes/${service.slug}`}
                    Icon={Icon}
                    name={service.shortTitle}
                    key={service.slug}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </section>
        <section className="section bg-zinc-950 text-white" data-home-section>
          <div className="site-container">
            <SectionHeader
              theme="dark"
              eyebrow="O QUE ESTAMOS CONSTRUINDO"
              title="Projetos que demonstram nossa capacidade"
              description="Apresentamos produtos próprios e projetos em desenvolvimento com transparência sobre seu estágio atual."
            />
            <BentoGrid className="mt-10 md:auto-rows-auto">
              {projects.map((project, index) => (
                <article
                  className={`overflow-hidden border border-white/15 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[.08] hover:shadow-[0_18px_42px_rgb(0_0_0_/_0.24)] motion-reduce:transform-none motion-reduce:transition-none ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-[.9fr_1.1fr]" : index === 1 ? "md:col-span-1" : "md:col-span-3 md:grid md:grid-cols-[.9fr_1.1fr]"}`}
                  data-motion-stagger
                  key={project.slug}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Interface do projeto ${project.name}`}
                      width={800}
                      height={450}
                      className={`w-full object-cover ${index === 0 ? "h-48 md:h-full" : "h-40"}`}
                    />
                  ) : (
                    <TelemetryVisual />
                  )}
                  <div className={index === 2 ? "flex flex-col justify-center p-6 sm:p-8" : "p-6"}>
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">
                      {project.category}
                    </p>
                    <p className="mt-2 w-fit self-start rounded-full bg-red-950 px-2.5 py-1 text-xs text-red-200">
                      {project.status}
                    </p>
                    <h3 className="mt-5 font-display text-2xl font-bold">{project.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{project.description}</p>
                    <Link
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-200"
                      data-conversion-detail={project.slug}
                      data-conversion-event="project_open"
                      href={`/projetos/${project.slug}`}
                    >
                      Conhecer o projeto <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </BentoGrid>
          </div>
        </section>
        <section
          className="diagonal relative isolate overflow-hidden bg-zinc-950 py-24 text-white sm:py-32"
          data-home-section
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute -left-24 top-10 size-64 rotate-[-28deg] border border-[var(--brand-500)]/70" />
            <div className="absolute bottom-0 right-[12%] h-px w-72 rotate-[-28deg] bg-[var(--brand-500)]" />
            <div className="absolute -right-10 top-1/2 size-40 border border-red-950" />
          </div>
          <div className="site-container relative z-10 mx-auto max-w-3xl text-center">
            <p className="eyebrow">COMECE PELO PROBLEMA</p>
            <h2 className="section-title mx-auto text-white">Não sabe qual solução faz sentido?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-zinc-200">
              Na primeira conversa, entendemos como sua empresa funciona, o que está dificultando
              sua rotina e qual resultado você deseja alcançar.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-[var(--brand-600)] px-5 font-semibold text-white transition hover:bg-[var(--brand-700)] focus-visible:ring-2 focus-visible:ring-red-200 sm:w-auto"
              href={getWhatsAppUrl("Olá! Preciso entender minhas possibilidades.")}
            >
              Solicitar uma conversa
            </a>
          </div>
        </section>
        <section className="section" data-home-section>
          <div className="site-container">
            <SectionHeader
              eyebrow="COMO TRABALHAMOS"
              title="Um processo claro do diagnóstico à evolução"
            />
            <ServiceGantt variant="solid" />
          </div>
        </section>
        <section className="section bg-zinc-100" data-home-section>
          <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow">POR QUE A VEXON</p>
              <h2 className="section-title">Por que escolher a Vexon?</h2>
              <p className="section-copy">
                Tecnologia com proximidade, clareza e responsabilidade para decisões proporcionais à
                realidade do seu negócio.
              </p>
            </div>
            <ol className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {differentiators.slice(0, 4).map(([title, description], index) => {
                const Icon = differentiatorIcons[index];

                return (
                  <li className="grid grid-cols-[1.5rem_1fr] gap-x-4" key={title}>
                    <Icon className="mt-0.5 size-5 text-[var(--brand-600)]" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-[-.03em]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
        <section className="section" data-home-section>
          <div className="site-container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative pb-10 pr-8 sm:pr-12">
              <Image
                className="h-[25rem] w-full rounded-[20px] object-cover"
                src="/assets/close-up-people-working-office-2400.webp"
                alt="Pessoas trabalhando em conjunto"
                width={900}
                height={600}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute bottom-0 right-0 max-w-[17rem] rounded-[12px] bg-[var(--brand-600)] p-6 text-white shadow-[0_18px_32px_rgb(0_0_0_/_0.16)]">
                <MapPin className="size-5" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-bold tracking-[-.04em]">
                  Feita em Ituiutaba
                </p>
                <p className="mt-2 text-sm leading-5 text-red-50">
                  Tecnologia com proximidade para Ituiutaba e região.
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">FEITA EM ITUIUTABA</p>
              <h2 className="section-title">
                Uma empresa jovem, com responsabilidade para construir no longo prazo
              </h2>
              <p className="section-copy">
                A Vexon nasceu da união de quatro estudantes de Análise e Desenvolvimento de
                Sistemas que compartilham o objetivo de criar soluções úteis e contribuir para o
                desenvolvimento tecnológico de Ituiutaba e região.
              </p>
              <div className="mt-9 grid gap-7 sm:grid-cols-2">
                <div>
                  <Eye className="size-5 text-[var(--brand-600)]" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-bold">Missão</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Ajudar empresas e profissionais a evoluir por meio de soluções digitais que
                    resolvam problemas reais.
                  </p>
                </div>
                <div>
                  <Lightbulb className="size-5 text-[var(--brand-600)]" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-bold">Visão</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Contribuir para que Ituiutaba e região se tornem cada vez mais fortes em
                    tecnologia, inovação e negócios digitais.
                  </p>
                </div>
              </div>
              <Link
                className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--brand-600)]"
                href="/sobre"
              >
                Conhecer a Vexon <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
        <section className="section" data-home-section>
          <div className="site-container relative">
            <div
              className="pointer-events-none absolute left-1/2 top-[13rem] hidden h-px w-[min(72%,52rem)] -translate-x-1/2 bg-red-100 md:block"
              aria-hidden="true"
            />
            <SectionHeader
              className="relative mx-auto max-w-3xl text-center [&_.section-copy]:mx-auto [&_.section-title]:mx-auto"
              eyebrow="DEPOIS DA ENTREGA"
              title="Seu projeto precisa continuar funcionando"
              description="Conforme o tipo de solução, a Vexon pode oferecer continuidade definida com clareza na proposta de cada projeto."
            />
            <ul className="relative mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {continuityItems.map((item, index) => {
                const Icon = continuityIcons[index];

                return (
                  <li
                    className="group flex min-h-32 flex-col items-center justify-center border border-zinc-200 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_14px_28px_rgb(0_0_0_/_0.08)] motion-reduce:transform-none motion-reduce:transition-none"
                    data-motion-stagger
                    key={item}
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-red-50 text-[var(--brand-600)] transition duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-600)] group-hover:text-white motion-reduce:transform-none">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 font-display text-lg font-bold tracking-[-.025em]">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="section bg-zinc-50" data-home-section>
          <div className="site-container max-w-[820px]">
            <SectionHeader
              eyebrow="DÚVIDAS FREQUENTES"
              title="O que você precisa saber antes de começar"
            />
            <VexonAccordion className="mt-9" items={faqs} variant="home" />
          </div>
        </section>
        <section id="contato" className="section bg-zinc-950 text-white" data-home-section>
          <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow eyebrow-light">VAMOS COMEÇAR</p>
              <h2 className="section-title text-white">Conte o que sua empresa precisa melhorar</h2>
              <p className="mt-5 max-w-[680px] text-[1.0625rem] leading-7 text-white">
                Você pode ter uma ideia pronta ou apenas perceber que algum processo está consumindo
                tempo demais. A primeira etapa é uma conversa para organizar as possibilidades.
              </p>
              <a
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-white/30 px-5 font-semibold text-white transition hover:border-white hover:bg-white hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-red-200 sm:w-auto"
                href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
              >
                Conversar pelo WhatsApp <MessageCircle size={17} />
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
