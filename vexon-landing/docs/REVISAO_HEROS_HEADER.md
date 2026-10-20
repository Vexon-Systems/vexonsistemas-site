# Revisão de heros e cabeçalho — 20/10/2026

## Altura

A primeira tela combina o cabeçalho de 72 px com a hero. O mínimo da hero é `calc(100svh - var(--site-header-height))`, com fallback em vh. Isso substitui a altura de 100vh integral usada anteriormente, que acrescentava mais 72 px à primeira tela. Se fonte ampliada ou altura muito baixa exigirem mais espaço, a seção pode crescer para preservar o conteúdo.

A classe `viewport-hero` aplica a mesma regra à home, Sobre, Contato, Projetos, quatro soluções, três projetos e duas páginas legais.

## Imagens

Todas essas páginas possuem fundo ilustrativo, com fonte vertical para celular e horizontal para telas maiores. A seleção por picture/source evita transferir as duas imagens. O componente HeroBackground e os mapas em `src/content/hero-images.ts` centralizam a configuração. A home mantém sua composição própria e os dois fundos existentes.

Os fundos se relacionam a presença digital, planejamento, comércio eletrônico, desenvolvimento de sistemas e irrigação. Não representam equipe, clientes ou implantações reais. São identificados como ilustrativos. Prompts e arquivos em `public/assets/heroes/README.md`.

A hero de Contato foi separada da área de canais e formulário, acessível por link interno. As soluções passaram a usar imagem de fundo em vez de mockups vetoriais ao lado do texto.

## Cabeçalho e seleção

Cabeçalho opaco com altura estável, navegação centralizada, ações com área de toque e submenu mais legível. Estados ativo, aberto e hover usam o mesmo vermelho; foco por teclado tem contorno vermelho. Foi removida a classe incorreta que fazia Início usar traço branco. Seleção de texto também usa vermelho e branco, inclusive nas páginas claras.

A navegação móvel mantém sua organização, serviços expansíveis e rodapé fixo. Os detalhes vermelhos da seção de contato da home foram preservados.

## Verificação

Testes de navegador cobrem as 13 páginas em 320 × 700, 390 × 844, 768 × 900 e 1440 × 900. Verificam altura conjunta, ausência de overflow, título visível e imagem carregada. Também cobrem navegação por teclado no submenu e consistência dos estados de seleção.
