# Relatório de Alterações · Implementação do Design (Figma)

> **Data:** 03/11/2026  
> **Commit de referência:** `a906e51` (`implementando designer do projeto`)  
> **Escopo:** Aplicação da identidade visual oficial do Figma sobre a base funcional do FinEdu, remoção do mascote antigo (Estrela), inclusão da logo do lobo + fonte local `Fredoka`, cores alternadas por unidade e conexão de todas as regras já existentes aos novos ícones e telas.

---

## 1. Resumo Geral

A remodelação visual foi aplicada **por cima do código já funcional**, sem alterar nenhuma regra pedagógica, matemática ou de gamificação do projeto:

- **7 arquivos alterados/adicionados** (`index.html`, `css/estilo.css`, `css/fontes/fredoka-latin-wght-normal.woff2`, `img/favicon.svg`, `js/telas.js`, `js/app.js`, `js/dados-licoes.js`).
- **3 arquivos críticos mantidos 100% intactos:** `js/jogo.js` (todas as regras de lição, revisão, aquecimento, XP, níveis, vidas, moedas e calculadora), `js/armazenamento.js` (`localStorage`) e `testes.html` (todos os **67 testes automatizados** continuam passando).
- **100% offline preservado:** funciona tanto em servidor local (`http://localhost:8080/`) quanto abrindo `index.html` com dois cliques (`file://`), sem CDN externo.

---

## 2. Visão Geral por Arquivo

| Arquivo | Situação | Linhas (`+` / `-`) | O que mudou |
|---|---|---|---|
| `css/fontes/fredoka-latin-wght-normal.woff2` | Novo | Binário (`29,7 KB`) | Fonte variável local `Fredoka` (pesos `400` a `700`) para títulos, menu, unidades e contadores funcionarem sem internet. |
| `img/favicon.svg` | Alterado | `+5 / -2` | Novo ícone da aba com fundo preto fosco (`#1B1F3C`) e a silhueta vetorizada do lobo da marca (`#E4E9E7`). |
| `index.html` | Alterado | `+184 / -65` | Novo estojo de ícones SVG do Figma (incluindo o lobo `#i-logo`), menu expandido para 7 itens, novas `<section>` (`ligas`, `missoes`, `loja`, `mais`) e `#painel-lateral` na coluna direita. |
| `css/estilo.css` | Alterado | `+612 / -478` | Paleta escura do Figma (`#1B1F3C` e `#343BDA`), temas de cor por unidade (roxo, laranja e verde), discos ovais 3D da trilha, cartões da coluna direita, layout de 3 colunas fiel ao Figma e remoção do CSS do mascote. |
| `js/telas.js` | Alterado | `+311 / -178` | Remoção de `desenharEstrela`, nova trilha em curva S com baú e troféu, `desenharColunaDireita`, `desenharConfiguracoes` (`#mais`), `desenharLigas`, `desenharMissoes`, `desenharLoja` e `desenharPerfil` sem mascote. |
| `js/app.js` | Alterado | `+78 / -28` | Registro das novas rotas do menu (`ligas`, `missoes`, `loja`, `mais`), atualização da coluna direita e ações `abrir-trofeu` e `recarregar-loja`. |
| `js/dados-licoes.js` | Alterado | `+14 / -1` | Título da Unidade 1 ajustado para `'Primeiros Passos'` e criação da `ef-unidade-3` (`Em breve`) para demonstrar o ciclo das 3 cores de unidade. |
| `js/jogo.js` | Intacto | `0` | Nenhuma regra do jogo ou fórmula da calculadora foi modificada. |
| `js/armazenamento.js` | Intacto | `0` | Chave e formato do progresso salvo em `localStorage` inalterados. |
| `testes.html` | Intacto | `0` | Todos os 67 testes originais preservados e aprovados. |

---

## 3. Detalhamento das Alterações

### 3.1. Marca, Ícones e Estrutura HTML (`index.html` e `img/favicon.svg`)

