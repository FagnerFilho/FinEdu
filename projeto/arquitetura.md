# arquitetura.md · FinEdu (versão 1)

Regras do código do FinEdu. Todo código novo segue este arquivo. Se uma mudança precisar quebrar uma regra daqui, discuta antes e atualize este arquivo junto.

## 1. Arquivos e papéis

| Arquivo | Faz | Não faz |
|---|---|---|
| `index.html` | Esqueleto: menu, barra de cima, uma `<section class="tela">` por tela, coluna da direita, estojo de ícones (`<symbol id="i-nome">`), ordem dos scripts | Conteúdo, lógica |
| `css/estilo.css` | Todo o visual. Variáveis no `:root`, no topo | Valores soltos fora das variáveis |
| `css/fontes/` | Baloo 2 (títulos e números) e Figtree (texto). Arquivos variáveis, subconjunto latino, licença SIL OFL | — |
| `js/dados-licoes.js` | Constante `CONTEUDO`: trilhas, unidades, lições, questões e `dicasDaEstrela` | Lógica |
| `js/armazenamento.js` | `carregarProgresso()`, `salvarProgresso(progresso)`, `reiniciarProgresso()`, `armazenamentoDisponivel()` | Saber o que tem dentro do progresso |
| `js/jogo.js` | Regras: constantes de valores, progresso inicial, datas, liberação, sessão da lição, baú, dica do dia, `conferirConteudo()` | Mexer na tela ou no localStorage |
| `js/telas.js` | Monta o HTML de cada tela, ícones (`icone()`), mascote (`desenharEstrela()`), avisos | Decidir regra, salvar |
| `js/app.js` | Estado (`estado`), navegação por `#`, cliques (`data-acao`), teclado; é quem chama `salvarProgresso()` | Montar HTML, guardar regra |
| `img/` | `favicon.svg`. Depois: logo e mascote finais do designer | — |
| `README.md` | Como abrir, testar e publicar | — |
| `CLAUDE.md` | Instruções para o Claude Code: como trabalhar, Git, fila de tarefas | Regra de código (fica neste arquivo) |
| `projeto/` | `documento-mestre.md` (decisões e pendências) e este `arquitetura.md`, versão oficial dos dois. Também os planos de tarefa (ex.: `plano-gamificacao.md`) | Código |

Ordem dos scripts no `index.html`: dados-licoes → armazenamento → jogo → telas → app. Cada arquivo só usa o que veio antes dele.

## 2. Regras que o código segue sempre

1. **Sem servidor.** Tem que funcionar abrindo o `index.html` com dois cliques. Proibido: `type="module"`, `import`, `fetch()` de arquivo local, ferramenta de build.
2. **HTML, CSS e JavaScript puro.** Sem framework e sem biblioteca externa. Nada carregado da internet (nem fontes).
3. **Só o `armazenamento.js` usa `localStorage`.** Se um dia tiver servidor, só ele muda.
4. **Texto de lição só no `dados-licoes.js`.** Textos da interface (botões, títulos, avisos) ficam no `telas.js` (ou no `app.js`, nos avisos de ação).
5. **Cada arquivo no seu papel:** `jogo.js` não mexe na tela nem salva; `telas.js` não decide regra nem salva; `app.js` liga os dois.
6. **Todo texto do conteúdo entra na página por `escaparHtml()`.**
7. **Cor, fonte, espaço, raio e medida só por variável CSS.** Ícones e mascote usam `currentColor` ou classes. Única exceção: `img/favicon.svg` tem a cor escrita nele.
8. **Ícones** são `<symbol id="i-nome">` no `index.html`, usados com `icone('nome')`. Nunca emoji como ícone.
9. **Mascote** só na função `desenharEstrela(expressao)` do `telas.js` (`'feliz'`, `'comemorando'`, `'triste'`). (O mascote foi removido pela equipe em 31/10; sai do código na tarefa de design, e esta regra muda junto.)
10. **Botões não têm código de clique próprio.** Cada um tem `data-acao="..."`, e o `switch` de `tratarClique()` no `app.js` lista todas as ações. Navegação entre telas do menu usa link `<a href="#tela">`.
11. **Toque:** tudo que é tocável tem pelo menos 48px (`--alvo-minimo`). A "sombra sólida" embaixo de um elemento significa "dá para tocar"; informação parada usa borda de 2px, nunca sombra difusa.
12. **Só modo escuro.** Sem gradiente roxo, sem efeito de vidro, sem fontes manjadas (Inter, Nunito, Poppins).
13. **Texto da interface em letra normal**, sem rótulos em MAIÚSCULAS e sem "A · B · C". Ação tem o mesmo nome do começo ao fim (botão "Reiniciar progresso" → aviso "Progresso reiniciado").
14. **Nomes em português**, sem acento nos nomes de variáveis, funções e classes. Comentários em português.
15. **Sem cadastro e sem dado pessoal** (LGPD). O progresso não sai do aparelho.
16. **Acessibilidade:** contraste mínimo 4,5:1 em texto e 3:1 em ícone; foco visível; `aria-label` em botão que só tem ícone; `prefers-reduced-motion` respeitado.
17. **Movimento** só para responder ao toque, mais a comemoração do fim da lição. Nada de animação de entrada em cada seção.

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
  bausAbertos: [ids de unidade], respostasCertas, respostasDadas }
