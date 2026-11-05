# DOCUMENTO-MESTRE · FinEdu

Última atualização: 04/11/2026, noite (Claude Code: modo apresentação, com as decisões do líder da mesma noite: público, conteúdo novo e o endereço novo do site). Antes: 04/11, fim da tarde (ajustes antes da apresentação: contraste, avatar na saudação e seta da faixa da unidade), 04/11, tarde (Parte 4, onboarding), 04/11, manhã (push das Partes 1, 2 e 3), 04/11, madrugada (Parte 3: missão do dia), 04/11 (Parte 2: correções do design aprovadas pelo líder), 03/11, noite (conversa de planejamento, com a varredura e as decisões novas) e Parte 1 (conferência com o código). Descreve o código depois do modo apresentação (o design do João com as correções da Parte 2, a missão do dia, o onboarding e o modo apresentação) e o que foi decidido para os próximos dias.

## Visão
Site estilo Duolingo de educação financeira e investimentos.
Nome oficial: FinEdu ("Finanças em Foco" era só o nome provisório).
Escrita do nome: sempre "FinEdu" nos textos (F e E maiúsculos). O "FINEdu" da logo é só arte.
Público: alunos do CETI Dom Severino (Teresina-PI), principalmente do ensino médio (decisão do líder em 04/11, à noite; antes, ensino fundamental e médio).
Projeto de extensão de Engenharia de Computação (Uni-CET).

## Equipe
Fagner (líder), João, Eufy, William, Samuel de Assunção, Samuel Medeiros.
- João (jgcosta350 no GitHub): design. Fez a identidade visual no Figma e aplicou no código em 03/11 (paleta, fontes, lobo, trilha nova e as telas Ligas, Missões, Loja e Mais).
- Eufy (eufyzn no GitHub): fez a Calculadora de Metas (01/11). Proposta de papel: testes no tablet.
- João e Eufy já mandam código para o repositório (os commits deles entraram na main).
- Samuel de Assunção: conteúdo das lições. Os dois Samuels reescrevem as questões da Unidade 1, com supervisão da equipe.
- O líder distribui as tarefas entre a equipe de propósito, em vez de fazer tudo com IA.