1. **Logo oficial (`#i-logo` e `favicon.svg`):**
   - Vetorização fiel (`viewBox="0 0 47 47"`) da silhueta do lobo enviada pelo design, posicionada ao lado do nome **FINEdu** tanto na lateral (desktop/tablet deitado) quanto na barra superior (celular/tablet em pé).
2. **Estojo de ícones SVG (`<symbol>`):**
   - Substituição/adição dos ícones seguindo o Figma:
     - Menu: `#i-aprender` (casa), `#i-calculadora` (`+ − × =`), `#i-ligas` (medalha dourada), `#i-missoes` (baú), `#i-loja` (loja com toldo), `#i-perfil` (capelo roxo) e `#i-mais` (círculo com 3 pontos).
     - Trilha e cabeçalho da unidade: `#i-seta-esquerda`, `#i-menu-unidade` (3 barras horizontais), `#i-estrela-licao` (estrela de 6 pontas), `#i-bau`, `#i-bau-aberto` e `#i-trofeu`.
     - Contadores e coluna direita: `#i-sequencia` (chama), `#i-xp` (raio), `#i-moeda` (`$`), `#i-vida` (coração) e `#i-ligas-prata` (medalha prateada).
3. **Menu de navegação (`.menu`):**
   - Passou de 4 itens (`Aprender`, `Calculadora`, `Guia`, `Perfil`) para os **7 itens do Figma**: `APRENDER`, `CALCULADORA`, `LIGAS`, `MISSÕES`, `LOJA`, `PERFIL` e `MAIS`.
   - O **Guia** continua acessível diretamente pelo botão de **3 barras** (`#guia`) dentro do cartão de cada unidade.
4. **Novas seções de tela e coluna direita:**
   - Adicionadas `<section class="tela" id="tela-ligas">`, `tela-missoes`, `tela-loja` e `tela-mais` dentro de `<main id="principal">`.
   - Em `<aside class="coluna-direita">`, o bloco antigo `<div id="dica">` deu lugar a `<div class="painel-lateral" id="painel-lateral">`.

---

### 3.2. Identidade Visual, Cores por Unidade e Layout (`css/estilo.css`)

1. **Paleta do Figma (modo escuro):**
   - Fundo principal: `#1B1F3C` (`--cor-fundo`)
   - Texto principal: `#E4E9E7` (`--cor-texto` / `--cor-titulo`)
   - Divisórias e bordas de cartão: `#262A4A` (`--cor-linha`) e `3px solid #262B4B` (`--cor-borda-cartao`, raio `17px`)
   - Destaque principal e item ativo do menu: `#343BDA` com fundo translúcido `rgba(52, 59, 218, 0.30)` e texto claro `#4B53F5`
   - Discos bloqueados na trilha: fundo `#2A2C53`, sombra `#1F2141` e ícone `#3E437D`
2. **Alternância de cores por unidade (mesma tonalidade e intensidade):**
   - `.bloco-unidade--tema-1` (**Unidade 1 — Roxo**): `#343BDA` / sombra `#252A9E` / anel `#282D57`
   - `.bloco-unidade--tema-2` (**Unidade 2 — Laranja**): `#CA5726` / sombra `#8E3A15` / anel `#3A2A3B`
   - `.bloco-unidade--tema-3` (**Unidade 3 — Verde**): `#21965B` / sombra `#15663C` / anel `#203843`
   - Se novas unidades forem criadas, o ciclo (`1 → 2 → 3 → 1...`) repete automaticamente.
3. **Tipografia offline:**
   - Adicionada `@font-face` para `'Fredoka'` (`font-weight: 400 700`) apontando para `fontes/fredoka-latin-wght-normal.woff2`, mantendo `'Figtree'` para textos longos, enunciados e explicações.
4. **Trilha 3D sem bibliotecas externas:**
   - Cartão `.unidade` (`660 × 112px`, `border-radius: 17px`, vinco de `2px` na cor do fundo + sombra sólida de `5px`).
   - Botões `.no-botao` em formato de disco oval (`71 × 46px`, `border-radius: 50%`) com extrusão sólida de `8px`, efeito de afundar ao toque (`:active`) e anel oval externo (`95 × 74px`) destacando a lição atual (`.no--atual`).
