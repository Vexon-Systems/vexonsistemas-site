export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteConfig.siteUrl + "/", lastModified, changeFrequency: "monthly", priority: 1 },
    ...[
      "/projetos",
      "/sobre",
      "/contato",
      "/politica-de-privacidade",
      "/termos-de-uso",
    ].map((path) => ({
      url: siteConfig.siteUrl + path + "/",
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: siteConfig.siteUrl + "/solucoes/" + service.slug + "/",
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: siteConfig.siteUrl + "/projetos/" + project.slug + "/",
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
