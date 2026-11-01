# arquitetura.md · FinEdu (versão 1)

Regras do código do FinEdu. Todo código novo segue este arquivo. Se uma mudança precisar quebrar uma regra daqui, discuta antes e atualize este arquivo junto.

## 1. Arquivos e papéis

| Arquivo | Faz | Não faz |
|---|---|---|
| `index.html` | Esqueleto: menu, barra de cima, uma `<section class="tela">` por tela, coluna da direita, janelas (`<dialog>` do painel e das boas-vindas), estojo de ícones (`<symbol id="i-nome">`), ordem dos scripts | Conteúdo, lógica |
| `css/estilo.css` | Todo o visual. Variáveis no `:root`, no topo | Valores soltos fora das variáveis |
| `css/fontes/` | Baloo 2 (títulos e números) e Figtree (texto). Arquivos variáveis, subconjunto latino, licença SIL OFL | — |
| `js/dados-licoes.js` | Constante `CONTEUDO`: trilhas, unidades, lições, questões e `dicasDaEstrela` | Lógica |
| `js/armazenamento.js` | `carregarProgresso()`, `salvarProgresso(progresso)`, `reiniciarProgresso()`, `armazenamentoDisponivel()` | Saber o que tem dentro do progresso |
| `js/jogo.js` | Regras: constantes de valores, níveis, progresso inicial, datas, liberação, sessão da lição (aquecimento, questões novas e revisão), recarga e treino, baú, dica do dia, `conferirConteudo()` | Mexer na tela ou no localStorage |
| `js/telas.js` | Monta o HTML de cada tela, ícones (`icone()`), mascote (`desenharEstrela()`), avisos e janelas (painel "Como funciona" e boas-vindas) | Decidir regra, salvar |
| `js/app.js` | Estado (`estado`), navegação por `#`, cliques (`data-acao`), teclado; é quem chama `salvarProgresso()` | Montar HTML, guardar regra |
| `img/` | `favicon.svg`. Depois: a logo final do designer (o mascote foi removido) | — |
| `testes.html` | Testes das regras do `jogo.js`, no navegador (passou/falhou). Abre com dois cliques. Inclui a simulação dos 3 alunos do plano da gamificação. Confere também os textos do painel, das boas-vindas e do feedback do erro (`telas.js`), montados numa caixa fora da página | Mexer no progresso salvo ou na tela do app |
| `README.md` | Como abrir, testar e publicar | — |
| `CLAUDE.md` | Instruções para o Claude Code: como trabalhar, Git, fila de tarefas | Regra de código (fica neste arquivo) |
| `projeto/` | `documento-mestre.md` (decisões e pendências) e este `arquitetura.md`, versão oficial dos dois. Também os planos de tarefa (ex.: `plano-gamificacao.md`) | Código |

Ordem dos scripts no `index.html`: dados-licoes → armazenamento → jogo → telas → app. Cada arquivo só usa o que veio antes dele.

## 2. Regras que o código segue sempre

