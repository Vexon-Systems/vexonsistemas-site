# Vexon — site institucional

Next.js, TypeScript e Tailwind CSS com exportação estática para Cloudflare Pages. O contato usa Pages Functions, Turnstile e Resend via HTTP.

## Executar

```bash
npm ci
npm run dev
```

## Build e preview completo

```bash
npm run build
npm run preview:pages
```

O preview Pages roda em http://127.0.0.1:3002. O Next dev serve apenas a interface.

## Verificar

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

Leia [a configuração de publicação e variáveis](docs/CLOUDFLARE_PAGES.md) antes do deploy.
