import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Vexon | Sites, Sistemas e Soluções Digitais em Ituiutaba",
    template: "%s | Vexon",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["criação de sites em Ituiutaba", "desenvolvimento de sistemas em Ituiutaba", "Landing Page", "loja virtual", "software para pequenas empresas"],
  alternates: { canonical: "/" },
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
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
