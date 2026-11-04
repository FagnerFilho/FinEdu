# arquitetura.md · FinEdu (versão 1)

Atualizado em 03/11/2026 (conversa de planejamento) para o código do commit `a906e51`: calculadora do Eufy e design do João. Conferido com o código na Parte 1 (03/11, Claude Code), atualizado na Parte 2 (04/11) com as correções do design, na Parte 3 (04/11, madrugada) com a missão do dia (seções 5 e 6) e na Parte 4 (04/11, tarde) com o onboarding (seções 1, 2, 5, 6, 7, 8 e 9).

Regras do código do FinEdu. Todo código novo segue este arquivo. Se uma mudança precisar quebrar uma regra daqui, discuta antes e atualize este arquivo junto.

## 1. Arquivos e papéis

| Arquivo | Faz | Não faz |
|---|---|---|
| `index.html` | Esqueleto: menu (7 itens), barra de cima, uma `<section class="tela">` por tela (inclusive as 3 do onboarding), coluna da direita, janela (`<dialog>` do painel "Como funciona"), estojo de ícones (`<symbol id="i-nome">`, inclusive a logo `#i-logo` e os 6 avatares `#i-avatar-...`), ordem dos scripts | Conteúdo, lógica |
| `css/estilo.css` | Todo o visual. Variáveis no `:root`, no topo | Valores soltos fora das variáveis |
| `css/fontes/` | Fredoka (títulos), Figtree (texto) e Baloo 2 (reserva). Arquivos variáveis, subconjunto latino, licença SIL OFL: cada fonte com o seu `OFL-*.txt` | — |
| `js/dados-licoes.js` | Constante `CONTEUDO`: trilhas, unidades, lições e questões | Lógica |
| `js/armazenamento.js` | `carregarProgresso()`, `salvarProgresso(progresso)`, `reiniciarProgresso()`, `armazenamentoDisponivel()` | Saber o que tem dentro do progresso |
| `js/jogo.js` | Regras: constantes de valores, níveis, progresso inicial, datas, liberação, sessão da lição (aquecimento, questões novas e revisão), recarga e treino, baú, missão do dia, apelido e avatar do onboarding (`limparApelido()`, `AVATARES`), `conferirConteudo()` e as contas da Calculadora de Metas (seção 6.1). (`simularRendimento()` está sem uso) | Mexer na tela ou no localStorage |
| `js/telas.js` | Monta o HTML de cada tela (onboarding, trilha, lição, vitória, baú, sem vidas, Calculadora, Ligas, Missões, Loja, Perfil e Mais), a coluna da direita, ícones (`icone()`), avisos e a janela do painel "Como funciona". O cartão "Missão do dia" da tela Missões e o da coluna da direita usam o mesmo miolo (`desenharCorpoDaMissao()`). Os textos do tutorial ficam em `cartoesDoTutorial()`, com os números das constantes (`numerosDoTutorial()`) | Decidir regra, salvar |
| `js/app.js` | Estado (`estado`), navegação por `#` (e o fluxo do onboarding, seção 7), cliques (`data-acao`), teclado; é quem chama `salvarProgresso()` | Montar HTML, guardar regra |
| `img/` | `favicon.svg`. A logo (o lobo do João) não é arquivo: é o símbolo `#i-logo` no `index.html` | — |
| `testes.html` | Testes das regras do `jogo.js` e da calculadora, no navegador (passou/falhou). 93 testes em 04/11 (Parte 4). Abre com dois cliques. Inclui a simulação dos 3 alunos do plano da gamificação, sem e com a missão do dia. Confere também os textos do painel, do feedback do erro, da tela Missões, da vitória e do onboarding (etapas, tutorial, Perfil e Mais), a tela das 3 abas da calculadora e o desenho da trilha (`telas.js`), montados numa caixa fora da página. Os testes das regras usam `HOJE` = 05/11, um dia de missão da calculadora, para a missão não mexer nos números deles. A navegação do onboarding (`app.js`) não tem teste aqui: confira no navegador (seção 9) | Mexer no progresso salvo ou na tela do app |
| `README.md` | Como abrir, testar e publicar | — |
| `CLAUDE.md` | Instruções para o Claude Code: como trabalhar, Git, fila de tarefas | Regra de código (fica neste arquivo) |
| `projeto/` | `documento-mestre.md` (decisões e pendências) e este `arquitetura.md`, versão oficial dos dois. Também os planos de tarefa (ex.: `plano-gamificacao.md`) | Código |

