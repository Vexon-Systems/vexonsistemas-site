> Atualização de hospedagem: o fluxo vigente está em `docs/CLOUDFLARE_PAGES.md`. O site é exportado estaticamente; contato em Pages Functions e fontes locais.

# Design System do Site Institucional — Vexon

> Especificação visual, editorial e de interface do site multipágina da Vexon. Stack: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Motion apenas quando necessário e Pages Functions + Resend.

## 1. Resultado esperado

O site deve transmitir:

- confiança;
- clareza;
- modernidade;
- proximidade;
- organização;
- capacidade de execução.

### Sensação final

> Uma empresa jovem e moderna, mas séria, transparente e capaz de entender negócios reais.

### Evitar

- estética gamer;
- visual genérico de startup de IA;
- excesso de gradientes;
- glassmorphism dominante;
- partículas e efeitos 3D;
- vermelho em grandes áreas;
- linguagem excessivamente técnica;
- promessas sem comprovação.

---

# 2. Princípios de decisão

Em caso de dúvida, seguir esta ordem:

1. Clareza do conteúdo;
2. conversão;
3. acessibilidade;
4. consistência;
5. desempenho;
6. impacto visual;
7. decoração.

## Regras fundamentais

- Um CTA principal por seção;
- textos devem ser escaneáveis;
- componentes semelhantes devem ter comportamento semelhante;
- usar tokens, nunca valores visuais aleatórios;
- mobile não pode ser uma redução improvisada do desktop;
- animações devem apoiar hierarquia ou feedback;
- conteúdo deve permanecer legível sem animações;
- não inventar depoimentos, clientes, números ou resultados.

---

# 3. Direção criativa

## Conceito: Precisão em movimento

A identidade equilibra precisão — grid, alinhamento, hierarquia e estrutura — com movimento — seta, diagonais, trajetórias e transições. A proximidade aparece na linguagem clara, nas fotografias reais e no contexto regional.

## Composição da direção

- **60% editorial tecnológico:** narrativa, tipografia expressiva e assimetria;
- **25% Swiss Design contemporâneo:** grid, legibilidade e disciplina;
- **10% neo-industrial:** projetos, labels, estados e linhas técnicas;
- **5% Bento Grid:** composição pontual de conteúdos diferentes.

Os percentuais são orientação, não métricas rígidas.

## Bento Grid

É ferramenta de composição, não o estilo dominante. Usar principalmente em soluções, projetos, diferenciais e composição institucional.

Regras:

- poucos blocos e hierarquia clara;
- grid assimétrico;
- misturar texto, mockup, fotografia e CTA;
- não transformar todo conteúdo em card;
- não repetir cards idênticos;
- preservar ordem semântica no DOM;
- empilhar corretamente no mobile.

## Linguagem proprietária

A seta representa direção e transformação. A diagonal pode aparecer em recortes, máscaras, divisores, linhas, fundos de mockups e microinterações. A trajetória conecta etapas e conduz a uma ação. O “X” pode representar relações como Negócio × Tecnologia, usado pontualmente.

## Antiestética de IA

Evitar blobs, gradientes abstratos, glassmorphism dominante, dashboards fictícios, partículas, glow, elementos flutuantes contínuos, excesso de cards, ícones em caixas em todas as seções e frases vagas sobre inovação.

Antes de implementar uma seção, responder: qual a função comercial, qual elemento da identidade aparece e por que o layout pertence à Vexon?

---

# 4. Arquitetura visual do site

| Seção | Direção | Composição |
|---|---|---|
| Navbar | Escura e precisa | Logo, links e CTA |
| Hero | Editorial | Título forte + mockups conectados |
| Problema | Assimétrico | Texto + lista visual |
| Soluções | Bento editorial | Blocos com pesos diferentes |
| Diagnóstico | Minimalista escuro | Mensagem curta + CTA |
| Processo | Swiss direcional | Etapas conectadas por trajetória |
| Diferenciais | Editorial modular | Poucos blocos |
| Projetos | Neo-industrial | Mockups, labels e status |
| Sobre | Editorial humano | Foto real + propósito |
| Continuidade | Funcional | Lista compacta |
| FAQ | Neutro | Accordion |
| CTA final | Minimalista | Mensagem e ação |
| Contato | Claro | Formulário + canais |
| Rodapé | Escuro | Navegação e legal |

