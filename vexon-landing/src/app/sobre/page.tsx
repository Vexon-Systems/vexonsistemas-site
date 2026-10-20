import type { Metadata } from "next";
import { HeroBackground } from "@/components/shared/hero-background";
import { heroImages } from "@/content/hero-images";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { aboutPrinciples } from "@/content/about";
import "./about.css";

export const metadata: Metadata = {
  title: "Sobre a Vexon",
  description:
    "Conheça a Vexon, equipe de quatro estudantes de Análise e Desenvolvimento de Sistemas de Ituiutaba, e nossos princípios de trabalho.",
  alternates: { canonical: "/sobre/" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="about-page">
        <section className="about-intro viewport-hero" aria-labelledby="about-heading">
          <HeroBackground image={heroImages.planning} />
          <div className="site-container">
            <div className="about-intro-meta">
              <p className="about-kicker">Sobre a Vexon</p>
              <span>
                <MapPin size={14} aria-hidden="true" /> Ituiutaba, MG
              </span>
            </div>
            <h1 id="about-heading">
              Gente próxima.
              <br />
              <span>Tecnologia com propósito.</span>
            </h1>
            <div className="about-intro-bottom">
              <p>
                Uma equipe jovem que acredita em entender o negócio, conversar com clareza e
                construir soluções úteis para o dia a dia.
              </p>
              <Link className="about-text-link" href="#nossa-origem">
                Conheça nossa história <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <p className="about-intro-caption">Imagem ilustrativa · Planejar antes de construir</p>
          </div>
        </section>

        <section id="nossa-origem" className="about-section" aria-labelledby="origin-heading">
          <div className="site-container about-origin-grid">
            <div className="about-origin-heading">
              <p className="about-kicker">01 / Nossa origem</p>
              <h2 id="origin-heading">
                Quatro estudantes.
                <br />
                Uma ideia em comum.
              </h2>
            </div>
            <div className="about-origin-copy">
              <p>
                A Vexon nasceu da união de quatro estudantes de Análise e Desenvolvimento de
                Sistemas, com o objetivo de criar soluções úteis e contribuir para o desenvolvimento
                tecnológico de Ituiutaba e região.
              </p>
              <p>
                Ser uma equipe jovem traz energia para aprender. A confiança, porém, precisa ser
                conquistada com organização, transparência e qualidade em cada projeto.
              </p>
              <dl className="about-purpose">
                <div>
                  <dt>Missão</dt>
                  <dd>
                    Ajudar empresas e profissionais a evoluir com soluções digitais que resolvam
                    problemas reais.
                  </dd>
                </div>
                <div>
                  <dt>Visão</dt>
                  <dd>
                    Contribuir para uma região mais forte em tecnologia, inovação e negócios
                    digitais.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="about-section about-principles" aria-labelledby="principles-heading">
          <div className="site-container">
            <div className="about-section-heading">
              <div>
                <p className="about-kicker">02 / Nossos princípios</p>
                <h2 id="principles-heading">
                  Como queremos
                  <br />
                  trabalhar.
                </h2>
              </div>
              <p>
                Mais do que escolher ferramentas, queremos tomar boas decisões e manter uma relação
                clara com quem confia no nosso trabalho.
              </p>
            </div>
            <ol className="about-principles-list">
              {aboutPrinciples.map((principle, index) => (
                <li key={principle.title}>
                  <span className="about-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-contact" aria-labelledby="about-contact-heading">
          <div className="site-container about-contact-grid">
            <div>
              <p className="about-kicker">Vamos conversar</p>
              <h2 id="about-contact-heading">
                O primeiro passo
                <br />é entender seu negócio.
              </h2>
            </div>
            <div>
              <p>
                Conte o que você precisa melhorar. Podemos começar por uma ideia, uma dificuldade ou
                uma pergunta.
              </p>
              <Link className="about-button" href="/contato">
                Conversar sobre meu projeto <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link className="about-text-link" href="/projetos">
                Conhecer nossos projetos <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
