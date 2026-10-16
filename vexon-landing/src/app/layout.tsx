import type { Metadata } from "next";
import localFont from "next/font/local";
import { WebAnalytics } from "@/components/analytics/web-analytics";
import { siteConfig } from "@/config/site";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ConversionTracker } from "@/components/analytics/conversion-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter-latin.woff2", variable: "--font-inter", display: "swap", weight: "400 700" });
const jakarta = localFont({ src: "./fonts/jakarta-latin.woff2", variable: "--font-jakarta", display: "swap", weight: "500 800" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Vexon | Sites, Sistemas e Soluções Digitais em Ituiutaba",
    template: "%s | Vexon",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["criação de sites em Ituiutaba", "desenvolvimento de sistemas em Ituiutaba", "Landing Page", "loja virtual", "software para pequenas empresas"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: "Sites, Sistemas e Soluções Digitais em Ituiutaba",
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: "Vexon", description: siteConfig.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${siteConfig.siteUrl}/#professional-service`,
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.siteUrl,
            email: siteConfig.email,
            telephone: siteConfig.telephone,
            areaServed: [
              { "@type": "City", name: "Ituiutaba" },
              { "@type": "State", name: "Minas Gerais" },
              { "@type": "Country", name: "Brasil" },
            ],
            sameAs: [siteConfig.instagramUrl],
            serviceType: ["Criação de sites", "Landing Pages", "Lojas virtuais", "Desenvolvimento de sistemas"],
          }}
        />
        <a className="skip-link" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        {children}
        <WhatsAppFloat />
        <ConversionTracker />
        <WebAnalytics />
      </body>
    </html>
  );
}