5. **Layout responsivo em 3 modos:**
   - **Celular / tablet em pé:** barra superior fixa (`.topo`) com logo + contadores, trilha central e barra de navegação inferior fixa com os 7 ícones.
   - **Tablet deitado (`>= 768px` em `landscape`):** menu fixo na coluna esquerda + conteúdo principal.
   - **Notebook / desktop (`>= 1024px` em `landscape`):** grade de 3 colunas alinhada às proporções do Figma (`menu` à esquerda, `660px` da trilha ao centro e `324px` dos contadores + cartões à direita).
   - **Modo foco (`.modo-foco`):** continua ocultando menus e coluna direita durante lição, resultado, baú aberto e tela "sem vidas".
6. **Remoção de estilos legados:**
   - Removidas todas as classes do antigo mascote Estrela (`.estrela`, `.balao-estrela` e variações).

---

### 3.3. Desenho das Telas e Remoção do Mascote (`js/telas.js`)

1. **Remoção completa do mascote Estrela:**
   - A função `desenharEstrela` foi removida e substituída por ícones temáticos (`estrela-licao`, `vida`, `bau-aberto`, `perfil`, `configuracoes`) em todas as telas onde aparecia: trilha, vitória (`desenharResultado`), fim do treino (`desenharFimDoTreino`), sem vidas (`desenharSemVidas`), confirmação de saída (`desenharConfirmacaoDeSaida`) e perfil (`desenharPerfil`).
2. **Trilha e curva em S (`desenharTrilha` e `curvasDaUnidade`):**
   - Aplica automaticamente a classe `.bloco-unidade--tema-1/2/3` em cada unidade.
   - Cabeçalho `desenharCabecalhoDaUnidade` com `← UNIDADE X`, título grande e botão de 3 barras apontando para `#guia`.
   - Posiciona os discos em curva S idêntica ao Figma, intercalando o **Baú da unidade** (`desenharNoDoBau`) na curva esquerda e encerrando com o **Troféu da unidade** (`desenharNoDoTrofeu`) centralizado no final.
3. **Coluna da direita (`desenharColunaDireita`):**
   - Cartão **Desbloqueie as Ligas!** clicável (`href="#ligas"`), com medalha prateada e chamada *"Complete mais lições para competir"*.
   - Cartão **Missão do dia** com link `VER` (`href="#missoes"`), raio de XP, meta *"Ganhe 30 XP"*, barra de progresso dinâmica (`${xpMissao}/30`) calculada a partir de `progresso.xp` e ícone de baú.
4. **Novas telas do menu conectadas às funções do app:**
   - **`desenharConfiguracoes` (`#mais`):** centraliza as configurações do aplicativo — botão *Reiniciar progresso* (com confirmação inline `confirmar-reinicio` / `cancelar-reinicio`), atalho *Ver regras* (`data-acao="abrir-painel"`, abrindo o `<dialog>` *Como funciona*) e cartão *Sobre o FinEdu* (aviso de `podeSalvar` incluso quando o navegador bloqueia armazenamento).
   - **`desenharLoja` (`#loja`):** exibe o saldo atual de moedas do aluno e conecta a **Recarga de Vidas** (`20 moedas` para recuperar as `5 vidas`, habilitada quando `progresso.vidas === 0` e há moedas suficientes).
   - **`desenharMissoes` (`#missoes`):** detalha o progresso da missão diária de `30 XP` e o andamento das lições + baú da Unidade 1.
   - **`desenharLigas` (`#ligas`):** apresenta o painel das ligas e quantas lições da Unidade 1 já foram concluídas.
   - **`desenharPerfil` (`#perfil`):** exibe o cartão de nível atual (`nivelDoXp`), barra/texto de XP restante para o próximo nível e grade de 4 estatísticas (sequência, XP total, precisão e moedas).
5. **Funções mantidas sem alteração de contrato (compatibilidade total com `testes.html`):**
   - `desenharContadores`, `desenharPainel`, `desenharBoasVindas`, `textoDepoisDoErro` e todas as funções das 3 abas da `desenharCalculadora`.