As páginas de solução compartilham tokens e estrutura, mas podem ter composição própria. As páginas de projeto usam linguagem neo-industrial com moderação e transparência sobre o estágio.

---

# 5. Tokens

## 4.1 Cores

```css
:root {
  --brand-50: #fef2f2;
  --brand-100: #fee2e2;
  --brand-200: #fecaca;
  --brand-500: #d92d2a;
  --brand-600: #b71f1e;
  --brand-700: #991b1b;
  --brand-800: #7f1d1d;

  --neutral-0: #ffffff;
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
  --neutral-950: #09090b;

  --success-600: #15803d;
  --warning-600: #a16207;
  --danger-600: #b91c1c;

  --surface-page: var(--neutral-0);
  --surface-subtle: var(--neutral-50);
  --surface-muted: var(--neutral-100);
  --surface-dark: var(--neutral-950);
  --surface-dark-elevated: var(--neutral-900);

  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-600);
  --text-muted: var(--neutral-500);
  --text-on-dark: var(--neutral-0);
  --text-on-dark-secondary: var(--neutral-300);

  --border-light: var(--neutral-200);
  --border-dark: rgba(255, 255, 255, 0.12);
  --focus-ring: rgba(183, 31, 30, 0.28);
  --brand-angle: -28deg;
}
```

### Uso do vermelho

Usar em:

- CTA principal;
- foco;
- links ativos;
- ícones estratégicos;
- badges;
- indicadores;
- detalhes derivados da seta da marca.

Não usar como fundo dominante de seções.

## 4.2 Tipografia

```css
--font-display: "Plus Jakarta Sans", sans-serif;
--font-body: "Inter", sans-serif;
```

- Plus Jakarta Sans: títulos, números, chamadas editoriais e nomes de projetos;
- Inter: corpo, botões, formulários, navegação, labels e metadados.

### Pesos recomendados

**Plus Jakarta Sans:** 500 em títulos pequenos, 600 em cards, 700 em seções e 800 no Hero.

**Inter:** 400 no corpo, 500 em navegação e labels, 600 em botões e 700 apenas pontualmente. Importar somente os pesos usados.

### Escala fluida

```css
--text-display: clamp(2.75rem, 5vw, 4.5rem);
--text-h1: clamp(2.5rem, 4.5vw, 4rem);
--text-h2: clamp(2rem, 3vw, 3rem);
--text-h3: clamp(1.5rem, 2vw, 2rem);
--text-h4: 1.25rem;
--text-lg: 1.125rem;
--text-base: 1rem;
--text-sm: 0.875rem;
--text-xs: 0.75rem;
```

### Largura de leitura

- Títulos do Hero: máximo de 14 a 17 palavras por linha visual;
- títulos de seção: `max-width: 760px`;
- parágrafos: `max-width: 680px`;
- texto corrido: 55 a 75 caracteres por linha.

## 4.3 Espaçamento

Escala:

```ts
const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  30: "7.5rem",
};
```

Seções:

- desktop: 96–120px;
- tablet: 72–96px;
- mobile: 56–72px.

## 4.4 Containers

```css
--container-content: 1200px;
--container-wide: 1360px;
--page-gutter-mobile: 20px;
--page-gutter-tablet: 24px;
--page-gutter-desktop: 40px;
```

