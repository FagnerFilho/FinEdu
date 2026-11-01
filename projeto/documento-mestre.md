# DOCUMENTO-MESTRE · FinEdu

## Visão
Site estilo Duolingo de educação financeira e investimentos.
Nome oficial: FinEdu ("Finanças em Foco" era só o nome provisório).
Escrita do nome: sempre "FinEdu" nos textos (F e E maiúsculos). O "FIN" em maiúsculas da logo nova é só arte.
Público inicial: alunos do CETI Dom Severino (Teresina-PI).
Projeto de extensão de Engenharia de Computação (Uni-CET).

## Equipe
Fagner (líder), João, Eufy, William, Samuel de Assunção, Samuel Medeiros.
- João: design (identidade visual, no Figma).
- Samuel de Assunção: conteúdo das lições.
- Eufy: colaborador no repositório do GitHub (o repositório oficial é o do líder).
- O líder distribui as tarefas entre a equipe de propósito, em vez de fazer tudo com IA.

## Ferramentas e onde mora cada coisa (decidido em 01/11)
- Código: Claude Code, trabalhando direto na pasta finedu no computador do líder, com Git, e enviando para o repositório do líder no GitHub, que é o oficial: github.com/Fagneraposo/FinEdu (público; até 01/11 se chamava FinEduu). O Eufy entra como colaborador.
- Commits com o e-mail privado do GitHub (noreply), para o e-mail do líder não aparecer no repositório público. Já configurado no Git da pasta finedu.
- Planejamento, conteúdo e decisões: Projeto "FineEdu" no Claude.
- Este documento-mestre e o arquitetura.md ficam também dentro do código, na pasta projeto/. A versão oficial é a da pasta do código: o Claude Code atualiza ao fim de cada tarefa, e o líder copia para o Contexto do Projeto.
- O Claude Code lê as regras do arquivo CLAUDE.md, na raiz da pasta finedu.
- Experimentos de design numa branch separada ("experimento-design"). A branch main sempre funcionando, porque é ela que vai para o GitHub Pages.
- Não refazer a versão 1 do zero: o design novo entra por cima do código que já funciona.

## Regras do jogo
- Lição = 5 questões (2 fáceis, 2 médias, 1 difícil), sempre mostradas do fácil para o difícil.
- As alternativas aparecem embaralhadas. Cada alternativa tem a sua explicação (o porquê).
- No erro, o feedback mostra por que a escolhida está errada e por que a certa está certa.
- Concluir uma lição desbloqueia a próxima da mesma trilha. Lição concluída pode ser refeita, como treino.
- Cada unidade termina com um baú, que libera quando todas as lições da unidade estão concluídas.
- Gamificação: XP e níveis, moedas, vidas, sequência de dias, aquecimento (duplo para quem errou muito), revisão das erradas, recarga e treino, painel "Como funciona" nos contadores e aviso de boas-vindas (regras na seção Gamificação, decididas na tarefa 2 e na gamificação 2).

## Mascote
- Removido (decisão da equipe em reunião, 31/10): a Estrela não foi aprovada e não há tempo de desenhar outro até a apresentação.
- Tirar do código na conversa de design: a função desenharEstrela e tudo que a usa (balão na trilha, vitória, sem vidas, Perfil). A "Dica da Estrela" vira "Dica do dia" e o campo falaDaEstrela das lições deixa de ser usado.
- A ideia da raposa também foi descartada antes.

## Identidade visual
- Feita pelo João (31/10). Entra no código na conversa de design, perto do fim, junto com a parte mais interativa.
- Paleta do designer:
  - Roxo claro #444ADE
  - Roxo #343BDA
  - Preto fosco #1B1F3C
  - Branco azulado #E4E9E7
