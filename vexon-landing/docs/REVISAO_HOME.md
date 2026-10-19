# Revisão da home — 16/10/2026

A revisão atende ao pedido de uma apresentação mais profissional, simples e menos carregada. Para a home, esta estrutura substitui a composição anterior descrita nos documentos de conteúdo e design. As páginas internas mantêm seus detalhes.

## Estrutura

1. Apresentação: o que a Vexon faz, para quem e como começar.
2. Soluções: quatro necessidades, cada uma com descrição curta e acesso à página correspondente.
3. Projetos: identidades visuais existentes, descrições e estágios reais de desenvolvimento.
4. Processo: três etapas resumidas e continuidade opcional após a entrega.
5. Sobre: origem, equipe e compromissos de trabalho.
6. Dúvidas: seis respostas, também presentes no FAQPage estruturado.
7. Contato: WhatsApp e acesso à página com formulário.

## Direção visual e de experiência

- Tipografia e alinhamento conduzem a leitura, com fundos claros, divisórias finas e vermelho nas ações.
- Foram removidos da home a foto genérica de escritório, as animações de entrada, o cronograma ilustrativo e os blocos repetidos de benefícios, diagnóstico e suporte.
- Soluções usam listas abertas, sem acumular caixas, sombras e ícones decorativos.
- Projetos próprios permanecem identificados como iniciativas em desenvolvimento, sem atribuir clientes, resultados ou funcionalidades já entregues.
- O contato completo fica em `/contato/`, reduzindo o tamanho da home e mantendo uma alternativa ao WhatsApp.
- Layout responsivo, links com área de toque e FAQ acessível por teclado.

## Implementação e verificação

Composição em `src/app/page.tsx`, textos resumidos em `src/content/home.ts` e estilos delimitados pela classe `.home` em `src/app/home.css`. O acordeão ganhou uma variante editorial, preservando as variantes das páginas internas.

Verificar com lint, TypeScript, testes unitários, build estático e testes de navegador contra o export do Cloudflare Pages. A cobertura de responsividade inclui 320, 390, 768 e 1440 px.

## Imagens temporárias — 19/10/2026

A pedido do usuário, a hero passou a combinar texto e um mockup de notebook/celular em duas colunas, com o texto e as ações primeiro no celular. A seção sobre ganhou uma foto ilustrativa de planejamento. Ambas as imagens são geradas, identificadas por legendas e otimizadas em WebP (cerca de 149 KB no total). Os prompts e arquivos estão em `public/assets/home/README.md`. Os estágios dos projetos permanecem preservados.

### Ajuste da hero

A imagem do mockup passou a preencher o fundo da hero, conforme solicitado. O texto e as ações ficam sobre uma camada escura, com enquadramento e sobreposição próprios para mobile. A foto da seção sobre foi mantida.

## Menu responsivo — 19/10/2026

O painel móvel usa uma lista simples de páginas, sem caixas e ícones repetidos. Soluções é um botão expansível com serviços menores e recuados; abre automaticamente quando o usuário está em uma página de serviço. A página atual recebe um traço vermelho discreto.

Cabeçalho e WhatsApp permanecem visíveis, enquanto apenas a navegação rola em telas baixas. Foram mantidos o foco preso no diálogo, fechamento com Escape, retorno do foco ao botão de abrir e fechamento ao navegar. Ao passar para o layout desktop, o diálogo fecha para liberar a página. Os estilos ficam delimitados em `src/components/layout/mobile-menu.css`.

Cobertura adicional de navegador: expansão por teclado, navegação para um serviço, indicação de página ativa e ações visíveis em 320 × 480 px.

## Novo fundo responsivo

O mockup anterior foi substituído por uma cena de trabalho com menos detalhes. Uma versão horizontal atende telas maiores e uma versão vertical preserva espaço de leitura no celular. A seleção acontece por `picture/source`, com carregamento prioritário e apenas o arquivo adequado por dispositivo. Os fundos otimizados pesam aproximadamente 56 KB e 30 KB. Os prompts estão em `public/assets/home/README.md`.

## Altura da hero da home

A hero da home passou a usar min-height de 100vh e 100svh, com conteúdo centralizado verticalmente. Mantém as imagens responsivas e pode crescer se o conteúdo exigir em telas baixas. A altura de tela é verificada nos testes de responsividade existentes.
