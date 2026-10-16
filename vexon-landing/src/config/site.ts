// Centralize aqui os dados de contato quando estiverem disponíveis.
export const siteConfig = {
  name: "Vexon",
  description:
    "Sites, Landing Pages, lojas virtuais e sistemas personalizados para empresas de Ituiutaba e região. Tecnologia com clareza, proximidade e foco em resultados.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vexon.com.br").replace(/\/+$/, ""),
  whatsappUrl: "https://wa.me/553498994454?text=Olá!%20Quero%20conversar%20sobre%20meu%20projeto.",
  telephone: "+553498994454",
  telephoneDisplay: "+55 (34) 9899-4454",
  email: "contato@vexonsistemas.com",
  instagramUrl: "https://instagram.com/vexonsistemas",
  linkedinUrl: undefined,
} as const;

export function getWhatsAppUrl(message: string) {
  return siteConfig.whatsappUrl.split("?")[0] + "?text=" + encodeURIComponent(message);
}
