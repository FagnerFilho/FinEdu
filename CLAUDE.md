# FinEdu · instruções para o Claude Code

Este arquivo é lido no começo de toda sessão. Ele resume o projeto e diz como trabalhar. Os detalhes estão nos dois arquivos importados abaixo: leia os dois antes de qualquer tarefa.

@projeto/documento-mestre.md
@projeto/arquitetura.md

Última atualização: 05/11/2026 (Claude Code, conteúdo novo: Unidades 2 e 3 e Trilha 2, e o nome da Trilha 2 na tela). Antes: 04/11, noite (modo apresentação), 04/11, fim da tarde (ajustes antes da apresentação), 04/11, tarde (Parte 4: onboarding), 04/11, manhã (push das Partes 1, 2 e 3), 04/11, madrugada (Parte 3), 04/11 (Parte 2), 03/11, noite (conversa de planejamento, depois do design do João) e Parte 1 (conferência com o código).

## O projeto

- **FinEdu:** site estilo Duolingo que ensina educação financeira para alunos do CETI Dom Severino (principalmente do ensino médio, desde 04/11; Teresina-PI).
- Projeto de extensão de Engenharia de Computação da Uni-CET. Equipe: Fagner (líder), João (design, jgcosta350 no GitHub), Eufy (calculadora, eufyzn), Samuel de Assunção e Samuel Medeiros (conteúdo) e William.
- **Apresentação: 11/11/2026, de manhã**, num tablet Samsung (Android, pelo link do GitHub Pages) e num notebook.
- **O que já está pronto** (nome da Trilha 2 na tela, 05/11, 108 testes passando):
  - Trilha 1 com as Unidades 1, 2 e 3 completas e a Trilha 2 com a unidade "Começando a investir" (4 lições + baú cada, 16 lições no total), lição com feedback por alternativa, vitória, Perfil, "Reiniciar progresso";
  - conteúdo novo (05/11): Unidade 2 "Dinheiro no mundo real", Unidade 3 "Planejando o futuro" e a Trilha 2, escritas pelo planejamento e aprovadas pelo Fagner, com 17 marcas // REVISAR para o professor até 09/11 (lista na seção "Conteúdo" do documento-mestre). Na tela, a Trilha 2 aparece com o nome "Investimentos" em cima da "Unidade 1" dela, e as unidades contam dentro de cada trilha (aprovado pelo Fagner em 05/11; a cor fica com o João);
  - gamificação: revisão das erradas, aquecimento (duplo para quem erra muito), vidas, recarga e treino, níveis por XP e painel "Como funciona";
  - missão do dia (Parte 3, 04/11): 1 por dia, em rodízio pela data (11/11 é "Conclua 1 lição"), +20 XP uma vez por dia, o treino e a calculadora contam;
  - onboarding (Parte 4, 04/11): apelido (opcional) → avatar (6 bichos, desenhos provisórios) → tutorial "Como usar o FinEdu" (5 cartões) → trilha. Depois, o Perfil mostra apelido e avatar ("Trocar apelido e avatar"), e Mais tem o tutorial. Tomou o lugar do aviso de boas-vindas;
  - ajustes antes da apresentação (04/11, fim da tarde): os 4 textos que falhavam no contraste corrigidos, o avatar pequeno ao lado de "Oi, Duda!" na trilha e a faixa da unidade sem a seta "←" (que não fazia nada);
  - modo apresentação (04/11, noite): interruptor em Mais → Apresentação que libera todas as lições, para a equipe mostrar o app sem refazer as lições. Fica salvo no aparelho, fora do progresso (sobrevive ao "Reiniciar progresso"), mostra o selo "Modo apresentação" na trilha e só muda a liberação: vidas, XP, moedas, missão, revisão e onboarding continuam iguais;
  - Calculadora de Metas com 3 abas (Eufy, 01/11);
  - design do João (03/11) com as correções da Parte 2 (04/11): paleta, fonte Fredoka, lobo na logo, trilha com discos (estrela de 5 pontas), menu com 7 itens em letra normal (Aprender, Calculadora, Ligas, Missões, Loja, Perfil, Mais), unidade sem lições como cartão "Em breve" (as Unidades 2 e 3 ficaram assim até 05/11).
- **Em breve:** Ligas. Na trilha, nada mais está "Em breve" desde 05/11. A unidade básica de investimentos, que em 04/11 ia ser a Unidade 4 da Trilha 1, entrou como a primeira unidade da Trilha 2.
- **Não existe mais:** o mascote Estrela (nem o código morto dele) e o botão da faixa da unidade que abria "Guia da Unidade · Em breve" (os dois saíram na Parte 2), o aviso de boas-vindas e a tela "Em breve" do guia (saíram na Parte 4) e a seta "←" da faixa da unidade (saiu em 04/11). O "Guia da Unidade" de conteúdo foi descartado: a rota `#guia` agora é o tutorial "Como usar o FinEdu".

## Quem vai trabalhar com você