## 4.5 Raios

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-xl: 20px;
--radius-full: 999px;
```

- botão/input: 10px;
- card: 14px;
- mockup/portfólio: 20px;
- badge: completo.

## 4.6 Sombras

```css
--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);
--shadow-md: 0 12px 32px rgb(0 0 0 / 0.10);
--shadow-lg: 0 28px 80px rgb(0 0 0 / 0.16);
```

Priorizar bordas. Usar sombras maiores somente em mockups, menu flutuante e elementos elevados.

## 4.7 Movimento

```css
--duration-fast: 160ms;
--duration-default: 220ms;
--duration-entry: 480ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

Permitido:

- fade e deslocamento de até 24px;
- stagger curto;
- hover com elevação máxima de 4px;
- movimento discreto de setas;
- revelação da linha do processo;
- leve movimento de mockups.

Obrigatório:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 6. Componentes

## 5.1 `Container`

Variantes:

- `content`;
- `wide`.

Responsabilidade:

- largura máxima;
- padding lateral responsivo;
- centralização.

## 5.2 `Section`

Props sugeridas:

```ts
type SectionProps = {
  id?: string;
  theme?: "light" | "muted" | "dark";
  spacing?: "default" | "compact";
  children: React.ReactNode;
};
```

## 5.3 `SectionHeader`

Estrutura:

- eyebrow;
- título;
- descrição opcional;
- alinhamento `left` ou `center`.

Não permitir que cada seção invente seu próprio padrão de cabeçalho.

## 5.4 `Button`

Variantes:

- `primary`;
- `secondaryLight`;
- `secondaryDark`;
- `ghost`;
- `text`.

Tamanhos:

- `md`: 48px;
- `lg`: 52px.

Estados obrigatórios:

- default;
- hover;
- focus-visible;
- active;
- disabled;
- loading.

## 5.5 `ServiceCard`

Conteúdo:

- ícone;
- título;
- descrição;
- até cinco benefícios;
- CTA.

Regras:

- todos os cards do grid com altura coerente;
- CTA alinhado ao rodapé;
- sem parágrafos longos;
- ícones Lucide com mesma espessura.

## 5.6 `ProjectCard`

Conteúdo:

- mockup;
- categoria;
- status;
- nome;
- descrição curta;
- destaques;
- CTA.

Status possíveis:

```ts
type ProjectStatus =
  | "Em desenvolvimento"
  | "Em planejamento e validação"
  | "MVP em validação técnica";
```

Não alterar o status para parecer mais avançado.

## 5.7 `ProcessStep`

Conteúdo:

- número;
- título;
- descrição;
- conector visual.

No mobile, apresentar como lista vertical.

## 5.8 `FeatureItem`

Usar em problema, diferenciais e continuidade.

Estrutura:

- ícone opcional;
- título;
- descrição curta.

## 5.9 `Accordion`

- usar botão semântico;
- informar `aria-expanded`;
- área clicável mínima de 44px;
- navegação por teclado;
- animação curta, sem prejudicar `prefers-reduced-motion`.

## 5.10 `ContactForm`

Campos:

- nome;
- empresa;
- WhatsApp;
- e-mail;
- solução;
- mensagem;
- consentimento quando necessário.

Estados:

- idle;
- submitting;
- success;
- validation error;
- server error.

## Componentes de identidade

### `BentoGrid`

Define grid responsivo e spans semânticos, sem aplicar automaticamente visual de card.

### `DirectionalCard`

Card opcional com recorte discreto, linha direcional ou CTA com seta. Não usar em todos os blocos.

### `ProjectShowcase`

Composição maior que um card, reunindo mockup, categoria, status, resumo, destaques e link. Deve aceitar variações.

### `ProcessPath`

Trajetória entre etapas: horizontal ou ascendente no desktop, vertical no mobile, legível sem animação e decorativa com `aria-hidden`.

---

# 7. Direção por seção

## Hero

- grid de 12 colunas;
- texto ocupa 6 ou 7 colunas;
- mockups ocupam 5 ou 6;
- título com alta presença;
- CTA principal visível sem rolagem em telas comuns;
- fundo escuro;
- detalhes vermelhos discretos;
- não usar vídeo automático.

## Problema

