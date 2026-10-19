# Revisão da página Sobre

A página `/sobre/` acompanha a direção editorial aprovada para a home: tipografia clara, fundos neutros, divisórias finas e vermelho nas ações.

## Composição

- Introdução curta, com título mais direto e link para a origem da Vexon.
- História preservando a formação por quatro estudantes de Análise e Desenvolvimento de Sistemas em Ituiutaba.
- Uma única imagem ilustrativa de planejamento, identificada como tal, em lugar da foto genérica repetida de pessoas.
- Missão e visão em linhas de leitura, sem cartões decorativos.
- Sete princípios em lista numerada, com explicações curtas; sem bento, ícones repetidos ou efeitos de entrada.
- Chamada de contato simples e acesso aos projetos, sem sugerir clientes ou resultados já entregues.

Os textos não alteram a capacidade declarada, a origem ou os estágios dos projetos. A imagem deve ser substituída por fotografia real quando disponível. A imagem de planejamento ocupa agora o fundo da hero e foi retirada da seção de origem para evitar repetição.

Implementação em `src/app/sobre/page.tsx`, estilos restritos a `.about-page` em `src/app/sobre/about.css` e princípios em `src/content/about.ts`. Cabeçalho e rodapé compartilhados mantidos.

Validar lint, TypeScript, build e testes de navegador. A cobertura inclui 320, 390, 768 e 1440 px, link interno da história, identificação da imagem ilustrativa e destino do contato.

## Hero em altura de tela

A hero usa min-height de 100vh, com 100svh nos navegadores compatíveis para respeitar a área visível no celular. O conteúdo pode expandir a seção em telas muito baixas ou com texto ampliado. Fundo ilustrativo de planejamento, com sobreposição escura, imagem otimizada local e carregamento prioritário.