## Ferramentas e onde mora cada coisa
- Código: Claude Code, trabalhando na pasta finedu do computador do líder, com Git, e enviando para o repositório oficial: github.com/FagnerFilho/FinEdu (público; até 01/11 se chamava FinEduu). Site: https://fagnerfilho.github.io/FinEdu/
- Em 04/11 o líder trocou o nome da conta do GitHub, de Fagneraposo para FagnerFilho. O endereço antigo do repositório (github.com/Fagneraposo/FinEdu) ainda redireciona para o novo, mas o site antigo (https://fagneraposo.github.io/FinEdu/) dá 404.
- Commits com o e-mail privado do GitHub (noreply), para o e-mail do líder não aparecer no repositório público.
- Planejamento, conteúdo e decisões: Projeto "FineEdu" no Claude.
- Este documento-mestre e o arquitetura.md ficam dentro do código, na pasta projeto/. A versão oficial é a do código. Quando o planejamento decide coisas novas, ele grava versões novas dos documentos direto no GitHub, com o OK do líder (a primeira vez foi em 03/11). O Claude Code puxa com `git pull`, confere com o código, corrige o documento onde ele estiver errado e avisa o líder.
- O Claude Code lê as regras do CLAUDE.md, na raiz da pasta finedu.
- Não refazer a versão 1 do zero: tudo entra por cima do código que já funciona.

### Combinado de Git (03/11)
- A branch main é o que vai para o site e para a apresentação: precisa estar sempre funcionando.
- Quem não é o líder (João, Eufy, Samuels) trabalha numa branch própria e abre um Pull Request. Só o líder junta na main. (Em 01/11 e 03/11, a calculadora e o design entraram direto na main; deu certo, mas um erro ali derruba o site da apresentação.)
- O líder, com o Claude Code, faz commit na main ao fim de cada parte que funciona. Push só depois de testar e com o OK do líder. Nunca `--force`.
- Antes de começar qualquer tarefa: `git pull`, porque a equipe também manda código.
- Experimentos de design: branch `experimento-design`.

## Regras do jogo
- Lição = 5 questões (2 fáceis, 2 médias, 1 difícil), sempre mostradas do fácil para o difícil.
- As alternativas aparecem embaralhadas. Cada alternativa tem a sua explicação (o porquê).
- No erro, o feedback mostra por que a escolhida está errada e por que a certa está certa.
- Concluir uma lição desbloqueia a próxima da mesma trilha. Lição concluída pode ser refeita, como treino.
- Cada unidade tem um baú, que libera quando todas as lições da unidade estão concluídas. (No design do João, o baú fica no meio do caminho, antes da última lição, e o troféu fecha a unidade.)
- Gamificação: XP e níveis, moedas, vidas, sequência de dias, aquecimento (duplo para quem errou muito), revisão das erradas, recarga e treino, painel "Como funciona" nos contadores (seção Gamificação). Desde a Parte 3 (04/11): missão do dia (seção Missão do dia).
- Primeira vez no app: onboarding com apelido, avatar e o tutorial "Como usar o FinEdu" (seção Onboarding, feito na Parte 4). O aviso de boas-vindas saiu.
- Modo apresentação (04/11, noite): um interruptor em Mais libera todas as lições, para a equipe mostrar o app sem refazer as lições. Só muda a liberação; o resto do jogo continua igual (seção Modo apresentação).

## Mascote e logo
- A Estrela foi removida (decisão da equipe em 31/10) e saiu do código no design do João (03/11): não existe mais `desenharEstrela`.
- O lobo do João é a logo: aparece na barra de cima e no menu lateral (símbolo `#i-logo` no index.html). Por enquanto não é personagem nas telas (não fala e não tem expressões).
- Cuidado na apresentação: a ideia original do lobo "remete ao lobo de Wall Street". O filme conta a história de um corretor condenado por fraude, o contrário do que o app ensina. Melhor apresentar o lobo como esperto, estratégico e que anda em grupo (planeja junto), sem citar o filme.
- O código morto da Estrela (`dicaDoDia()`, `dicasDaEstrela`, `falaDaEstrela` e `desenharDica()`) saiu na Parte 2 (04/11).
- Outras sobras, sem relação com a Estrela (achadas na Parte 1): `simularRendimento()` no jogo.js (nenhuma tela usa, ainda no código). A `TELAS_EM_BREVE` (com a entrada `calculadora` que sobrou) e o `desenharEmBreve()` saíram na Parte 4, quando o #guia virou o tutorial.
- A ideia da raposa foi descartada antes.

## Identidade visual (aplicada pelo João em 03/11, com as correções da Parte 2 em 04/11)
- Só modo escuro.
- Cores (variáveis no topo do css/estilo.css): fundo #1B1F3C (preto fosco), cartões #21264A, texto #E4E9E7 (branco azulado), texto secundário #A3AAC9, destaque #343BDA (roxo) e #4B53F5 (roxo claro), acerto #3CC977, erro #F05454, sequência #E5821A. Desde a Parte 2: roxo claro de texto #A5A9F5 (`--cor-destaque-texto`, só em texto: item ativo do menu, aba ativa da calculadora, selos e o link "Ver"; o #4B53F5 continua em borda, barra e ícone) e vidas #F05454 (era #DC2E2E).
- Cada unidade tem uma cor: 1 roxo #343BDA, 2 laranja #CA5726, 3 verde #21965B.
- Fontes: Fredoka nos títulos e Figtree no texto (Baloo 2 fica de reserva). Todas salvas em css/fontes/, funcionam sem internet, cada uma com a sua licença OFL. A da Fredoka (css/fontes/OFL-Fredoka.txt) entrou na Parte 2, copiada do repositório oficial (google/fonts).
- Logo: lobo + "FINEdu".
- Trilha: lições como discos com relevo e estrela de 5 pontas (era de 6 até a Parte 2), troféu no fim de cada unidade e faixa colorida da unidade. Unidade sem lições aparece como um cartão compacto "Em breve", com uma bolinha na cor dela.
- Contraste (mínimo 4,5 para texto, 3 para ícone e texto grande), medido em 03/11 e refeito na Parte 2 (04/11):
  - Texto #E4E9E7 sobre o fundo: 13,1. Ótimo.
  - Texto secundário #A3AAC9 sobre o fundo: 7,0; sobre o cartão: 6,4. Bom.
  - Corrigido na Parte 2 com o roxo claro de texto (#A5A9F5): item ativo do menu (era 2,45, agora 6,07), aba ativa da calculadora (2,26 → 5,62), selo "Em breve" e "Em andamento" (2,4 a 2,6 → 5,90 a 6,42) e link "Ver" (2,95 → 7,34). O #8A8FF2 também foi medido, mas falhava na aba da calculadora (4,27) e no selo dentro do cartão (4,48).
  - Corrigido na Parte 2: rótulo "Unidade N" com 100% de opacidade e 19px em negrito, que já conta como texto grande: 6,15 no roxo, 3,49 no laranja e 3,07 no verde (antes, com 78% de opacidade e 16px: 4,34, 2,69 e 2,44). Hoje só a Unidade 1 tem a faixa colorida; as outras aparecem como cartão "Em breve".
  - Corrigido na Parte 2: número das vidas com o vermelho #F05454 (era #DC2E2E: 3,42 sobre o fundo; agora 4,67).
  - Corrigidos em 04/11 (ajustes antes da apresentação, aprovados pelo líder), medidos na tela de verdade, contra o fundo onde cada texto aparece:
    - etiqueta "Aquecimento" na lição: roxo claro de texto #A5A9F5, como na Parte 2 (2,95 → 7,34);
    - legenda "Do seu bolso" no Simular futuro: o mesmo roxo claro (2,95 → 7,34; ela fica sobre o fundo, não sobre o cartão, como estava anotado); a barra continua no #4B53F5;
    - botão vermelho ("Continuar" depois de um erro e "Reiniciar progresso" na confirmação) e a letra da alternativa errada (achado novo, o mesmo problema): texto escuro #11152B, como no botão verde (2,80 → 5,23);
    - "Sair da lição" e "Sair do treino" na janela (vermelho sobre o cartão: 4,23): nenhum vermelho do estilo.css passa de 4,5 sobre o cartão, então ficou no cinza claro dos botões discretos, #A3AAC9, como "Cancelar" e "Pular" (6,35). O "Voltar para a trilha" da tela sem vidas continua vermelho: fica sobre o fundo e passa (4,67).
  - Correção do que estava anotado: o "Reiniciar progresso" com contorno, em Mais, fica sobre o fundo e não sobre o cartão: tem 4,67 e já passava. Os títulos vermelhos grandes ("Ops, essa não" e "Reiniciar todo o progresso?", 4,37) são texto grande: o mínimo para eles é 3.
  - O "FINEdu" da logo (2,13) é logo, e a regra de contraste não vale para logo.
  - Interruptor do modo apresentação (04/11, noite; mínimo 3, como ícone): desligado, contorno e bolinha com 7,0 contra o fundo; ligado, contorno com 7,34 contra o fundo e bolinha com 4,44 sobre o trilho (13,08 contra o fundo). O contorno do ligado usa o roxo claro de texto (#A5A9F5), porque o trilho roxo #4B53F5 sozinho tem 2,95 contra o fundo. O selo "Modo apresentação" é igual ao "Em breve" (6,42). Tem teste no grupo "Contraste".
  - Correção do que a Parte 1 anotou: o "Em breve" pequeno embaixo do título da unidade nunca aparecia (as Unidades 2 e 3 já têm o título "Em breve"), e o código dele saiu na Parte 2.
- Princípios visuais (continuam valendo):
  - A "sombra sólida" só aparece no que é tocável; informação parada usa borda.
  - Movimento só para responder ao toque, mais a comemoração do fim da lição.
  - Sem gradiente, sem efeito de vidro, sem fontes manjadas (Inter, Nunito, Poppins), sem emoji como ícone.
- Maiúsculas: o design usava rótulos em MAIÚSCULAS (itens do menu, "UNIDADE 1", "VER" no cartão da missão). Na Parte 2 (04/11) viraram letra normal ("Aprender", "Unidade 1", "Ver"), como pede a regra 13 do arquitetura.md, criada para fugir da "cara de site feito por IA". O "FINEdu" da logo continua: é arte.
- Regra de 03/11: o design do João não muda sem mostrar antes/depois e ter o OK do líder (que confere com o João).

## Layout
- Uso principal: celular e tablet em pé.
- Menu com 7 itens: Aprender, Calculadora, Ligas, Missões, Loja, Perfil e Mais. Em celular com menos de 560px de largura, só os ícones (o nome fica para o leitor de tela). Num celular de 360px, cada item fica com 47,4 × 52px, 0,6px abaixo dos 48px da regra (medido na Parte 2, sem mudança; diminuir de 8px para 6px o espaço nas laterais do menu resolveria). Em 320px, seriam 41,7px.
- Em pé: barra de cima com a logo e os contadores; menu embaixo.
- Deitado a partir de 768px: menu na lateral.
- Deitado a partir de 1024px: a barra de cima some, e a coluna da direita mostra os contadores e os cartões "Desbloqueie as Ligas!" e "Missão do dia". (Antes do design do João, a coluna aparecia a partir de 1200px.)
- Os contadores são botões: abrem o painel "Como funciona".
- A troca é pela orientação da tela, não só pela largura, porque tablet Samsung em pé tem ~800px.
- Durante a lição, a vitória, o baú, a tela "sem vidas" e o onboarding, os menus somem (modo foco).
- Abaixo de 360px de largura (Parte 4), o círculo do Perfil e do Mais fica em cima do título: em 320px, "Configurações" não cabia ao lado do círculo e empurrava a tela para o lado.
- O botão voltar do Android navega entre as telas (o endereço termina com #aprender, #perfil, #licao...).

## Telas
- Aprender (trilha): faixa colorida da unidade ("Unidade N" e o título), caminho de discos com estrela de 5 pontas (a lição atual ganha um anel em volta), baú no meio do caminho (na Unidade 1, entre a 3ª e a 4ª lição; só abre com as 4 concluídas) e troféu no fim da unidade (com o baú liberado, tocar no troféu também abre o baú). O nome da Trilha 1 e o balão "Começar" saíram no design do João; o nome só aparece na Trilha 2, "Em breve". As Unidades 2 e 3, ainda sem lições, aparecem como cartões compactos "Em breve", como o da Trilha 2 (Parte 2). O botão da faixa que abria "Guia da Unidade · Em breve" saiu na Parte 2, e a seta "←" antes de "Unidade 1" saiu em 04/11 (era só desenho, não levava a lugar nenhum). Desde a Parte 4, quem tem apelido vê "Oi, Duda!" acima da faixa da unidade, com o avatar pequeno ao lado (04/11). Com o modo apresentação ligado (04/11, noite), as lições fora da ordem ficam coloridas, com a estrela e sem o anel (o anel continua só na próxima lição da ordem normal), e o selo "Modo apresentação" aparece à direita do "Oi, Duda!" (sem apelido, sozinho à direita; com um apelido comprido, desce para a linha de baixo).
- Lição: barra com 5 partes (verde quando acerta, vermelha quando erra; a vermelha fica verde quando o aluno acerta na revisão), etiqueta Fácil/Média/Difícil (ou Aquecimento e Revisão, com uma nota dizendo que errar ali não tira vida; no aquecimento duplo, "Aquecimento 1 de 2"), botão Verificar embaixo, feedback com o porquê. No notebook: teclas 1 a 4 (ou A a D), Enter e Esc.
- Vitória: XP, moedas, precisão, sequência e, quando o aluno sobe de nível, o aviso "Subiu para o nível 2: Poupador!" (o baú aberto também mostra). Fim do treino: as vidas que voltaram. Quando a lição (ou o treino) termina a missão do dia, os dois mostram "Missão do dia concluída: +20 XP", antes do aviso de nível (Parte 3).
- Baú aberto, Sem vidas (recarregar com moedas ou treinar de graça) e confirmação ao sair no meio da lição ou do treino.
- Calculadora de Metas (Eufy, 01/11): 3 abas, "Meta na gaveta" (quanto guardar por mês), "Meta com juros" e "Simular futuro" (nomes em letra normal desde a Parte 2). Taxa de exemplo de 0,8% ao mês, editável, com o aviso fixo "Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável." As abas com juros precisam da revisão do professor. Desde a Parte 3, cada conta com resultado conta para a missão do dia; no dia da missão da calculadora, a primeira conta dá +20 XP, com um aviso embaixo.
- Ligas: "Em breve" (decisão de 03/11: fica como está). Mostra o nível e as lições concluídas. Competir de verdade precisa de outros jogadores; a ideia de amigos por QR code fica para depois (o líder conversa com o João). Resposta para a banca: "Em breve. A versão 1 não tem cadastro de propósito (LGPD, público menor de idade); comparar com a turma vem numa próxima versão."
- Missões (desde a Parte 3): o cartão "Missão do dia" com a missão de hoje e o que o aluno já fez hoje (ex.: "Conclua 2 lições" e "1/2" na barra), o selo "Em andamento" ou "Concluída!" e o subtítulo "Todo dia tem uma missão nova, que vale mais 20 XP.". O cartão da coluna da direita mostra o mesmo. Até a Parte 2 mostrava "Ganhe 30 XP" e contava o XP total, não o de hoje (quem tinha 30 XP via a missão concluída para sempre).
- Loja: recarga de vidas por 20 moedas, que só libera com 0 vidas (segue a regra), e o botão "Como funciona".
- Perfil (sem dado pessoal além do apelido opcional): o avatar no círculo (sem avatar, o chapéu do menu), o apelido como título (sem apelido, "Perfil"; o leitor de tela ouve "Perfil de Duda"), o botão "Trocar apelido e avatar" (Parte 4), nível e quanto falta para o próximo, estatísticas e o atalho "Abrir Configurações" (vai para Mais).
- Mais (Configurações): "Reiniciar progresso" com confirmação na tela (que avisa que o apelido e o avatar são apagados), a seção "Apresentação" com o interruptor "Modo apresentação" (04/11, noite), "Como usar o FinEdu" com o botão "Ver tutorial" (Parte 4), "Ver regras" (abre o painel) e Sobre.
- Contadores (barra de cima e coluna da direita): cada um é um botão que abre o painel "Como funciona" (vidas, moedas, XP e nível, sequência). Na parte do XP, uma linha sobre a missão do dia, com a de hoje (Parte 3).
- Onboarding (Parte 4): apelido, avatar e o tutorial "Como usar o FinEdu" (#apelido, #avatar e #guia), na primeira vez e depois de "Reiniciar progresso". O aviso de boas-vindas saiu.

## Onboarding (decidido em 03/11; feito na Parte 4, 04/11)
Ordem: "Como a gente te chama?" → avatar → tutorial "Como usar o FinEdu" → trilha. O líder aprovou o plano, o título novo da etapa 1, o avatar sorteado e os textos revisados (04/11).

- Quando aparece: na primeira vez que o app abre e depois de "Reiniciar progresso". Quem já tinha progresso salvo (os aparelhos da equipe) também passa uma vez, para escolher apelido e avatar; o progresso não muda.
- Telas de foco (sem menu), uma etapa por vez, com o esqueleto da lição: o conteúdo em cima e o botão principal embaixo, ao alcance do polegar. O voltar do Android volta uma etapa; depois do fim, ele não cai de novo no onboarding. Recarregar a página no meio recomeça do apelido. Ninguém fica preso: dá para seguir sem apelido e pular o tutorial.
- Etapa 1, apelido (#apelido): o lobo grande num círculo, "Boas-vindas ao FinEdu!" e o título "Como a gente te chama?" (era "Como devemos te chamar?"; mais o jeito da turma falar), o campo "Apelido (opcional)", até 20 caracteres, e o apoio "Ele fica salvo só neste aparelho."
  - Opcional: com o campo vazio, o app segue sem nome. Não pedimos nome completo nem nenhum outro dado (LGPD, público menor de idade). O campo não sugere nomes salvos no navegador (autocomplete desligado).
  - O apelido fica dentro do progresso, salvo pelo armazenamento.js, e nunca sai do aparelho. Sempre aparece na tela por `escaparHtml()`. Espaço sobrando e caracteres invisíveis saem; o corte em 20 caracteres não quebra acento nem emoji.
  - Enter (ou o botão "Próximo" do teclado do celular) faz o mesmo que "Continuar".
- Etapa 2, avatar (#avatar): "Escolha seu avatar" e "Dá para trocar depois, no Perfil."
  - 6 bichos do Brasil: arara, capivara, tatu, onça, coruja e tamanduá (com a língua de fora, para não parecer uma lâmpada). Sem lobo, para não confundir com a logo.
  - Desenhos provisórios, feitos pelo Claude Code no estilo dos ícones do menu: cabeça de frente, formas chapadas, detalhes no azul-escuro do fundo, só cores que já existem no app (`<symbol>` no index.html). O João pode trocar os desenhos sem mexer no resto do código.
  - Grade de 3 colunas; o marcado fica como a alternativa marcada da lição (borda e fundo roxos), com um check no canto, para a escolha não depender só da cor. São botões de opção de verdade: as setas do teclado trocam, e o leitor de tela fala o nome e se está marcado.
  - Um já vem marcado: sorteado, para a turma não sair toda com o mesmo bicho ("Continuar" sempre funciona).
- Etapa 3, tutorial "Como usar o FinEdu" (#guia): 5 cartões, um por vez, com a barra de 5 partes e a contagem ("2 de 5") em cima, "Pular" no canto, a figura (ícones do app), o título e o texto, e "Voltar" (a partir do cartão 2) e "Próximo" embaixo. As setas ← e → também trocam de cartão.
  - Textos (revisados com a skill de UX copy; os números vêm das constantes do jogo.js):
    1. A trilha: "Cada lição concluída libera a próxima. No fim da unidade, tem um baú com prêmio."
    2. A lição: "São 5 questões, do fácil ao difícil. Errou? Você vê o porquê, e a questão volta no fim para você consertar."
    3. Vidas e moedas: "Você começa com 5 vidas e uma mesada de 20 moedas. Errar uma questão nova tira 1 vida. Sem vidas? Recarregue com 20 moedas da sua reserva ou treine de graça uma lição que você já fez."
    4. XP e missão do dia: "Cada acerto de primeira vale 10 XP, e o XP sobe o seu nível. Todo dia tem uma missão nova, que vale mais 20 XP. Na dúvida, toque nos contadores para ver as regras." Embaixo, os contadores do aluno, como na barra de cima.
    5. Calculadora de Metas: "Quer comprar alguma coisa? A Calculadora de Metas mostra quanto guardar por mês." Botão final "Bora começar", que leva à trilha, e a linha "Para ver de novo, é só abrir Mais."
- Depois do onboarding:
  - Mais tem "Como usar o FinEdu" ("Trilha, lição, vidas, XP e calculadora em 5 cartões.", botão "Ver tutorial"), que abre só o tutorial, com "Fechar" no lugar do "Pular" e "Entendi" no último cartão, e volta para Mais.
  - Perfil mostra o avatar e o apelido e o botão "Trocar apelido e avatar": abre as etapas 1 e 2, com "Cancelar" em cima e "Salvar" no fim (aviso "Apelido e avatar salvos."), e volta para o Perfil. Cancelar (ou o voltar do Android) não salva nada.
  - Saudação "Oi, Duda!" no topo da trilha, acima da faixa da unidade, quando o aluno tem apelido: aprovada pelo líder nos prints com e sem (04/11). Nos ajustes de 04/11, ganhou o avatar pequeno ao lado (círculo de 44px, como o do Perfil), alinhado com a borda do cartão da unidade. Sem apelido, nada aparece; com apelido e sem avatar, só o texto.
- "Reiniciar progresso" apaga também o apelido e o avatar, e o onboarding volta (bom para a apresentação: cada aluno começa do zero). A confirmação diz: "XP, moedas, vidas, sequência e lições voltam ao começo, e o apelido e o avatar são apagados. Não dá para desfazer."
- O aviso de boas-vindas saiu: a mesada é contada no cartão 3, e a dica dos contadores no cartão 4.

## Missão do dia (decidido em 03/11; feita na Parte 3, 04/11)
- Pedido do líder: missões diferentes a cada dia (exemplo dele: "faça duas lições → 30 XP"), sem dar XP demais. O contexto é a apresentação na escola.
- 1 missão por dia, a mesma para todo mundo no mesmo dia, em rodízio pela data, numa lista fixa no jogo.js (`MISSOES`).
- Recompensa: +20 XP (constante `XP_DA_MISSAO`), uma vez por dia, sem moedas. Confirmado pelo líder no plano da Parte 3 (04/11).
- Lista (todas dão para fazer em uns 10 minutos), nesta ordem:
  1. Conclua 1 lição.
  2. Conclua 2 lições.
  3. Acerte 10 questões.
  4. Acerte de primeira todas as questões de uma lição.
  5. Faça uma conta na Calculadora de Metas.
- Rodízio: conta os dias desde 01/11/2026 (`PRIMEIRO_DIA_DAS_MISSOES`) e usa o resto da divisão por 5 como posição na lista. Não precisou mudar a ordem: 11/11 dá resto 0, "Conclua 1 lição". Calendário até a apresentação: 04/11 lição perfeita; 05/11 calculadora; 06/11 1 lição; 07/11 2 lições; 08/11 10 acertos; 09/11 (ensaio) lição perfeita; 10/11 calculadora; **11/11 (apresentação) 1 lição**. Para ensaiar com a missão de 11/11, dá para mudar a data do tablet.
- O treino conta para a missão (senão, quem terminou a Unidade 1 nunca mais cumpre uma). O treino continua sem XP: só a recompensa da missão entra. Acertos contam em qualquer parte (lição nova, revisão, aquecimento e treino).
- Detalhes decididos no código (Parte 3):
  - A lição e o treino só contam quando terminam, como o XP: quem sai no meio não ganha nada, nem para a missão.
  - "Acerte de primeira todas as questões de uma lição" é a "Lição perfeita!" da vitória: as 5 questões novas certas de primeira. O aquecimento não entra nessa conta (errar só ele ainda vale).
  - Na calculadora, conta toda conta com resultado, nas 3 abas (pelo botão ou pelo Enter). Conta com erro de digitação não conta.
- O progresso da missão zera no dia seguinte: campo novo `missao` no progresso, com a data do dia e os números de hoje (lições, acertos, lições perfeitas e contas). Progresso antigo ganha o campo zerado sozinho.
- A recompensa entra quando a missão termina: no fim da lição ou do treino (a vitória mostra "Missão do dia concluída: +20 XP", com o mesmo estilo do aviso de nível; o placar continua com o XP só da lição) ou na hora da conta da calculadora (aviso embaixo, com o mesmo texto). Se ela fizer o aluno subir de nível, o aviso de nível aparece junto.
- Onde aparece: tela Missões e cartão da coluna da direita (os dois com o progresso de hoje: "1/2" na barra, e o leitor de tela ouve "1 de 2 lições"), painel "Como funciona" (na parte do XP: "Todo dia tem uma missão nova, que vale mais 20 XP. A de hoje: conclua 1 lição.") e, na Parte 4, o cartão 4 do tutorial.
- O visual do João ficou igual: só mudaram o texto e os números. Os 5 nomes cabem em até 2 linhas no cartão da coluna da direita, sem mudar a altura dele (medido a 1280 e a 1024px). O único elemento novo é a linha da vitória (prints em `finedu-v1/antes-depois/parte-3`).
- Consertado o erro antigo: o `META_XP_MISSAO_DIARIA` (30, no telas.js) comparava com o XP total. A constante saiu.
- Observação sincera (Parte 3): na prática, "Acerte 10 questões" pede quase o mesmo que "Conclua 2 lições", porque toda lição concluída dá pelo menos 5 acertos (6 com o aquecimento). Não atrapalha; se quiserem mais variedade, dá para trocar depois.
- Por que 20 XP e 1 por dia (simulação dos 3 alunos, Unidade 1 inteira num dia). A linha de 20 XP está confirmada pelos testes, rodando no dia 11/11 ("Conclua 1 lição"): A 255, B 215 (guardando as moedas, 220) e C 200, todos no nível 3. Com a missão, o nível sobe antes: o A chega ao 3 na lição 3 (sem ela, na 4), e o C sobe para o 2 na lição 2 e para o 3 na 4 (sem ela, na 3 e no baú).

  | Opção | XP extra no dia | Aluno A | Aluno B | Aluno C |
  |---|---|---|---|---|
  | Sem missão (antes da Parte 3) | 0 | 235 | 195 | 180 |
  | 1 missão de 20 XP (escolhida) | 20 | 255 | 215 | 200 |
  | 1 missão de 30 XP (o exemplo) | 30 | 265 | 225 | 210 |
  | 3 missões de 20 XP (estilo Duolingo) | 60 | 295 | 255 | 240 |

  - Com 20 XP, os três continuam terminando a unidade no nível 3, e o nível 4 (300 XP) fica para quem volta em outros dias. A missão vale menos que meia lição perfeita (50 XP): é um bônus, e não a fonte principal de XP.
  - Com 3 missões por dia, o aluno A fica a 5 XP do nível 4 no primeiro dia, e a tela de Missões dá mais trabalho para construir.
  - Moedas não: o aluno A já termina a unidade com 100 moedas e quase nada em que gastar.
  - Quem volta todo dia e treina ganha até 20 XP por dia: chega ao nível 4 em uns 3 dias. É o prêmio por voltar, que é o objetivo da missão.

## Modo apresentação (decidido em 04/11, noite; feito na mesma noite)
Decisões do líder (04/11, noite). Elas trocam a ideia de 01/11, que era deixar o app já com as lições 1 e 2 concluídas, 1 vida e 20 moedas.
- O que é: um interruptor para a equipe apresentar o FinEdu sem precisar refazer as lições. Ligado, todas as lições de todas as unidades ficam liberadas: dá para tocar em qualquer uma e fazer quantas vezes quiser.
- Onde fica: visível em Mais, numa seção própria, "Apresentação" (entre "Progresso" e "Como funciona", com a estrela das lições como ícone), com o interruptor "Modo apresentação" e o texto de apoio "Libera todas as lições para mostrar o app.".
  - Como ele fica visível, um aluno também pode ligar. Ele só pula a ordem das lições (não ganha XP nem moedas de graça), e o selo na trilha mostra que está ligado. Aceito para a apresentação.
- Fica salvo no aparelho: continua ligado depois de fechar o site e depois de "Reiniciar progresso" (é uma configuração do aparelho, não do aluno). Só desliga pelo próprio interruptor. Quem salva é o armazenamento.js (regra 3), numa gaveta separada da do progresso.
- Só muda a liberação das lições. Vidas, XP, moedas, missão do dia, revisão e onboarding continuam iguais, e a lição já concluída continua sendo treino. Na prática:
  - a lição feita fora da ordem é lição nova: o erro tira vida, ela dá XP e moedas e conta para a missão;
  - o aquecimento continua vindo da lição anterior da trilha, mesmo que o aluno não tenha feito essa lição;
  - o baú continua pedindo todas as lições da unidade concluídas;
  - desligar o modo não desfaz nada: as lições feitas com ele continuam concluídas, e a regra de sempre volta. Por ela, a lição depois de uma concluída fica liberada: quem fez só a lição 3 vê o anel na lição 1 e na lição 4.
- Unidades e trilhas novas (Unidades 2, 3 e 4 e a Trilha 2) já entram liberadas pelo modo, sem mudar código: a regra olha cada lição. Unidade ainda sem conteúdo continua como o cartão "Em breve".
- Selo na trilha: "Modo apresentação", discreto, no estilo do "Em breve", à direita do "Oi, Duda!", para a equipe saber que o modo está ligado. Visual do João: prints de antes e depois em `finedu-v1/antes-depois/modo-apresentacao/folhas`.
- Interruptor: desligado, só o contorno cinza e a bolinha cinza à esquerda; ligado, o trilho roxo e a bolinha clara à direita (a posição da bolinha mostra o estado sem depender da cor). Ao tocar, aparece o aviso "Modo apresentação ligado." ou "Modo apresentação desligado.". Funciona pelo toque e pelo teclado (Tab até ele, Enter ou espaço), e o leitor de tela ouve o nome, o texto de apoio e se está ligado ou desligado. O disco liberado diz, para o leitor de tela, "Unidade 1, lição 3, Planejamento e orçamento: liberada pelo modo apresentação.".
- Para 11/11: ligar o modo uma vez no tablet e no notebook. Ele fica guardado no navegador e no endereço em que foi ligado: no notebook, abrir pelo arquivo (dois cliques) e pelo link do site são dois lugares diferentes, e cada navegador também guarda o seu. Entre uma apresentação e outra, "Reiniciar progresso" zera o aluno (o onboarding volta) e o modo continua ligado.

## Estrutura do código
- Versão 1 sem back-end. Progresso em localStorage, sempre via js/armazenamento.js. O modo apresentação também fica lá, numa gaveta separada (`finedu-modo-apresentacao`), que o "Reiniciar progresso" não apaga.
- HTML, CSS e JS puro, código próprio escrito do zero na conversa 02 (Antigravity só como referência).
- Estrutura: index.html, css/estilo.css, css/fontes/ (Fredoka, Baloo 2 e Figtree), js/dados-licoes.js, js/armazenamento.js, js/jogo.js, js/telas.js, js/app.js, img/favicon.svg, testes.html, README.md, CLAUDE.md, projeto/documento-mestre.md, projeto/arquitetura.md, projeto/plano-gamificacao.md. (Nenhum arquivo novo nas Partes 3 e 4 nem no modo apresentação.)
- Funciona abrindo o index.html com dois cliques (sem servidor).
- testes.html: testes das regras do jogo e da calculadora no navegador, com dois cliques. Inclui a simulação dos 3 alunos do plano da gamificação (sem e com a missão do dia) e confere os textos do painel, do feedback do erro, da tela Missões, da vitória e do onboarding, o modo apresentação (a liberação, as telas e a gaveta do aparelho, esta com uma gaveta de mentira, sem mexer no que está salvo) e o contraste dos textos corrigidos em 04/11 e do interruptor (com o estilo.css de verdade). 104 testes, todos passando (04/11, noite, modo apresentação).
- O arquitetura.md guarda as regras do código e o passo a passo para criar lições. A versão oficial fica em projeto/arquitetura.md.
- O app confere o dados-licoes.js e mostra um aviso vermelho no topo se algo estiver fora do padrão.
- Depois da apresentação, as regras do arquitetura.md viram uma skill de arquiteto.
- A versão oficial é a finedu-v1 (conversa 02). A versão do Antigravity não é mais usada.

## Apresentação
- Data: 11/11/2026, de manhã.
- Roda num tablet Samsung (Android) e num notebook. Vai ter internet no local.
- No notebook: dois cliques no index.html. No tablet: pelo link do GitHub Pages (abrir o arquivo direto no Android costuma falhar).
- Publicado no GitHub Pages (repositório público, branch main, pasta raiz): https://fagnerfilho.github.io/FinEdu/ (desde 04/11, quando o líder trocou o nome da conta; o https://fagneraposo.github.io/FinEdu/ dá 404, e o link com FinEduu dá 404 desde 01/11).
- Para zerar entre uma apresentação e outra: Mais → Reiniciar progresso (o Perfil também tem o atalho "Abrir Configurações"). O modo apresentação continua ligado.
- Modo apresentação (04/11, noite): em Mais → Apresentação, libera todas as lições para a equipe mostrar o app sem refazer as lições (seção Modo apresentação). Ligar uma vez no tablet e no notebook antes do ensaio.
- Entram na apresentação: Trilha 1 com a Unidade 1, gamificação, Calculadora de Metas (pronta), missão do dia e o onboarding com o tutorial "Como usar o FinEdu". Ficam "Em breve": Ligas, Unidades 2 e 3, Trilha 2.
- Banner impresso (obrigatório), feito pelo João, com QR code para a turma abrir o FinEdu no celular e jogar junto durante a apresentação. Link do QR: https://fagnerfilho.github.io/FinEdu/ (o endereço antigo, fagneraposo, dá 404 desde 04/11: conferir que o QR do João usa o novo). Gráfica leva de 1 a 3 dias: arquivo na gráfica até 06 ou 07/11.
- Instalar como app: se sobrar tempo; senão, depois da apresentação.
- Questionário antes e depois: fora (sem tempo).
- Relatório de extensão: depois da apresentação, no modelo que a faculdade vai enviar.
- Cronograma (atualizado em 03/11):
  - 04/11: Parte 1 (documentos) e Parte 2 (correções do design, com antes/depois).
  - 05/11: Parte 3 (missão do dia). Feita antes, na madrugada de 04/11.
  - 05 e 06/11: Parte 4 (onboarding).
  - 06 ou 07/11: banner na gráfica.
  - 07/11: questões novas da Unidade 1 no código. O modo apresentação foi feito antes, na noite de 04/11.
  - 08/11, noite: planejar a apresentação (slides, quem fala o quê, respostas para a banca).
  - 09/11: teste completo no tablet e ensaio.
  - 10/11: código congelado, só correção de erro.

## Gamificação (tarefa 2 e gamificação 2, 01/11)
Plano, simulação e motivos em projeto/plano-gamificacao.md (a gamificação 2 está na seção 9). Regras do código na seção 6 do arquitetura.md. A missão do dia (03/11) tem seção própria acima.
- Regra de bolso: só perde vida quem erra questão nova; ficou sem vidas, recarrega ou treina.
- Aquecimento: no começo de cada lição (menos a primeira da trilha), 1 questão da lição anterior, de preferência uma que o aluno errou. Quem errou 3 ou mais de primeira na lição anterior faz 2 delas (aquecimento duplo). Não tira vida, não conta na precisão e vale 5 XP cada questão certa.
- Revisão: a errada volta no fim da lição, até o aluno acertar. Errar na revisão não tira vida. Só conclui com todas certas.
- Precisão: só a primeira resposta de cada questão nova.
- XP: +10 por questão nova certa de primeira; +5 por errada consertada na revisão e por questão certa no aquecimento; +20 pela missão do dia, uma vez por dia (Parte 3).
- Níveis por XP: 1 Aprendiz (0 XP), 2 Poupador (75), 3 Planejador (175), 4 Estrategista (300), 5 Investidor (450). Cada nível pede 25 XP a mais que o anterior. Quem faz a Unidade 1 sem errar vira Poupador na lição 2 e Planejador na lição 4 (sem contar a missão do dia; com os 20 XP dela na lição 1, vira Planejador na lição 3). O nível aparece no painel e no Perfil, e um aviso na vitória (e no baú) diz quando o aluno sobe.
- Moedas: +10 por lição concluída, +5 se acertar as 5 de primeira, só na primeira vez que conclui.
- Mesada de boas-vindas: todo aluno começa com 20 moedas, o preço de 1 recarga. "Reiniciar progresso" devolve a mesada.
- Baú: +20 XP e +20 moedas.
- XP e moedas só entram no fim da lição; quem sai no meio não ganha nada.
- 5 vidas. Erro em questão nova tira 1 na hora. Sem vidas, duas saídas:
  - recarregar por 20 moedas (na tela "sem vidas" ou na Loja): as 5 vidas voltam e a lição continua de onde parou;
  - treinar de graça a lição concluída mais recente: no fim, as 5 vidas voltam, e a lição parada recomeça.
- Treino (refazer lição concluída): errar não tira vida, não vale XP nem moedas, e no fim as vidas voltam a 5.
- As vidas também voltam todas no dia seguinte. Sem relógio de vidas.
- Sequência: +1 por dia com pelo menos uma lição (ou treino) concluída; zera se passar um dia sem.
- Os valores são constantes no topo do js/jogo.js.
- As moedas são apresentadas como a "reserva" (liga com a lição de planejamento e orçamento).
- Painel "Como funciona": tocar num contador abre a explicação de vidas, moedas, XP e nível, e sequência, com os números do aluno.
- Feedback do erro: na revisão, no aquecimento e no treino, diz na hora que errar não tirou vida.

## Conteúdo
- Trilha 1 · Unidade 1 "Primeiros Passos" (título provisório; no design do João ficou com P maiúsculo, e a regra de letra normal pediria "Primeiros passos"), 4 lições completas + baú:
  1. "Querer ou precisar?" (escrita na conversa 02, com exemplos de Teresina e do CETI).
  2. "Dinheiro e poupança" (Samuel de Assunção).
  3. "Planejamento e orçamento" (Samuel de Assunção).
  4. "Consumo e dívidas" (Samuel de Assunção).
- Unidades 2 e 3 (a 3 entrou no design do João) e Trilha 2 (investimentos): "Em breve".
- Conteúdo novo (04/11, noite): o planejamento está escrevendo as Unidades 2 e 3 e uma unidade básica de investimentos, que vai ser a Unidade 4 da Trilha 1 (não é a primeira unidade da Trilha 2).
  - Cuidado com a ordem de entrada: fora do modo apresentação, uma lição só libera com a anterior concluída, e uma lição "Em breve" nunca é concluída. Se a Unidade 4 entrar no código antes das Unidades 2 e 3, ela fica trancada para quem não liga o modo. Melhor entrarem juntas (ou decidir antes como liberar).
- Questões novas da Unidade 1: a equipe não aprovou as atuais (01/11). Os dois Samuels reescrevem, seguindo o guia de escrita (5 questões por lição: 2 fáceis, 2 médias, 1 difícil; 4 alternativas; explicação em cada alternativa; situações de adolescente; nada de conta de cabeça; alternativas erradas tentadoras; sem infantilizar). Depois: o planejamento formata, o Claude Code coloca no código (só no dados-licoes.js), e o professor revisa.
- Regra das contas (01/11):
  - A Unidade 1 não tem nenhuma questão de conta. O conceito fica na pergunta, e a conta vai para a explicação.
  - Contas simples só em unidades mais avançadas, e só em questão fácil ou média (número redondo, que dê para fazer de cabeça).
  - A questão difícil é sempre de decisão ("o que faz mais sentido?"), não de cálculo.
  - Motivo: na escola o aluno não tem papel para fazer conta, e educação financeira é sobre decisão, não aritmética. A Calculadora de Metas faz a conta pelo aluno.
- Investimentos: menor de idade investe por meio de um responsável (sempre dizer isso). Nada de taxa real, promessa de rendimento ou nome de banco. Trechos de investimento passam pelo professor (marcas // REVISAR).

## Decisões por conversa

### Conversa 02 · Código da versão 1 (24/10/2026)
- Código da v1 escrito do zero; a pasta finedu_1 (Antigravity) ficou só como referência.
- Fontes salvas no projeto em css/fontes/.
- Menu trocado pela orientação da tela.
- Perfil no lugar de "Configurações", com as configurações dentro.
- Explicação em cada alternativa.
- Regras provisórias de gamificação e navegação por # (voltar do Android).
- Rótulos sem MAIÚSCULAS.
- Fora da v1: "Meta do dia", "Próxima conquista" e o botão Guia no cabeçalho da unidade.
- 47 testes das regras e testes no navegador (celular, tablet em pé e deitado, notebook, zoom 200%). Acessibilidade revisada (WCAG 2.1 AA).

### Conversa de planejamento (31/10 e 01/11)
- Apresentação em 11/11, de manhã.
- Mascote removido. Paleta do João registrada.
- Lições do Samuel adaptadas ao formato do app (2-2-1, explicação em toda alternativa, situações de adolescente) e colocadas no dados-licoes.js.
- Regra das contas: a Unidade 1 fica sem nenhuma conta.

### Tarefa 1 · GitHub e Pages (01/11)
- Repositório oficial no GitHub do líder (Fagneraposo/FinEduu, renomeado para FinEdu no mesmo dia). GitHub Pages na branch main, pasta raiz.
- Testado no celular Android do líder pelo link do Pages: passou. O tablet continua pendente.

### Tarefa 2 · Gamificação (01/11)
- Revisão das erradas, recarga de vidas com moedas, treino que devolve as vidas e aquecimento. Plano em projeto/plano-gamificacao.md, aprovado pelo líder.
- Sem relógio de vidas (o treino resolve o mesmo problema e faz o aluno estudar).
- testes.html criado (38 testes).

### Ajustes depois da tarefa 2 (01/11)
- Questão do celular parcelado: o total entrou na pergunta, para o aluno não fazer 10 × 120 de cabeça.
- Mesada de boas-vindas de 20 moedas (`MESADA_DE_BOAS_VINDAS`), para ninguém ficar sem saída na lição 1.
- Peso das vidas mantido: a vida é "pare e revise", não castigo. Se um dia quiserem mais peso, sobe o `PRECO_DA_RECARGA` (e a mesada junto).
- Moedas sobrando para quem acerta tudo: aceitas até a apresentação. "Moedas que rendem" fica para depois, junto com a Trilha 2.
- Repositório renomeado de FinEduu para FinEdu: o link antigo do site dá 404.

### Gamificação 2 (01/11)
- Aquecimento duplo, painel "Como funciona", níveis por XP (0/75/175/300/450) e aviso de boas-vindas. Mais o feedback do erro que avisa quando errar não tirou vida.
- Simulação refeita: os 3 alunos terminam a Unidade 1 no nível 3 (A 235 XP, B 195, C 180).
- Janelas com `<dialog>` (Esc fecha, foco volta para quem abriu).
- testes.html: 58 testes. Push em 01/11.

### Conversa de planejamento (01/11, madrugada e tarde)
- Repositório antigo "FinEdu" (privado, só com README) renomeado para "FinEdu-antigo", para liberar o nome.
- Calculadora e Guia entram na apresentação; banner com QR code; modo apresentação aprovado; instalar como app se sobrar tempo; questionário fora.
- Equipe aprovou o app ("caminho massa, animações da hora"), mas não as questões: os dois Samuels reescrevem.
- Relato do Eufy (corações "travados"): não era erro; ele errava na revisão. Resolvido com o painel e o feedback da gamificação 2.
- Documento da tarefa da calculadora para o Eufy (claude/tarefa-calculadora-eufy.md, no Projeto).

### Calculadora de Metas (Eufy, 01/11)
- Commits `83cddba` e `baef84f`, direto na main.
- 3 abas: "Meta (Na Gaveta)", "Meta (Com Juros)" e "Simular Futuro". A parte com juros era opcional e entrou.
- Contas no jogo.js (`lerNumeroCalculadora`, `calcularMeta`, `calcularMetaComJuros`, `simularFuturo`), com 9 testes no grupo "Calculadora" do testes.html. `simularRendimento` também está no jogo.js desde a primeira versão, mas nenhuma tela usa e não tem teste.
- Taxa de exemplo de 0,8% ao mês (`TAXA_EXEMPLO_PADRAO`), editável até 20%, com o aviso de simulação e do responsável.
- Diferença do pedido: o prazo aceita até 1.200 meses (`MESES_MAXIMOS_META`, teto de 100 anos), e não de 1 a 36. Fica assim, a não ser que o líder peça o contrário.
- Na Parte 2 (04/11), os nomes das abas viraram letra normal ("Meta na gaveta", "Meta com juros", "Simular futuro"), e os botões e o rótulo do resultado acompanharam ("Calcular com juros", "Simular futuro", "Com juros compostos"). Fora da calculadora, "Recarga de Vidas", na Loja, ainda tem maiúscula no meio.

### Design (João, 03/11)
- Commit `a906e51`, direto na main: paleta, fonte Fredoka, lobo na logo, trilha com discos e troféu, cores por unidade, Unidade 3 vazia, título "Primeiros Passos", menu com 7 itens, telas Ligas, Missões, Loja e Mais, coluna da direita a partir de 1024px. A Estrela saiu.
- Conferido na varredura de 03/11: 67 testes passando, sem erro no console, sem rolagem para o lado no celular.

### Conversa de planejamento (03/11, noite): varredura e decisões
- Varredura do repositório (claude/varredura-03-11.md, no Projeto), com 12 achados.
- Decisões do líder:
  - Ligas fica como está ("Em breve"). Amigos por QR code ficam para depois; o líder conversa com o João.
  - O guia de conteúdo foi descartado pelo João. O Guia vira o tutorial "Como usar o FinEdu", que aparece no onboarding e depois fica em Mais.
  - Onboarding: apelido → avatar → tutorial (seção Onboarding).
  - Missões diferentes a cada dia, sem dar XP demais (seção Missão do dia; recomendação: 1 por dia, +20 XP).
  - O design do João fica. Qualquer mudança visual: antes/depois e OK do líder.
  - Os documentos vêm antes do código: o planejamento atualizou o documento-mestre, o CLAUDE.md, o arquitetura.md e o README e gravou direto no GitHub, para o Claude Code não trabalhar com informação velha.
  - Combinado de Git: colaboradores em branch + Pull Request.
  - Depois: as questões novas dos Samuels.
- Ficaram para a Parte 2 (decididas em 04/11, ver "Parte 2 · Correções do design"): maiúsculas; estrela de 6 pontas nos discos das lições (numa escola pública, pode ser lida como símbolo religioso; uma de 5 pontas evita a dúvida); Unidades 2 e 3 vazias ocupando a maior parte da trilha (proposta: um cartão compacto "Em breve"); nomes das abas da calculadora; limpeza do código morto da Estrela.

### Parte 1 · Conferência dos documentos (Claude Code, 03/11)
- `git pull` trouxe os 4 commits esperados (`83cddba`, `baef84f`, `a906e51` e `8966d2d`). 67 testes passando, nenhum erro no console, nenhuma caixa vermelha.
- Cada afirmação dos documentos sobre o código foi conferida. Corrigido só nos documentos (nenhum código mudou):
  - Trilha: o nome da Trilha 1 e o "Começar" saíram no design do João; o baú fica no meio do caminho, e o troféu no fim.
  - Contraste: o rótulo "UNIDADE N" tem 78% de opacidade, então fica abaixo dos 3,49 e 3,07 (2,69 e 2,44; a Unidade 1 também falha, com 4,34). Mais 4 textos que falham, listados em "Identidade visual".
  - Calculadora: `simularRendimento()` não é usada nem testada; mais nomes com maiúsculas no meio.
  - arquitetura.md: conteúdo com até 660px (era 600px antes do design); regras que o código do João e do Eufy não seguem anotadas como exceção (cores escritas nos ícones do menu, borda de 3px, sombra sólida na faixa da unidade, contadores de 40px abaixo de 360px, textos da calculadora no jogo.js); como o `telas.js` posiciona o baú; detalhes da entrada da calculadora.

### Parte 2 · Correções do design (Claude Code, 04/11)
- Aprovadas pelo líder em 04/11, sem o João: ele vê os prints depois. Prints de antes e depois, no celular em pé (390 × 844) e no tablet deitado (1280 × 800), na pasta `finedu-v1/antes-depois/parte-2`, fora do repositório.
- Aplicadas:
  - 2.1 Roxo claro #A5A9F5, só na cor de texto: item ativo do menu e, pela mesma cor, aba ativa da calculadora (2.13), selo "Em breve" e "Em andamento" (2.11) e link "Ver" (2.12).
  - 2.2 Rótulo "Unidade N" com 100% de opacidade e 19px em negrito (texto grande).
  - 2.3 Licença da Fredoka (`css/fontes/OFL-Fredoka.txt`), copiada do repositório oficial (google/fonts, pasta ofl/fredoka).
  - 2.4 Saiu o botão da faixa da unidade que abria o guia. A rota `#guia` fica para a Parte 4.
  - 2.6 Letra normal no menu, em "Unidade N" e em "Ver".
  - 2.7 Estrela de 5 pontas nos discos das lições (e na estatística de lições do Perfil).
  - 2.8 Unidade sem lições vira um cartão compacto "Em breve", no lugar do caminho de discos vazio.
  - 2.9 Nomes da calculadora em letra normal (abas, botões e o rótulo do resultado).
  - 2.10 Saiu o código morto da Estrela.
  - 2.14 Vidas com o vermelho #F05454.
- Medido (2.5): no celular de 360px, cada item do menu fica com 47,4 × 52px, 0,6px abaixo dos 48px. Sem mudança.
- testes.html: 68 testes. O novo confere que a trilha desenha as unidades sem lições como cartão "Em breve", sem discos e sem botão do guia.
- Ficaram para o líder decidir: os contrastes que ainda falham (etiqueta "Aquecimento", legenda "Do seu bolso", botão vermelho com texto claro e texto vermelho sobre o cartão; corrigidos em 04/11, ver "Ajustes antes da apresentação"), "Recarga de Vidas" na Loja, o menu a 360px e a limpeza de `simularRendimento()` e de `TELAS_EM_BREVE.calculadora`.

### Parte 3 · Missão do dia (Claude Code, 04/11, madrugada)
- Plano mostrado e aprovado pelo líder, com os 20 XP confirmados. O líder deixou o Claude Code codando de madrugada, com autorização para seguir sem parar; o push fica para quando ele pedir.
- O que mudou (detalhes na seção "Missão do dia" e na seção 6 do arquitetura.md):
  - jogo.js: `XP_DA_MISSAO`, `PRIMEIRO_DIA_DAS_MISSOES` e a lista `MISSOES` no topo; seção nova "8. Missão do dia" (`missaoDoDia`, `situacaoDaMissao`, `somarNaMissao`, `registrarContaNaCalculadora`); campo `missao` no progresso, zerado na virada do dia; `concluirLicao()` soma a lição (e o treino) na missão e devolve `missaoConcluida`.
  - telas.js: saiu o `META_XP_MISSAO_DIARIA`; tela Missões e cartão da coluna da direita com a missão de hoje (o mesmo miolo, `desenharCorpoDaMissao()`); linha nova na vitória e no fim do treino; linha no painel; aviso da calculadora.
  - app.js: a conta com resultado na calculadora conta para a missão.
  - estilo.css: a linha da vitória usa as mesmas regras do aviso de nível (`.comemoracao-missao` entrou no seletor de `.comemoracao-nivel`). Nenhum valor novo.
- Textos novos (revisados com a skill de UX copy): subtítulo de Missões e linha do painel "Todo dia tem uma missão nova, que vale mais 20 XP."; no painel, "A de hoje: …" ou "A de hoje você já concluiu."; vitória e calculadora "Missão do dia concluída: +20 XP" (com "Subiu para o nível N: Nome!" quando sobe). O "20 XP" usa um espaço que não quebra a linha, para o "XP" não ficar sozinho na linha de baixo no celular. Os 5 nomes das missões ficaram como na lista.
- Prints de antes e depois em `finedu-v1/antes-depois/parte-3` (com `comparar.html` lado a lado), feitos com `antes-depois/ferramentas/prints-parte-3.ps1`. Para os prints, a data do app foi trocada para dias com a missão certa.
- testes.html: 84 testes (eram 68). Os das regras passaram a rodar em 05/11, um dia de missão da calculadora, para a missão não mudar os números do plano. Grupo novo "Missão do dia" (13 testes) e 3 testes da simulação com a missão em 11/11. Conferido também que os testes novos falham quando a regra é estragada de propósito (recompensa repetida, treino sem contar, missão sem zerar, calculadora sem contar, rodízio sem data, tela olhando o XP total).
- Conferido no navegador (celular em pé e tablet deitado): lição pelos botões, lição com erro (volta na revisão), Reiniciar progresso (as boas-vindas voltam), as 3 abas da calculadora (conta com erro de digitação não conta; pelo Enter conta), aviso com subida de nível, painel e cartões. Sem erro no console e sem rolagem para o lado.
- Para o líder e o João: ver a linha nova da vitória nos prints (3.3 e 3.4) e dizer se fica.
- Push em 04/11, de manhã, com o OK do líder, junto com as Partes 1 e 2.

### Parte 4 · Onboarding (Claude Code, 04/11, tarde)
- Plano mostrado e aprovado pelo líder, com o título "Como a gente te chama?", o avatar sorteado e os textos revisados. Skills usadas: frontend-design (avatares e telas), UX copy (todo texto novo, inclusive os do leitor de tela) e web-design-guidelines (revisão, antes dos prints).
- O que mudou (detalhes na seção "Onboarding" e nas seções 5 a 9 do arquitetura.md):
  - jogo.js: `APELIDO_MAXIMO`, `AVATARES` e `QUESTOES_POR_LICAO` no topo; campos `apelido`, `avatar` e `onboardingFeito` no progresso (saiu o `boasVindasVistas`); `limparApelido`, `avatarPeloId`, `sortearAvatar`, `definirApelido`, `definirAvatar` e `concluirOnboarding`.
  - telas.js: as 3 etapas (`desenharApelido`, `desenharEscolhaDoAvatar`, `desenharTutorial`, com os textos em `cartoesDoTutorial`); Perfil com avatar, apelido e "Trocar apelido e avatar"; Mais com "Como usar o FinEdu"; confirmação do Reiniciar e atalho do Perfil com os textos novos; saudação "Oi, Duda!" na trilha. Saíram o aviso de boas-vindas, `TELAS_EM_BREVE` e `desenharEmBreve()`.
  - app.js: seção nova "7. Onboarding": o caminho das etapas e o voltar do Android (`history.state.etapa`), a troca a partir do Perfil, o tutorial a partir de Mais e o teclado (Enter, setas e Esc).
  - index.html: os 6 avatares (`#i-avatar-...`) e as telas #apelido, #avatar e #guia (de foco). Saíram o `<dialog>` das boas-vindas e o ícone `#i-guia`, que ninguém mais usava.
  - estilo.css: seção nova "13. Onboarding", o botão de texto `.botao-discreto` ("Cancelar", "Pular", "Fechar") e, abaixo de 360px, o círculo do Perfil e do Mais em cima do título. Só variáveis que já existiam, nenhuma cor nova.
- Revisão com a web-design-guidelines (regras baixadas do repositório vercel-labs/web-interface-guidelines em 04/11). Corrigido: o campo do apelido ganhou `name`; botões e campos das etapas sem o zoom de dois toques (`touch-action`); o campo com o foco do teclado não fica escondido atrás da barra de baixo (`scroll-margin-bottom`); títulos dos cartões com `text-wrap: balance`; em 320px, o "Configurações" que empurrava a tela (Mais). Não mudou, porque briga com regra do projeto ou com texto aprovado: "Title Case" em títulos e botões (regra de inglês; o projeto usa letra normal), "Continuar" (a regra pede um nome mais específico, mas o texto foi aprovado) e o aviso antes de sair da troca sem salvar (o "Cancelar" é a saída de propósito). Achado sem mudança, do design do João: os discos da trilha têm 46px de altura, abaixo dos 48px da regra 11.
- Contraste medido (mínimo 3 para ícone e 4,5 para texto): os 6 avatares sobre o círculo, de 3,40 (capivara) a 7,91 (tamanduá); os olhos e as pintas, de 3,75 a 13,08. Os detalhes de dois tons (pele branca da arara, focinho da capivara e da onça, cabeça do tatu) ficam entre 1,77 e 2,80, como os dois tons dos ícones do menu: o nome do bicho está escrito embaixo. O check do avatar marcado tem 4,44; a borda roxa sozinha teria 2,95. Textos novos: de 7,0 a 13,1.
- Conferido no navegador (celular de 390px e de 320px, tablet deitado, notebook): o caminho todo pelo toque e pelo teclado, campo vazio, recarregar no meio, voltar e avançar do navegador, troca com Salvar e com Cancelar, tutorial vindo de Mais, Reiniciar progresso, sem rolagem para o lado e sem erro no console. Mais o checklist da seção 9 (lição com erro e revisão, painel, calculadora e Missões).
- testes.html: 93 testes (eram 84). Saíram os 4 do aviso de boas-vindas; entrou o grupo "Onboarding" (13 testes), que confere, entre outros: progresso novo, reiniciado e antigo; apelido vazio, limpo e cortado; o `<script>` que aparece como texto; avatar fora da lista; as telas das etapas; os números do tutorial (com outros números, o texto muda junto).
- Prints de antes e depois em `finedu-v1/antes-depois/parte-4`, feitos com `antes-depois/ferramentas/prints-parte-4.ps1` (o "antes" de 320px veio de uma cópia do último commit, em `antes-depois/base-parte-4`), e juntos em 6 folhas com legenda em `parte-4/folhas` (`folhas-parte-4.ps1`).
- Aprovado pelo líder em 04/11, pelos prints: as telas novas, o Perfil e o Mais (inclusive o círculo em cima do título abaixo de 360px) e a saudação "Oi, Duda!" na trilha. O João ainda vê os prints depois.

### Ajustes antes da apresentação (Claude Code, 04/11, fim da tarde)
- Pedido do líder: 3 ajustes pequenos, cada um com antes e depois (celular 390 × 844 e tablet deitado 1280 × 800) e só o que ele aprovasse. Ele aprovou os 3. As propostas foram montadas numa cópia fora do repositório (`antes-depois/proposta-ajustes`) e passadas para o código depois do OK, iguais.
- 1. Contraste: os 4 textos que ainda falhavam passaram de 4,5, com cores que já existiam no estilo.css (valores em "Identidade visual"). Entrou junto a letra da alternativa errada, que tinha o mesmo problema do botão vermelho. Não mexeu no tamanho do menu nem nos discos da trilha (pedido do líder).
- 2. Avatar do aluno pequeno ao lado de "Oi, Duda!", na fonte dos títulos, alinhado com o cartão da unidade.
- 3. A seta "←" antes de "Unidade 1" não fazia nada: era só desenho dentro de um parágrafo, sem botão nem link (veio do Figma, imitando o Duolingo, onde ela volta para a lista de seções). Saiu, com o ícone `#i-seta-esquerda`, que ninguém mais usava.
- Arquivos: estilo.css (cores, a saudação com o avatar e o fim do `.unidade-seta`), telas.js (saudação e faixa da unidade), index.html (o ícone da seta) e testes.html.
- testes.html: 96 testes (eram 93). Novos: a saudação com o avatar (e sem apelido, nada), a faixa sem a seta e o contraste dos 5 textos corrigidos, medido com o estilo.css de verdade. Conferido que o teste de contraste falha com as cores antigas (2,95, 2,95, 2,80, 2,80 e 4,23).
- Checklist da seção 9 do arquitetura.md: sem erro no console e sem caixa vermelha; lição com erro (volta na revisão); Reiniciar progresso e o onboarding pelo teclado até a trilha, com o avatar na saudação; painel; as 3 abas da calculadora e o erro de digitação; Missões; celular e tablet pelos prints (os do código de agora saíram iguais aos aprovados); 320px com apelido comprido, sem rolagem para o lado.
- Prints de antes e depois em `finedu-v1/antes-depois/ajustes-04-11` (folhas com legenda em `ajustes-04-11/folhas`), feitos com `antes-depois/ferramentas/prints-ajustes.ps1` e `folhas-ajustes.ps1`.

### Modo apresentação (Claude Code, 04/11, noite)
- Pedido e decisões do líder na mesma noite (item 10 da fila; detalhes na seção "Modo apresentação"). Plano mostrado e aprovado antes do código. Decidido junto: o público passa a ser principalmente o ensino médio; o planejamento está escrevendo as Unidades 2 e 3 e a Unidade 4, básica de investimentos (seção Conteúdo).
- O que mudou (regras do código nas seções 1, 2, 5, 6 e 9 do arquitetura.md):
  - armazenamento.js: gaveta nova, `finedu-modo-apresentacao`, com `carregarModoApresentacao()` e `salvarModoApresentacao(ligado)`. Todas as funções que leem ou gravam ganharam um último parâmetro opcional, `gaveta`, só para os testes usarem uma gaveta de mentira.
  - jogo.js: `situacaoDaLicao()` recebe o modo e, ligado, devolve a situação nova `'liberada'` no lugar de `'bloqueada'`.
  - app.js: `estado.modoApresentacao` (lido quando o app abre); `abrirLicao()` e a trilha usam o modo; a ação `modo-apresentacao` (`alternarModoApresentacao()`) liga ou desliga, salva e mostra o aviso.
  - telas.js: na trilha, o selo e os discos liberados; em Mais, a seção "Apresentação"; `mostrarModoApresentacao()` muda o interruptor no lugar, sem redesenhar a tela (o foco fica nele).
  - estilo.css: o interruptor (`.interruptor`, com as medidas em variáveis novas) e a linha do selo (`.trilha-topo`). Nenhuma cor nova.
- testes.html: 104 testes (eram 96). Grupo novo "Modo apresentação" (7 testes: desligado, ligado, unidades e trilha novas, o resto do jogo igual, a gaveta do aparelho, Mais e trilha) e 1 no grupo "Contraste" (o interruptor). Conferido que eles falham com a regra estragada de propósito: modo ignorado, modo sempre ligado, "Reiniciar" que apaga o modo e o contorno do ligado sem o roxo claro.
- Checklist da seção 9 do arquitetura.md, no navegador: sem erro no console e sem caixa vermelha; com o modo ligado, a lição 3 feita direto, errando uma questão (aquecimento, revisão, 1 vida a menos, +50 XP e +10 moedas); recarregar a página (o modo continua); "Reiniciar progresso" (o onboarding volta e o modo continua); onboarding com o campo vazio, "Pular", voltar, avançar e recarregar no meio; "Trocar apelido e avatar" (Salvar e Cancelar); "Ver tutorial"; o painel e o Esc; as 3 abas da calculadora e o erro de digitação; Missões; o interruptor pelo teclado (Enter e espaço); 320px, também com apelido comprido, sem rolagem para o lado.
- Prints de antes e depois (celular 390 × 844 e tablet 1280 × 800, a tela inteira) em `finedu-v1/antes-depois/modo-apresentacao`, com folhas de legenda em `modo-apresentacao/folhas`, feitos com `antes-depois/ferramentas/prints-modo.ps1` e `folhas-modo.ps1`. Com o modo desligado, a trilha saiu igual ao antes, pixel por pixel.
- Para o líder e o João: ver os prints (a seção nova em Mais, o interruptor, o selo e os discos liberados) e dizer se fica.
- Também em 04/11, à noite: o site e o repositório mudaram de endereço (a conta do líder virou FagnerFilho). Os links foram corrigidos neste documento, no CLAUDE.md e no README (o link do README ficou sem o `#apelido`, que só fazia o app abrir no onboarding).

## Pendências
- Fila até 11/11 (detalhes no CLAUDE.md): Parte 1 (documentos, feita em 03/11), Parte 2 (correções do design, feita em 04/11), Parte 3 (missão do dia, feita em 04/11, de madrugada), Parte 4 (onboarding, feita em 04/11, à tarde), questões novas da Unidade 1, modo apresentação (feito em 04/11, à noite), teste no tablet (09/11) e código congelado (10/11).
- Onboarding: o João vê os prints da Parte 4 (`finedu-v1/antes-depois/parte-4/folhas`), aprovada pelo líder em 04/11, e, se quiser, redesenha os 6 avatares (provisórios).
- Missão do dia: o João vê a linha nova da vitória (prints da Parte 3). No ensaio de 09/11 a missão é a da lição perfeita; para ensaiar com a de 11/11 ("Conclua 1 lição"), mudar a data do tablet. O modo apresentação não mexe na missão (decisão de 04/11, noite).
- Testar no tablet Samsung pelo link do Pages (https://fagnerfilho.github.io/FinEdu/). Nunca foi testado no tablet.
- Trocar os links antigos do site onde eles foram divulgados (o com FinEduu e o https://fagneraposo.github.io/FinEdu/, os dois dão 404): mensagens da equipe, favorito no tablet e, principalmente, o QR code do banner, que precisa usar https://fagnerfilho.github.io/FinEdu/ antes de ir para a gráfica.
- Questões novas da Unidade 1 (Samuels), depois formatadas pelo planejamento.
- Professor: revisar a Unidade 1 (marcas // REVISAR) e as abas com juros da calculadora.
- João: ver os prints da Parte 2 (`finedu-v1/antes-depois/parte-2`), aprovada pelo líder em 04/11, e dizer se quer ajustar algo.
- Acessibilidade: os 4 textos abaixo do contraste mínimo foram corrigidos em 04/11. Ficam o menu com 47,4px a 360px (ver "Parte 2 · Correções do design") e os discos da trilha com 46px de altura (achado na Parte 4), que não entraram nos ajustes de 04/11, a pedido do líder.
- Título final da Unidade 1.
- Banner: texto e QR code (o planejamento pode adiantar), arte do João, gráfica até 06 ou 07/11. Confirmar tamanho e modelo exigidos pela faculdade.
- Modo apresentação (feito em 04/11, à noite): o líder e o João veem os prints (`finedu-v1/antes-depois/modo-apresentacao/folhas`). Antes do ensaio de 09/11, ligar o modo no tablet e no notebook.
- Unidades 2, 3 e 4 (o planejamento está escrevendo): entrar no código juntas, ou decidir antes como liberar a 4 (ver Conteúdo).
- Roteiro da demonstração e da apresentação (08/11): onboarding, uma lição com erro (revisão e vida), missão do dia, nível subindo, calculadora. Respostas para a banca: por que não tem login (LGPD), Ligas "Em breve", o lobo.
- Instruções do Projeto no Claude: trocar as cores da seção DESIGN pela paleta do João, tirar o mascote Estrela, trocar o menu pela regra da orientação e dizer que o Guia é o tutorial "Como usar o FinEdu".
- Depois da apresentação: relatório de extensão; Trilha 2, com as "moedas que rendem"; Unidades 2 e 3; Ligas (amigos por QR code); instalar como app (se não entrar antes); aquecimento ou níveis mais finos, se o uso real pedir; skill de arquiteto.