1. **Sem servidor.** Tem que funcionar abrindo o `index.html` com dois cliques. Proibido: `type="module"`, `import`, `fetch()` de arquivo local, ferramenta de build.
2. **HTML, CSS e JavaScript puro.** Sem framework e sem biblioteca externa. Nada carregado da internet (nem fontes).
3. **Só o `armazenamento.js` usa `localStorage`.** Se um dia tiver servidor, só ele muda.
4. **Texto de lição só no `dados-licoes.js`.** Textos da interface (botões, títulos, avisos) ficam no `telas.js` (ou no `app.js`, nos avisos de ação). Exceção: nomes que são dados do jogo ficam no `jogo.js`, junto dos valores (`NOME_DA_DIFICULDADE` e os nomes dos níveis em `NIVEIS`).
5. **Cada arquivo no seu papel:** `jogo.js` não mexe na tela nem salva; `telas.js` não decide regra nem salva; `app.js` liga os dois.
6. **Todo texto do conteúdo entra na página por `escaparHtml()`.**
7. **Cor, fonte, espaço, raio e medida só por variável CSS.** Ícones e mascote usam `currentColor` ou classes. Única exceção: `img/favicon.svg` tem a cor escrita nele.
8. **Ícones** são `<symbol id="i-nome">` no `index.html`, usados com `icone('nome')`. Nunca emoji como ícone.
9. **Mascote** só na função `desenharEstrela(expressao)` do `telas.js` (`'feliz'`, `'comemorando'`, `'triste'`). (O mascote foi removido pela equipe em 31/10; sai do código na tarefa de design, e esta regra muda junto.)
10. **Botões não têm código de clique próprio.** Cada um tem `data-acao="..."`, e o `switch` de `tratarClique()` no `app.js` lista todas as ações. Navegação entre telas do menu usa link `<a href="#tela">`.
11. **Toque:** tudo que é tocável tem pelo menos 48px (`--alvo-minimo`). A "sombra sólida" embaixo de um elemento significa "dá para tocar"; informação parada usa borda de 2px, nunca sombra difusa. Os contadores (barra de cima e coluna da direita) são botões que abrem o painel "Como funciona"; por enquanto só ganham um fundo ao apertar, e a tarefa de design decide se ganham a sombra.
12. **Só modo escuro.** Sem gradiente roxo, sem efeito de vidro, sem fontes manjadas (Inter, Nunito, Poppins).
13. **Texto da interface em letra normal**, sem rótulos em MAIÚSCULAS e sem "A · B · C". Ação tem o mesmo nome do começo ao fim (botão "Reiniciar progresso" → aviso "Progresso reiniciado").
14. **Nomes em português**, sem acento nos nomes de variáveis, funções e classes. Comentários em português.
15. **Sem cadastro e sem dado pessoal** (LGPD). O progresso não sai do aparelho.
16. **Acessibilidade:** contraste mínimo 4,5:1 em texto e 3:1 em ícone; foco visível; `aria-label` em botão que só tem ícone; `prefers-reduced-motion` respeitado.
17. **Movimento** só para responder ao toque, mais a comemoração do fim da lição. Nada de animação de entrada em cada seção.
18. **Janelas** por cima da tela (painel "Como funciona" e boas-vindas) são `<dialog class="folha">` no `index.html`, com o conteúdo montado pelo `telas.js` e abertas com `abrirJanela()`, que usa `showModal()`: o Esc fecha sozinho, o Tab não sai da janela e, ao fechar, o foco volta para quem abriu. Tocar no fundo escuro fecha (`app.js`). Não use o evento `close` para salvar nada: o navegador só o dispara no próximo quadro de animação. (A confirmação de saída da lição continua sendo um `<div>` dentro da lição.)

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
              falaDaEstrela: 'Bora? Hoje é querer × precisar!',   // opcional
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
  ],
  dicasDaEstrela: ['...']
};
```

- Toda lição: 5 questões, 2 `facil`, 2 `media`, 1 `dificil`. O app mostra do fácil para o difícil e embaralha as alternativas; a ordem escrita não importa. Por convenção, a certa vem primeiro (facilita a revisão).
- Toda alternativa tem `explicacao`. No erro, o app mostra o porquê da escolhida e depois a certa com o porquê dela.
- Regra das contas (01/11): a Unidade 1 não tem nenhuma questão de conta; o conceito fica na pergunta e a conta vai para a explicação. Contas simples só em unidades mais avançadas, e só em fácil ou média (número redondo, de cabeça). A difícil é sempre de decisão.
- `conferirConteudo()` (jogo.js) verifica o formato (quantidade de questões por nível, alternativas, explicações) e ids repetidos. Problemas aparecem numa caixa vermelha no topo da tela. A regra das contas ele não tem como conferir: é revisão de gente.

## 4. Passo a passo: adicionar uma lição

1. Abra `js/dados-licoes.js` e ache a unidade.
2. Copie o bloco inteiro de uma lição pronta (do `{` antes de `id:` até o `},` que fecha) e cole na posição em que ela deve aparecer na trilha.
3. Troque `id` (minúsculo, com hífen, único), `titulo` e `falaDaEstrela`.
4. Escreva as 5 questões: 2 `facil`, 2 `media`, 1 `dificil`. Em cada uma, de 2 a 4 alternativas, só uma com `correta: true`, todas com `explicacao`. Siga a regra das contas (seção 3).
5. Se ela entra no lugar de uma lição "Em breve", apague a linha da "Em breve".
6. Salve e abra o `index.html`. Se aparecer a caixa vermelha no topo, ela diz o que corrigir.
7. Jogue a lição inteira uma vez, errando pelo menos uma questão, para ler as explicações.

Nenhum outro arquivo muda. Unidade nova: novo objeto em `unidades` (`id`, `titulo`, `licoes`); o baú aparece sozinho no fim. Trilha nova: novo objeto em `trilhas`.

## 5. Progresso salvo

Chave `finedu-progresso` no localStorage, em JSON:

```js
{ versao: 1, xp, moedas, vidas, diaDasVidas: 'AAAA-MM-DD', sequencia,
  ultimoDiaDeEstudo: 'AAAA-MM-DD' | null, licoesConcluidas: [ids],
  bausAbertos: [ids de unidade], respostasCertas, respostasDadas,
  errosPorLicao: { 'id-da-licao': [posições] }, boasVindasVistas: true | false }
