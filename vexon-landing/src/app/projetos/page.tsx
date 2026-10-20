import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectsMotion } from "@/components/sections/projects-motion";
import { TelemetryVisual } from "@/components/shared/telemetry-visual";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/shared/page-hero";
import { heroImages } from "@/content/hero-images";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Produtos próprios e projetos em desenvolvimento da Vexon.",
  alternates: { canonical: "/projetos/" },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="conteudo-principal"
        className="relative isolate overflow-hidden bg-zinc-950 text-white"
      >
        <ProjectsMotion />
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -left-[15%] top-[20rem] h-0.5 w-[60rem] rotate-[-28deg] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_24px_rgb(239_68_68_/_0.45)]"
            data-project-line
          />
          <div
            className="absolute -right-[15%] top-[56rem] h-0.5 w-[64rem] rotate-[-28deg] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_24px_rgb(239_68_68_/_0.4)]"
            data-project-line
          />
          <div
            className="absolute -left-[20%] top-[100rem] h-0.5 w-[58rem] rotate-[-28deg] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_24px_rgb(239_68_68_/_0.4)]"
            data-project-line
          />
          <div className="absolute right-[7%] top-[34rem] size-40 rotate-[-28deg] border border-red-500/60 bg-red-950/20" />
          <div className="absolute left-[7%] top-[82rem] size-52 rotate-[-28deg] border border-red-500/55 bg-red-950/15" />
          <div
            className="absolute -right-20 top-[78rem] h-px w-80 rotate-[-28deg] bg-red-400/70"
            data-project-line
          />
        </div>

        <PageHero
          eyebrow="PROJETOS EM CONSTRUÇÃO"
          title="Projetos que mostram como pensamos tecnologia."
          description="Produtos próprios e iniciativas em desenvolvimento, apresentados com transparência sobre seu estágio atual."
          background={heroImages.software}
          primaryHref="#projetos-em-construcao"
          primaryLabel="Conhecer os projetos"
        />

        <section id="projetos-em-construcao" className="section">
          <div className="site-container grid gap-20 lg:gap-28">
            {projects.map((project, index) => {
              const imageFirst = index % 2 === 1;
              const usesSquareLogo = project.slug === "consultor-hub";

              return (
                <article
                  className={`grid items-start gap-8 lg:gap-12 ${imageFirst ? "lg:grid-cols-[.58fr_.42fr] lg:[&_.project-copy]:order-2 lg:[&_.project-copy]:justify-self-end lg:[&_.project-copy]:text-right" : "lg:grid-cols-[.42fr_.58fr]"}`}
                  data-project-case
                  data-project-side={imageFirst ? "left" : "right"}
                  key={project.slug}
                >
                  <div className="project-copy">
                    <p className="font-mono text-xs font-bold tracking-[.14em] text-red-200">
                      {project.status.toUpperCase()}
                    </p>
                    {project.logo ? (
                      <span
                        className={`group/logo mt-5 block ${usesSquareLogo ? "h-24 w-24" : "h-12 w-48"} ${imageFirst ? "lg:ml-auto" : ""}`}
                      >
                        <Image
                          src={project.logo}
                          alt={`Logo ${project.name}`}
                          width={192}
                          height={48}
                          className={`size-full object-contain ${imageFirst ? "object-right" : "object-left"} brightness-0 invert transition duration-700 ease-out group-hover/logo:scale-[1.03] group-hover/logo:brightness-100 group-hover/logo:invert-0 motion-reduce:transform-none motion-reduce:transition-none`}
                        />
                      </span>
                    ) : null}
                    <h2 className="mt-7 max-w-md font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-extrabold leading-[.94] tracking-[-.065em]">
                      {project.name}
                    </h2>
                    <p className="mt-6 max-w-md leading-7 text-zinc-400">{project.description}</p>
                    <Link
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-200 transition hover:text-white"
                      href={`/projetos/${project.slug}`}
                    >
                      Ver detalhes <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                  <Link
                    className="project-media group block aspect-[16/10] overflow-hidden rounded-[10px] border border-white/15 bg-zinc-900 outline-none transition hover:-translate-y-1 hover:border-white/35 hover:shadow-[0_22px_52px_rgb(0_0_0_/_0.35)] focus-visible:ring-2 focus-visible:ring-red-200 motion-reduce:transform-none motion-reduce:transition-none"
                    href={`/projetos/${project.slug}`}
                    aria-label={`Ver detalhes do projeto ${project.name}`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Identidade visual do projeto ${project.name}`}
                        width={1200}
                        height={720}
                        className="size-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="h-full [&>div]:h-full">
                        <TelemetryVisual />
                      </div>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