- layout assimétrico;
- mensagem principal de um lado;
- lista de situações do outro;
- usar check, alerta ou seta como ícones funcionais;
- evitar seis cards grandes.

## Soluções

- quatro cards;
- 2×2 em desktop, salvo se houver espaço suficiente para quatro colunas legíveis;
- duas colunas em tablet;
- uma coluna em mobile.

## Diagnóstico

- bloco escuro de alto contraste;
- mensagem curta;
- CTA isolado;
- pode usar linha diagonal inspirada na seta da marca.

## Processo

- seis etapas;
- linha horizontal em desktop;
- lista vertical no mobile;
- animação de revelação opcional.

## Projetos

- cards grandes e visuais;
- mockup ocupa mais espaço que o texto;
- badges de categoria e status;
- não representar produtos inacabados como cases de clientes.

## Sobre

- foto real da equipe;
- evitar foto de banco;
- texto direto sobre origem e responsabilidade;
- princípios em lista curta.

## FAQ

- largura máxima de 820px;
- perguntas objetivas;
- apenas uma resposta aberta por vez é opcional, não obrigatória.

## Formulário

- labels sempre visíveis;
- placeholders apenas como exemplo;
- validação próxima ao campo;
- feedback após envio;
- link para privacidade.

---

# 8. Imagens e mockups

## Fotografias

Priorizar:

- equipe real;
- ambientes reais;
- Ituiutaba e região;
- clientes apenas com autorização;
- iluminação natural;
- composição profissional sem parecer artificial.

Evitar:

- aperto de mãos;
- pessoas apontando para telas;
- código no rosto;
- servidores azuis;
- escritórios genéricos;
- imagens de IA com pessoas inconsistentes.

## Mockups

- usar interface real ou protótipo fiel;
- moldura simples de navegador;
- sem dispositivos 3D exagerados;
- não mostrar dados pessoais;
- otimizar com `next/image`;
- definir `width`, `height` e `sizes`;
- usar AVIF ou WebP quando possível.

---

# 9. Acessibilidade

Critérios mínimos:

- contraste WCAG AA;
- foco visível;
- navegação completa por teclado;
- headings em ordem;
- landmarks semânticos;
- `aria-label` em botões apenas com ícone;
- `alt` descritivo em imagens relevantes;
- `alt=""` em elementos decorativos;
- área de toque mínima de 44×44px;
- erros de formulário não dependem apenas de cor;
- mensagens de sucesso e erro anunciadas com `aria-live`;
- formulário com autocomplete apropriado.

---

# 10. Responsividade

## Breakpoints

Usar os padrões do Tailwind:

- `sm`: 640px;
- `md`: 768px;
- `lg`: 1024px;
- `xl`: 1280px;
- `2xl`: 1536px.

## Regras

### Mobile

- abordagem mobile-first;
- uma coluna;
- CTAs principais em largura total quando apropriado;
- menu em drawer;
- mockups simplificados;
- reduzir elementos decorativos;
- nenhum conteúdo depende de hover.

### Tablet

- grids de duas colunas;
- tipografia fluida;
- manter respiro;
- evitar compactar quatro cards em uma linha.

### Desktop

- usar espaço horizontal sem aumentar excessivamente linhas de texto;
- mockups maiores;
- navegação completa;
- grids de duas a quatro colunas conforme legibilidade.

---

# 11. Stack recomendada

- Next.js com App Router;
- TypeScript em modo estrito;
- Tailwind CSS;
- shadcn/ui apenas como base;
- Lucide React;
- Motion para React somente onde necessário;
- React Hook Form;
- Zod;
- Pages Functions + Resend para o formulário inicial;
- `next/font` para Plus Jakarta Sans e Inter;
- `next/image`;
- ferramenta de analytics definida no projeto.

Evitar adicionar bibliotecas para recursos simples que podem ser implementados com CSS ou componentes existentes.

---

