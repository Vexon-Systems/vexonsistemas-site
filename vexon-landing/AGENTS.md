# AGENTS.md — Site Institucional da Vexon

## Missão

Implementar e manter o site institucional multipágina da Vexon com conversão, identidade própria, acessibilidade, desempenho, SEO e fidelidade ao conteúdo.

## Fontes de verdade

1. `Conteudo_Site_Vexon_v3.md`
2. `DESIGN_SYSTEM_VEXON_v3.md`
3. este arquivo
4. código existente
5. prompt atual

Não invente uma solução silenciosamente em caso de conflito.

## Stack

Next.js App Router, React, TypeScript estrito, Tailwind CSS, shadcn/ui adaptado, Lucide React, Motion somente quando necessário, Plus Jakarta Sans, Inter, React Hook Form, Zod e Formspree.

## Direção visual

Conceito: **Precisão em movimento**. Editorial tecnológico como linguagem principal; Swiss Design como estrutura; neo-industrial em projetos; Bento Grid apenas pontualmente; diagonais e trajetórias derivadas da seta; vermelho como ação.

## Regras contra aparência genérica

- Não usar Bento em todas as seções.
- Não transformar tudo em card.
- Não repetir `ícone + título + parágrafo` universalmente.
- Não usar blobs, glow, partículas, glassmorphism dominante ou dashboards fictícios.
- Não copiar o visual padrão do shadcn.
- Não usar imagens genéricas quando houver mockup ou foto real.

Antes de cada seção, identificar função comercial, elemento proprietário, justificativa da composição e comportamento mobile.

## Implementação

- Server Components por padrão.
- Client Components somente quando necessário.
- Conteúdo em `src/content`.
- Não duplicar textos.
- Usar tokens.
- Preservar ordem semântica em Bento Grids.
- Não depender de hover.
- Não instalar bibliotecas sem justificativa.
- Não modificar a logo.
- Não inventar clientes, métricas, depoimentos ou resultados.
- Preservar o estágio real dos projetos.

## Formspree

Configurar por variável de ambiente, validar com Zod, exibir loading/sucesso/erro, impedir envio duplicado, limpar somente após sucesso e registrar conversão apenas após resposta válida.

## Processo

1. Ler documentos e código relevante.
2. Identificar objetivo comercial.
3. Definir elemento visual proprietário.
4. Planejar semântica.
5. Implementar mobile-first.
6. Aplicar tokens.
7. Adicionar interação depois.
8. Verificar acessibilidade.
9. Executar validações.
10. Relatar decisões e pendências.

## Validação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Não declare sucesso sem executar.

## Checklist

- [ ] TypeScript e lint sem erros
- [ ] Build concluído
- [ ] Sem overflow horizontal
- [ ] Um `h1` por página
- [ ] Headings e landmarks corretos
- [ ] Foco e teclado
- [ ] Contraste WCAG AA
- [ ] `prefers-reduced-motion`
- [ ] Imagens otimizadas e com `alt`
- [ ] Formulário com feedback
- [ ] Metadata por página
- [ ] Nenhum conteúdo inventado
- [ ] Nenhuma dependência desnecessária

## Resposta do agente

Informar alterações, decisões, validações realmente executadas e pendências que dependam de conteúdo, imagens, credenciais ou aprovação humana.
