# FinEdu

Site no estilo Duolingo que ensina educação financeira para os alunos do CETI Dom Severino (Teresina-PI). Projeto de extensão do curso de Engenharia de Computação da Uni-CET.

Versão 1: HTML, CSS e JavaScript puro, sem servidor e sem cadastro. O progresso fica salvo só no aparelho de quem usa.

## Como abrir

**No notebook:** dê dois cliques no `index.html`. Funciona sem internet.

**No tablet ou no celular (Android):** abra pelo link do GitHub Pages. Abrir o arquivo direto no Android costuma falhar, porque o navegador não carrega as pastas `css/` e `js/` junto.

**Para zerar entre uma apresentação e outra:** Perfil → Configurações → Reiniciar progresso.

## Como testar as regras

Dê dois cliques no `testes.html`. Ele roda os testes das regras do jogo (XP, moedas, vidas, revisão, aquecimento, recarga, treino e a simulação de 3 alunos) e mostra cada um como "Passou" ou "Falhou". Depois de mexer no `js/jogo.js`, todos têm que passar.

## Publicar no GitHub Pages

1. Suba o **conteúdo** desta pasta para a raiz do repositório (o `index.html` precisa ficar na raiz).
2. No repositório: **Settings → Pages**. Em *Source*, escolha *Deploy from a branch*, a branch `main` e a pasta `/ (root)`. Salve.
3. Em alguns minutos o site fica em `https://NOME-DO-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

No plano gratuito do GitHub, o repositório precisa ser público. Depois de cada mudança, o link pode levar alguns minutos para atualizar.

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Esqueleto da página e estojo de ícones |
| `css/estilo.css` | Todo o visual; cores, fontes e espaços em variáveis no topo |
| `css/fontes/` | Fontes Baloo 2 e Figtree (licença SIL OFL) |
| `js/dados-licoes.js` | Conteúdo: trilhas, unidades, lições e questões |
| `js/armazenamento.js` | Único arquivo que lê e grava o progresso |
| `js/jogo.js` | Regras: XP, moedas, vidas, sequência, liberação, aquecimento, revisão, recarga, treino e baú |
| `js/telas.js` | Desenha as telas |
| `js/app.js` | Inicia o app, troca de tela e responde aos toques |
| `img/` | Favicon (depois, a logo e o mascote finais) |
| `testes.html` | Testes das regras, no navegador |

Para criar ou mudar uma lição, edite só o `js/dados-licoes.js`. Se algo ficar fora do padrão, o app mostra um aviso vermelho no topo da tela dizendo o que corrigir.

Atalhos no notebook, durante a lição: teclas 1 a 4 (ou A a D) escolhem, Enter verifica e continua, Esc sai.