# 12. Estrutura sugerida

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── container.tsx
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── problem-section.tsx
│   │   ├── solutions-section.tsx
│   │   ├── diagnosis-section.tsx
│   │   ├── process-section.tsx
│   │   ├── differentials-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── about-section.tsx
│   │   ├── continuity-section.tsx
│   │   ├── faq-section.tsx
│   │   └── contact-section.tsx
│   ├── shared/
│   │   ├── section.tsx
│   │   ├── section-header.tsx
│   │   ├── service-card.tsx
│   │   ├── project-card.tsx
│   │   ├── process-step.tsx
│   │   └── feature-item.tsx
│   └── ui/
├── content/
│   └── landing-page.ts
├── lib/
│   ├── analytics.ts
│   ├── validation.ts
│   └── utils.ts
└── types/
    └── landing-page.ts
```

---

# 13. Conteúdo estruturado

Separar textos dos componentes:

```ts
export const services = [
  {
    id: "site-institucional",
    title: "Site institucional",
    description: "Transforme sua presença digital em confiança.",
    benefits: [
      "Fortalecer a credibilidade",
      "Apresentar serviços",
      "Facilitar o contato",
    ],
    cta: "Criar meu site",
  },
] as const;
```

Benefícios:

- facilita ajustes de copy;
- reduz duplicação;
- melhora testes;
- evita componentes extensos;
- permite futura integração com CMS.

---

# 14. Desempenho

Metas:

- Lighthouse Performance ≥ 90 em produção;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 95;
- LCP ≤ 2,5s;
- CLS ≤ 0,1;
- INP ≤ 200ms.

Regras:

- priorizar imagem principal do Hero;
- lazy loading abaixo da dobra;
- evitar animação em imagens grandes;
- limitar JavaScript no cliente;
- componentes Server por padrão;
- usar Client Components apenas para interação;
- não carregar Motion em todas as seções;
- evitar fontes com pesos desnecessários;
- não usar carrossel automático.

---

# 15. SEO e semântica

- apenas um `h1`;
- cada seção principal com `h2`;
- cards com `h3`;
- usar `Organization` e `LocalBusiness` em JSON-LD quando os dados reais estiverem definidos;
- metadata com título e descrição;
- Open Graph;
- sitemap;
- robots;
- canonical;
- URLs legais;
- textos de links descritivos.

Não inventar endereço, telefone, avaliações ou horário de atendimento no schema.

---

# 16. Critérios de aceite

Uma seção está pronta quando:

- corresponde ao conteúdo aprovado;
- possui objetivo claro;
- funciona de 320px a telas grandes;
- possui foco visível;
- não gera overflow horizontal;
- utiliza tokens;
- possui estados interativos;
- mantém contraste adequado;
- não inventa conteúdo;
- não usa valores soltos sem justificativa;
- respeita redução de movimento;
- não adiciona dependências desnecessárias.

A página está pronta quando:

- todos os links funcionam;
- WhatsApp abre com mensagem contextual;
- formulário valida e envia;
- feedback de envio é exibido;
- eventos de conversão são registrados;
- metadata está configurada;
- imagens estão otimizadas;
- não existem erros no console;
- lint, typecheck e build passam;
- Lighthouse atende às metas;
- navegação por teclado foi testada;
- conteúdo legal mínimo está disponível.


---

# 17. Integração com Pages Functions + Resend

Usar o Pages Functions + Resend como solução inicial de recebimento dos formulários.

Requisitos:

- ID em variável de ambiente;
- React Hook Form e Zod;
- labels visíveis;
- honeypot quando disponível;
- loading, sucesso e erro;
- bloqueio de envio duplicado;
- limpar somente após sucesso;
- `aria-live` para feedback;
- registrar conversão somente após resposta válida.

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=contato@vexonsistemas.com
CONTACT_FROM_EMAIL=Vexon <contato@vexonsistemas.com>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Enviar somente dados necessários e linkar a Política de Privacidade. Considerar backend próprio somente quando houver CRM, persistência, automações ou regras avançadas.