Ordem dos scripts no `index.html`: dados-licoes → armazenamento → jogo → telas → app. Cada arquivo só usa o que veio antes dele.

## 2. Regras que o código segue sempre

1. **Sem servidor.** Tem que funcionar abrindo o `index.html` com dois cliques. Proibido: `type="module"`, `import`, `fetch()` de arquivo local, ferramenta de build.
2. **HTML, CSS e JavaScript puro.** Sem framework e sem biblioteca externa. Nada carregado da internet (nem fontes).
3. **Só o `armazenamento.js` usa `localStorage`.** Se um dia tiver servidor, só ele muda.
4. **Texto de lição só no `dados-licoes.js`.** Textos da interface (botões, títulos, avisos) ficam no `telas.js` (ou no `app.js`, nos avisos de ação). Exceção: nomes que são dados do jogo ficam no `jogo.js`, junto dos valores (`NOME_DA_DIFICULDADE`, os nomes dos níveis em `NIVEIS`, os textos das missões em `MISSOES`, cada um junto da sua meta, e os nomes dos bichos em `AVATARES`). Exceção que já está no código (Eufy, 01/11): as mensagens de erro e alguns textos de resultado da Calculadora de Metas (`erro`, `mensagem`, `subtexto` e `aviso`) vêm prontos das contas do `jogo.js`.
5. **Cada arquivo no seu papel:** `jogo.js` não mexe na tela nem salva; `telas.js` não decide regra nem salva; `app.js` liga os dois.
6. **Todo texto do conteúdo entra na página por `escaparHtml()`.**
7. **Cor, fonte, espaço, raio e medida só por variável CSS.** Ícones e logo usam `currentColor` ou classes. Exceção: `img/favicon.svg` tem a cor escrita nele. Exceções que já estão no código desde o design do João (03/11): os 7 ícones do menu, a medalha das Ligas (`#i-ligas-prata`) e o miolo do `#i-sequencia` têm as cores do Figma escritas no `index.html`; o `estilo.css` tem 3 cores fora das variáveis (fundo do item do menu ao passar o mouse e a sombra dos ícones do baú e do troféu; outras 4 saíram na Parte 2) e várias medidas em px soltas. Código novo segue a regra.
8. **Ícones** são `<symbol id="i-nome">` no `index.html`, usados com `icone('nome')`. Nunca emoji como ícone.
9. **Logo e personagens.** A logo é o lobo do João, símbolo `#i-logo` no `index.html`, usado na barra de cima, no menu lateral e, grande, na etapa 1 do onboarding. Não existe mascote: a Estrela saiu em 03/11 (não há mais `desenharEstrela`). Os 6 avatares do onboarding (Parte 4: arara, capivara, tatu, onça, coruja e tamanduá) seguem a regra 8: `<symbol id="i-avatar-nome">` (o nome é o `id` em `AVATARES`), cabeça de frente em formas chapadas, como os ícones do menu, com as cores das variáveis (`style="fill: var(--cor-...)"`). São provisórios: o João troca o miolo de um `<symbol>` sem mexer no resto do código. Personagem novo só com decisão da equipe.
10. **Botões não têm código de clique próprio.** Cada um tem `data-acao="..."`, e o `switch` de `tratarClique()` no `app.js` lista todas as ações. Navegação entre telas do menu usa link `<a href="#tela">`.
11. **Toque:** tudo que é tocável tem pelo menos 48px (`--alvo-minimo`). A "sombra sólida" embaixo de um elemento significa "dá para tocar"; informação parada usa borda de 2px, nunca sombra difusa. Os contadores (barra de cima e coluna da direita) são botões que abrem o painel "Como funciona"; no design do João, só ganham um fundo ao apertar (e ao passar o mouse). Exceções que já estão no código desde o design do João: os cartões usam borda de 3px (`--borda-cartao`); a faixa da unidade tem sombra sólida e não é tocável (o botão do guia saiu na Parte 2); abaixo de 360px de largura, os contadores ficam com 40px de largura; e num celular de 360px cada item do menu fica com 47,4px de largura (medido na Parte 2, ainda sem mudança).
12. **Só modo escuro.** Sem gradiente roxo, sem efeito de vidro, sem fontes manjadas (Inter, Nunito, Poppins).
13. **Texto da interface em letra normal**, sem rótulos em MAIÚSCULAS e sem "A · B · C". Ação tem o mesmo nome do começo ao fim (botão "Reiniciar progresso" → aviso "Progresso reiniciado"). (As MAIÚSCULAS do design do João, no menu, em "Unidade N" e em "Ver", viraram letra normal na Parte 2. O "FINEdu" da logo é arte e fica.)
14. **Nomes em português**, sem acento nos nomes de variáveis, funções e classes. Comentários em português.
15. **Sem cadastro e sem dado pessoal** (LGPD). O progresso não sai do aparelho.
16. **Acessibilidade:** contraste mínimo 4,5:1 em texto e 3:1 em ícone; foco visível; `aria-label` em botão que só tem ícone; `prefers-reduced-motion` respeitado. Texto roxo usa `--cor-destaque-texto` (#A5A9F5); o `--cor-destaque-claro` (#4B53F5) fica para borda, barra e ícone, porque como texto não passa no contraste.
17. **Movimento** só para responder ao toque, mais a comemoração do fim da lição. Nada de animação de entrada em cada seção.
18. **Janelas** por cima da tela (hoje só o painel "Como funciona"; o aviso de boas-vindas saiu na Parte 4) são `<dialog class="folha">` no `index.html`, com o conteúdo montado pelo `telas.js` e abertas com `abrirJanela()`, que usa `showModal()`: o Esc fecha sozinho, o Tab não sai da janela e, ao fechar, o foco volta para quem abriu. Tocar no fundo escuro fecha (`app.js`). Não use o evento `close` para salvar nada: o navegador só o dispara no próximo quadro de animação. (A confirmação de saída da lição continua sendo um `<div>` dentro da lição.)
19. **Visual do João:** mudança de cor, fonte, tamanho, ícone ou posição só com antes/depois e o OK do Fagner (como fazer está no CLAUDE.md). Conserto de lógica que não muda o visual não precisa.

## 3. Formato do conteúdo

```js
const CONTEUDO = {
  trilhas: [
    {
      id: 'educacao-financeira',
      titulo: 'Educação financeira',
      unidades: [
        {
          id: 'ef-unidade-1',
          titulo: 'Primeiros passos',
          licoes: [
            {
              id: 'querer-ou-precisar',            // único; NUNCA muda depois de ir ao ar
              titulo: 'Querer ou precisar?',
              questoes: [
                {
                  dificuldade: 'facil',            // 'facil' | 'media' | 'dificil'
                  pergunta: '...',
                  alternativas: [                  // de 2 a 4
                    { texto: '...', correta: true, explicacao: 'Por que está certa.' },
                    { texto: '...', explicacao: 'Por que está errada.' }
                  ]
                }
              ]
            },
            { id: 'ef-u1-licao-2', titulo: 'Em breve', emBreve: true }   // sem conteúdo ainda
          ]
        }
      ]
    },
    { id: 'investimentos', titulo: 'Investimentos', unidades: [] }      // trilha em breve
  ]
};
```

- A Unidade 3 (`ef-unidade-3`) entrou no design do João, vazia como a 2: lições com `emBreve: true`. Unidade em que todas as lições são `emBreve` aparece na trilha como um cartão compacto "Em breve" (sem discos, baú nem troféu).

- Toda lição: 5 questões, 2 `facil`, 2 `media`, 1 `dificil`. O app mostra do fácil para o difícil e embaralha as alternativas; a ordem escrita não importa. Por convenção, a certa vem primeiro (facilita a revisão).
- Toda alternativa tem `explicacao`. No erro, o app mostra o porquê da escolhida e depois a certa com o porquê dela.
- Regra das contas (01/11): a Unidade 1 não tem nenhuma questão de conta; o conceito fica na pergunta e a conta vai para a explicação. Contas simples só em unidades mais avançadas, e só em fácil ou média (número redondo, de cabeça). A difícil é sempre de decisão.
- `conferirConteudo()` (jogo.js) verifica o formato (quantidade de questões por nível, alternativas, explicações) e ids repetidos. Problemas aparecem numa caixa vermelha no topo da tela. A regra das contas ele não tem como conferir: é revisão de gente.

## 4. Passo a passo: adicionar uma lição

1. Abra `js/dados-licoes.js` e ache a unidade.
2. Copie o bloco inteiro de uma lição pronta (do `{` antes de `id:` até o `},` que fecha) e cole na posição em que ela deve aparecer na trilha.
3. Troque `id` (minúsculo, com hífen, único) e `titulo`.
4. Escreva as 5 questões: 2 `facil`, 2 `media`, 1 `dificil`. Em cada uma, de 2 a 4 alternativas, só uma com `correta: true`, todas com `explicacao`. Siga a regra das contas (seção 3).
5. Se ela entra no lugar de uma lição "Em breve", apague a linha da "Em breve".
6. Salve e abra o `index.html`. Se aparecer a caixa vermelha no topo, ela diz o que corrigir.
7. Jogue a lição inteira uma vez, errando pelo menos uma questão, para ler as explicações.

Nenhum outro arquivo muda. Unidade nova: novo objeto em `unidades` (`id`, `titulo`, `licoes`); o baú e o troféu aparecem sozinhos (o `telas.js` põe o baú no meio do caminho e o troféu no fim), e a cor da unidade segue o rodízio roxo, laranja e verde. Enquanto todas as lições dela forem `emBreve`, a unidade aparece só como um cartão "Em breve". Trilha nova: novo objeto em `trilhas`.

## 5. Progresso salvo

Chave `finedu-progresso` no localStorage, em JSON:

```js
{ versao: 1, xp, moedas, vidas, diaDasVidas: 'AAAA-MM-DD', sequencia,
  ultimoDiaDeEstudo: 'AAAA-MM-DD' | null, licoesConcluidas: [ids],
  bausAbertos: [ids de unidade], respostasCertas, respostasDadas,
  errosPorLicao: { 'id-da-licao': [posições] },
  apelido: '' | 'texto', avatar: null | 'arara' | 'capivara' | 'tatu' | 'onca' | 'coruja' | 'tamandua',
  onboardingFeito: true | false,
  missao: { dia: 'AAAA-MM-DD', licoes, acertos, perfeitas, contas, concluida: true | false } }
```

`errosPorLicao` guarda, para cada lição, a posição (no `dados-licoes.js`) das questões que o aluno errou de primeira da última vez que concluiu a lição. O aquecimento usa essa lista (e conta quantas são, para o aquecimento duplo). Se o conteúdo mudar, o pior que acontece é o aquecimento trazer outra questão da mesma lição.

`apelido`, `avatar` e `onboardingFeito` (Parte 4) são do onboarding. O apelido é opcional (`''` = sem apelido), tem no máximo `APELIDO_MAXIMO` (20) caracteres e passa por `limparApelido()` (sem caractere invisível nem espaço sobrando) ao ser salvo e ao ser lido. Fica só no aparelho, como o resto do progresso, e entra na tela sempre por `escaparHtml()`. Nada de nome completo nem outro dado pessoal (regra 15). O `avatar` é o `id` de um bicho de `AVATARES` (qualquer outro valor vira `null`). `onboardingFeito` só é `true` depois do fim (ou do "Pular") do tutorial da primeira vez. Progresso novo ou reiniciado começa com os três vazios; um progresso salvo antes da Parte 4 também, então passa pelo onboarding uma vez, sem perder nada. O campo `boasVindasVistas` (do aviso que saiu) some sozinho na próxima vez que o progresso é preparado.

`missao` (Parte 3) guarda o que o aluno fez no dia `dia` para a missão do dia: `licoes` (lições e treinos concluídos), `acertos` (questões certas em qualquer parte da lição: aquecimento, novas e revisão, no treino também), `perfeitas` (lições e treinos com as 5 questões novas certas de primeira) e `contas` (contas com resultado na Calculadora de Metas). `concluida` diz se os `XP_DA_MISSAO` de hoje já entraram. Começa zerada (`missaoZerada()`), e o `atualizarDia()` zera de novo quando o dia muda, como faz com as vidas. Uma missão estragada (`missaoEstaBoa()` falha) também volta a zerada. A seção 6 explica a regra.

A Calculadora não salva nada no progresso. A única exceção é a conta para a missão do dia (`missao.contas`), que o `app.js` registra com `registrarContaNaCalculadora()`.

Campo novo: acrescente em `criarProgressoInicial()`. Progressos antigos ganham o valor inicial sozinhos (`prepararProgresso()`), e dados estragados voltam ao inicial. Campo que saiu de `criarProgressoInicial()` some sozinho do progresso salvo.

## 6. Regras do jogo (tarefa 2 e gamificação 2, 01/11; missão do dia, Parte 3)

Decididas no `projeto/plano-gamificacao.md` (a gamificação 2 está na seção 9 dele) e, a missão do dia, na seção "Missão do dia" do documento-mestre. Constantes no topo do `jogo.js`:

| Constante | Valor |
|---|---|
| `XP_POR_ACERTO` | 10 (questão nova certa de primeira) |
| `XP_DE_REVISAO` | 5 (errada que o aluno acerta na revisão, e cada questão certa no aquecimento) |
| `MOEDAS_POR_LICAO` | 10 (só na primeira vez que conclui a lição) |
| `MOEDAS_LICAO_PERFEITA` | 5 (extra se acertar as 5 de primeira; só na primeira vez) |
| `XP_DO_BAU` / `MOEDAS_DO_BAU` | 20 / 20 |
| `VIDAS_MAXIMAS` | 5 |
| `PRECO_DA_RECARGA` | 20 moedas |
| `MESADA_DE_BOAS_VINDAS` | 20 (moedas com que o progresso começa: pagam 1 recarga) |
| `ERROS_PARA_AQUECIMENTO_DUPLO` | 3 (errou 3 ou mais de primeira na lição anterior: o aquecimento traz 2 delas) |
| `NIVEIS` | Aprendiz 0, Poupador 75, Planejador 175, Estrategista 300, Investidor 450 (o XP em que cada nível começa) |
| `XP_DA_MISSAO` | 20 (recompensa da missão do dia, uma vez por dia, sem moedas) |
| `PRIMEIRO_DIA_DAS_MISSOES` | '2026-11-01' (o dia da 1ª missão da lista; o rodízio conta os dias a partir dele) |
| `MISSOES` | A lista do rodízio, cada uma com `texto`, `conta` (qual número de `progresso.missao` ela olha) e `meta`: "Conclua 1 lição" (`licoes`, 1), "Conclua 2 lições" (`licoes`, 2), "Acerte 10 questões" (`acertos`, 10), "Acerte de primeira todas as questões de uma lição" (`perfeitas`, 1), "Faça uma conta na Calculadora de Metas" (`contas`, 1) |

**A lição é uma fila.** A primeira da fila é a vez atual, e cada vez tem um tipo:

- `aquecimento`: 1 ou 2 questões da lição anterior na mesma trilha, antes das outras (o índice da vez aponta para `sessao.aquecimento`). Prefere as que o aluno errou de primeira da última vez (`errosPorLicao`): com `ERROS_PARA_AQUECIMENTO_DUPLO` ou mais erradas, vêm 2 delas (aquecimento duplo), diferentes, da mais fácil para a mais difícil; com 1 ou 2 erradas, vem 1 delas; sem nenhuma, 1 fácil ou média. Não tira vida, não conta na precisão e não volta na revisão. Cada questão certa vale 5 XP e sai da lista de erradas. A primeira lição da trilha não tem.
- `nova`: as 5 questões da lição, do fácil para o difícil. Erro tira 1 vida na hora (e fica salvo).
- `revisao`: a errada volta no fim da fila, com as alternativas em outra ordem, até o aluno acertar. Errar na revisão não tira vida. A lição só termina com a fila vazia.

Regra de bolso: **só perde vida quem erra questão nova; ficou sem vidas, recarrega ou treina.**

- Precisão (da lição e do Perfil): só a primeira resposta de cada questão nova. Revisão, aquecimento e treino ficam de fora.
- XP e moedas só entram quando a lição termina; sair no meio não ganha nada, e as vidas perdidas continuam perdidas.
- Vidas acabaram numa lição nova: a lição fica parada na tela "sem vidas", com duas saídas:
  - recarregar: `PRECO_DA_RECARGA` moedas, as vidas voltam a 5 e a lição continua de onde parou;
  - treinar de graça a lição concluída mais recente; a lição parada recomeça depois.

  Sem moedas suficientes e sem lição concluída, as vidas só voltam no dia seguinte.
- Mesada de boas-vindas: o progresso começa com `MESADA_DE_BOAS_VINDAS` moedas. Antes de concluir a primeira lição não há o que treinar, e é ela que paga a recarga de quem erra as 5 questões da lição 1. "Reiniciar progresso" devolve a mesada; um progresso que já estava salvo não ganha.
- Treino (refazer lição concluída): errar não tira vida; não vale XP nem moedas e não conta na precisão; no fim, as vidas voltam a 5. Dá para treinar com 0 vidas. Conta na sequência e na missão do dia (se ele cumprir a missão, só a recompensa dela entra).
- As vidas também voltam todas no dia seguinte.
- Sequência: +1 por dia com pelo menos uma lição (ou treino) concluída; se passar um dia sem concluir, volta a 0.
- Liberação: uma lição libera quando a anterior da mesma trilha está concluída. A primeira de cada trilha começa liberada. Lição concluída pode ser refeita, como treino.
- Baú: libera quando todas as lições da unidade estão concluídas; abre uma vez só.
- Níveis: `nivelDoXp(xp)` devolve o número, o nome, o próximo nível e quanto XP falta. `concluirLicao()` e `abrirBau()` dizem se o aluno subiu de nível (`subiuDeNivel`), para o aviso da vitória e do baú. O treino não vale XP: ele só faz subir de nível quando cumpre a missão do dia (os `XP_DA_MISSAO` entram nele).
- Onde errar não tira vida (revisão, aquecimento e treino), o feedback do erro diz isso na hora (`textoDepoisDoErro()`, no `telas.js`).
- Painel "Como funciona" (`desenharPainel()`, no `telas.js`): os textos usam as constantes acima, então mudam junto com elas. Ele só explica: a recarga fica na tela "sem vidas" e na Loja (`recarregarNaLoja()`, no `app.js`), e nas duas só libera com 0 vidas (`podeRecarregar()`).
- Missão do dia (seção 8 do `jogo.js`, Parte 3):
  - Uma por dia, a mesma para todo mundo: `missaoDoDia(hoje)` conta os dias desde `PRIMEIRO_DIA_DAS_MISSOES` e usa o resto da divisão pelo tamanho de `MISSOES` como posição na lista. Com 5 missões, 11/11 (dia da apresentação) dá resto 0: "Conclua 1 lição". Mudou a ordem ou o tamanho da lista? Confira de novo qual cai em 11/11 (tem teste).
  - `concluirLicao()` soma a lição (ou o treino) nos números de hoje com `somarNaMissao()`: 1 lição, as questões certas de todas as partes e 1 lição perfeita se acertou as 5 novas de primeira (o aquecimento não entra nessa conta). Só no fim: lição largada no meio não conta, como o XP.
  - Na calculadora, cada conta com resultado (nas 3 abas, pelo botão ou pelo Enter) soma 1 em `contas`: `calcularMetaNaTela()` → `contarContaNaMissao()` (`app.js`) → `registrarContaNaCalculadora()`. Conta com erro de digitação não soma. A troca de aba, que refaz a conta sozinha, também não.
  - Quando o número que a missão de hoje olha chega à meta, entram os `XP_DA_MISSAO` (sem moedas), uma vez só no dia (`missao.concluida`). O treino conta, mas continua sem XP próprio: só a recompensa da missão entra.
  - O resumo da lição traz `missaoConcluida`; o `xp` do resumo continua sendo só o da lição (é o que o placar mostra), e o `subiuDeNivel` já conta os 20 XP da missão. A vitória e o fim do treino mostram "Missão do dia concluída: +20 XP" (`desenharMissaoConcluida()`, com o mesmo estilo do aviso de nível, `.comemoracao-missao`), antes do aviso de nível. Na calculadora, o aviso de baixo diz o mesmo (`avisarMissaoConcluida()`, 4 segundos na tela) e, se for o caso, o nível que subiu; os contadores e o cartão da missão mudam na hora.
  - As telas perguntam `situacaoDaMissao(progresso, hoje)` (`{ texto, conta, meta, feito, concluida }`, só com os números de hoje) e desenham o cartão com `desenharCorpoDaMissao()`: a missão no título, "1/2" na barra (o leitor de tela ouve "Progresso da missão: 1 de 2 lições") e o selo "Em andamento" ou "Concluída!" na tela Missões. O painel "Como funciona" tem uma linha sobre a missão na parte do XP, com a de hoje.
  - O erro antigo (o `META_XP_MISSAO_DIARIA` do `telas.js` comparava 30 com o XP total) saiu junto com a constante.
- Onboarding (Parte 4): enquanto `onboardingFeito` for `false`, o app só mostra as etapas apelido → avatar → tutorial (o caminho está na seção 7). Na primeira vez, o apelido é salvo ao sair da etapa 1 e o avatar ao sair da etapa 2; o fim (ou o "Pular") do tutorial chama `concluirOnboarding()`. Um avatar já vem marcado: o sorteado (`sortearAvatar()`), para a turma não sair toda com o mesmo bicho. "Trocar apelido e avatar" (Perfil) só salva no "Salvar"; "Cancelar" e o voltar do Android não salvam nada. "Reiniciar progresso" apaga também o apelido e o avatar, e o onboarding volta. O aviso de boas-vindas saiu: a mesada é contada no cartão 3 do tutorial, e a dica dos contadores no cartão 4.
- Tutorial "Como usar o FinEdu" (`cartoesDoTutorial()`, no `telas.js`): os números dos 5 cartões vêm das constantes (`numerosDoTutorial()`: `QUESTOES_POR_LICAO`, `VIDAS_MAXIMAS`, `MESADA_DE_BOAS_VINDAS`, `PRECO_DA_RECARGA`, `XP_POR_ACERTO` e `XP_DA_MISSAO`); o teste passa outros números e confere que o texto muda junto.
- Funções que dependem da data recebem `hoje` como último parâmetro (para testar datas).
- Regra nova ou mudada ganha teste no `testes.html`.

### 6.1 Calculadora de Metas (Eufy, 01/11)

Contas no `jogo.js`, como funções puras com teste no grupo "Calculadora" do `testes.html`; a tela no `telas.js` (`desenharCalculadora()`, `mostrarResultadoCalculadora()`); os cliques no `app.js` (`trocarAbaCalculadora()`, `calcularMetaNaTela()`, `limparCalculadoraNaTela()`).

| Aba | Função | O que faz |
|---|---|---|
| Meta (Na Gaveta) | `calcularMeta(custo, meses, guardado)` | Quanto guardar por mês (e por semana), sem juros |
| Meta (Com Juros) | `calcularMetaComJuros(custo, meses, guardado, taxa)` | Quanto guardar por mês com juros compostos de exemplo, comparando a gaveta com o dinheiro rendendo |
| Simular Futuro | `simularFuturo(aporte, anos, guardado, taxa)` | Quanto junta guardando um valor fixo por mês durante N anos, com juros compostos de exemplo |

- `simularRendimento(...)` está no `jogo.js` desde a primeira versão da calculadora, mas nenhuma tela usa e não tem teste.
- Entrada: `lerNumeroCalculadora()` aceita "300", "12,50", "12.50" e "1.234,56" e devolve o número, `'vazio'` ou `'invalido'`; as contas transformam isso num erro em linguagem simples ("Use só números, como 300 ou 12,50."). A taxa precisa ser maior que 0 (até 20) na aba com juros; no Simular Futuro, vai de 0 a 20. Valores em reais com `formatarMoeda()` (R$ 1.234,56) e centavos arredondados para cima (`arredondarParaCima()`).
- Constantes: `MESES_MINIMOS_META` 1, `MESES_MAXIMOS_META` 1200 (teto técnico de 100 anos), `ANOS_MINIMOS_FUTURO` 1, `ANOS_MAXIMOS_FUTURO` 100, `SEMANAS_POR_MES` 30/7, `TAXA_EXEMPLO_PADRAO` 0,8 (% ao mês), `TAXA_EXEMPLO_MAXIMA` 20.
- A taxa é sempre "de exemplo", editável, com o aviso fixo: "Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável." Nunca apresente uma taxa como real ou atual. As abas com juros passam pela revisão do professor.
- A calculadora não salva nada.

## 7. Navegação

- A tela atual fica no endereço: `#aprender`, `#calculadora`, `#ligas`, `#missoes`, `#loja`, `#perfil` e `#mais` (telas do menu, lista `TELAS_DO_MENU` no `app.js`) e `#licao`, `#resultado`, `#bau`, `#sem-vidas`, `#apelido`, `#avatar` e `#guia` (telas de foco, sem menu; as 3 últimas são o onboarding, `TELAS_DO_ONBOARDING`).
- `#guia` é o tutorial "Como usar o FinEdu" (Parte 4), aberto pelo onboarding e por Mais. A tela "Guia da Unidade · Em breve" saiu, junto com `TELAS_EM_BREVE` e `desenharEmBreve()`.
- Onboarding (`podeAbrirPorCausaDoOnboarding()`, seção 7 do `app.js`), com o fluxo em andamento em `estado.onboarding` (`{ modo, apelido, avatar, cartao }`):
  - Primeira vez (`onboardingFeito` = `false`): qualquer endereço vira `#apelido`, no lugar do endereço atual (`history.replaceState`, sem passo a mais). Página recarregada no meio também recomeça do `#apelido`, com o apelido que já tinha sido salvo.
  - Cada etapa entra como um passo novo no histórico (`irParaEtapa()`, com `history.pushState`), e o passo guarda quantas etapas o fluxo já empilhou (`history.state.etapa`). O voltar do Android volta uma etapa; no `#apelido` da primeira vez, sai do app. Os cartões do tutorial trocam no lugar, sem passo.
  - No fim, `sairDoOnboarding()` volta as etapas empilhadas (`history.go`): na primeira vez, cai no `#apelido` do começo, que vira `#aprender` (o voltar da trilha sai do app, sem cair de novo no onboarding); "Trocar apelido e avatar" volta ao `#perfil`; o tutorial aberto por Mais volta ao `#mais`.
  - Etapa velha no histórico (fluxo que já acabou, ou a troca com a página recarregada no meio) volta para onde o fluxo começou, ou para `#aprender`.
- Teclado no onboarding: Enter no campo do apelido (ou num avatar) faz o mesmo que o botão de baixo; as setas trocam de avatar (botões de opção do navegador) e de cartão no tutorial; Enter fora de um botão passa para o próximo cartão; Esc aperta o botão do canto de cima ("Cancelar", "Pular" ou "Fechar").
- `irPara(tela)`, `abrirTelaDeFoco(tela)` e `voltarParaTrilha()` no `app.js`. O botão voltar do Android navega entre as telas; voltar durante a lição abandona a lição.
- Tela de foco aberta sem os dados dela (ex.: página recarregada em `#licao`) volta para `#aprender`.
- A tela `#sem-vidas` guarda a lição parada, para ela continuar depois da recarga. "Treinar de graça" e a lição depois da recarga entram no lugar dela no histórico (`irPara(tela, true)`). Sair por "Voltar para a trilha" ou pelo voltar do Android abandona a lição.
- Trocar de tela (inclusive pelo voltar do Android) fecha qualquer janela aberta: `fecharJanelas()`, no começo de `mostrarTelaDoEndereco()`.

## 8. Layout

| Situação | Regra CSS | Resultado |
|---|---|---|
| Em pé (padrão) | — | Barra de cima com logo e contadores; menu embaixo (o "FINEdu" ao lado do lobo aparece a partir de 560px) |
| Deitado e com 768px ou mais | `@media (orientation: landscape) and (min-width: 768px)` | Menu vira coluna à esquerda |
| Deitado e com 1024px ou mais | `@media (orientation: landscape) and (min-width: 1024px)` | A barra de cima some; coluna da direita com os contadores e os cartões "Desbloqueie as Ligas!" e "Missão do dia" |
| Menos de 560px de largura | `@media (max-width: 559px)` | O menu de baixo mostra só os 7 ícones (o nome fica escondido, para o leitor de tela) |
| Menos de 360px de largura | `@media (max-width: 359px)` | Contadores mais estreitos (40px de largura), curva da trilha menor, avatares menores (Parte 4) e, no Perfil e em Mais, o círculo em cima do título (Parte 4: "Configurações" não cabia ao lado dele e empurrava a tela) |

A troca é pela orientação porque tablet Samsung em pé tem uns 800px de largura e precisa manter o menu embaixo. Conteúdo com no máximo 660px (`--largura-conteudo`; lição: 680px, `--largura-licao`), centralizado. As janelas (`.folha`) sobem de baixo no celular e ficam no centro a partir de 720px.

## 9. Antes de entregar uma mudança

1. Abrir o `index.html` no notebook: nenhuma caixa vermelha, nenhum erro no console (F12).
2. Abrir o `testes.html`: todos os testes passam.
3. Fazer uma lição inteira, errando uma questão (ela volta na revisão).
4. Testar em pé e deitado (no notebook, F12 → modo dispositivo).
5. Mais → Reiniciar progresso funciona, e o onboarding aparece de novo.
6. Onboarding: do zero, o app abre no apelido; dá para seguir com o campo vazio e pular o tutorial; recarregar no meio recomeça do apelido; o voltar do Android anda entre as etapas e, depois do fim, não cai de novo nelas; Perfil → "Trocar apelido e avatar" (Salvar e Cancelar); Mais → "Ver tutorial". Pelo teclado (Tab, setas, Enter e Esc) e com 320px de largura, sem rolagem para o lado.
7. Tocar num contador abre o painel "Como funciona", e o Esc fecha.
8. Calculadora: uma conta em cada aba, e um erro de digitação mostra a mensagem certa.
9. Missões: a tela e o cartão da coluna da direita mostram a missão de hoje e o que já foi feito hoje; quando ela termina, a vitória (ou o aviso da calculadora) mostra "Missão do dia concluída: +20 XP".
10. Mudou o visual? Antes/depois mostrado e aprovado (regra 19).
