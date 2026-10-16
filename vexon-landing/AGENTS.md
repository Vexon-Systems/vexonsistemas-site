# AGENTS.md — Site Institucional da Vexon

## Missão

Implementar e manter o site institucional multipágina da Vexon com conversão, identidade própria, acessibilidade, desempenho, SEO e fidelidade ao conteúdo.

## Fontes de verdade

1. `docs/Conteudo_Site_Vexon.md`
2. `docs/DESIGN_SYSTEM_VEXON.md`
3. `docs/design-ux-ui-checklist.md`
4. este arquivo
5. código existente
6. prompt atual

Em caso de conflito, não inventar uma solução silenciosamente: registrar a divergência e pedir direção quando ela alterar conteúdo, promessa, escopo ou dados públicos.

## Stack atual

- Next.js App Router, React e TypeScript estrito.
- Tailwind CSS, shadcn/ui adaptado e Magic UI apenas em usos pontuais de Bento Grid e mockups.
- Plus Jakarta Sans e Inter.
- Lucide React e Motion para interações e animações necessárias.
- React Hook Form e Zod para formulário e validação.
- Resend para entrega de e-mails, Cloudflare Turnstile para verificação e Cloudflare Web Analytics para visitas; eventos de conversão via CustomEvent e Zaraz quando configurado.
- Playwright para testes E2E.

Não instalar dependências sem justificar a necessidade e verificar se a capacidade já existe no projeto.

## Direção visual

Conceito: **Precisão em movimento**. Editorial tecnológico como linguagem principal; Swiss Design como estrutura; neo-industrial em projetos; Bento Grid apenas pontualmente; diagonais e trajetórias derivadas da seta; vermelho como ação.

### Regras contra aparência genérica

- Não usar Bento em todas as seções.
- Não transformar tudo em cards.
- Não repetir universalmente `ícone + título + parágrafo`.
- Não usar blobs, glow, partículas, glassmorphism dominante ou dashboards fictícios.
- Não copiar o visual padrão do shadcn.
- Não usar imagens genéricas quando houver mockup ou foto real disponível.
- Não depender exclusivamente de hover para informar ou permitir uma ação.

Antes de cada nova seção, identificar função comercial, elemento proprietário, justificativa da composição e comportamento mobile.

## Implementação

- Usar Server Components por padrão; Client Components apenas para formulário, menu, Motion ou interação necessária.
- Manter conteúdo estruturado em `src/content` e configuração pública em `src/config/site.ts`.
- Reutilizar componentes compartilhados antes de duplicar CTA, Hero, navegação ou padrões visuais.
- Usar tokens e classes existentes do sistema antes de criar valores ad hoc.
- Preservar ordem semântica em Bento Grids e um único `h1` por página.
- Não modificar logos fornecidas; usar versões temporárias apenas quando identificadas como pendência.
- Não inventar clientes, métricas, depoimentos, resultados, integrações ou estágio de projeto.
- Preservar o estágio real dos projetos em `src/content/projects.ts`.

## Formulário e entrega de contato

O formulário não usa Formspree. O fluxo atual é:

1. `ContactForm` valida os campos com React Hook Form e Zod.
2. Cloudflare Turnstile fornece o token de verificação no cliente.
3. `POST /api/contact` valida novamente os dados, honeypot e limite de taxa.
4. A Pages Function verifica o token Turnstile no servidor e envia a mensagem pelo Resend.
5. O formulário apresenta loading, sucesso, erro ou problema de configuração; limpa os campos somente após sucesso.
6. Eventos válidos de início e envio são emitidos como `vexon:conversion` e encaminhados ao Zaraz quando configurado.

Variáveis obrigatórias em produção:

```bash
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Nunca expor `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` ou outros segredos no cliente.

## Motion e acessibilidade

- Aplicar Motion somente quando ele reforçar hierarquia, transição ou feedback.
- Respeitar `prefers-reduced-motion`; nenhuma animação pode ser obrigatória para entendimento ou ação.
- Manter foco visível, teclado funcional, landmarks irmãos (`header`, `main`, `footer`) e contraste WCAG AA.

## Pendências conhecidas de conteúdo

- Substituir fotos temporárias de equipe por fotos reais da Vexon.
- Publicar descrições definitivas dos projetos.
- Adicionar a logo da Telemetria de Pivôs.
- Confirmar telefone público e todos os canais externos antes do lançamento.

## Processo de trabalho

1. Ler documentos e código relevante.
2. Identificar objetivo comercial e restrições do conteúdo.
3. Definir semântica e composição mobile-first.
4. Implementar com tokens e componentes existentes.
5. Adicionar interação ou Motion somente depois da estrutura estável.
6. Verificar acessibilidade, responsividade e ausência de overflow horizontal.
7. Executar validações pertinentes.
8. Relatar decisões, validações realmente executadas e pendências reais.

## Validação

Executar conforme o escopo da alteração:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run test` executa a suíte E2E do Playwright; não declarar sucesso de qualquer validação sem executá-la.

## Checklist de entrega

- [ ] TypeScript e lint sem erros
- [ ] Testes E2E executados quando aplicáveis
- [ ] Build concluído
- [ ] Sem overflow horizontal em mobile, tablet e desktop
- [ ] Um `h1` por página; headings e landmarks corretos
- [ ] Foco, teclado e contraste verificados
- [ ] `prefers-reduced-motion` preservado
- [ ] Imagens otimizadas e com `alt`
- [ ] Formulário com feedback e proteção ativa
- [ ] Metadata, sitemap e robots atualizados quando rotas mudarem
- [ ] Nenhum conteúdo, prova social ou resultado inventado
- [ ] Nenhuma dependência desnecessária

## Resposta do agente

Informar alterações, decisões, rotas ou arquivos afetados, validações realmente executadas e pendências que dependam de conteúdo, imagens, credenciais ou aprovação humana.

## Hospedagem atual

Cloudflare Pages com `output: "export"`, saída `out/` e Functions em `functions/api/contact.ts`. A lógica compartilhada fica em `src/lib/contact/handle-contact.ts`. Não recriar a API em `src/app/api`. Seguir `docs/CLOUDFLARE_PAGES.md`. `npm run preview:pages` serve o site completo no Wrangler; `next dev` serve apenas a interface.