```

`errosPorLicao` guarda, para cada lição, a posição (no `dados-licoes.js`) das questões que o aluno errou de primeira da última vez que concluiu a lição. O aquecimento usa essa lista (e conta quantas são, para o aquecimento duplo). Se o conteúdo mudar, o pior que acontece é o aquecimento trazer outra questão da mesma lição.

`boasVindasVistas` diz se o aviso de boas-vindas já apareceu. Progresso novo ou reiniciado começa com `false`; um progresso salvo antes de o campo existir ganha `true`, para quem já está jogando não ver o aviso.

Campo novo: acrescente em `criarProgressoInicial()`. Progressos antigos ganham o valor inicial sozinhos (`prepararProgresso()`), e dados estragados voltam ao inicial. A exceção é o `boasVindasVistas`, explicado acima.

## 6. Regras do jogo (tarefa 2 e gamificação 2, 01/11)

Decididas no `projeto/plano-gamificacao.md` (a gamificação 2 está na seção 9 dele). Constantes no topo do `jogo.js`:

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
- Treino (refazer lição concluída): errar não tira vida; não vale XP nem moedas e não conta na precisão; no fim, as vidas voltam a 5. Dá para treinar com 0 vidas. Conta na sequência.
- As vidas também voltam todas no dia seguinte.
- Sequência: +1 por dia com pelo menos uma lição (ou treino) concluída; se passar um dia sem concluir, volta a 0.
- Liberação: uma lição libera quando a anterior da mesma trilha está concluída. A primeira de cada trilha começa liberada. Lição concluída pode ser refeita, como treino.
- Baú: libera quando todas as lições da unidade estão concluídas; abre uma vez só.
- Níveis: `nivelDoXp(xp)` devolve o número, o nome, o próximo nível e quanto XP falta. `concluirLicao()` e `abrirBau()` dizem se o aluno subiu de nível (`subiuDeNivel`), para o aviso da vitória e do baú. O treino nunca sobe (não vale XP).
- Onde errar não tira vida (revisão, aquecimento e treino), o feedback do erro diz isso na hora (`textoDepoisDoErro()`, no `telas.js`).
- Painel "Como funciona" (`desenharPainel()`, no `telas.js`): os textos usam as constantes acima, então mudam junto com elas. Ele só explica: a recarga continua só na tela "sem vidas".
- Boas-vindas: aparecem numa tela do menu enquanto `boasVindasVistas` for `false`, e ficam marcadas como vistas (`marcarBoasVindasVistas()`) assim que aparecem.
- Funções que dependem da data recebem `hoje` como último parâmetro (para testar datas).
- Regra nova ou mudada ganha teste no `testes.html`.

## 7. Navegação

- A tela atual fica no endereço: `#aprender`, `#calculadora`, `#guia`, `#perfil` (telas do menu) e `#licao`, `#resultado`, `#bau`, `#sem-vidas` (telas de foco, sem menu).
- `irPara(tela)`, `abrirTelaDeFoco(tela)` e `voltarParaTrilha()` no `app.js`. O botão voltar do Android navega entre as telas; voltar durante a lição abandona a lição.
- Tela de foco aberta sem os dados dela (ex.: página recarregada em `#licao`) volta para `#aprender`.
- A tela `#sem-vidas` guarda a lição parada, para ela continuar depois da recarga. "Treinar de graça" e a lição depois da recarga entram no lugar dela no histórico (`irPara(tela, true)`). Sair por "Voltar para a trilha" ou pelo voltar do Android abandona a lição.
- Trocar de tela (inclusive pelo voltar do Android) fecha qualquer janela aberta: `fecharJanelas()`, no começo de `mostrarTelaDoEndereco()`.

## 8. Layout

| Situação | Regra CSS | Resultado |
|---|---|---|
| Em pé (padrão) | — | Barra de cima com logo e contadores; menu embaixo |
| Deitado e com 768px ou mais | `@media (orientation: landscape) and (min-width: 768px)` | Menu vira coluna à esquerda |
| Deitado e com 1200px ou mais | `@media (orientation: landscape) and (min-width: 1200px)` | Coluna da direita com contadores e Dica da Estrela |

A troca é pela orientação porque tablet Samsung em pé tem uns 800px de largura e precisa manter o menu embaixo. Conteúdo com no máximo 600px (lição: 680px), centralizado. As janelas (`.folha`) sobem de baixo no celular e ficam no centro a partir de 720px.

## 9. Antes de entregar uma mudança

1. Abrir o `index.html` no notebook: nenhuma caixa vermelha, nenhum erro no console (F12).
2. Abrir o `testes.html`: todos os testes passam.
3. Fazer uma lição inteira, errando uma questão (ela volta na revisão).
4. Testar em pé e deitado (no notebook, F12 → modo dispositivo).
5. Perfil → Reiniciar progresso funciona (e as boas-vindas aparecem de novo).
6. Tocar num contador abre o painel "Como funciona", e o Esc fecha.
