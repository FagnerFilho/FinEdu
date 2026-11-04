# FinEdu

Site no estilo Duolingo que ensina educação financeira para os alunos do CETI Dom Severino (Teresina-PI). Projeto de extensão do curso de Engenharia de Computação da Uni-CET.

Versão 1: HTML, CSS e JavaScript puro, sem servidor e sem cadastro. O progresso fica salvo só no aparelho de quem usa.

Site: https://fagnerfilho.github.io/FinEdu/#apelido

Equipe: Fagner (líder), João (design), Eufy (calculadora), Samuel de Assunção e Samuel Medeiros (conteúdo) e William.

## Como abrir

**No notebook:** dê dois cliques no `index.html`. Funciona sem internet.

**No tablet ou no celular (Android):** abra pelo link do GitHub Pages. Abrir o arquivo direto no Android costuma falhar, porque o navegador não carrega as pastas `css/` e `js/` junto.

**Para zerar entre uma apresentação e outra:** Mais → Reiniciar progresso (o Perfil também tem o atalho "Abrir Configurações"). O app volta para o começo: apelido, avatar e o tutorial "Como usar o FinEdu".

## Como testar as regras

Dê dois cliques no `testes.html`. Ele roda os testes das regras do jogo (XP e níveis, moedas, vidas, revisão, aquecimento, recarga, treino, missão do dia e a simulação de 3 alunos) e da Calculadora de Metas, confere os textos do painel "Como funciona", da tela Missões e do onboarding (apelido, avatar e tutorial) e o contraste dos textos corrigidos, e mostra cada um como "Passou" ou "Falhou". Depois de mexer no `js/jogo.js` ou no `js/telas.js`, todos têm que passar.

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
| `css/fontes/` | Fontes Fredoka, Figtree e Baloo 2 (licença SIL OFL) |
| `js/dados-licoes.js` | Conteúdo: trilhas, unidades, lições e questões |
| `js/armazenamento.js` | Único arquivo que lê e grava o progresso |
| `js/jogo.js` | Regras: XP e níveis, moedas, vidas, sequência, liberação, aquecimento, revisão, recarga, treino, baú, missão do dia, apelido e avatar, e as contas da Calculadora de Metas |
| `js/telas.js` | Desenha as telas (onboarding, trilha, lição, Calculadora, Ligas, Missões, Loja, Perfil, Mais...) |
| `js/app.js` | Inicia o app, troca de tela e responde aos toques |
| `img/` | Favicon (a logo, o lobo, é um ícone dentro do `index.html`) |
| `testes.html` | Testes das regras e da calculadora, no navegador |
| `projeto/` | Documento-mestre (decisões), arquitetura (regras do código) e planos de tarefa |
| `CLAUDE.md` | Instruções para o Claude Code |

Para criar ou mudar uma lição, edite só o `js/dados-licoes.js`. Se algo ficar fora do padrão, o app mostra um aviso vermelho no topo da tela dizendo o que corrigir.

Atalhos no notebook, durante a lição: teclas 1 a 4 (ou A a D) escolhem, Enter verifica e continua, Esc sai. No tutorial "Como usar o FinEdu": as setas ← e → trocam de cartão, e o Esc pula ou fecha.

## Como contribuir (equipe)

A branch `main` é o que vai para o site e para a apresentação. Trabalhe numa branch sua (`git checkout -b nome-da-tarefa`), envie com `git push -u origin nome-da-tarefa` e abra um Pull Request no GitHub. O Fagner revisa, testa e junta. Nunca faça push direto na `main` e nunca use `--force`.