- Só modo escuro (prioridade). Fundo provável: preto fosco #1B1F3C (confirmar com o João).
- Contraste medido (mínimo 4,5 para texto, 3 para ícone):
  - Branco azulado sobre preto fosco: 13,1. Ótimo para texto.
  - Branco azulado sobre roxo claro: 5,2; sobre roxo: 6,2. Botão roxo com texto claro funciona.
  - Roxo claro sobre preto fosco: 2,5; roxo: 2,1. Não serve para texto nem ícone no fundo escuro.
  - Para texto e ícone roxo no fundo escuro, falta um roxo mais claro (proposta: #8A8FF2, contraste 5,6). Precisa da aprovação do João.
  - Ainda faltam: cor dos cartões e bordas, texto secundário, lição bloqueada, verde e vermelho, todos conferidos sobre o preto fosco.
- Logo nova: estrela + "FINEdu" ("FIN" escuro e "Edu" claro sobre roxo). No fundo escuro, usar a versão clara (como a estrela clara sobre preto fosco). Logo não precisa seguir regra de contraste.
- Fontes: duas fontes arredondadas escolhidas pelo João; faltam os nomes e os arquivos (.woff2), para salvar em css/fontes/ e funcionar sem internet.
- Visual "mais vivo" sem 3D de verdade (exigiria biblioteca externa e pesa no tablet): profundidade com sombra sólida, botões que afundam, comemoração no fim da lição e trilha com relevo.
- Princípios visuais (continuam valendo):
  - A "sombra sólida" só aparece no que é tocável; informação parada usa borda.
  - Rótulos em letra normal, sem MAIÚSCULAS.
  - Movimento só para responder ao toque, mais a comemoração do fim da lição.
  - Sem gradiente (a paleta é roxa: gradiente roxo/azul é justamente a "cara de IA" a evitar).
- Visual atual do código (provisório, até a conversa de design): fundo #121F25, texto #D0D5D9, destaque #5B8DEF, fontes Baloo 2 e Figtree.

## Layout
- Uso principal: celular e tablet em pé.
- Menu: Aprender, Calculadora, Guia, Perfil.
- Em pé: barra de cima com a logo e os contadores; menu embaixo.
- Deitado a partir de 768px: menu na lateral.
- Deitado a partir de 1200px: também a coluna da direita, com os contadores e a dica do dia.
- A troca é pela orientação da tela, não só pela largura, porque tablet Samsung em pé tem ~800px.
- Durante a lição, a vitória e o baú, os menus somem (modo foco).
- O botão voltar do Android navega entre as telas (o endereço termina com #aprender, #perfil, #licao...).

## Telas da versão 1
- Aprender (trilha): nome da trilha, cartão da unidade, caminho curvo de bolinhas, "Começar" na lição atual, Estrela com balão, baú no fim.
- Lição: barra com 5 partes (verde quando acerta, vermelha quando erra; a vermelha fica verde quando o aluno acerta na revisão), etiqueta Fácil/Média/Difícil (ou Aquecimento e Revisão, com uma nota dizendo que errar ali não tira vida; no aquecimento duplo, "Aquecimento 1 de 2"), botão Verificar embaixo, feedback com o porquê (na revisão, no aquecimento e no treino, o feedback do erro diz que errar ali não tira vida). No notebook: teclas 1 a 4 (ou A a D), Enter e Esc.
- Vitória: XP, moedas, precisão, sequência e, quando o aluno sobe de nível, o aviso "Subiu para o nível 2: Poupador!" (o baú aberto também mostra). Fim do treino: as vidas que voltaram.
- Baú aberto, Sem vidas (recarregar com moedas ou treinar de graça), e confirmação ao sair no meio da lição ou do treino.
- Perfil (sem dado pessoal): nível e quanto falta para o próximo, estatísticas, Configurações ("Reiniciar progresso" com confirmação na tela) e Sobre.
- Contadores (barra de cima e coluna da direita): cada um é um botão que abre o painel "Como funciona" (vidas, moedas, XP e nível, sequência).
- Boas-vindas: aviso na primeira vez que o aluno abre o app (e depois de "Reiniciar progresso"), com a mesada de 20 moedas e a dica de tocar nos contadores.
- Calculadora e Guia: só a tela "Em breve" (vêm na conversa 08).

## Estrutura do código
- Versão 1 sem back-end. Progresso em localStorage, sempre via js/armazenamento.js.
- HTML, CSS e JS puro, código próprio escrito do zero na conversa 02 (Antigravity só como referência).
- Estrutura: index.html, css/estilo.css, css/fontes/, js/dados-licoes.js, js/armazenamento.js, js/jogo.js, js/telas.js, js/app.js, img/favicon.svg, testes.html, README.md, CLAUDE.md, projeto/documento-mestre.md, projeto/arquitetura.md, projeto/plano-gamificacao.md.
- Funciona abrindo o index.html com dois cliques (sem servidor).
- testes.html (tarefa 2): testes das regras do jogo no navegador, com dois cliques. Inclui a simulação dos 3 alunos do plano da gamificação. Desde a gamificação 2, confere também os textos do painel "Como funciona", das boas-vindas e do feedback do erro (telas.js).
- O arquitetura.md (gerado na conversa 02) guarda as regras do código e o passo a passo para criar lições. A versão oficial fica em projeto/arquitetura.md, no código; o Contexto do Projeto tem uma cópia.
- O app confere o dados-licoes.js e mostra um aviso vermelho no topo se algo estiver fora do padrão.
- Depois de 2 ou 3 conversas usando o arquitetura.md, as regras viram uma skill de arquiteto.
- A versão oficial é a finedu-v1 (conversa 02). A versão do Antigravity corrigida antes dela não é mais usada.

## Apresentação
- Data: 11/11/2026, de manhã.
- Cronograma proposto (31/10):
  - 01/11: GitHub + link do Pages + teste no tablet; conteúdo da Unidade 1 pronto.
  - Até 04/11: Samuel e professor revisam o conteúdo.
  - 04 e 05/11: conversa 05 (gamificação). Feita antes, em 01/11.
  - 06 a 08/11: conversa de design (paleta, fontes, sem mascote, profundidade).
  - 09/11: teste completo no tablet e ensaio.
  - 10/11: código congelado, só correção de erro.
- Ficam "Em breve" na apresentação: Trilha 2, Calculadora e Guia.
- Roda num tablet Samsung (Android) e num notebook. Vai ter internet no local.
- No notebook: dois cliques no index.html.
- No tablet: abrir pelo link do GitHub Pages. Abrir o arquivo direto no Android costuma falhar.
- Publicado de graça no GitHub Pages (repositório público, branch main, pasta raiz): https://fagneraposo.github.io/FinEdu/ (o link antigo, com FinEduu, dá 404 desde a troca de nome do repositório, em 01/11)
- Perfil → Configurações → "Reiniciar progresso", para zerar entre uma apresentação e outra.

## Gamificação (tarefa 2 e gamificação 2, 01/11)
Plano, simulação e motivos em projeto/plano-gamificacao.md (a gamificação 2 está na seção 9). Regras do código na seção 6 do arquitetura.md.
- Regra de bolso: só perde vida quem erra questão nova; ficou sem vidas, recarrega ou treina.
- Aquecimento: no começo de cada lição (menos a primeira da trilha), 1 questão da lição anterior, de preferência uma que o aluno errou. Quem errou 3 ou mais de primeira na lição anterior faz 2 delas (aquecimento duplo, gamificação 2). Não tira vida, não conta na precisão e vale 5 XP cada questão certa.
- Revisão: a errada volta no fim da lição, até o aluno acertar. Errar na revisão não tira vida. Só conclui com todas certas.
- Precisão: só a primeira resposta de cada questão nova.
- XP: +10 por questão nova certa de primeira; +5 por errada consertada na revisão e por questão certa no aquecimento.
- Níveis por XP (gamificação 2): 1 Aprendiz (0 XP), 2 Poupador (75), 3 Planejador (175), 4 Estrategista (300), 5 Investidor (450). Cada nível pede 25 XP a mais que o anterior. Quem faz a Unidade 1 sem errar vira Poupador na lição 2 e Planejador na lição 4. O nível aparece no painel e no Perfil, e um aviso na vitória (e no baú) diz quando o aluno sobe.
- Moedas: +10 por lição concluída, +5 se acertar as 5 de primeira, só na primeira vez que conclui.
- Mesada de boas-vindas: todo aluno começa com 20 moedas, o preço de 1 recarga. Assim, quem erra as 5 questões da lição 1 (e ainda não tem lição para treinar) não fica sem saída. "Reiniciar progresso" devolve a mesada.
- Baú: +20 XP e +20 moedas.
- XP e moedas só entram no fim da lição; quem sai no meio não ganha nada.
- 5 vidas. Erro em questão nova tira 1 na hora. Sem vidas, duas saídas:
  - recarregar por 20 moedas: as 5 vidas voltam e a lição continua de onde parou;
  - treinar de graça a lição concluída mais recente: no fim, as 5 vidas voltam, e a lição parada recomeça.
- Treino (refazer lição concluída): errar não tira vida, não vale XP nem moedas, e no fim as vidas voltam a 5.
- As vidas também voltam todas no dia seguinte. Sem relógio de vidas.
- Sequência: +1 por dia com pelo menos uma lição (ou treino) concluída; zera se passar um dia sem.
- Os valores são constantes no topo do js/jogo.js.
- Na tela "sem vidas", as moedas são apresentadas como a "reserva" (liga com a lição de planejamento e orçamento).
- Painel "Como funciona" (gamificação 2): tocar num contador (barra de cima ou coluna da direita) abre a explicação de vidas, moedas (a reserva), XP e nível, e sequência, com os números do aluno. Só explica: a recarga continua só na tela "sem vidas".
- Feedback do erro (gamificação 2): na revisão, no aquecimento e no treino, diz na hora que errar não tirou vida.
- Boas-vindas (gamificação 2): na primeira vez (e depois de "Reiniciar progresso"), um aviso diz que o aluno ganhou uma mesada de 20 moedas, a reserva para quando as vidas acabarem, e que tocando nos contadores ele entende vidas, moedas e XP. Aparece uma vez só, numa tela do menu (nunca no meio da lição). Quem já tinha progresso salvo antes não vê.

## Conteúdo
- Trilha 1 · Unidade 1 "Primeiros passos" (título provisório), 4 lições completas + baú:
  1. "Querer ou precisar?" (escrita na conversa 02, com exemplos de Teresina e do CETI).
  2. "Dinheiro e poupança" (Samuel de Assunção).
  3. "Planejamento e orçamento" (Samuel de Assunção).
  4. "Consumo e dívidas" (Samuel de Assunção).
- Regra das contas (decidida em 01/11 e endurecida no mesmo dia):
  - A Unidade 1 não tem nenhuma questão de conta. O conceito fica na pergunta, e a conta vai para a explicação.
  - Contas simples só em unidades mais avançadas, e só em questão fácil ou média (número redondo, que dê para fazer de cabeça).
  - A questão difícil é sempre de decisão ("o que faz mais sentido?"), não de cálculo.
  - Motivo: na escola o aluno não tem papel para fazer conta, e educação financeira é sobre decisão, não aritmética.
- As 3 lições do Samuel foram adaptadas ao formato do app em 01/11:
  - O PDF dele tinha 3 fáceis, 1 média e 1 difícil por lição. Viraram 2-2-1.
  - Toda alternativa ganhou explicação. Exemplos infantis (brinquedo, "nasce nas árvores") viraram situações de adolescente.
  - Pela regra das contas: a questão da bicicleta do Pedro e a da reserva da família viraram decisões; o celular parcelado foi para média; a do valor mínimo da fatura virou a difícil, como situação; entrou uma questão de "pague-se primeiro"; saiu a questão sobre necessidade (repetida da lição 1).
  - A difícil de "Querer ou precisar?" também perdeu a conta.
  - Com a regra nova (Unidade 1 sem conta), a da capinha da Ana, a da regra 50-30-20 e a do celular parcelado viraram perguntas de conceito; as contas ficaram só nas explicações. O dados-licoes.js novo foi conferido em 01/11: o app abre sem caixa vermelha e sem erro no console.
  - A do celular ainda pedia 10 × 120 de cabeça. Ainda em 01/11, o total entrou na pergunta ("R$ 1.000 à vista ou R$ 1.200 em 10 parcelas de R$ 120").
  - O líder revisa as adaptações (01/11), no lugar do Samuel. Falta o professor revisar (marcas // REVISAR no arquivo).
- Unidade 2 e Trilha 2 (investimentos): "Em breve" na apresentação.

## Decisões por conversa

### Conversa 02 · Código da versão 1 (24/10/2026)
- Código da v1 escrito do zero; a pasta finedu_1 (Antigravity) ficou só como referência.
- Fontes salvas no projeto em css/fontes/.
- Menu trocado pela orientação da tela.
- Perfil no lugar de "Configurações", com as configurações dentro.
- Explicação em cada alternativa.
- Lições "Em breve" dentro da Unidade 1 (o baú fica trancado até a conversa 06) e Unidade 2 "Em breve".
- Regras provisórias de gamificação e navegação por # (voltar do Android).
- Rótulos sem MAIÚSCULAS. A prévia usava "PARTE 1 · UNIDADE 1"; agora o nome da trilha é título e o cartão diz "Unidade 1".
- Fundo do item ativo do menu mais fraco que na prévia (azul a 10%, não 16%), para o texto azul em cima passar no contraste mínimo. Não aumentar sem conferir o contraste.
- Fora da v1: "Meta do dia", "Próxima conquista" e o botão Guia no cabeçalho da unidade.
- Testes: 47 testes das regras e testes no navegador (celular, tablet em pé e deitado, notebook, zoom 200%). Acessibilidade revisada (WCAG 2.1 AA).

### Conversa de planejamento (31/10 e 01/11)
- Apresentação em 11/11, de manhã; cronograma proposto (ver Apresentação).
- Mascote removido.
- Paleta do João registrada; entra no código na conversa de design.
- Lições do Samuel adaptadas e colocadas no dados-licoes.js: a Unidade 1 tem 4 lições completas e o baú já pode ser aberto.
- Regra das contas: no máximo 1 por lição, só em fácil ou média. Endurecida no mesmo dia: a Unidade 1 fica sem nenhuma conta (ver Conteúdo).

### Tarefa 1 · GitHub e Pages (01/11)
- Repositório oficial no GitHub do líder (Fagneraposo/FinEduu, público), no lugar do repositório do Eufy. O Eufy entra como colaborador.
- GitHub Pages na branch main, pasta raiz: https://fagneraposo.github.io/FinEduu/ (link antigo: com a troca de nome do repositório, virou https://fagneraposo.github.io/FinEdu/)
- Conferido no navegador: o site abre, sem caixa vermelha nem erro no console, e a lição 1 começa.
- Testado no celular Android do líder pelo link do Pages (01/11): passou. O tablet continua pendente.

### Tarefa 2 · Gamificação (01/11, adiantada: estava para 04 e 05/11)
- 4 propostas aprovadas pelo líder: repetir as erradas no fim da lição até acertar todas (a precisão conta só a primeira tentativa); comprar vidas com moedas; suavizar a perda de vidas; aquecimento (1 questão da lição anterior no começo de cada lição, de preferência uma que o aluno errou; não tira vida e não conta na precisão; a primeira lição não tem).
- Plano em projeto/plano-gamificacao.md: tabela de regras, simulação de 3 alunos, opinião e números. Propõe 4 ajustes para as propostas não se atrapalharem (repetição sem perder vida; refazer lição concluída devolve as 5 vidas; a compra devolve as 5 vidas por 20 moedas; XP e moedas só para lição nova).
- O líder aprovou os ajustes e os números. Codado em três partes, um commit cada: revisão das erradas, tela "sem vidas" (recarga e treino) e aquecimento. Regras na seção Gamificação.
- Detalhes decididos na hora de codar: na revisão, as alternativas voltam em outra ordem; acertar o aquecimento tira a questão da lista de erradas; o treino sugerido na tela "sem vidas" é o da lição concluída mais recente.
- Sem relógio de vidas (o treino resolve o mesmo problema e faz o aluno estudar).
- Textos novos escritos com a skill de UX copy: botão "Recarregar vidas por 20 moedas" → aviso "Vidas recarregadas."; "Treinar de graça" → "Treino concluído!"; etiquetas "Aquecimento" e "Revisão".
- testes.html criado: 38 testes das regras, todos passando, incluindo as 3 simulações do plano (dão os mesmos números).
- Conferido no navegador (servidor local): revisão, recarga, treino e aquecimento, celular em pé (375 px) e tablet deitado (1280 × 800), "Reiniciar progresso", sem erro no console.
- Push em 01/11, com o OK do líder. No GitHub Pages, o app abre com o código novo, sem caixa vermelha nem erro no console, e os 38 testes do testes.html passam.

### Ajustes depois da tarefa 2 (01/11)
- Questão do celular parcelado (lição "Consumo e dívidas"): o total entrou na pergunta ("R$ 1.000 à vista ou R$ 1.200 em 10 parcelas de R$ 120"), e o aluno não precisa mais fazer 10 × 120 de cabeça. As explicações das alternativas agora falam dos juros escondidos nas parcelas e de comparar sempre o total. Aprovado pelo líder; o professor confere junto com o resto da Unidade 1.
- Mesada de boas-vindas: todo aluno começa com 20 moedas (constante MESADA_DE_BOAS_VINDAS, no topo do js/jogo.js), para nunca ficar sem saída na lição 1.
  - Avaliada antes de codar: não quebra nenhuma regra nem as conclusões da simulação. Os 3 alunos terminam a unidade na aula, o XP continua na ordem A > B > C, e a escolha "gastar ou guardar" continua.
  - Os números mudaram: A termina com 100 moedas, B com 60 (80 guardando), e o C troca um treino por uma recarga na lição 2 (170 XP em vez de 175, 47 questões em vez de 54). Simulação refeita na seção 4 do plano-gamificacao.md.
  - A tela "sem vidas" já tinha o texto do caso "só a recarga" ("Use sua reserva de moedas para continuar."). O aviso de "Reiniciar progresso" trocou "voltam a zero" por "voltam ao começo", porque as moedas voltam a 20.
  - Quem já tem progresso salvo (como o celular do líder) só ganha a mesada depois de "Reiniciar progresso".
  - testes.html: 40 testes, todos passando (2 novos: a mesada no começo e a lição 1 com as 5 erradas). Conferido no navegador (servidor local, celular em pé): errar as 5 da lição 1 leva à recarga, e a revisão leva ao fim da lição, sem erro no console.
- Peso das vidas: mantido. A vida continua sendo "pare e revise", não castigo: o treino devolve as 5 vidas em uns 2 minutos. Se um dia quiserem mais peso, o ajuste é subir o PRECO_DA_RECARGA, e não diminuir o que o treino devolve. Nesse caso, a mesada sobe junto, para continuar pagando 1 recarga (o testes.html avisa se ela deixar de pagar).
- Moedas sobrando para quem acerta tudo: aceitas até a apresentação. Com a mesada, o aluno A termina a Unidade 1 com 100 moedas e nada em que gastar.
- "Moedas que rendem" (as moedas guardadas rendem um pouco por dia): fica para depois da apresentação. A ideia liga com a Trilha 2 (investimentos) e entra junto com ela.
- Push em 01/11, com o OK do líder: os commits de 807aa52 a cf3bcf9. No GitHub Pages, o app abre com o código novo, sem caixa vermelha nem erro no console, e os 40 testes do testes.html passam.
- O repositório foi renomeado de FinEduu para FinEdu (o GitHub avisou no push). O endereço do repositório antigo redireciona para o novo, mas o do site não: https://fagneraposo.github.io/FinEduu/ dá 404, e o site agora é https://fagneraposo.github.io/FinEdu/.

### Gamificação 2 (01/11, complemento da tarefa 2)
- Pedido do líder, com 4 partes aprovadas: aquecimento duplo, painel "Como funciona", níveis por XP e aviso de boas-vindas. Objetivo: o aluno entender sozinho como o jogo funciona, e quem tem mais dificuldade revisar mais.
- Motivo: o líder e o Eufy não acharam onde usar as moedas, e o Eufy achou que os corações tinham travado (ele errava na revisão, onde errar não tira vida).
- O plano foi mostrado antes de codar (limites e nomes dos níveis, textos, simulação) e aprovado pelo líder, junto com um extra proposto pelo Claude Code: o feedback do erro diz na hora quando errar não tirou vida (revisão, aquecimento e treino), porque a confusão do Eufy aconteceu dentro da lição, onde o painel não aparece.
- Níveis: 0/75/175/300/450 XP (cada nível pede 25 XP a mais). A alternativa 100/200/350/550 foi descartada: o aluno B terminaria a Unidade 1 a 5 XP do nível 3, sem ter como ganhar mais XP na versão 1. Os nomes do líder ficaram (seguem as lições, e o Investidor casa com a Trilha 2). Ponto conhecido: Poupador, Planejador e Investidor são masculinos; nenhum nome neutro ficou tão claro.
- Simulação refeita (seção 4 do plano-gamificacao.md): só o C muda (180 XP em vez de 170, 50 questões em vez de 47). Os 3 alunos terminam a unidade no nível 3: o A e o B sobem na lição 2 e na lição 4; o C, na lição 3 e no baú.
- Detalhes decididos na hora de codar:
  - as 2 questões do aquecimento duplo vêm da mais fácil para a mais difícil, com a etiqueta "Aquecimento 1 de 2";
  - o aviso de nível aparece também no baú aberto (os 20 XP do baú podem fazer subir, que é o caso do C);
  - no Perfil, "Nível 2: Poupador" com dois-pontos, e não com "·" (regra 13 do arquitetura.md);
  - o painel e as boas-vindas usam a janela pronta do navegador (`<dialog>`): o Esc fecha, o Tab não escapa e o foco volta para quem abriu;
  - as boas-vindas ficam salvas como vistas assim que aparecem: o navegador só avisa que a janela fechou no próximo quadro de animação, e no teste esse aviso não chegou;
  - os contadores continuam com o visual de antes (só ganham um fundo ao apertar); a sombra sólida de "tocável" fica para a tarefa de design;
  - quem já tinha progresso salvo (os aparelhos da equipe) não vê as boas-vindas; vê depois de "Reiniciar progresso".
- Textos escritos com a skill de UX copy (seção 9 do plano-gamificacao.md).
- testes.html: 58 testes, todos passando (eram 40). Conferido no navegador (servidor local): celular (375 e 320 px), tablet em pé (800 × 1280) e deitado (1280 × 800), teclado, "Reiniciar progresso", sem caixa vermelha e sem erro no console.
- 4 commits, um por parte, mais o dos documentos. Push em 01/11, com o OK do líder ("Pode fazer o push"): de d224d24 para dc37685, sem --force.
- No GitHub Pages (publicado uns 2 minutos depois do push): os 58 testes do testes.html passam, e o app abre com o código novo (os contadores abrem o painel, e o Esc fecha), sem caixa vermelha nem erro no console. As boas-vindas não apareceram no navegador do Claude, porque ele já tinha um progresso salvo de antes; é a regra funcionando.

## Pendências
- Testar no tablet Samsung pelo link do Pages (https://fagneraposo.github.io/FinEdu/). O celular Android do líder já passou (01/11), ainda no link antigo.
- Trocar o link antigo do site (com FinEduu, agora dá 404) onde ele foi divulgado: Contexto e Instruções do Projeto do Claude, mensagens da equipe, favorito no tablet e QR code, se tiver.
- Trocar o endereço do repositório no Git do computador: git remote set-url origin https://github.com/Fagneraposo/FinEdu.git (o GitHub ainda redireciona o antigo, mas pediu para usar o novo).
- Convidar o Eufy como colaborador no repositório (Settings → Collaborators). Precisa do nome de usuário dele no GitHub.
- Líder revisar as adaptações das lições; professor revisar o conteúdo da Unidade 1.
- João: nomes e arquivos das fontes, logo em SVG (versão clara para fundo escuro), aprovar o roxo mais claro para texto e definir o fundo.
- Título final da Unidade 1.
- Tarefa 2 (gamificação): abrir com dois cliques no notebook (index.html e testes.html) e testar no celular e no tablet pelo link do Pages. O push já foi feito (01/11). "Meta do dia" e conquistas ficam para depois da apresentação.
- Gamificação 2 (push feito em 01/11): testar no celular e no tablet pelo link do Pages: tocar nos contadores, o voltar do Android com o painel aberto, as boas-vindas depois de "Reiniciar progresso" e o aviso de nível na lição 2 sem erro.
- Roteiro da demonstração (ensaio de 09/11). Com a mesada, o aluno tem 20 moedas desde o começo: a recarga aparece na primeira vez que as vidas acabam, até na lição 1. Dá para mostrar também as boas-vindas (logo depois de "Reiniciar progresso"), o painel (tocando num contador) e o nível subindo (lição 2 sem erro).
- Conversa de design: paleta nova, fontes novas, tirar o mascote, profundidade. Incluir as janelas novas (painel e boas-vindas) e decidir se os contadores, que agora são botões, ganham a sombra sólida de "tocável".
- Depois da apresentação: Trilha 2 (conversa 07), com as "moedas que rendem"; Calculadora e Guia (conversa 08); Unidade 2.
- Instruções do Projeto: trocar "Menu embaixo em telas estreitas e na lateral em telas largas" pela regra da orientação (ver Layout), tirar a linha do mascote e trocar as cores da seção DESIGN pela paleta do João.
