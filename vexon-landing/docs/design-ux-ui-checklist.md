> Atualização de hospedagem: o fluxo vigente está em `docs/CLOUDFLARE_PAGES.md`. O site é exportado estaticamente; contato em Pages Functions e fontes locais.

# Checklist priorizado de design, UX e UI

Este documento reúne os próximos ganhos de qualidade e conversão identificados para a landing page da Vexon.

## P0 — Antes da publicação

- [ ] Configurar Resend na Vercel (`RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL`) e validar o recebimento dos leads.
- [ ] Criar o widget do Cloudflare Turnstile, configurar `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` na Vercel e validar o formulário em preview.
- [ ] Substituir o espaço reservado da seção “Sobre a Vexon” por uma foto real e atual da equipe.
- [ ] Publicar páginas reais de Política de Privacidade e Termos de Uso; apontar os links do rodapé para elas.
- [ ] Atualizar os endereços de Instagram e LinkedIn em `src/config/site.ts` antes de exibir os links sociais.

## P1 — Conversão e confiança

- [ ] Medir cliques nos CTAs de WhatsApp, abertura do formulário, início de preenchimento e envio concluído para identificar a origem dos leads.
- [ ] Incluir provas de confiança: depoimentos autorizados, logos de clientes e estudos de caso com desafio, solução e resultado.
- [ ] Adicionar imagem Open Graph própria para que os compartilhamentos em WhatsApp, LinkedIn e redes sociais transmitam a marca corretamente.
- [ ] Revisar os projetos publicados periodicamente, diferenciando produtos próprios, MVPs e projetos entregues a clientes.

## P2 — Expansão de conteúdo e produto

- [ ] Criar páginas de detalhes para cada solução, com problema atendido, entregáveis, processo e CTA específico.
- [ ] Criar uma página de portfólio/cases com filtros por segmento e métricas reais dos projetos autorizados.
- [ ] Criar uma página “Sobre a equipe” com trajetória, valores, especialidades e atuação regional.
- [ ] Criar uma área de recursos com artigos curtos sobre presença digital, organização de processos e tecnologia para empresas locais.
- [ ] Avaliar um diagnóstico guiado para qualificar o lead antes do contato e um fluxo de agendamento de conversa para reduzir a troca manual de mensagens.
