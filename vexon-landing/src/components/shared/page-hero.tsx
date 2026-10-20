import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { heroImages, type HeroImage } from "@/content/hero-images";
import { HeroBackground } from "./hero-background";
import "./page-hero.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  message?: string;
  primaryHref?: string;
  primaryLabel?: string;
  background?: HeroImage;
};

export function PageHero({
  eyebrow,
  title,
  description,
  message = "Olá! Quero conversar sobre meu projeto.",
  primaryHref = "/contato",
  primaryLabel = "Conversar sobre meu projeto",
  background = heroImages.planning,
}: PageHeroProps) {
  return (
    <section data-primary-hero className="page-hero viewport-hero">
      <HeroBackground image={background} />
      <div className="site-container">
        <div className="page-hero-copy">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-description">{description}</p>
          <div className="page-hero-actions">
            <a
              className="page-hero-primary"
              data-conversion-event="solution_cta_click"
              href={primaryHref}
            >
              {primaryLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="page-hero-secondary"
              data-conversion-event="whatsapp_nav_click"
              href={getWhatsAppUrl(message)}
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="page-hero-caption">Imagem de fundo ilustrativa.</p>
        </div>
      </div>
    </section>
  );
}
