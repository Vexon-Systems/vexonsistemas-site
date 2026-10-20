import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { VexonAccordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { homeFaqs, homeProcess, homeServices } from "@/content/home";
import "./home.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  const featuredProjects = projects.filter((project) => project.image);
  const researchProject = projects.find((project) => project.slug === "telemetria-de-pivos")!;

  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="home">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }}
        />

        <section className="home-hero viewport-hero" data-primary-hero aria-labelledby="home-title">
          <div className="home-hero-background" aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet="/assets/home/hero-workspace-mobile.webp" />
              <Image
                src="/assets/home/hero-workspace-desktop.webp"
                alt=""
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="site-container">
            <div className="home-hero-layout">
              <div className="home-hero-copy">
                <div className="home-hero-title">
                  <h1 id="home-title">
                    Sites e sistemas
                    <br />
                    <span>para negócios reais.</span>
                  </h1>
                </div>
                <div className="home-hero-bottom">
                  <p>
                    Apresente sua empresa, venda online ou organize sua operação. A Vexon encontra
                    com você a solução que faz sentido para o seu momento.
                  </p>
                  <div className="home-hero-actions">
                    <a
                      className="home-button"
                      href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
                      data-conversion-event="hero_primary_click"
                    >
                      Conversar sobre meu projeto <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                    <Link className="home-text-link" href="#solucoes">
                      Conhecer as soluções <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <p className="home-hero-note">
              Para pequenas empresas em Ituiutaba e região. Atendimento remoto para projetos
              digitais. <span className="home-hero-image-note">Imagem de fundo ilustrativa.</span>
            </p>
          </div>
        </section>

        <section
          id="solucoes"
          className="home-section home-services"
          aria-labelledby="solutions-title"
        >
          <div className="site-container">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">01 / Soluções</p>
                <h2 id="solutions-title">
                  O que sua empresa
                  <br className="home-desktop-break" /> precisa agora?
                </h2>
              </div>
              <p>
                Você pode chegar com uma ideia ou só com um problema. A gente ajuda a definir o
                próximo passo.
              </p>
            </div>
            <div className="home-service-grid">
              {services.map((service, index) => {
                const copy = homeServices[service.slug];
                return (
                  <article className="home-service" key={service.slug}>
                    <span className="home-index" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="home-service-purpose">{copy.purpose}</p>
                      <h3>{service.shortTitle}</h3>
                      <p className="home-service-description">{copy.description}</p>
                      <Link
                        className="home-text-link"
                        href={`/solucoes/${service.slug}`}
                        data-conversion-event="solution_cta_click"
                        data-conversion-detail={service.slug}
                      >
                        {copy.cta} <ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="projetos"
          className="home-section home-projects"
          aria-labelledby="projects-title"
        >
          <div className="site-container">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">02 / Na prática</p>
                <h2 id="projects-title">Projetos em construção.</h2>
              </div>
              <p>
                Produtos próprios e iniciativas em desenvolvimento. Conheça as propostas e o estágio
                de cada projeto.
              </p>
            </div>
            <div className="home-project-grid">
              {featuredProjects.map((project) => (
                <article className="home-project" key={project.slug}>
                  <Link
                    className="home-project-image"
                    href={`/projetos/${project.slug}`}
                    aria-label={`Ver apresentação do projeto ${project.name}`}
                    data-conversion-event="project_open"
                    data-conversion-detail={project.slug}
                  >
                    <Image
                      src={project.image!}
                      alt={`Identidade visual do projeto ${project.name}`}
                      width={1000}
                      height={800}
                      sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1240px) 46vw, 576px"
                    />
                    <span className="home-project-image-arrow" aria-hidden="true">
                      <ArrowUpRight size={21} />
                    </span>
                  </Link>
                  <div className="home-project-meta">
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <Link
                    className="home-text-link"
                    href={`/projetos/${project.slug}`}
                    data-conversion-event="project_open"
                    data-conversion-detail={project.slug}
                  >
                    Conhecer o projeto <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
            <article className="home-research">
              <div>
                <p className="home-kicker">Pesquisa e desenvolvimento</p>
                <h3>{researchProject.name}</h3>
              </div>
              <div>
                <p>{researchProject.description}</p>
                <span className="home-research-status">{researchProject.status}</span>
              </div>
              <Link
                className="home-text-link"
                href={`/projetos/${researchProject.slug}`}
                data-conversion-event="project_open"
                data-conversion-detail={researchProject.slug}
              >
                Conhecer o projeto <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>

        <section
          id="processo"
          className="home-section home-process"
          aria-labelledby="process-title"
        >
          <div className="site-container">
            <div className="home-section-heading">
              <div>
                <p className="home-kicker">03 / Como trabalhamos</p>
                <h2 id="process-title">Clareza em cada etapa.</h2>
              </div>
              <p>
                Primeiro entendemos sua rotina. Depois definimos juntos o que construir, como
                entregar e como seguir.
              </p>
            </div>
            <ol className="home-process-list">
              {homeProcess.map((step, index) => (
                <li key={step.title}>
                  <span className="home-index">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="home-continuity">
              <h3>E depois da entrega?</h3>
              <p>
                Hospedagem, suporte, manutenção e evolução podem ser contratados conforme a
                necessidade do projeto.
              </p>
            </div>
          </div>
        </section>

        <section className="home-section home-about" aria-labelledby="about-title">
          <div className="site-container home-about-grid">
            <div>
              <p className="home-kicker">04 / Sobre a Vexon</p>
              <h2 id="about-title">
                Tecnologia com
                <br />
                proximidade.
              </h2>
              <p className="home-about-place">
                <MapPin size={16} aria-hidden="true" /> Feita em Ituiutaba, Minas Gerais.
              </p>
              <figure className="home-about-visual">
                <Image
                  src="/assets/home/planning-workspace-960.webp"
                  alt="Cena ilustrativa de planejamento de um site, com rascunhos e notebook em uma mesa"
                  width={960}
                  height={640}
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1240px) 45vw, 560px"
                />
                <figcaption>Imagem ilustrativa · Do planejamento à construção</figcaption>
              </figure>
            </div>
            <div className="home-about-copy">
              <p>
                Somos quatro estudantes de Análise e Desenvolvimento de Sistemas unidos para criar
                soluções úteis para empresas e profissionais.
              </p>
              <p>
                Acreditamos em entender o negócio, explicar as decisões e construir o que realmente
                ajuda no dia a dia.
              </p>
              <ul>
                <li>Escopo e proposta claros.</li>
                <li>Comunicação direta, sem complicar.</li>
                <li>Soluções proporcionais ao seu momento.</li>
              </ul>
              <Link className="home-text-link" href="/sobre">
                Conhecer a Vexon <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section home-questions" aria-labelledby="questions-title">
          <div className="site-container home-faq-grid">
            <div>
              <p className="home-kicker">05 / Dúvidas frequentes</p>
              <h2 id="questions-title">Antes de começar.</h2>
              <p>O essencial para dar o próximo passo com tranquilidade.</p>
            </div>
            <VexonAccordion className="home-faq" items={homeFaqs} variant="editorial" />
          </div>
        </section>

        <section id="contato" className="home-section home-contact" aria-labelledby="contact-title">
          <div className="home-contact-art" aria-hidden="true">
            <svg
              className="home-contact-contour home-contact-contour-left"
              viewBox="0 0 400 400"
              fill="none"
              focusable="false"
            >
              <g stroke="currentColor" strokeWidth="1.5">
                <path d="M-60 330C0 330 40 110 180 110S330 270 450 270" />
                <path d="M-60 350C0 350 40 130 180 130S330 290 450 290" />
                <path d="M-60 370C0 370 40 150 180 150S330 310 450 310" />
                <path d="M-60 390C0 390 40 170 180 170S330 330 450 330" />
                <path d="M-60 410C0 410 40 190 180 190S330 350 450 350" />
              </g>
            </svg>
            <svg
              className="home-contact-contour home-contact-contour-right"
              viewBox="0 0 400 400"
              fill="none"
              focusable="false"
            >
              <g stroke="currentColor" strokeWidth="1.5">
                <path d="M80-70C-40 100 140 240 290 170S460 230 470 350" />
                <path d="M100-90C-20 80 160 220 310 150S480 210 490 330" />
                <path d="M120-110C0 60 180 200 330 130S500 190 510 310" />
                <path d="M140-130C20 40 200 180 350 110S520 170 530 290" />
              </g>
            </svg>
          </div>
          <div className="site-container">
            <p className="home-kicker">Vamos conversar</p>
            <div className="home-contact-grid">
              <h2 id="contact-title">
                Seu próximo passo
                <br />
                começa com uma conversa.
              </h2>
              <div>
                <p>
                  Conte o que sua empresa precisa melhorar. Você não precisa ter tudo definido para
                  começar.
                </p>
                <a
                  className="home-button"
                  href={getWhatsAppUrl("Olá! Quero conversar sobre meu projeto.")}
                  data-conversion-event="whatsapp_content_click"
                >
                  Conversar pelo WhatsApp <ArrowUpRight size={19} aria-hidden="true" />
                </a>
                <Link className="home-text-link" href="/contato">
                  Prefiro enviar uma mensagem <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="home-contact-foot">
              <span>Ituiutaba e região · Atendimento remoto</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
