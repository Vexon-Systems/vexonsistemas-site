export type HeroImage = {
  desktop: string;
  mobile: string;
};

export const heroImages = {
  website: {
    desktop: "/assets/home/hero-workspace-desktop.webp",
    mobile: "/assets/home/hero-workspace-mobile.webp",
  },
  planning: {
    desktop: "/assets/about/planning-background.webp",
    mobile: "/assets/heroes/planning-mobile.webp",
  },
  commerce: {
    desktop: "/assets/heroes/commerce-desktop.webp",
    mobile: "/assets/heroes/commerce-mobile.webp",
  },
  software: {
    desktop: "/assets/heroes/software-desktop.webp",
    mobile: "/assets/heroes/software-mobile.webp",
  },
  irrigation: {
    desktop: "/assets/heroes/irrigation-desktop.webp",
    mobile: "/assets/heroes/irrigation-mobile.webp",
  },
} as const satisfies Record<string, HeroImage>;

export const serviceHeroImages = {
  "sites-institucionais": heroImages.website,
  "landing-pages": heroImages.planning,
  "lojas-virtuais": heroImages.commerce,
  "sistemas-sob-medida": heroImages.software,
} as const;

export const projectHeroImages: Record<string, HeroImage> = {
  "sellion-pdv": heroImages.commerce,
  "consultor-hub": heroImages.software,
  "telemetria-de-pivos": heroImages.irrigation,
};
