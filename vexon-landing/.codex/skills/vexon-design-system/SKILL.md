---
name: vexon-design-system
description: Aplica e revisa o design system, UI e UX da Vexon em páginas Next.js. Use ao criar ou alterar landing pages, subpáginas de serviço, componentes, formulários, CTAs, responsividade, animações ou revisões visuais da Vexon.
---

# Vexon Design System

## Workflow

1. Ler `references/guidelines.md` e os tokens atuais em `src/app/globals.css` antes de propor ou alterar a interface.
2. Preservar a direção “tecnologia próxima”: clareza, contraste, proximidade regional e aparência profissional sem estética genérica de startup.
3. Reutilizar componentes em `src/components/ui` antes de criar novos padrões. Quando houver repetição real, transformar o padrão em componente tipado.
4. Priorizar semântica, navegação por teclado, foco visível, leitura confortável e mobile antes de efeitos visuais.
5. Usar Motion apenas para revelar contexto ou confirmar interação. Respeitar `prefers-reduced-motion` e manter o conteúdo acessível sem animação.
6. Validar desktop, tablet e celular; executar lint, formatação e build após alterações relevantes.

## Limites

- Usar vermelho apenas para ações primárias e informação de destaque.
- Não inventar métricas, depoimentos, cases ou provas sociais.
- Não introduzir gradientes excessivos, glassmorphism, neon, 3D, parallax pesado ou movimento contínuo.
- Não adicionar bibliotecas visuais concorrentes sem uma necessidade específica e revisão do impacto no bundle.

## Referência

Ler `references/guidelines.md` para tokens, padrões de UI e checklist de revisão.