- Fagner, o líder. Estudante de Engenharia de Computação, iniciante em programação web e em Git. Fala português do Brasil, informal.
- Responda sempre em português, direto e sem enrolação.
- **Explique o que você faz de um jeito simples**: a equipe vai apresentar e defender este código.
- **Avalie as ideias dele com sinceridade.** Se algo for uma má ideia, diga por quê e proponha uma alternativa melhor. Não concorde só para agradar.
- **Quando algo estiver indefinido, pergunte antes de construir.**
- Antes de mudanças grandes, mostre o plano em poucas linhas e espere o OK.
- Uma tarefa (ou uma parte da fila) por vez. Se o pedido desviar, avise.
- Se a sessão ficar longa demais, o Fagner abre outra e pede para continuar a fila. Tudo o que você precisa está aqui e no documento-mestre: não dependa de memória de sessão antiga.

## Onde mora cada coisa

- **Código:** esta pasta, versionada com Git e enviada para o repositório oficial: github.com/FagnerFilho/FinEdu (público). Site: https://fagnerfilho.github.io/FinEdu/. Em 04/11 a conta do Fagner trocou de nome (era Fagneraposo): o endereço antigo do repositório redireciona, mas o site antigo (fagneraposo.github.io) dá 404, como o link com FinEduu.
- **Decisões do projeto:** `projeto/documento-mestre.md`. É a versão oficial.
- **Regras do código:** `projeto/arquitetura.md`. Todo código segue esse arquivo. Se uma mudança precisar quebrar uma regra, discuta antes e atualize o arquivo junto.
- O planejamento e o conteúdo também são feitos num Projeto do Claude (no app). Quando o planejamento decide coisas novas, ele grava versões novas destes documentos direto no GitHub (com o OK do Fagner), e elas chegam aqui com `git pull`. Nesse caso: confira cada afirmação com o código, corrija o documento (não o código) onde ele estiver errado, e avise o Fagner do que corrigiu.

## Git

- O Fagner está aprendendo Git. Explique cada comando na primeira vez que usar.
- **Antes de começar qualquer tarefa: `git status` e `git pull`.** A equipe também manda código (o Eufy e o João já fizeram commits). Se tiver mudança local sem commit, pare e explique antes de puxar.
- **Commit ao fim de cada parte que funciona**, com mensagem curta em português que diga o que mudou (ex.: "Repete as questões erradas no fim da lição").
- **Push só com o OK do Fagner.** Depois do push, confira o site no GitHub Pages (leva uns minutos).
- **A branch `main` sempre funcionando:** é ela que o GitHub Pages publica e que vai para a apresentação.
- **Colaboradores (João, Eufy, Samuels) trabalham numa branch própria e abrem um Pull Request.** Só o Fagner junta na `main`. Se você ajudar alguém da equipe, use branch + PR.
- Experimentos de design: branch `experimento-design`. Só junta com a `main` se o Fagner aprovar.
- Nunca use `push --force`, nunca reescreva o histórico e nunca apague branch sem perguntar.
- O repositório é público: nada de senha, dado pessoal ou arquivo particular aqui dentro (nem os prints de antes/depois).

## O design do João

