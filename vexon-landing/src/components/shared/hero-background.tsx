import Image from "next/image";
import type { HeroImage } from "@/content/hero-images";
import "./hero-background.css";

export function HeroBackground({ image }: { image: HeroImage }) {
  return (
    <div className="hero-background" aria-hidden="true">
      <picture>
        <source media="(max-width: 700px)" srcSet={image.mobile} />
        <Image src={image.desktop} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
      </picture>
    </div>
  );
}