```

Campo novo: acrescente em `criarProgressoInicial()`. Progressos antigos ganham o valor inicial sozinhos (`prepararProgresso()`), e dados estragados voltam ao inicial.

## 6. Regras do jogo (provisórias, conversa 05)

Constantes no topo do `jogo.js`:

| Constante | Valor |
|---|---|
| `XP_POR_ACERTO` | 10 |
| `MOEDAS_POR_LICAO` | 10 |
| `MOEDAS_LICAO_PERFEITA` | 5 (extra se acertar todas) |
| `XP_DO_BAU` / `MOEDAS_DO_BAU` | 20 / 20 |
| `VIDAS_MAXIMAS` | 5 |

- XP e moedas só entram quando a lição termina; sair no meio não ganha nada.
- Erro tira 1 vida na hora (e fica salvo). Com 0 vidas a lição para; as vidas voltam todas no dia seguinte.
- Sequência: +1 por dia com pelo menos uma lição concluída; se passar um dia sem concluir, volta a 0.
- Liberação: uma lição libera quando a anterior da mesma trilha está concluída. A primeira de cada trilha começa liberada. Lição concluída pode ser refeita.
- Baú: libera quando todas as lições da unidade estão concluídas; abre uma vez só.
- Funções que dependem da data recebem `hoje` como último parâmetro (para testar datas).

## 7. Navegação

- A tela atual fica no endereço: `#aprender`, `#calculadora`, `#guia`, `#perfil` (telas do menu) e `#licao`, `#resultado`, `#bau`, `#sem-vidas` (telas de foco, sem menu).
- `irPara(tela)`, `abrirTelaDeFoco(tela)` e `voltarParaTrilha()` no `app.js`. O botão voltar do Android navega entre as telas; voltar durante a lição abandona a lição.
- Tela de foco aberta sem os dados dela (ex.: página recarregada em `#licao`) volta para `#aprender`.

## 8. Layout

| Situação | Regra CSS | Resultado |
|---|---|---|
| Em pé (padrão) | — | Barra de cima com logo e contadores; menu embaixo |
| Deitado e com 768px ou mais | `@media (orientation: landscape) and (min-width: 768px)` | Menu vira coluna à esquerda |
| Deitado e com 1200px ou mais | `@media (orientation: landscape) and (min-width: 1200px)` | Coluna da direita com contadores e Dica da Estrela |

A troca é pela orientação porque tablet Samsung em pé tem uns 800px de largura e precisa manter o menu embaixo. Conteúdo com no máximo 600px (lição: 680px), centralizado.

## 9. Antes de entregar uma mudança

1. Abrir o `index.html` no notebook: nenhuma caixa vermelha, nenhum erro no console (F12).
2. Fazer uma lição inteira, errando uma questão.
3. Testar em pé e deitado (no notebook, F12 → modo dispositivo).
4. Perfil → Reiniciar progresso funciona.
