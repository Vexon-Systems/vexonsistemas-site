# Landing Page — Vexon Sistemas

Landing page institucional construída com Next.js, TypeScript e Tailwind CSS.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Configurações antes da publicação

1. Copie `.env.example` para `.env.local` e defina o domínio definitivo em `NEXT_PUBLIC_SITE_URL`.
2. Atualize WhatsApp, e-mail, Instagram e LinkedIn em `src/config/site.ts`.
3. Substitua os placeholders do portfólio e da equipe por materiais reais.
4. Conecte o formulário a um serviço de captação de leads.

## Verificação

```bash
npm run lint
npm run build
```
