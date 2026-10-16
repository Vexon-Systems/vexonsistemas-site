# Publicação no Cloudflare Pages

O site usa Next.js com exportação estática (`out/`). Somente `/api/contact` executa uma Pages Function. Nenhum servidor Next.js, banco de dados ou adaptador de framework é necessário.

## Configuração do projeto

Conecte o repositório pelo Git no Cloudflare Pages:

- Diretório raiz: `vexon-landing` se o repositório incluir a pasta pai; caso contrário, a raiz do repositório.
- Comando de build: `npm run build`.
- Diretório de saída: `out`.
- Node.js: 22.13 ou superior (recomendado: Node 22 LTS atualizado).
- Configuração de Functions: `wrangler.jsonc`, incluído no projeto.

Use integração Git ou Wrangler. O upload manual da pasta `out` pelo painel não publica o código de `functions/`.

## Variáveis públicas de build

Configure em produção e em preview, antes do build:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio HTTPS definitivo para canonical, sitemap e compartilhamento |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública Turnstile; sem ela o envio fica desabilitado e o visitante recebe um link para WhatsApp |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Opcional: page views e desempenho no Cloudflare Web Analytics |

Variáveis `NEXT_PUBLIC_*` são incorporadas ao build: faça novo deploy ao alterá-las.

## Segredos e variáveis de execução da Function

Configure nas variáveis/segredos do Pages, separadamente em produção e preview:

- `RESEND_API_KEY`: segredo do Resend.
- `CONTACT_FROM_EMAIL`: remetente de domínio verificado no Resend.
- `CONTACT_TO_EMAIL`: destinatário real dos contatos.
- `TURNSTILE_SECRET_KEY`: segredo Turnstile.
- `TURNSTILE_HOSTNAMES`: opcional, lista de hostnames exatos separados por vírgula. Sem essa variável, a Function aceita apenas o hostname da própria requisição. Nunca use protocolo ou caminho.

Configure também os hostnames permitidos no widget Turnstile. Use outro widget e destinatário de teste para previews; mantenha previews fora de indexação nas configurações da Cloudflare. Não inclua segredos em `wrangler.jsonc`, Git ou variáveis `NEXT_PUBLIC_*`.

## Desenvolvimento e validação

```bash
npm ci
npm run dev
```

O `next dev` serve a interface. A API não é uma rota Next.js: para testar o fluxo completo no ambiente Pages:

1. Copie `.env.example` para `.env.local` e preencha somente as variáveis públicas necessárias.
2. Copie `.dev.vars.example` para `.dev.vars` e configure os segredos locais. Ambos os arquivos estão ignorados no Git.
3. Execute:

```bash
npm run build
npm run preview:pages
```

Preview completo: `http://127.0.0.1:3002`. O Playwright inicia o mesmo Wrangler automaticamente; encerre um preview manual antes de `npm run test:e2e` para liberar a porta.

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

Os testes da Function simulam os provedores e não enviam e-mails. Antes da publicação definitiva, confirme um recebimento real em preview com credenciais válidas.

## Imagens, fontes e cache

- Fontes WOFF2 locais com licenças OFL; o build não consulta Google Fonts.
- Imagens pré-otimizadas: não há serviço `/_next/image`. Evite JPEGs originais grandes em novas referências.
- Headers de segurança em `public/_headers`; respostas da Function definem seus próprios headers e `Cache-Control: no-store`.
- `public/_routes.json` restringe Functions a `/api/contact`, evitando invocações para páginas e imagens.
- Arquivos com hash de `/_next/static/` usam cache imutável. Imagens com nomes estáveis usam o cache padrão do Pages.

## Analytics e proteção

Cloudflare Web Analytics mede visitas e desempenho; não é um painel de conversões customizadas. O site emite `vexon:conversion` e encaminha eventos a `window.zaraz.track` quando Zaraz está configurado. Configure o destino e o consentimento aplicável no painel; sem integração, eventos customizados não ficam armazenados. Não envie nomes, telefones, e-mails ou mensagens como propriedades de analytics.

A Function verifica formato e tamanho do corpo, origem, honeypot, dados, token Turnstile, hostname e ação `contact`. O limite de 5 tentativas por 10 minutos é uma proteção em memória por instância, não uma cota global. Para uma proteção distribuída, configure regras de rate limiting na Cloudflare conforme o plano. Não há dependência obrigatória de KV ou D1.

## Pendências antes do lançamento

- Confirmar o telefone/WhatsApp público existente; ele foi centralizado, sem inventar ou alterar o número.
- Configurar domínio definitivo, DNS e remetente verificado no Resend.
- Cadastrar segredos e as chaves públicas correspondentes.
- Verificar envio real, links externos, domínio canônico e preview sem indexação.
- Substituir fotos temporárias da equipe quando houver material autorizado.

Referências: [Pages estático com Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/), [headers](https://developers.cloudflare.com/pages/configuration/headers/), [Turnstile no servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## Auditoria de dependências

Next.js e eslint-config-next atualizados para 16.4.1. A auditoria de produção (`npm audit --omit=dev`) não encontrou vulnerabilidades. A auditoria completa ainda aponta 5 alertas altos na cadeia de glob do lint (`braces` → `micromatch` → `fast-glob` → plugin Next → eslint-config-next), sem correção compatível disponível no momento da validação. Não usar `npm audit fix --force`: a solução sugerida regride o lint para Next 14. Essa cadeia não é publicada no site estático nem usada pela Pages Function.
