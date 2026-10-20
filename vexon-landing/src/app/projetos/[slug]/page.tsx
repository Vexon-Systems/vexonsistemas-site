import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { projectHeroImages } from "@/content/hero-images";
import { PageHero } from "@/components/shared/page-hero";
import { getProjectBySlug, projects } from "@/content/projects";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}/` },
  };
}
export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <PageHero
          background={projectHeroImages[project.slug]}
          eyebrow={project.category.toUpperCase()}
          title={project.name}
          description={project.description}
        />
        <section className="section">
          <div className="site-container grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Identidade visual do projeto ${project.name}`}
                width={1000}
                height={600}
                className="w-full rounded-[20px] border border-zinc-200"
              />
            ) : (
              <div className="grid min-h-96 place-items-center rounded-[20px] bg-zinc-950 font-display text-2xl text-zinc-400">
                Projeto de pesquisa e desenvolvimento
              </div>
            )}
            <div>
              <p className="eyebrow">ESTÁGIO ATUAL</p>
              <p className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-800">
                {project.status}
              </p>
              <p className="mt-5 leading-7 text-zinc-600">{project.stageDetail}</p>
              <h2 className="mt-10 font-display text-2xl font-bold">
                Funcionalidades e direções do projeto
              </h2>
              <ul className="mt-5 grid gap-3">
                {project.highlights.map((highlight) => (
                  <li className="flex gap-3 leading-6" key={highlight}>
                    <Check
                      className="shrink-0 text-[var(--brand-600)]"
                      size={19}
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
