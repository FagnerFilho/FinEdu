# FinEdu · instruções para o Claude Code

Este arquivo é lido no começo de toda sessão. Ele resume o projeto e diz como trabalhar. Os detalhes estão nos dois arquivos importados abaixo: leia os dois antes de qualquer tarefa.

@projeto/documento-mestre.md
@projeto/arquitetura.md

Última atualização: 03/11/2026, noite (feita na conversa de planejamento, depois do design do João; conferida com o código pelo Claude Code na Parte 1).

## O projeto

- **FinEdu:** site estilo Duolingo que ensina educação financeira para alunos do CETI Dom Severino (ensino fundamental e médio, Teresina-PI).
- Projeto de extensão de Engenharia de Computação da Uni-CET. Equipe: Fagner (líder), João (design, jgcosta350 no GitHub), Eufy (calculadora, eufyzn), Samuel de Assunção e Samuel Medeiros (conteúdo) e William.
- **Apresentação: 11/11/2026, de manhã**, num tablet Samsung (Android, pelo link do GitHub Pages) e num notebook.
- **O que já está pronto** (commit `a906e51`, 67 testes passando):
  - trilha com a Unidade 1 completa (4 lições + baú), lição com feedback por alternativa, vitória, Perfil, "Reiniciar progresso";
  - gamificação: revisão das erradas, aquecimento (duplo para quem erra muito), vidas, recarga e treino, níveis por XP, painel "Como funciona" e boas-vindas;
  - Calculadora de Metas com 3 abas (Eufy, 01/11);
  - design do João (03/11): paleta, fonte Fredoka, lobo na logo, trilha com discos, menu com 7 itens (Aprender, Calculadora, Ligas, Missões, Loja, Perfil, Mais).
- **Em breve:** Ligas, Unidades 2 e 3 e Trilha 2 (investimentos).
- **Não existe mais:** o mascote Estrela (`desenharEstrela`). O "Guia da Unidade" de conteúdo foi descartado: o botão da faixa da unidade que abre "Guia da Unidade · Em breve" ainda está no código e sai na Parte 2. O Guia agora é o tutorial "Como usar o FinEdu" (Parte 4).

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

- **Código:** esta pasta, versionada com Git e enviada para o repositório oficial: github.com/Fagneraposo/FinEdu (público). Site: https://fagneraposo.github.io/FinEdu/ (o link antigo, com FinEduu, dá 404).
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
- Como fazer o antes/depois: prints da mesma tela, do mesmo tamanho, antes e depois da mudança (celular em pé, 390 × 844, e tablet deitado, 1280 × 800). Pode usar o Chrome ou o Edge em modo headless (`--headless --screenshot`) ou o Playwright, se estiver instalado. Salve fora do repositório (por exemplo, `Downloads\finedu-antes-depois\`), com nomes numerados (`2.1-antes.png`, `2.1-depois.png`), e diga ao Fagner onde estão.
- Mudança que só conserta lógica, sem mexer no visual (como a missão do dia contar o XP de hoje), não precisa de antes/depois.

## Antes de entregar qualquer mudança

1. Siga o checklist da seção 9 do arquitetura.md.
2. Rode o `testes.html` e confira que tudo passa (eram 67 em 03/11; o número só cresce).
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
6. **Parte 2 · Correções do design, com antes/depois (04/11).** Obrigatórias: contraste do item ativo do menu; contraste dos rótulos das unidades 2 e 3; licença da Fredoka (`css/fontes/OFL-Fredoka.txt`, texto copiado do repositório oficial da fonte, sem inventar o cabeçalho); tirar o botão "Guia da Unidade" da faixa da unidade; conferir que os 7 itens do menu têm pelo menos 48px num celular de 360px. Propostas para o Fagner e o João decidirem: letra normal no lugar das MAIÚSCULAS, estrela de 5 pontas nos discos das lições, Unidades 2 e 3 como um cartão compacto "Em breve", nomes das abas da calculadora em letra normal, limpeza do código morto da Estrela. Detalhes na seção "Identidade visual" e em "Decisões por conversa (03/11)" do documento-mestre.
7. **Parte 3 · Missão do dia (05/11).** Seção "Missão do dia" do documento-mestre: 1 missão por dia, em rodízio pela data, `XP_DA_MISSAO` = 20 (o Fagner confirma no plano), sem moedas, treino conta, zera no dia seguinte. Conserta o erro do `META_XP_MISSAO_DIARIA`.
8. **Parte 4 · Onboarding (05 e 06/11).** Seção "Onboarding" do documento-mestre: "Como devemos te chamar?" → avatar → tutorial "Como usar o FinEdu" → trilha. Depois, o tutorial fica em Mais; o Perfil mostra apelido e avatar; "Reiniciar progresso" traz o onboarding de volta. Substitui o aviso de boas-vindas.
9. **Questões novas da Unidade 1 (07/11).** O planejamento manda o conteúdo pronto; só o `dados-licoes.js` muda.
10. **Modo apresentação (07/11).** Botão que deixa o app pronto para demonstrar. Considerar o onboarding.
11. **09/11:** teste completo no tablet de verdade e ensaio. **10/11:** código congelado, só correção de erro.

## Depois da apresentação

Trilha 2 (investimentos, com revisão do professor, e as "moedas que rendem" junto), Unidades 2 e 3, Ligas (amigos por QR code), instalar como app, conquistas, e transformar o arquitetura.md numa skill de arquiteto.