---

### 3.4. Navegação e Eventos (`js/app.js`)

1. **Novas telas registradas em `TELAS_DO_MENU`:**
   - `['aprender', 'calculadora', 'ligas', 'missoes', 'loja', 'perfil', 'mais', 'guia']`.
2. **Sincronização da coluna direita:**
   - `mostrarTela(tela)` chama `desenharColunaDireita(estado.progresso)` junto com `atualizarContadores(estado.progresso)`, mantendo a barra `0/30` da Missão do dia sempre atualizada após concluir lições ou reiniciar o progresso.
3. **Novas ações conectadas em `tratarClique`:**
   - `abrir-trofeu` → `tocarNoTrofeu(idUnidade)`: se o baú da unidade estiver liberado, abre a comemoração do baú; se já foi aberto, exibe aviso de troféu conquistado; se ainda trancado, orienta a concluir as lições da unidade.
   - `recarregar-loja` → `recarregarNaLoja()`: executa `recarregarVidas(estado.progresso)` do `jogo.js`, salva no `localStorage`, atualiza contadores/tela da Loja e mostra confirmação.

---

### 3.5. Conteúdo da Trilha (`js/dados-licoes.js`)

1. Capitalização do título provisório da `ef-unidade-1` de `'Primeiros passos'` para `'Primeiros Passos'`, igual ao cartão do Figma.
2. Inclusão do bloco `ef-unidade-3` (`titulo: 'Em breve'`, com 3 lições `emBreve: true`) logo após `ef-unidade-2`, permitindo visualizar na trilha a alternância completa das 3 cores (**Roxo → Laranja → Verde**).

---

## 4. Mapa Rápido: Novo Visual → Função Conectada

| Elemento na Interface Nova | Ação / Destino Conectado |
|---|---|
| Logo `lobo + FINEdu` | Volta para `#aprender` |
| Menu **APRENDER** | Trilha de unidades e lições (`#aprender`) |
| Menu **CALCULADORA** | Calculadora de Metas com 3 abas (`#calculadora`) |
| Menu **LIGAS** / Cartão *Desbloqueie as Ligas!* | Tela de Ligas (`#ligas`) |
| Menu **MISSÕES** / Link `VER` em *Missão do dia* | Tela de Missões (`#missoes`) com progresso de XP ao vivo |
| Menu **LOJA** | Tela da Loja (`#loja`) com saldo de moedas e recarga de vidas (`recarregarVidas`) |
| Menu **PERFIL** | Tela de Perfil (`#perfil`) com nível, XP, sequência, precisão e moedas |
| Menu **MAIS** | Tela de Configurações (`#mais`): *Reiniciar progresso*, *Como funciona* e *Sobre o FinEdu* |
| Botão de **3 barras** no cartão da unidade | Abre o Guia da unidade (`#guia`) |
| Disco com **estrela / check** na trilha | Inicia lição ou treino (`abrir-licao`) |
| Disco com **baú** na curva da unidade | Abre o baú de recompensa da unidade (`abrir-bau`) |
| Disco com **troféu** no fim da unidade | Verifica/comemora a conclusão da unidade (`abrir-trofeu`) |
| Os **4 contadores** (`🔥`, `⚡`, `$`, `❤️`) | Abrem a janela `<dialog>` **Como funciona** direto na seção clicada (`abrir-painel`) |

---

## 5. Validação Executada

- **`testes.html` via servidor HTTP (`http://localhost:8080/testes.html`):** `Passaram todos os 67 testes.`
- **`testes.html` offline via arquivo local (`file://`):** `Passaram todos os 67 testes.`
- **Validador interno de conteúdo (`conferirConteudo()`):** zero alertas (`#problemas` permanece oculto).
- **Verificação visual em navegador real (Edge Headless):** conferidos desktop Full HD (`1920 × 1080`), rolagem das 3 unidades coloridas (`1440 × 2200`), tela `Mais / Configurações` e visualização mobile.

