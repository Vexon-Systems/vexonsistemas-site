> Registro histórico. Resend, Turnstile, SEO estruturado e migração para Pages já foram implementados. Para a configuração atual e pendências reais, consulte `CLOUDFLARE_PAGES.md`.

# Plano de evolução pré-lançamento

## Objetivo

Preparar a landing page da Vexon para receber leads com segurança, medir conversões e chegar ao lançamento com uma base técnica simples de manter.

## Prioridade 1 — Formulário próprio com Resend

Substituir o Formspree por uma rota interna do Next.js que envie os leads pelo Resend.

### Escopo

- Criar `app/api/contact/route.ts` para receber e validar o formulário no servidor.
- Manter a validação atual do formulário no navegador e repetir a validação essencial no servidor.
- Enviar o lead para o e-mail corporativo da Vexon.
- Usar `replyTo` com o e-mail informado pelo potencial cliente.
- Exibir estados claros de envio, sucesso e falha sem sair da página.
- Registrar a conversão somente após o envio confirmado.

### Variáveis de ambiente na Vercel

- `RESEND_API_KEY` — segredo; nunca usar com o prefixo `NEXT_PUBLIC_`.
- `CONTACT_TO_EMAIL` — caixa de entrada que receberá os leads.
- `CONTACT_FROM_EMAIL` — remetente autorizado no domínio da Vexon.

### Critério de aceite

- Um envio válido chega à caixa de entrada configurada.
- O cliente recebe uma mensagem de confirmação, se esta opção for habilitada.
- Erros do provedor não expõem detalhes técnicos ao visitante.
- A chave da API não aparece no código, navegador ou repositório.

## Prioridade 2 — Proteção contra spam

Adicionar Cloudflare Turnstile ao formulário e manter um campo honeypot invisível no servidor.

### Escopo

- Validar o token do Turnstile na rota de contato antes do envio do e-mail.
- Ignorar silenciosamente preenchimentos do honeypot.
- Aplicar limite básico de requisições por IP na rota, caso o volume ou tentativas suspeitas justifiquem.

### Variáveis de ambiente na Vercel

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — chave pública do widget.
- `TURNSTILE_SECRET_KEY` — segredo de validação no servidor.

### Critério de aceite

- O formulário real continua simples para pessoas legítimas.
- Envios automatizados sem token válido não chegam ao e-mail.
- Nenhuma chave secreta é enviada ao navegador.

## Prioridade 3 — Validação em preview

Executar uma rodada de validação no deployment de preview da Vercel antes de promover para produção.

### Checklist

- Formulário válido, inválido e com falha simulada.
- CTA de WhatsApp no cabeçalho, conteúdo e botão flutuante.
- Menu móvel: foco, Escape, fechamento e navegação por teclado.
- FAQ e links internos.
- Páginas de erro e rota inexistente (404).
- Visual em celular e desktop.
- Headers de segurança e ausência de erros no console.

### Critério de aceite

- `npm run lint`, `npm run typecheck` e `npm run build` aprovados.
- Fluxos de contato funcionam em preview com as variáveis da Vercel.
- Não há erro de console reproduzível sem extensões do navegador.

## Prioridade 4 — SEO e mensuração

Melhorar a capacidade de busca e a leitura do funil de conversão.

### Escopo

- Adicionar dados estruturados Schema.org para `ProfessionalService` ou `LocalBusiness`.
- Adicionar Schema.org `FAQPage` somente para perguntas visíveis na página.
- Confirmar `sitemap.xml`, `robots.txt`, canonical e imagem Open Graph no domínio final.
- Acompanhar os eventos existentes: clique em WhatsApp, CTA principal, abertura de solução e formulário enviado.

### Critério de aceite

- Dados estruturados passam no validador do Google.
- Metadados usam a URL final HTTPS do site.
- Há uma rotina definida para revisar conversões após o lançamento.

## Prioridade 5 — Animações

Manter a biblioteca `motion` já instalada para as animações atuais. Não adicionar GSAP como segunda biblioteca sem uma necessidade visual específica.

### Possíveis melhorias futuras

- Animar a progressão do Gantt durante a rolagem.
- Aplicar entrada escalonada nos cards de soluções e projetos.
- Criar uma transição editorial discreta no hero.

### Regras

- Respeitar `prefers-reduced-motion`.
- Não atrasar conteúdo, CTA ou interação por causa de animações.
- Medir impacto no desempenho antes de publicar.
- Se uma animação exigir GSAP, migrar aquele componente de `motion` para GSAP em vez de usar as duas bibliotecas para o mesmo efeito.

## Ordem sugerida

1. Resend e validação no servidor.
2. Turnstile e honeypot.
3. Testes em preview e correção de regressões.
4. Schema.org, revisão de SEO e mensuração.
5. Animações adicionais, somente se não prejudicarem a conversão ou a performance.

## Fora de escopo neste momento

- Banco de dados próprio para leads.
- Login, painel administrativo ou CRM próprio.
- Migração completa para GSAP.
- Automação comercial complexa.

Esses itens podem ser avaliados após o lançamento, usando os dados reais de volume de leads e comportamento dos visitantes.
