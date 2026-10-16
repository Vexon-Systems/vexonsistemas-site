import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Lightbulb, MapPin, Scale, Search, ShieldCheck, Sparkles, Target } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { AboutMotion } from "@/components/sections/about-motion";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Sobre a Vexon",
  description: "Conheça a Vexon, empresa de tecnologia de Ituiutaba criada para resolver problemas reais.",
  alternates: { canonical: "/sobre/" },
};

const principles = [
  ["Tecnologia precisa gerar valor", Lightbulb],
  ["O problema vem antes da ferramenta", Search],
  ["Transparência é indispensável", ShieldCheck],
  ["Promessas devem ser proporcionais à capacidade de entrega", Scale],
  ["Aprender continuamente faz parte do trabalho", Sparkles],
  ["Reputação é construída projeto por projeto", Target],
  ["Proximidade com a realidade da região", MapPin],
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <AboutMotion />
        <section className="diagonal relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-zinc-950 py-16 text-white sm:py-20">
          <Image
            fill
            priority
            sizes="100vw"
            src="/assets/close-up-people-working-office-2400.webp"
            alt="Pessoas colaborando em ambiente de trabalho"
            className="-z-20 object-cover object-[66%_center] md:object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/10" aria-hidden="true" />
          <div className="site-container relative z-10 w-full" data-about-hero>
            <p className="eyebrow eyebrow-light">FEITA EM ITUIUTABA</p>
            <h1 className="max-w-3xl font-display text-[clamp(2.8rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-.065em]">
              Uma empresa jovem, com responsabilidade para construir no longo prazo
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Criamos soluções úteis para negócios reais, com transparência sobre o que faz sentido agora e o que pode evoluir depois.
            </p>
          </div>
        </section>

        <section className="section" data-about-section>
          <div className="site-container grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <Image
              src="/assets/close-up-people-working-office-2400.webp"
              alt="Pessoas colaborando em ambiente de trabalho"
              width={900}
              height={720}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="h-[30rem] w-full rounded-[20px] object-cover sm:h-[34rem]"
            />
            <div>
              <p className="eyebrow">NOSSA ORIGEM</p>
              <h2 className="section-title">Quatro estudantes, uma missão.</h2>
              <p className="section-copy">
                A Vexon nasceu da união de quatro estudantes de Análise e Desenvolvimento de Sistemas que compartilham o objetivo de criar soluções úteis e contribuir para o desenvolvimento tecnológico de Ituiutaba e região.
              </p>
              <p className="mt-5 max-w-[680px] leading-7 text-zinc-600">
                Queremos ajudar empresas e profissionais a evoluir por meio de soluções digitais que resolvam problemas reais e fortaleçam a região em tecnologia, inovação e negócios digitais.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <article className="rounded-[14px] border border-red-200 bg-red-50/40 p-5">
                  <Target className="size-5 text-[var(--brand-600)]" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold tracking-[-.025em]">Missão</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">Ajudar empresas e profissionais a evoluir com soluções digitais úteis.</p>
                </article>
                <article className="rounded-[14px] border border-red-200 bg-red-50/40 p-5">
                  <Eye className="size-5 text-[var(--brand-600)]" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold tracking-[-.025em]">Visão</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">Contribuir para uma região mais forte em tecnologia, inovação e negócios digitais.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-zinc-50 !pb-16" data-about-section>
          <div className="site-container">
            <SectionHeader eyebrow="PRINCÍPIOS" title="Como queremos trabalhar" />
            <BentoGrid className="mt-10 md:auto-rows-[13rem]">
              {principles.map(([principle, Icon], index) => (
                <article
                  className={`group relative flex min-h-48 flex-col justify-between overflow-hidden border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_16px_34px_rgb(0_0_0_/_0.08)] motion-reduce:transform-none motion-reduce:transition-none ${index === 0 || index === 3 ? "md:col-span-2" : ""}`}
                  key={principle}
                >
                  <Icon className="relative z-10 size-6 text-[var(--brand-600)] transition duration-300 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true" />
                  <h3 className="relative z-10 max-w-md font-display text-xl font-bold tracking-[-.035em]">{principle}</h3>
                  <span className="absolute -bottom-9 -right-3 font-display text-8xl font-extrabold leading-none text-zinc-100 transition group-hover:-translate-y-1 group-hover:text-red-50 motion-reduce:transform-none" aria-hidden="true">0{index + 1}</span>
                </article>
              ))}
            </BentoGrid>

          </div>
        </section>

        <section className="bg-zinc-50 pb-16" data-about-section>
          <div className="site-container">
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
