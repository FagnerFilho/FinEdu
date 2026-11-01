# FinEdu · instruções para o Claude Code

Este arquivo é lido no começo de toda sessão. Ele resume o projeto e diz como trabalhar. Os detalhes estão nos dois arquivos importados abaixo: leia os dois antes de qualquer tarefa.

@projeto/documento-mestre.md
@projeto/arquitetura.md

## O projeto

- **FinEdu:** site estilo Duolingo que ensina educação financeira para alunos do CETI Dom Severino (ensino fundamental e médio, Teresina-PI).
- Projeto de extensão de Engenharia de Computação da Uni-CET. Equipe: Fagner (líder), João (design), Samuel de Assunção (conteúdo), Eufy (GitHub), William e Samuel Medeiros.
- **Apresentação: 11/11/2026, de manhã**, num tablet Samsung (Android, pelo link do GitHub Pages) e num notebook.
- Versão 1 pronta e testada: trilha com a Unidade 1 completa (4 lições + baú), lição com feedback por alternativa, vitória, perfil, "Reiniciar progresso". Calculadora, Guia, Unidade 2 e Trilha 2 (investimentos) aparecem como "Em breve".

## Quem vai trabalhar com você

- Fagner, o líder. Estudante de Engenharia de Computação, iniciante em programação web e em Git. Fala português do Brasil, informal.
- Responda sempre em português, direto e sem enrolação.
- **Explique o que você faz de um jeito simples**: a equipe vai apresentar e defender este código.
- **Avalie as ideias dele com sinceridade.** Se algo for uma má ideia, diga por quê e proponha uma alternativa melhor. Não concorde só para agradar.
- **Quando algo estiver indefinido, pergunte antes de construir.**
- Antes de mudanças grandes, mostre o plano em poucas linhas e espere o OK.
- Uma tarefa por sessão. Se o pedido desviar, avise.

## Onde mora cada coisa

- **Código:** esta pasta. Versionada com Git e enviada para o repositório do Fagner no GitHub, que é o oficial: github.com/Fagneraposo/FinEduu (o Eufy é colaborador). Site: https://fagneraposo.github.io/FinEduu/
- **Decisões do projeto:** `projeto/documento-mestre.md`. É a versão oficial.
- **Regras do código:** `projeto/arquitetura.md`. Todo código segue esse arquivo. Se uma mudança precisar quebrar uma regra, discuta antes e atualize o arquivo junto.
- O planejamento e o conteúdo também são feitos num Projeto do Claude (no app). O Fagner copia o documento-mestre de lá para cá e daqui para lá. Se você notar decisões conflitantes, avise.

## Git

- O Fagner está aprendendo Git. Explique cada comando na primeira vez que usar.
- **Commit ao fim de cada parte que funciona**, com mensagem curta em português que diga o que mudou (ex.: "Repete as questões erradas no fim da lição").
- **Push só com o OK do Fagner.**
- **A branch `main` sempre funcionando:** é ela que o GitHub Pages publica e que vai para a apresentação.
- Experimentos (principalmente de design) numa branch separada, como `experimento-design`. Só junta com a `main` se o Fagner aprovar.
- Nunca use `push --force`, nunca reescreva o histórico e nunca apague branch sem perguntar.
- O repositório é público: nada de senha, dado pessoal ou arquivo particular aqui dentro.

## Antes de entregar qualquer mudança

1. Siga o checklist da seção 9 do arquitetura.md (nenhuma caixa vermelha, nenhum erro no console, uma lição inteira errando uma questão, em pé e deitado, "Reiniciar progresso").
2. Se existir `testes.html`, rode e confira que tudo passa.
3. Atualize `projeto/documento-mestre.md` (decisões e pendências) e, se mudou alguma regra, o `projeto/arquitetura.md`.
4. Termine com um resumo curto: o que mudou, em quais arquivos, o que testou e o que ficou pendente.

## Fila de tarefas até 11/11

1. ~~**GitHub e GitHub Pages.**~~ Feito em 01/11: repositório Fagneraposo/FinEduu, Pages na `main`, pasta raiz. O teste no tablet ficou nas pendências do documento-mestre.
2. ~~**Gamificação (conversa 05).**~~ Feito em 01/11: revisão das erradas, aquecimento, recarga de vidas com moedas e treino. Plano em `projeto/plano-gamificacao.md`, regras na seção 6 do arquitetura.md, testes no `testes.html`. O push (com OK) e o teste no celular e no tablet ficaram nas pendências do documento-mestre.
3. **Design.** Na branch `experimento-design`:
   - Aplicar a paleta do João (está no documento-mestre) e conferir o contraste de cada combinação. O roxo sobre o preto fosco dá só 2,5: não serve para texto nem ícone no fundo escuro.
   - Trocar as fontes e a logo quando o João mandar os arquivos (as fontes precisam ficar salvas em `css/fontes/`, para funcionar sem internet).
   - **Tirar o mascote** (decisão da equipe): a função `desenharEstrela` e tudo que a usa; "Dica da Estrela" vira "Dica do dia". Atualizar a regra 9 do arquitetura.md.
   - Deixar o app mais vivo **sem 3D de verdade e sem biblioteca externa**: profundidade com sombra sólida, botões que afundam, trilha com relevo e uma comemoração caprichada no fim da lição. **Sem gradiente** (com paleta roxa, gradiente é a "cara de IA").
   - Use as skills de design de front-end e de revisão de acessibilidade, se estiverem disponíveis.
4. **09/11:** teste completo no tablet de verdade e ensaio. **10/11:** código congelado, só correção de erro.

## Depois da apresentação

Trilha 2 (investimentos, com revisão do professor), Calculadora de Metas e Guia, Unidade 2, "Meta do dia" e conquistas, e transformar o arquitetura.md numa skill de arquiteto.
