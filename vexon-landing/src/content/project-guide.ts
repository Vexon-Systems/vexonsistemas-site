export const solutionChoices = [
  {
    slug: "sites-institucionais",
    label: "Apresentar minha empresa",
    title: "Site institucional",
    reason: "Reúne serviços, diferenciais e contatos para quem quer conhecer sua empresa.",
  },
  {
    slug: "landing-pages",
    label: "Divulgar uma oferta ou campanha",
    title: "Landing Page",
    reason: "Concentra a mensagem de uma oferta e conduz o visitante a uma ação principal.",
  },
  {
    slug: "lojas-virtuais",
    label: "Vender produtos online",
    title: "Loja virtual",
    reason: "Organiza o catálogo e o caminho do produto até o pedido.",
  },
  {
    slug: "sistemas-sob-medida",
    label: "Organizar processos da empresa",
    title: "Sistema sob medida",
    reason:
      "Parte da rotina da equipe para avaliar como centralizar informações e reduzir tarefas manuais.",
  },
] as const;

export const finderQuestions = [
  {
    title: "O que você quer resolver primeiro?",
    options: solutionChoices.map((item) => ({ value: item.slug, label: item.label })),
  },
  {
    title: "Como isso funciona hoje?",
    options: [
      { value: "Ainda não tenho uma solução", label: "Ainda não tenho uma solução" },
      {
        value: "Uso redes sociais, mensagens ou planilhas",
        label: "Uso redes sociais, mensagens ou planilhas",
      },
      {
        value: "Já tenho uma ferramenta e quero melhorar",
        label: "Já tenho uma ferramenta e quero melhorar",
      },
    ],
  },
  {
    title: "Qual é sua prioridade neste momento?",
    options: [
      { value: "Começar com o essencial", label: "Começar com o essencial" },
      { value: "Melhorar a experiência atual", label: "Melhorar a experiência atual" },
      { value: "Entender as possibilidades", label: "Entender as possibilidades" },
    ],
  },
];

export const serviceGuidance = {
  "sites-institucionais": {
    audience:
      "Empresas e profissionais que precisam apresentar seus serviços em um endereço próprio.",
    example: ["Quem somos", "Serviços e diferenciais", "Contato ou orçamento"],
    prepare:
      "Nome e identidade da empresa, serviços, canais de contato e fotos que você tenha autorização para usar.",
    extras:
      "Domínio, hospedagem, produção de fotos e manutenção são definidos na proposta. Um painel para editar conteúdo depende do escopo.",
  },
  "landing-pages": {
    audience:
      "Quem precisa divulgar uma oferta, serviço, evento ou campanha com um objetivo específico.",
    example: ["Oferta principal", "Benefícios e dúvidas", "Formulário ou WhatsApp"],
    prepare:
      "Descrição da oferta, público, ação desejada e materiais disponíveis. Provas e depoimentos só entram quando forem reais e autorizados.",
    extras:
      "Investimento em anúncios, gestão de campanhas, ferramentas externas e manutenção são avaliados separadamente na proposta.",
  },
  "lojas-virtuais": {
    audience: "Negócios que precisam organizar produtos e receber pedidos pela internet.",
    example: ["Catálogo", "Página do produto", "Carrinho e pedido"],
    prepare:
      "Produtos, fotos, preços, variações e regras de entrega. Também precisamos entender como os pedidos serão atendidos.",
    extras:
      "Meios de pagamento, frete, plataformas e integrações dependem de avaliação. Taxas de terceiros e manutenção são detalhadas na proposta.",
  },
  "sistemas-sob-medida": {
    audience:
      "Equipes com processos específicos que não estão bem atendidos pelas ferramentas atuais.",
    example: ["Entrada de informação", "Fluxo da equipe", "Consulta e acompanhamento"],
    prepare:
      "Um exemplo da rotina, quem participa, onde surgem dificuldades e quais ferramentas são usadas. Não é necessário trazer uma especificação técnica.",
    extras:
      "Migração de dados, integrações, infraestrutura, suporte e novas funcionalidades são avaliados conforme o escopo e a continuidade contratada.",
  },
} as const;
