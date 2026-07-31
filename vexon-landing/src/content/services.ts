import type { LucideIcon } from "lucide-react";
import { Globe2, PanelsTopLeft, ShoppingBag, Workflow } from "lucide-react";

export type ServiceMockup = "website" | "landing" | "store" | "system";

export type Service = {
  slug: "sites-institucionais" | "landing-pages" | "lojas-virtuais" | "sistemas-sob-medida";
  title: string;
  shortTitle: string;
  formSolution: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: readonly string[];
  icon: LucideIcon;
  mockup: ServiceMockup;
  heroLabel: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  problem: { title: string; description: string; points: readonly string[] };
  benefits: readonly { title: string; description: string }[];
  howItWorks: { title: string; description: string };
  deliverables: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  whatsappMessage: string;
};

export const services: readonly Service[] = [
  {
    slug: "sites-institucionais",
    title: "Sites institucionais",
    shortTitle: "Site institucional",
    formSolution: "Site institucional",
    description: "Fortaleça a presença e a credibilidade da sua empresa.",
    seoTitle: "Criação de sites institucionais em Ituiutaba",
    seoDescription:
      "Sites institucionais profissionais para empresas de Ituiutaba, Triângulo Mineiro e atendimento remoto em todo o Brasil.",
    keywords: ["criação de sites em Ituiutaba", "site institucional", "desenvolvimento web"],
    icon: Globe2,
    mockup: "website",
    heroLabel: "SITES INSTITUCIONAIS",
    heroTitle: "Sua empresa merece uma presença digital que",
    heroHighlight: "transmite confiança.",
    heroDescription:
      "Apresente seu negócio com clareza, fortaleça sua credibilidade e torne o contato com novos clientes mais simples.",
    problem: {
      title: "Quando sua empresa não é encontrada, ela deixa oportunidades na mesa.",
      description:
        "Muitos clientes pesquisam antes de entrar em contato. Sem um site profissional, informações importantes ficam dispersas e a empresa pode parecer menos preparada do que realmente é.",
      points: [
        "Dificuldade para apresentar serviços e diferenciais",
        "Informações espalhadas em redes sociais e mensagens",
        "Pouca confiança no primeiro contato",
        "Contato e orçamento sem um caminho claro",
      ],
    },
    benefits: [
      {
        title: "Mais credibilidade",
        description: "Mostre quem é sua empresa e por que ela merece ser escolhida.",
      },
      {
        title: "Informação organizada",
        description: "Reúna serviços, diferenciais e contatos em um único endereço.",
      },
      {
        title: "Contato facilitado",
        description: "Direcione visitantes para WhatsApp, e-mail ou solicitação de orçamento.",
      },
    ],
    howItWorks: {
      title: "Um site pensado para a realidade do seu negócio.",
      description:
        "Começamos entendendo sua empresa, organizamos a mensagem e construímos uma presença digital clara, rápida e fácil de usar no celular.",
    },
    deliverables: [
      "Estrutura estratégica de páginas",
      "Design responsivo",
      "Apresentação de serviços",
      "CTAs e canais de contato",
      "Base preparada para evolução",
    ],
    faqs: [
      {
        question: "O site funciona bem no celular?",
        answer:
          "Sim. A experiência é planejada para funcionar com clareza em celulares, tablets e computadores.",
      },
      {
        question: "Posso atualizar informações depois?",
        answer:
          "Sim. Definimos a forma mais adequada de manter conteúdos e informações atualizados conforme a necessidade do projeto.",
      },
      {
        question: "O domínio e a hospedagem estão incluídos?",
        answer:
          "Orientamos a contratação e podemos estruturar hospedagem, domínio e manutenção de acordo com o escopo.",
      },
      {
        question: "Atendem empresas fora de Ituiutaba?",
        answer:
          "Sim. Temos proximidade com a região e também atendemos empresas de forma remota em todo o Brasil.",
      },
    ],
    whatsappMessage:
      "Olá! Quero conversar sobre a criação de um site institucional para minha empresa.",
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    shortTitle: "Landing Page",
    formSolution: "Landing Page",
    description: "Transforme visitantes em oportunidades de negócio.",
    seoTitle: "Criação de Landing Pages em Ituiutaba",
    seoDescription:
      "Landing Pages focadas em campanhas e geração de oportunidades para empresas de Ituiutaba, região e atendimento remoto.",
    keywords: ["landing page em Ituiutaba", "página de vendas", "campanhas digitais"],
    icon: PanelsTopLeft,
    mockup: "landing",
    heroLabel: "LANDING PAGES",
    heroTitle: "Transforme atenção em",
    heroHighlight: "novas oportunidades.",
    heroDescription:
      "Uma página focada em uma oferta, campanha ou serviço para deixar a mensagem clara e orientar o visitante à próxima ação.",
    problem: {
      title: "Campanhas perdem força quando a mensagem não leva a uma ação clara.",
      description:
        "Enviar pessoas para uma página genérica aumenta distrações. Uma Landing Page concentra a atenção no que importa: explicar a oferta e facilitar a conversão.",
      points: [
        "Campanhas sem uma página própria",
        "Muitas informações competindo pela atenção",
        "Dificuldade para medir interesse",
        "Leads que não entendem o próximo passo",
      ],
    },
    benefits: [
      {
        title: "Foco na conversão",
        description: "Toda a estrutura trabalha para uma ação principal.",
      },
      {
        title: "Mensagem objetiva",
        description: "Explique sua oferta sem dispersar a atenção do visitante.",
      },
      {
        title: "Pronta para campanhas",
        description: "Use em anúncios, lançamentos, eventos ou divulgação de serviços.",
      },
    ],
    howItWorks: {
      title: "Uma página com objetivo, mensagem e próximo passo definidos.",
      description:
        "Organizamos a oferta, os argumentos essenciais e os CTAs para que o visitante entenda rapidamente o valor e possa iniciar uma conversa.",
    },
    deliverables: [
      "Estrutura focada em conversão",
      "Copy e hierarquia de informação",
      "Seções de benefício e prova",
      "Formulário ou WhatsApp",
      "Experiência otimizada para mobile",
    ],
    faqs: [
      {
        question: "Landing Page é diferente de um site?",
        answer:
          "Sim. Ela é criada para uma campanha, oferta ou objetivo específico, enquanto o site institucional apresenta a empresa de forma mais ampla.",
      },
      {
        question: "Posso usar a página em anúncios?",
        answer:
          "Sim. A página é preparada para receber tráfego de anúncios, redes sociais, QR Codes e outros canais.",
      },
      {
        question: "A página pode ter formulário e WhatsApp?",
        answer:
          "Sim. Podemos combinar os dois caminhos conforme a jornada que fizer mais sentido para sua campanha.",
      },
      {
        question: "Consigo criar mais de uma Landing Page?",
        answer:
          "Sim. Cada campanha, produto ou público pode ter uma página própria quando isso ajudar na comunicação.",
      },
    ],
    whatsappMessage: "Olá! Quero conversar sobre uma Landing Page para uma campanha ou serviço.",
  },
  {
    slug: "lojas-virtuais",
    title: "Lojas virtuais",
    shortTitle: "Loja virtual",
    formSolution: "Loja virtual",
    description: "Leve seus produtos para mais clientes com uma experiência de compra clara.",
    seoTitle: "Criação de lojas virtuais em Ituiutaba",
    seoDescription:
      "Lojas virtuais claras, organizadas e preparadas para vender produtos online em Ituiutaba, região e em todo o Brasil.",
    keywords: ["loja virtual em Ituiutaba", "e-commerce", "vendas online"],
    icon: ShoppingBag,
    mockup: "store",
    heroLabel: "LOJAS VIRTUAIS",
    heroTitle: "Leve seus produtos para mais clientes, com uma compra",
    heroHighlight: "simples e segura.",
    heroDescription:
      "Organize seu catálogo, facilite a jornada de compra e crie uma base profissional para ampliar suas vendas pela internet.",
    problem: {
      title: "Vender pelo WhatsApp funciona, mas limita o crescimento da operação.",
      description:
        "Quando catálogo, pedidos e informações ficam espalhados em mensagens, o cliente encontra barreiras e sua equipe perde tempo com tarefas repetitivas.",
      points: [
        "Catálogo difícil de consultar",
        "Pedidos recebidos de forma desorganizada",
        "Muita dependência de atendimento manual",
        "Experiência de compra pouco profissional",
      ],
    },
    benefits: [
      {
        title: "Catálogo organizado",
        description: "Apresente produtos, variações e informações de forma fácil de navegar.",
      },
      {
        title: "Compra mais fluida",
        description: "Reduza dúvidas e deixe o caminho até o pedido mais direto.",
      },
      {
        title: "Base para crescer",
        description: "Comece com o necessário e mantenha espaço para novas integrações.",
      },
    ],
    howItWorks: {
      title: "Uma vitrine digital preparada para a rotina de vendas.",
      description:
        "Definimos a melhor forma de apresentar os produtos, organizar categorias e orientar cada cliente do primeiro clique até a compra.",
    },
    deliverables: [
      "Catálogo e categorias",
      "Página de produto",
      "Carrinho e fluxo de pedido",
      "Integrações conforme o escopo",
      "Experiência responsiva",
    ],
    faqs: [
      {
        question: "Posso vender produtos físicos e serviços?",
        answer:
          "Sim. O formato da loja é definido conforme o que sua empresa vende e como os pedidos precisam funcionar.",
      },
      {
        question: "A loja aceita pagamento online?",
        answer: "Podemos avaliar e integrar as opções de pagamento adequadas ao escopo do projeto.",
      },
      {
        question: "Consigo atualizar produtos e preços?",
        answer:
          "Sim. A operação é planejada para que a gestão do catálogo seja viável no dia a dia.",
      },
      {
        question: "A loja funciona no celular?",
        answer:
          "Sim. A maior parte das compras começa no celular, por isso essa experiência é prioridade.",
      },
    ],
    whatsappMessage: "Olá! Quero conversar sobre uma loja virtual para vender meus produtos.",
  },
  {
    slug: "sistemas-sob-medida",
    title: "Sistemas sob medida",
    shortTitle: "Sistema sob medida",
    formSolution: "Sistema personalizado",
    description: "Uma solução desenvolvida para a realidade da sua empresa.",
    seoTitle: "Sistemas sob medida em Ituiutaba",
    seoDescription:
      "Sistemas sob medida para organizar processos e centralizar informações de empresas de Ituiutaba, região e atendimento remoto.",
    keywords: [
      "sistemas sob medida em Ituiutaba",
      "automação de processos",
      "sistema para empresas",
    ],
    icon: Workflow,
    mockup: "system",
    heroLabel: "SISTEMAS SOB MEDIDA",
    heroTitle: "Organize sua operação com uma solução que acompanha o jeito da sua empresa",
    heroHighlight: "trabalhar.",
    heroDescription:
      "Transforme processos manuais e informações dispersas em uma ferramenta clara, segura e preparada para evoluir.",
    problem: {
      title:
        "Planilhas, papéis e mensagens não foram feitos para sustentar uma operação em crescimento.",
      description:
        "Quando cada pessoa trabalha com uma informação diferente, os erros aumentam e o controle diminui. Um sistema sob medida reúne o que sua empresa realmente precisa.",
      points: [
        "Processos repetitivos feitos manualmente",
        "Informações espalhadas em diferentes ferramentas",
        "Dificuldade para acompanhar a operação",
        "Soluções prontas que não atendem à rotina real",
      ],
    },
    benefits: [
      {
        title: "Mais controle",
        description: "Centralize as informações importantes em um ambiente único.",
      },
      {
        title: "Menos retrabalho",
        description: "Organize tarefas e reduza etapas manuais da rotina.",
      },
      {
        title: "Feito para sua realidade",
        description: "Construa uma solução a partir do seu processo, não o contrário.",
      },
    ],
    howItWorks: {
      title: "Começamos pelo processo, não pela tecnologia.",
      description:
        "Entendemos como sua operação funciona hoje, identificamos os pontos de melhoria e planejamos a solução por etapas claras.",
    },
    deliverables: [
      "Diagnóstico de processos",
      "Planejamento de escopo",
      "Painéis e fluxos personalizados",
      "Centralização de dados",
      "Evolução contínua conforme a necessidade",
    ],
    faqs: [
      {
        question: "Preciso saber exatamente como o sistema será?",
        answer:
          "Não. Você pode começar explicando o problema e a rotina atual. Nós ajudamos a organizar os requisitos.",
      },
      {
        question: "O desenvolvimento pode ser feito por etapas?",
        answer:
          "Sim. Priorizamos o que gera mais valor primeiro e planejamos as evoluções seguintes.",
      },
      {
        question: "O sistema pode integrar com outras ferramentas?",
        answer:
          "Avaliamos integrações necessárias durante o diagnóstico e definimos o que faz sentido para o escopo.",
      },
      {
        question: "Vocês oferecem suporte depois da entrega?",
        answer:
          "Sim. Podemos estruturar suporte, manutenção e evolução contínua de acordo com cada projeto.",
      },
    ],
    whatsappMessage:
      "Olá! Quero conversar sobre um sistema sob medida para organizar processos da minha empresa.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