- **Não mude o visual do João sem mostrar antes/depois e ter o OK do Fagner** (ele confere com o João). Vale para cor, fonte, tamanho, ícone, texto em maiúsculas e posição de qualquer coisa.
- Como fazer o antes/depois: prints da mesma tela, do mesmo tamanho, antes e depois da mudança (celular em pé, 390 × 844, e tablet deitado, 1280 × 800). Pode usar o Chrome ou o Edge em modo headless (`--headless --screenshot`) ou o Playwright, se estiver instalado. Salve fora do repositório (a pasta usada é `finedu-v1\antes-depois\`, ao lado da pasta do repositório), com nomes numerados (`2.1-antes.png`, `2.1-depois.png`), e diga ao Fagner onde estão. Os scripts que tiram esses prints com o Edge sem janela ficam em `finedu-v1\antes-depois\ferramentas\` (como usar: `LEIA-ME.txt` dentro da pasta).
- Mudança que só conserta lógica, sem mexer no visual (como a missão do dia contar o XP de hoje), não precisa de antes/depois.

## Antes de entregar qualquer mudança

1. Siga o checklist da seção 9 do arquitetura.md (11 itens desde o modo apresentação).
2. Rode o `testes.html` e confira que tudo passa (eram 108 em 05/11, depois do nome da Trilha 2; o número só cresce). Vale também para mudança só no conteúdo: os testes conferem o `dados-licoes.js` e os ids das lições.
3. Atualize `projeto/documento-mestre.md` (decisões e pendências) e, se mudou alguma regra, o `projeto/arquitetura.md`.
4. Termine com um resumo curto: o que mudou, em quais arquivos, o que testou e o que ficou pendente.

## Fila de tarefas até 11/11

Feito:
1. ~~GitHub e GitHub Pages~~ (01/11).
2. ~~Gamificação e gamificação 2~~ (01/11). Plano em `projeto/plano-gamificacao.md`.
3. ~~Calculadora de Metas~~ (Eufy, 01/11, direto na main).
4. ~~Design~~ (João, 03/11, direto na main). Os ajustes estão na Parte 2.

A fazer, uma parte por vez, com commit ao fim de cada uma e o OK do Fagner antes da próxima:

5. ~~**Parte 1 · Conferir os documentos**~~ (feita em 03/11; o que mudou está em "Parte 1 · Conferência dos documentos", no documento-mestre). O planejamento já gravou no GitHub os documentos novos (CLAUDE.md, projeto/documento-mestre.md, projeto/arquitetura.md, README.md). `git pull`; conferir cada afirmação com o código; corrigir o documento onde estiver errado; commit.
6. ~~**Parte 2 · Correções do design, com antes/depois**~~ (feita em 04/11, aprovada pelo Fagner sem o João, que vê os prints depois; o que mudou e o que ficou para decidir estão em "Parte 2 · Correções do design", no documento-mestre). Obrigatórias: contraste do item ativo do menu; contraste dos rótulos das unidades 2 e 3; licença da Fredoka (`css/fontes/OFL-Fredoka.txt`, texto copiado do repositório oficial da fonte, sem inventar o cabeçalho); tirar o botão "Guia da Unidade" da faixa da unidade; conferir que os 7 itens do menu têm pelo menos 48px num celular de 360px. Propostas para o Fagner e o João decidirem: letra normal no lugar das MAIÚSCULAS, estrela de 5 pontas nos discos das lições, Unidades 2 e 3 como um cartão compacto "Em breve", nomes das abas da calculadora em letra normal, limpeza do código morto da Estrela. Detalhes na seção "Identidade visual" e em "Decisões por conversa (03/11)" do documento-mestre.
7. ~~**Parte 3 · Missão do dia (05/11).**~~ (feita em 04/11, de madrugada; os 20 XP confirmados pelo Fagner no plano; o que mudou está em "Parte 3 · Missão do dia", no documento-mestre). Seção "Missão do dia" do documento-mestre: 1 missão por dia, em rodízio pela data, `XP_DA_MISSAO` = 20, sem moedas, treino conta, zera no dia seguinte. Consertou o erro do `META_XP_MISSAO_DIARIA`. Enviada ao GitHub em 04/11, de manhã, junto com as Partes 1 e 2 (OK do Fagner).
8. ~~**Parte 4 · Onboarding (05 e 06/11).**~~ (feita em 04/11, à tarde; prints aprovados pelo Fagner, com a saudação "Oi, Duda!" na trilha; o que mudou está em "Parte 4 · Onboarding", no documento-mestre; prints em `finedu-v1\antes-depois\parte-4`). Seção "Onboarding" do documento-mestre: "Como a gente te chama?" → avatar → tutorial "Como usar o FinEdu" → trilha. Depois, o tutorial fica em Mais; o Perfil mostra apelido e avatar; "Reiniciar progresso" traz o onboarding de volta. Substituiu o aviso de boas-vindas.
9. **Questões novas da Unidade 1 (07/11).** O planejamento manda o conteúdo pronto; só o `dados-licoes.js` muda.
10. ~~**Modo apresentação**~~ (feito em 04/11, à noite, antes da data prevista, 07/11; os prints esperam o OK do Fagner e do João; as decisões e o que mudou estão em "Modo apresentação", no documento-mestre; prints em `finedu-v1\antes-depois\modo-apresentacao`). Interruptor em Mais → Apresentação que libera todas as lições; fica salvo no aparelho e sobrevive ao "Reiniciar progresso"; só muda a liberação. Trocou a ideia de 01/11 (lições já concluídas, 1 vida e 20 moedas).
11. ~~**Conteúdo novo: Unidades 2 e 3 e Trilha 2**~~ (feito em 05/11, fora da ordem da fila; o que mudou e o que falta decidir estão em "Conteúdo novo", no documento-mestre; prints em `finedu-v1\antes-depois\conteudo-novo`). O planejamento mandou 3 arquivos prontos, revisados pelo Fagner; entraram no `dados-licoes.js` sem mudar texto, e 3 testes que contavam com as unidades vazias foram ajustados. No mesmo dia, a Trilha 2 ganhou o nome na tela e a numeração própria, com antes/depois aprovado pelo Fagner ("Nome da Trilha 2 na tela", no documento-mestre; folhas em `finedu-v1\antes-depois\proposta-trilha-2-prints\folhas`). Falta: o professor revisar as marcas // REVISAR até 09/11 e o João ver as folhas e decidir a cor da unidade da Trilha 2.
12. **09/11:** teste completo no tablet de verdade e ensaio; prazo do professor para as marcas // REVISAR. **10/11:** código congelado, só correção de erro.

## Depois da apresentação

Mais unidades da Trilha 2 (com revisão do professor) e as "moedas que rendem", Ligas (amigos por QR code), instalar como app, conquistas, níveis a mais (com as 16 lições, quem acerta tudo chega ao nível 5, o mais alto, no fim da Unidade 2), e transformar o arquitetura.md numa skill de arquiteto.
