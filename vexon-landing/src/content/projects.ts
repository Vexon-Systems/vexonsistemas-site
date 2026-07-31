export type Project = {
  slug: "sellion-pdv" | "consultor-hub" | "telemetria-de-pivos";
  name: string;
  category: string;
  status: "Em desenvolvimento" | "Em planejamento e validação" | "MVP em validação técnica";
  description: string;
  highlights: readonly string[];
  image?: string;
  logo?: string;
  stageDetail: string;
};

export const projects: readonly Project[] = [
  {
    slug: "sellion-pdv",
    name: "SellionPDV",
    category: "Gestão comercial",
    status: "Em desenvolvimento",
    description: "Sistema para apoiar vendas, caixa, produtos, usuários e acompanhamento de resultados em estabelecimentos comerciais.",
    highlights: ["Ponto de venda", "Controle de caixa", "Gestão de produtos", "Relatórios", "Usuários e permissões"],
    image: "/assets/projects/sellion-pdv.png",
    logo: "/assets/projects/logo-sellion.png",
    stageDetail: "Produto próprio em desenvolvimento. As funcionalidades são apresentadas como escopo em construção, não como resultados já comprovados.",
  },
  {
    slug: "consultor-hub",
    name: "ConsultorHub",
    category: "Organização comercial",
    status: "Em planejamento e validação",
    description: "Proposta de CRM para consultores independentes organizarem clientes, oportunidades, contatos e atividades.",
    highlights: ["Centralização de clientes", "Acompanhamento de oportunidades", "Planejamento de contatos", "Organização da rotina comercial"],
    image: "/assets/projects/consultor-hub.png",
    logo: "/assets/projects/logo-consultorhub.png",
    stageDetail: "Proposta em planejamento e validação. O material representa a direção do produto e pode evoluir com o aprendizado do projeto.",
  },
  {
    slug: "telemetria-de-pivos",
    name: "Telemetria de Pivôs",
    category: "Tecnologia para o agro",
    status: "MVP em validação técnica",
    description: "Projeto de pesquisa e desenvolvimento para monitoramento remoto de pivôs de irrigação.",
    highlights: ["Acompanhamento de estados", "Identificação de falhas", "Monitoramento remoto", "Histórico de informações", "Base para análises futuras"],
    stageDetail: "MVP em validação técnica. A proposta está sendo investigada antes de qualquer promessa sobre uso em produção.",
  },
];

export function getProjectBySlug(slug: string) { return projects.find((project) => project.slug === slug); }
