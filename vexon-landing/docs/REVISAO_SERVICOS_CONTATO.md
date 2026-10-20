# Serviços, contato e orientação de projeto

Alterações anteriores preservadas no commit `c4c7dc4` antes desta implementação.

## Serviços

As quatro páginas agora apresentam público indicado, situações atendidas, um fluxo conceitual de três partes, entregáveis possíveis e materiais necessários. Condições adicionais, prazo e investimento dependem da proposta. O processo foi reduzido a um bloco expansível. Nenhum exemplo representa uma entrega comprovada ou um orçamento automático.

## Contato

WhatsApp e formulário têm prioridade. E-mail, telefone e Instagram são canais secundários. Removido o CTA que levava à própria página. A alternativa pelo WhatsApp inclui os campos preenchidos, sem afirmar que uma solicitação foi enviada. O envio por e-mail mantém validação, Turnstile e Pages Function + Resend; credenciais válidas continuam necessárias.

## Qual solução preciso?

Seletor expansível na seção de soluções da Home. Três perguntas sobre objetivo, situação e prioridade; indicação inicial baseada no objetivo. A recomendação tem justificativa, comparação das opções e caminhos para a página do serviço ou briefing. As escolhas fechadas são levadas por parâmetros de URL; dados pessoais e texto livre não entram na URL de contato.

## Briefing guiado

Três etapas: rotina e solução, objetivo e momento, revisão. As respostas são mantidas em memória ao navegar entre etapas. Sem conta, banco de dados ou salvamento no navegador. O link final abre o WhatsApp com o resumo, e o visitante decide enviá-lo na conversa. Não há envio automático nem orçamento/prazo estimado. A política de privacidade descreve esse comportamento.

Eventos de conclusão do seletor e clique do briefing registram apenas a opção de solução, sem o texto livre ou dados pessoais. Nenhuma dependência foi adicionada. As rotas continuam estáticas para Cloudflare Pages.

## Validação

Testes de navegação cobrem as quatro recomendações, seleção levada ao briefing, preservação ao voltar, validação, mensagem contextual, ausência de falso sucesso e responsividade em 320, 390, 768 e 1440 px. Os testes não enviam mensagens externas reais.

Executados com sucesso: lint, TypeScript, build/exportação para Pages, 8 testes unitários e 28 testes E2E. Revisão visual adicional no navegador local. O recebimento real de e-mail depende da configuração de produção e não foi testado com um envio externo.
