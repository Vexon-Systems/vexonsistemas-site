import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceBySlug, services } from "@/content/services";
import { siteConfig } from "@/config/site";

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  const path = "/solucoes/" + service.slug;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: [...service.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName: siteConfig.name,
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    provider: { "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.siteUrl },
    areaServed: ["Ituiutaba", "Triângulo Mineiro", "Brasil"],
  };

  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <ServicePage service={service} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
