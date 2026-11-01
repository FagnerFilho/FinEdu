// ============================================================
// telas.js — Desenha as telas do FinEdu
// ============================================================
// Cada função "desenhar..." recebe os dados e monta o HTML de
// uma tela. Este arquivo NÃO decide regras (pergunta ao jogo.js
// a situação de cada coisa) e NÃO salva nada (isso é com o
// app.js).
//
// Todo texto que vem do conteúdo passa por escaparHtml() antes
// de entrar na página: assim um "<" numa pergunta não quebra nada.
//
// Os botões não têm código de clique aqui. Cada um diz o que faz
// no atributo data-acao (ex.: data-acao="verificar"), e o app.js
// escuta todos os toques num lugar só.
// ============================================================


// ============================================================
// 1. AJUDANTES
// ============================================================

// Troca os caracteres especiais do HTML por versões seguras
function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Um ícone do estojo que está no começo do index.html
function icone(nome, classeExtra = '') {
  return `<svg class="icone ${classeExtra}" aria-hidden="true" focusable="false"><use href="#i-${nome}"></use></svg>`;
}

// "1 dia" ou "3 dias"
function contarCom(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`;
}

// Põe o foco no título da tela (leitores de tela anunciam a tela nova)
function focarTitulo(lugar) {
  const titulo = lugar.querySelector('h1');
  if (!titulo) return;
  titulo.setAttribute('tabindex', '-1');
  titulo.focus({ preventScroll: true });
}

// Textos fixos da interface
const TITULOS_DE_ACERTO = ['Mandou bem!', 'Isso aí!', 'Certinho!', 'Boa!', 'Arrasou!'];
const TITULOS_DE_ERRO = ['Quase!', 'Não foi dessa vez', 'Ops, essa não'];
const LETRAS = ['A', 'B', 'C', 'D'];

// Quanto cada bolinha anda para o lado (-1 = esquerda, 1 = direita).
// Repetindo esta lista, o caminho faz um S.
const CURVA_DA_TRILHA = [0, 0.75, 1, 0.75, 0, -0.75, -1, -0.75];


// ============================================================
// 2. A ESTRELA (mascote provisória)
// ============================================================
// Quando o designer entregar o desenho final, troque só esta
// função (por exemplo, por <img src="img/estrela-feliz.svg">).
// Expressões: 'feliz', 'comemorando' e 'triste'.

function desenharEstrela(expressao = 'feliz') {
  const olhos = {
    feliz: `
      <ellipse class="estrela-olho" cx="50" cy="56" rx="6" ry="8"/>
      <ellipse class="estrela-olho" cx="70" cy="56" rx="6" ry="8"/>
      <circle class="estrela-pupila" cx="51.5" cy="58" r="3.4"/>
      <circle class="estrela-pupila" cx="71.5" cy="58" r="3.4"/>`,
    comemorando: `
      <path class="estrela-traco" d="M44 58q6-8 12 0"/>
      <path class="estrela-traco" d="M64 58q6-8 12 0"/>`,
    triste: `
      <ellipse class="estrela-olho" cx="50" cy="58" rx="6" ry="7"/>
      <ellipse class="estrela-olho" cx="70" cy="58" rx="6" ry="7"/>
      <circle class="estrela-pupila" cx="50" cy="61" r="3.2"/>
      <circle class="estrela-pupila" cx="70" cy="61" r="3.2"/>
      <path class="estrela-traco estrela-traco--fino" d="M43 49l11-3"/>
      <path class="estrela-traco estrela-traco--fino" d="M77 49l-11-3"/>`
  };
  const bocas = {
    feliz: '<path class="estrela-traco" d="M52 70q8 7 16 0"/>',
    comemorando: '<path class="estrela-boca" d="M50 67q10 14 20 0z"/>',
    triste: '<path class="estrela-traco" d="M53 76q7-6 14 0"/>'
  };

  return `
    <svg class="estrela" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse class="estrela-sombra" cx="60" cy="114" rx="34" ry="5"/>
      <path class="estrela-corpo" d="M60 4C66 40 80 54 116 60C80 66 66 80 60 116C54 80 40 66 4 60C40 54 54 40 60 4Z"/>
      <path class="estrela-brilho" d="M60 4C64 30 72 44 88 52C74 50 64 40 60 4Z"/>
      ${olhos[expressao]}
      ${bocas[expressao]}
    </svg>`;
}


// ============================================================
// 3. MENU, CONTADORES, DICA E AVISOS
// ============================================================

// Marca no menu a tela atual (aria-current="page" pinta de azul)
function marcarMenu(telaAtual) {
  for (const link of document.querySelectorAll('.menu-item')) {
    if (link.dataset.tela === telaAtual) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

// Os contadores são botões: tocar em qualquer um abre o painel
// "Como funciona" (seção 9) já na parte dele
function desenharContadores(progresso) {
  const nivel = nivelDoXp(progresso.xp);
  const contadores = [
    { qual: 'sequencia', icone: 'sequencia', valor: progresso.sequencia,
      nome: `Sequência de ${contarCom(progresso.sequencia, 'dia', 'dias')}` },
    { qual: 'xp', icone: 'xp', valor: progresso.xp, nome: `${progresso.xp} XP, nível ${nivel.numero}` },
    { qual: 'moedas', icone: 'moeda', valor: progresso.moedas, nome: contarCom(progresso.moedas, 'moeda', 'moedas') },
    { qual: 'vidas', icone: 'vida', valor: progresso.vidas, nome: `${progresso.vidas} de ${VIDAS_MAXIMAS} vidas` }
  ];
  return contadores.map(contador => `
    <button type="button" class="contador contador--${contador.qual}" data-acao="abrir-painel"
      data-contador="${contador.qual}" aria-haspopup="dialog" aria-label="${contador.nome}. Ver como funciona">
      ${icone(contador.icone)}<span>${contador.valor}</span>
    </button>`).join('');
}

// Os contadores aparecem em dois lugares (barra de cima e coluna
// da direita); o CSS mostra só o que cabe na tela.
function atualizarContadores(progresso) {
  for (const id of ['contadores-topo', 'contadores-coluna']) {
    const lugar = document.getElementById(id);
    if (lugar) lugar.innerHTML = desenharContadores(progresso);
  }
}

function desenharDica(dica) {
  const lugar = document.getElementById('dica-da-estrela');
  if (!lugar) return;
  lugar.innerHTML = dica ? `
    <section class="dica" aria-labelledby="titulo-dica">
      <div class="dica-topo">
        ${desenharEstrela('feliz')}
        <h2 class="dica-titulo" id="titulo-dica">Dica da Estrela</h2>
      </div>
      <p>${escaparHtml(dica)}</p>
    </section>` : '';
}

// Aviso rápido que aparece embaixo e some sozinho
let temporizadorDoAviso = null;

function mostrarAviso(texto) {
  const aviso = document.getElementById('aviso');
  aviso.textContent = texto;
  aviso.classList.add('aviso--visivel');
  clearTimeout(temporizadorDoAviso);
  temporizadorDoAviso = setTimeout(() => aviso.classList.remove('aviso--visivel'), 2600);
}

// Texto só para leitores de tela (ex.: o feedback da resposta)
function anunciar(texto) {
  const regiao = document.getElementById('anuncio');
  regiao.textContent = '';
  setTimeout(() => { regiao.textContent = texto; }, 60);
}

// Caixa vermelha no topo quando o dados-licoes.js tem algo errado
function mostrarProblemasDoConteudo(problemas) {
  const caixa = document.getElementById('problemas');
  if (problemas.length === 0) {
    caixa.hidden = true;
    return;
  }
  console.warn('Problemas no dados-licoes.js:', problemas);
  caixa.innerHTML = `
    <div class="problemas-topo">
      <p class="problemas-titulo">${icone('alerta')} Tem algo fora do padrão no dados-licoes.js</p>
      <button type="button" class="botao-icone" data-acao="fechar-problemas" aria-label="Fechar este aviso">${icone('fechar')}</button>
    </div>
    <ul class="problemas-lista">
      ${problemas.map(problema => `<li>${escaparHtml(problema)}</li>`).join('')}
    </ul>`;
  caixa.hidden = false;
}

function esconderProblemasDoConteudo() {
  document.getElementById('problemas').hidden = true;
}


// ============================================================
// 4. TRILHA
// ============================================================

function desenharTrilha(lugar, progresso) {
  const estrela = escolherLugarDaEstrela(progresso);
  let html = '<h1 class="visualmente-oculto">Sua trilha</h1>';
  let posicao = 0;   // conta as bolinhas, para a curva continuar de uma unidade para outra

  for (const trilha of CONTEUDO.trilhas) {
    // Trilha ainda sem unidades: só o nome e "Em breve"
    if (trilha.unidades.length === 0) {
      html += `
        <section class="trilha trilha-futura">
          <h2 class="trilha-nome">${escaparHtml(trilha.titulo)}</h2>
          <span class="selo">Em breve</span>
        </section>`;
      continue;
    }

    html += `<section class="trilha"><h2 class="trilha-nome">${escaparHtml(trilha.titulo)}</h2>`;

    trilha.unidades.forEach((unidade, i) => {
      html += desenharCabecalhoDaUnidade(unidade, i + 1);
      html += '<ol class="caminho">';
      unidade.licoes.forEach((licao, j) => {
        html += desenharNoDaLicao(progresso, trilha, licao, `Unidade ${i + 1}, lição ${j + 1}`, posicao, estrela);
        posicao += 1;
      });
      html += desenharNoDoBau(progresso, unidade, `Baú da unidade ${i + 1}`, posicao, estrela);
      posicao += 1;
      html += '</ol>';
    });

    html += '</section>';
  }

  lugar.innerHTML = html;
}

function desenharCabecalhoDaUnidade(unidade, numero) {
  const emBreve = unidadeEmBreve(unidade);
  return `
    <header class="unidade${emBreve ? ' unidade--em-breve' : ''}">
      <p class="unidade-rotulo">Unidade ${numero}</p>
      <h3 class="unidade-titulo">${escaparHtml(unidade.titulo)}</h3>
      ${emBreve ? '<p class="unidade-texto">As lições desta unidade estão sendo preparadas.</p>' : ''}
    </header>`;
}

// Onde a Estrela fica na trilha e o que ela fala: ao lado do
// próximo passo (lição atual ou baú liberado). Se não houver,
// ao lado da primeira lição "em breve".
function escolherLugarDaEstrela(progresso) {
  const passo = proximoPasso(progresso);
  if (passo && passo.tipo === 'licao') {
    return {
      id: passo.licao.id,
      fala: passo.licao.falaDaEstrela || `Bora? Agora é "${passo.licao.titulo}"!`
    };
  }
  if (passo && passo.tipo === 'bau') {
    return { id: passo.unidade.id, fala: 'Tem prêmio no baú. Abre aí!' };
  }
  for (const trilha of CONTEUDO.trilhas) {
    const emBreve = licoesDaTrilha(trilha).find(item => item.licao.emBreve);
    if (emBreve) return { id: emBreve.licao.id, fala: 'Lições novas chegando. Fica de olho!' };
  }
  return null;
}

// A Estrela fica do lado vazio da curva
function desenharEstrelaGuia(fala, posicao) {
  const curva = CURVA_DA_TRILHA[posicao % CURVA_DA_TRILHA.length];
  const proximaCurva = CURVA_DA_TRILHA[(posicao + 1) % CURVA_DA_TRILHA.length];
  const lado = curva > 0 || (curva === 0 && proximaCurva >= 0) ? 'esquerda' : 'direita';
  return `
    <div class="estrela-guia estrela-guia--${lado}" aria-hidden="true">
      <p class="balao">${escaparHtml(fala)}</p>
      ${desenharEstrela('feliz')}
    </div>`;
}

// "nome" é como o leitor de tela chama a bolinha (ex.: "Unidade 1, lição 2")
function desenharNoDaLicao(progresso, trilha, licao, nome, posicao, estrela) {
  const situacao = situacaoDaLicao(progresso, trilha, licao.id);
  const curva = CURVA_DA_TRILHA[posicao % CURVA_DA_TRILHA.length];

  const desenho = {
    concluida: 'check',
    atual: 'estrela-licao',
    bloqueada: 'cadeado',
    'em-breve': 'cadeado'
  }[situacao];

  const descricao = {
    concluida: `${nome}, ${licao.titulo}: concluída. Toque para treinar.`,
    atual: `${nome}, ${licao.titulo}: começar.`,
    bloqueada: `${nome}, ${licao.titulo}: trancada.`,
    'em-breve': `${nome}: em breve.`
  }[situacao];

  return `
    <li class="no no--${situacao}" style="--curva: ${curva}">
      ${situacao === 'atual' ? '<span class="no-comecar" aria-hidden="true">Começar</span>' : ''}
      <div class="no-anel">
        <button type="button" class="no-botao" data-acao="abrir-licao" data-id="${escaparHtml(licao.id)}"
          aria-label="${escaparHtml(descricao)}">${icone(desenho)}</button>
        ${estrela && estrela.id === licao.id ? desenharEstrelaGuia(estrela.fala, posicao) : ''}
      </div>
    </li>`;
}

function desenharNoDoBau(progresso, unidade, nome, posicao, estrela) {
  const situacao = situacaoDoBau(progresso, unidade);
  const curva = CURVA_DA_TRILHA[posicao % CURVA_DA_TRILHA.length];

  const descricao = {
    trancado: `${nome}: trancado.`,
    liberado: `${nome}: liberado. Toque para abrir.`,
    aberto: `${nome}: já aberto.`
  }[situacao];

  return `
    <li class="no no--bau no--bau-${situacao}" style="--curva: ${curva}">
      <div class="no-anel">
        <button type="button" class="no-botao" data-acao="abrir-bau" data-id="${escaparHtml(unidade.id)}"
          aria-label="${descricao}">${icone(situacao === 'aberto' ? 'bau-aberto' : 'bau')}</button>
        ${estrela && estrela.id === unidade.id ? desenharEstrelaGuia(estrela.fala, posicao) : ''}
      </div>
    </li>`;
}

// ============================================================
// 5. LIÇÃO
// ============================================================

// Uma parte da barra para cada questão: verde quando o aluno acerta
// (de primeira ou na revisão), vermelha enquanto está errada e azul
// na vez dela (o aquecimento não tem parte na barra)
function classeDaParte(sessao, i) {
  const vez = vezAtual(sessao);
  if (sessao.resultados[i] === true || sessao.consertadas.includes(i)) return 'barra-parte barra-parte--certa';
  if (vez.tipo !== 'aquecimento' && vez.indice === i) return 'barra-parte barra-parte--atual';
  if (sessao.resultados[i] === false) return 'barra-parte barra-parte--errada';
  return 'barra-parte';
}

// "Aquecimento", ou "Aquecimento 1 de 2" quando ele tem duas questões
function nomeDoAquecimento(sessao) {
  const total = sessao.aquecimento.length;
  return total > 1 ? `Aquecimento ${vezAtual(sessao).indice + 1} de ${total}` : 'Aquecimento';
}

// O que o leitor de tela fala sobre a barra
function textoDaBarra(sessao) {
  const vez = vezAtual(sessao);
  const total = sessao.questoes.length;
  if (vez.tipo === 'aquecimento') return nomeDoAquecimento(sessao);
  if (vez.tipo === 'revisao') {
    const faltam = total - sessao.acertos - sessao.consertadas.length;
    return `Revisão: ${faltam === 1 ? 'falta 1 questão' : `faltam ${faltam} questões`}`;
  }
  return `Questão ${vez.indice + 1} de ${total}`;
}

// Etiqueta em cima da pergunta (aquecimento, nível ou revisão) e a
// nota ao lado
function desenharRotulos(sessao, questao) {
  const vez = vezAtual(sessao);
  if (vez.tipo === 'aquecimento') {
    const deOnde = sessao.aquecimento.length > 1 ? 'Questões da lição anterior.' : 'Questão da lição anterior.';
    return `
      <p class="etiqueta etiqueta--aquecimento">${nomeDoAquecimento(sessao)}</p>
      <p class="licao-nota">${deOnde} Errar não tira vida.</p>`;
  }
  if (vez.tipo === 'revisao') {
    return `
      <p class="etiqueta etiqueta--revisao">Revisão</p>
      <p class="licao-nota">Acerte para concluir a lição. Errar não tira vida.</p>`;
  }
  return `
    <p class="etiqueta etiqueta--${questao.dificuldade}">${NOME_DA_DIFICULDADE[questao.dificuldade]}</p>
    ${sessao.treino ? '<p class="licao-nota">Treino: errar não tira vida.</p>' : ''}`;
}

function desenharLicao(lugar, sessao, progresso) {
  const questao = questaoAtual(sessao);
  const total = sessao.questoes.length;
  const certas = sessao.acertos + sessao.consertadas.length;

  const partesDaBarra = sessao.questoes
    .map((_, i) => `<span class="${classeDaParte(sessao, i)}"></span>`)
    .join('');

  const alternativas = questao.alternativas.map((alternativa, i) => `
    <button type="button" class="alternativa" data-acao="escolher" data-indice="${i}" aria-pressed="false">
      <span class="alternativa-letra" aria-hidden="true">${LETRAS[i]}</span>
      <span>${escaparHtml(alternativa.texto)}</span>
    </button>`).join('');

  lugar.innerHTML = `
    <div class="licao">
      <div class="licao-conteudo">
        <div class="licao-topo">
          <button type="button" class="botao-icone" data-acao="sair-licao" aria-label="Sair da lição">${icone('fechar')}</button>
          <div class="barra" role="progressbar" aria-label="Progresso da lição"
            aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${certas}"
            aria-valuetext="${textoDaBarra(sessao)}">${partesDaBarra}</div>
          <p class="licao-vidas" id="licao-vidas">
            ${icone('vida')}<span id="licao-vidas-numero">${progresso.vidas}</span><span class="visualmente-oculto">vidas</span>
          </p>
        </div>

        <div class="licao-rotulos">${desenharRotulos(sessao, questao)}</div>
        <h1 class="licao-pergunta">${escaparHtml(questao.pergunta)}</h1>
        <div class="alternativas" role="group" aria-label="Alternativas">${alternativas}</div>
      </div>

      <div class="licao-acoes" id="licao-acoes">
        <div class="licao-acoes-dentro">
          <button type="button" class="botao" data-acao="verificar" disabled>Verificar</button>
        </div>
      </div>

      ${desenharConfirmacaoDeSaida(sessao.treino)}
    </div>`;
}

// Pinta a alternativa escolhida e libera o "Verificar"
function mostrarAlternativaMarcada(indice) {
  document.querySelectorAll('.alternativa').forEach((botao, i) => {
    const marcada = i === indice;
    botao.classList.toggle('alternativa--marcada', marcada);
    botao.setAttribute('aria-pressed', String(marcada));
  });
  const verificar = document.querySelector('[data-acao="verificar"]');
  if (verificar) verificar.disabled = false;
}

// A última frase do feedback de erro. A errada volta no fim da lição
// (na revisão); o aquecimento não volta. Onde errar não tira vida, o
// aluno fica sabendo na hora (as vidas lá em cima não mudam). Se as
// vidas acabaram, a próxima tela explica o que fazer.
function textoDepoisDoErro(resultado, sessao) {
  let volta = resultado.tipo === 'revisao' ? 'Ela volta de novo no fim.' : 'Ela volta no fim para você acertar.';
  if (resultado.tipo === 'aquecimento' || resultado.acabaramAsVidas) volta = '';

  let semPerderVida = '';
  if (resultado.tipo === 'revisao') semPerderVida = 'Na revisão, errar não tira vida.';
  else if (resultado.tipo === 'aquecimento') semPerderVida = 'No aquecimento, errar não tira vida.';
  else if (sessao.treino) semPerderVida = 'No treino, errar não tira vida.';

  return [volta, semPerderVida].filter(Boolean).join(' ');
}

// Depois do "Verificar": mostra a certa, a errada e o porquê
function mostrarCorrecao(resultado, sessao, progresso) {
  // 1. Pinta as alternativas
  document.querySelectorAll('.alternativa').forEach((botao, i) => {
    botao.disabled = true;
    if (i === resultado.indiceDaCorreta) botao.classList.add('alternativa--certa');
    else if (i === sessao.escolhida) botao.classList.add('alternativa--errada');
    else botao.classList.add('alternativa--apagada');
  });

  // 2. Atualiza a barra de progresso e as vidas (o aquecimento não
  //    tem parte na barra)
  const vez = vezAtual(sessao);
  const parte = vez.tipo === 'aquecimento' ? null : document.querySelectorAll('.barra-parte')[vez.indice];
  if (parte) {
    parte.classList.remove('barra-parte--atual');
    parte.classList.add(resultado.acertou ? 'barra-parte--certa' : 'barra-parte--errada');
  }
  if (resultado.perdeuVida) {
    document.getElementById('licao-vidas-numero').textContent = progresso.vidas;
    document.getElementById('licao-vidas').classList.add('licao-vidas--perdeu');
  }

  // 3. Monta o painel de baixo com a explicação
  const titulo = sortear(resultado.acertou ? TITULOS_DE_ACERTO : TITULOS_DE_ERRO);
  let explicacao;
  let textoParaLer;

  if (resultado.acertou) {
    explicacao = `<p class="feedback-texto">${escaparHtml(resultado.correta.explicacao)}</p>`;
    textoParaLer = `${titulo} ${resultado.correta.explicacao}`;
  } else {
    const depois = textoDepoisDoErro(resultado, sessao);
    explicacao = `
      <p class="feedback-texto"><strong>Por que não:</strong> ${escaparHtml(resultado.escolhida.explicacao)}</p>
      <p class="feedback-texto"><strong>Resposta certa:</strong> ${escaparHtml(resultado.correta.texto)}</p>
      <p class="feedback-texto">${escaparHtml(resultado.correta.explicacao)}</p>
      ${depois ? `<p class="feedback-texto">${depois}</p>` : ''}`;
    textoParaLer = `${titulo} Por que não: ${resultado.escolhida.explicacao} ` +
      `Resposta certa: ${resultado.correta.texto}. ${resultado.correta.explicacao} ${depois}`;
  }

  const tipo = resultado.acertou ? 'acerto' : 'erro';
  const acoes = document.getElementById('licao-acoes');
  acoes.className = `licao-acoes licao-acoes--${tipo}`;
  acoes.innerHTML = `
    <div class="licao-acoes-dentro">
      <div class="feedback">
        <p class="feedback-titulo">
          <span class="feedback-icone">${icone(resultado.acertou ? 'check' : 'fechar')}</span>${titulo}
        </p>
        ${explicacao}
      </div>
      <button type="button" class="botao botao--${tipo}" data-acao="continuar">Continuar</button>
    </div>`;

  // 4. Avisa os leitores de tela e põe o foco no "Continuar"
  anunciar(textoParaLer);
  acoes.querySelector('[data-acao="continuar"]').focus({ preventScroll: true });
}

function desenharConfirmacaoDeSaida(treino) {
  const textos = treino
    ? { titulo: 'Sair do treino?', texto: 'Se sair agora, as vidas não voltam.', ficar: 'Continuar o treino', sair: 'Sair do treino' }
    : { titulo: 'Sair da lição?', texto: 'O que você fez nesta lição não vai contar, e as vidas que perdeu não voltam.',
        ficar: 'Continuar a lição', sair: 'Sair da lição' };

  return `
    <div class="folha" id="confirmar-saida" hidden>
      <div class="folha-caixa" role="dialog" aria-modal="true" aria-labelledby="titulo-sair">
        ${desenharEstrela('triste')}
        <h2 class="folha-titulo" id="titulo-sair">${textos.titulo}</h2>
        <p class="folha-texto">${textos.texto}</p>
        <div class="folha-botoes">
          <button type="button" class="botao" data-acao="cancelar-saida">${textos.ficar}</button>
          <button type="button" class="botao botao--texto" data-acao="confirmar-saida">${textos.sair}</button>
        </div>
      </div>
    </div>`;
}

function mostrarConfirmacaoDeSaida(mostrar) {
  const folha = document.getElementById('confirmar-saida');
  if (!folha) return;
  folha.hidden = !mostrar;
  if (mostrar) folha.querySelector('[data-acao="cancelar-saida"]').focus();
}


// ============================================================
// 6. COMEMORAÇÃO, BAÚ E SEM VIDAS
// ============================================================

// As faíscas em volta da figura (a mesma estrela da logo)
function desenharFaiscas() {
  return [1, 2, 3, 4].map(numero =>
    `<svg class="faisca faisca--${numero}" aria-hidden="true" focusable="false"><use href="#i-faisca"></use></svg>`
  ).join('');
}

// A linha da sequência, quando ela sobe
function desenharSequenciaQueSubiu(resumo) {
  return resumo.sequenciaSubiu ? `
    <p class="comemoracao-sequencia">${icone('sequencia')} Sequência de ${contarCom(resumo.sequencia, 'dia', 'dias')}</p>` : '';
}

// O aviso de nível novo, quando o XP da lição (ou do baú) faz subir
function desenharNivelQueSubiu(resumo) {
  return resumo.subiuDeNivel ? `
    <p class="comemoracao-nivel">${icone('nivel')} Subiu para o nível ${resumo.nivel.numero}: ${resumo.nivel.nome}!</p>` : '';
}

function desenharResultado(lugar, resumo) {
  if (resumo.treino) {
    desenharFimDoTreino(lugar, resumo);
    return;
  }

  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${desenharEstrela('comemorando')}${desenharFaiscas()}</div>
      <h1 class="comemoracao-titulo">${resumo.perfeita ? 'Lição perfeita!' : 'Lição concluída!'}</h1>
      <p class="comemoracao-texto">${escaparHtml(resumo.titulo)}</p>

      <div class="placar">
        <div class="placar-item placar-item--xp">
          <p class="placar-rotulo">XP</p>
          <p class="placar-valor">${icone('xp')}+${resumo.xp}</p>
        </div>
        <div class="placar-item placar-item--moedas">
          <p class="placar-rotulo">Moedas</p>
          <p class="placar-valor">${icone('moeda')}+${resumo.moedas}</p>
        </div>
        <div class="placar-item placar-item--precisao">
          <p class="placar-rotulo">Precisão</p>
          <p class="placar-valor">${resumo.precisao}%</p>
        </div>
      </div>

      ${desenharNivelQueSubiu(resumo)}
      ${desenharSequenciaQueSubiu(resumo)}

      <button type="button" class="botao" data-acao="voltar-trilha">Continuar</button>
    </div>`;
}

// Fim do treino: não vale XP nem moedas, só as vidas
function desenharFimDoTreino(lugar, resumo) {
  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${desenharEstrela('comemorando')}${desenharFaiscas()}</div>
      <h1 class="comemoracao-titulo">Treino concluído!</h1>
      <p class="comemoracao-texto">${resumo.vidasVoltaram ? 'Suas vidas voltaram.' : 'Suas vidas já estavam completas.'}</p>

      <div class="placar">
        <div class="placar-item placar-item--vidas">
          <p class="placar-rotulo">Vidas</p>
          <p class="placar-valor">${icone('vida')}${resumo.vidas}</p>
        </div>
      </div>

      ${desenharSequenciaQueSubiu(resumo)}

      <button type="button" class="botao" data-acao="voltar-trilha">Continuar</button>
    </div>`;
}

function desenharBauAberto(lugar, recompensa) {
  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${icone('bau-aberto', 'icone-grande')}${desenharFaiscas()}</div>
      <h1 class="comemoracao-titulo">Baú aberto!</h1>
      <p class="comemoracao-texto">Você concluiu a unidade "${escaparHtml(recompensa.tituloDaUnidade)}".</p>

      <div class="placar">
        <div class="placar-item placar-item--xp">
          <p class="placar-rotulo">XP</p>
          <p class="placar-valor">${icone('xp')}+${recompensa.xp}</p>
        </div>
        <div class="placar-item placar-item--moedas">
          <p class="placar-rotulo">Moedas</p>
          <p class="placar-valor">${icone('moeda')}+${recompensa.moedas}</p>
        </div>
      </div>

      ${desenharNivelQueSubiu(recompensa)}

      <button type="button" class="botao" data-acao="voltar-trilha">Continuar</button>
    </div>`;
}

// Sem vidas: recarregar com moedas (continua de onde parou) ou
// treinar de graça (a lição parada recomeça depois). Cada saída
// diz o que acontece; sem nenhuma das duas, as vidas voltam amanhã.
function desenharSemVidas(lugar, sessao, progresso) {
  const podePagar = podeRecarregar(progresso);
  const paraTreinar = licaoParaTreinar(progresso);

  let texto = `As ${VIDAS_MAXIMAS} vidas voltam amanhã. Aí é só tentar de novo.`;
  if (podePagar && paraTreinar) {
    texto = 'Use sua reserva de moedas ou treine de graça.';
  } else if (podePagar) {
    texto = 'Use sua reserva de moedas para continuar.';
  } else if (paraTreinar) {
    const quantas = progresso.moedas === 0 ? 'não tem nenhuma' : `tem ${progresso.moedas}`;
    texto = `Recarregar as vidas custa ${PRECO_DA_RECARGA} moedas, e você ${quantas}. Mas dá para treinar de graça.`;
  }

  const recarga = podePagar ? `
    <div class="opcao">
      <button type="button" class="botao" data-acao="recarregar-vidas">Recarregar vidas por ${PRECO_DA_RECARGA} moedas</button>
      <p class="opcao-texto">As ${VIDAS_MAXIMAS} vidas voltam, e você continua de onde parou.</p>
    </div>` : '';

  // Se o aluno já tinha respondido algo, avisa que a lição parada recomeça
  const recomeca = sessao.respondidas > 0 ? ` Depois, "${escaparHtml(sessao.licao.titulo)}" recomeça do zero.` : '';
  const treino = paraTreinar ? `
    <div class="opcao">
      <button type="button" class="botao${podePagar ? ' botao--contorno' : ''}" data-acao="treinar"
        data-id="${escaparHtml(paraTreinar.id)}">Treinar de graça</button>
      <p class="opcao-texto">Refaça "${escaparHtml(paraTreinar.titulo)}" sem perder vida. No fim, as ${VIDAS_MAXIMAS} vidas voltam.${recomeca}</p>
    </div>` : '';

  const temSaida = podePagar || paraTreinar;
  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${desenharEstrela('triste')}</div>
      <h1 class="comemoracao-titulo">Suas vidas acabaram</h1>
      <p class="comemoracao-texto">${texto}</p>
      ${temSaida ? `<div class="opcoes">${recarga}${treino}</div>` : ''}
      <button type="button" class="botao${temSaida ? ' botao--texto' : ''}" data-acao="voltar-trilha">Voltar para a trilha</button>
    </div>`;
}


// ============================================================
// 7. CALCULADORA DE METAS E EM BREVE (Guia)
// ============================================================

const TELAS_EM_BREVE = {
  calculadora: {
    icone: 'calculadora',
    titulo: 'Calculadora de Metas',
    texto: 'Aqui você vai simular quanto junta guardando um pouco de dinheiro todo mês.'
  },
  guia: {
    icone: 'guia',
    titulo: 'Guia',
    texto: 'Explicações curtas sobre guardar e investir dinheiro. Quem é menor de idade só investe por meio de um responsável.'
  }
};

function desenharEmBreve(lugar, qual) {
  const tela = TELAS_EM_BREVE[qual];
  lugar.innerHTML = `
    <div class="em-breve">
      <div class="em-breve-figura">${icone(tela.icone)}</div>
      <h1 class="em-breve-titulo">${tela.titulo}</h1>
      <span class="selo">Em breve</span>
      <p class="em-breve-texto">${tela.texto}</p>
      <a class="botao botao--contorno" href="#aprender">Ir para a trilha</a>
    </div>`;
}

// Monta a barra de progresso visual quando o aluno já tem parte da meta guardada
function desenharBarraProgressoDaMeta(resultado) {
  if (!resultado || resultado.guardado <= 0 || resultado.metaAtingida) return '';
  return `
    <div class="meta-progresso">
      <p class="meta-progresso-texto">
        Você já tem <strong>${escaparHtml(formatarMoeda(resultado.guardado))}</strong> (${resultado.porcentagemGuardada}% da meta). Faltam ${escaparHtml(formatarMoeda(resultado.falta))}.
      </p>
      <div class="meta-progresso-trilho" role="progressbar" aria-label="Progresso já guardado da meta"
        aria-valuemin="0" aria-valuemax="100" aria-valuenow="${resultado.porcentagemGuardada}">
        <span class="meta-progresso-preenchimento" style="width: ${resultado.porcentagemGuardada}%"></span>
      </div>
    </div>`;
}

// Formata o trecho de meses em HTML, acrescentando os anos entre parênteses acima de 12 meses
function desenharPrazoEmMeses(resultado) {
  const equivalente = resultado.equivalenteAnos !== undefined
    ? resultado.equivalenteAnos
    : descreverEquivalenteEmAnos(resultado.meses);
  const textoMeses = contarCom(resultado.meses, 'mês', 'meses');
  return equivalente
    ? `<strong>${textoMeses}</strong> (${escaparHtml(equivalente)})`
    : `<strong>${textoMeses}</strong>`;
}

// Monta o cartão de resultado (Aba 1: Sem Juros, Aba 2: Com Juros ou Aba 3: Simular Futuro)
function desenharResultadoCalculadora(resultado) {
  if (!resultado || !resultado.valido) return '';

  const comJuros = resultado.modo === 'com-juros';
  const simularFuturoModo = resultado.modo === 'simular-futuro';
  const avisoFixo = (comJuros || simularFuturoModo) ? `
    <p class="calculadora-aviso">
      ${icone('info')}
      <span>Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável.</span>
    </p>` : '';

  if (simularFuturoModo) {
    return `
      <section class="painel calculadora-resultado" aria-label="Resultado da simulação de futuro">
        <p class="calculadora-destaque">
          Guardando <strong>${escaparHtml(resultado.aporteFormatado)} por mês</strong> durante <strong>${contarCom(resultado.anos, 'ano', 'anos')}</strong> (${resultado.meses} meses), você vai acumular <strong>${escaparHtml(resultado.montanteFinalComJurosFormatado)}</strong>!
        </p>

        <div class="rendimento-comparativo">
          <div class="rendimento-item">
            <p class="rendimento-rotulo">Total que você depositou</p>
            <p class="rendimento-valor">${escaparHtml(resultado.totalInvestidoDoBolsoFormatado)}</p>
            <p class="rendimento-detalhe">Saído do seu bolso (na gaveta)</p>
          </div>
          <div class="rendimento-item rendimento-item--juros">
            <p class="rendimento-rotulo">Com Juros Compostos</p>
            <p class="rendimento-valor">${escaparHtml(resultado.montanteFinalComJurosFormatado)}</p>
            <p class="rendimento-detalhe">+ ${escaparHtml(resultado.rendimentoTotalFormatado)} só de juros trabalhando pra você</p>
          </div>
        </div>

        <div class="meta-progresso proporcao-futuro">
          <p class="meta-progresso-texto">
            <strong>${resultado.porcentagemRendimento}%</strong> do seu dinheiro final veio só dos rendimentos!
          </p>
          <div class="proporcao-trilho" role="img"
            aria-label="${resultado.porcentagemBolso}% saiu do seu bolso e ${resultado.porcentagemRendimento}% veio dos rendimentos">
            <span class="proporcao-parte proporcao-parte--bolso" style="width: ${resultado.porcentagemBolso}%"></span>
            <span class="proporcao-parte proporcao-parte--juros" style="width: ${resultado.porcentagemRendimento}%"></span>
          </div>
          <div class="proporcao-legenda" aria-hidden="true">
            <span class="proporcao-legenda-item proporcao-legenda-item--bolso">Do seu bolso (${resultado.porcentagemBolso}%)</span>
            <span class="proporcao-legenda-item proporcao-legenda-item--juros">Dos rendimentos (${resultado.porcentagemRendimento}%)</span>
          </div>
        </div>

        ${avisoFixo}
        <div class="calculadora-botoes">
          <button type="button" class="botao botao--contorno" data-acao="limpar-calculadora">Limpar / Nova meta</button>
        </div>
      </section>`;
  }

  if (resultado.metaAtingida) {
    const sobra = resultado.sobra > 0
      ? `<p class="calculadora-subtexto">Passou <strong>${escaparHtml(formatarMoeda(resultado.sobra))}</strong> da meta de ${escaparHtml(formatarMoeda(resultado.custo))}.</p>`
      : '';
    return `
      <section class="painel calculadora-resultado calculadora-resultado--atingida" aria-label="Resultado da meta">
        <p class="calculadora-destaque">${escaparHtml(resultado.mensagem)}</p>
        ${sobra}
        ${avisoFixo}
        <div class="calculadora-botoes">
          <button type="button" class="botao botao--contorno" data-acao="limpar-calculadora">Limpar / Nova meta</button>
        </div>
      </section>`;
  }

  const barraProgresso = desenharBarraProgressoDaMeta(resultado);
  const prazoHtml = desenharPrazoEmMeses(resultado);

  if (comJuros) {
    return `
      <section class="painel calculadora-resultado" aria-label="Resultado da meta com juros">
        <p class="calculadora-destaque">
          Guardando <strong>${escaparHtml(resultado.mensalFormatado)} por mês</strong>, você chega lá em ${prazoHtml}.
        </p>
        <p class="calculadora-subtexto">
          Isso dá uns <strong>${escaparHtml(resultado.semanalFormatado)} por semana</strong> — você economiza <strong>${escaparHtml(resultado.economiaMensalFormatada)} por mês</strong> (<strong>${escaparHtml(resultado.economiaTotalFormatada)} no total</strong>) em relação a guardar sem juros.
        </p>
        ${barraProgresso}
        <div class="rendimento-comparativo">
          <div class="rendimento-item">
            <p class="rendimento-rotulo">Total tirado do bolso (sem juros)</p>
            <p class="rendimento-valor">${escaparHtml(resultado.totalTiradoDoBolsoFormatado)}</p>
            <p class="rendimento-detalhe">Na gaveta seria ${escaparHtml(resultado.totalSemJurosFormatado)} (${escaparHtml(resultado.mensalSemJurosFormatado)}/mês)</p>
          </div>
          <div class="rendimento-item rendimento-item--juros">
            <p class="rendimento-rotulo">Com Juros Compostos</p>
            <p class="rendimento-valor">${escaparHtml(resultado.totalComJurosFormatado)}</p>
            <p class="rendimento-detalhe">+ ${escaparHtml(resultado.rendimentoFormatado)} só de rendimento</p>
          </div>
        </div>
        ${avisoFixo}
        <div class="calculadora-botoes">
          <button type="button" class="botao botao--contorno" data-acao="limpar-calculadora">Limpar / Nova meta</button>
        </div>
      </section>`;
  }

  return `
    <section class="painel calculadora-resultado" aria-label="Resultado da meta">
      <p class="calculadora-destaque">
        Guardando <strong>${escaparHtml(resultado.mensalFormatado)} por mês</strong>, você chega lá em ${prazoHtml}.
      </p>
      <p class="calculadora-subtexto">
        Isso dá uns <strong>${escaparHtml(resultado.semanalFormatado)} por semana</strong>.
      </p>
      ${barraProgresso}
      <div class="calculadora-botoes">
        <button type="button" class="botao botao--contorno" data-acao="limpar-calculadora">Limpar / Nova meta</button>
      </div>
    </section>`;
}

// Monta a tela completa da Calculadora de Metas com as 3 abas independentes
function desenharCalculadora(lugar, dados = {}) {
  const abasValidas = ['sem-juros', 'com-juros', 'simular-futuro'];
  const aba = abasValidas.includes(dados.aba) ? dados.aba : 'sem-juros';
  const comJuros = aba === 'com-juros';
  const modoFuturo = aba === 'simular-futuro';

  const custo = dados.custo !== undefined ? String(dados.custo) : '';
  const meses = dados.meses !== undefined ? String(dados.meses) : '';
  const aporte = dados.aporte !== undefined ? String(dados.aporte) : '';
  const anos = dados.anos !== undefined ? String(dados.anos) : '';
  const guardado = dados.guardado !== undefined ? String(dados.guardado) : '';
  const taxa = dados.taxa !== undefined ? String(dados.taxa) : '0,8';
  const resultado = dados.resultado || null;
  const temErro = Boolean(resultado && !resultado.valido);

  let camposDoFormulario = '';
  let botaoPrincipal = '';

  if (modoFuturo) {
    camposDoFormulario = `
        <div class="campo">
          <label class="campo-rotulo" for="campo-aporte">
            Quanto você vai guardar por mês? <span class="campo-detalhe">(em R$)</span>
          </label>
          <input class="campo-entrada" id="campo-aporte" name="aporte" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 200 ou 50,00" value="${escaparHtml(aporte)}">
        </div>

        <div class="campo">
          <label class="campo-rotulo" for="campo-anos">
            Por quantos anos você vai guardar? <span class="campo-detalhe">(em anos)</span>
          </label>
          <input class="campo-entrada" id="campo-anos" name="anos" type="text" inputmode="numeric"
            autocomplete="off" placeholder="Ex.: 5" value="${escaparHtml(anos)}">
        </div>

        <div class="campo">
          <label class="campo-rotulo" for="campo-guardado">
            Quanto você já tem guardado hoje? <span class="campo-detalhe">(em R$, opcional)</span>
          </label>
          <input class="campo-entrada" id="campo-guardado" name="guardado" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 0" value="${escaparHtml(guardado)}">
        </div>

        <div class="campo">
          <label class="campo-rotulo" for="campo-taxa">
            Taxa de juros ao mês (%) <span class="campo-detalhe">(só um exemplo, não é taxa real)</span>
          </label>
          <input class="campo-entrada" id="campo-taxa" name="taxa" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 0,8" value="${escaparHtml(taxa)}">
        </div>`;
    botaoPrincipal = '<button type="button" class="botao" data-acao="calcular-futuro">Simular Futuro</button>';
  } else {
    const rotuloCusto = 'Qual valor você quer atingir?';
    const rotuloMeses = comJuros
      ? 'Em quantos meses você quer atingir essa meta?'
      : 'Em quantos meses você quer chegar lá?';
    const campoTaxa = comJuros ? `
        <div class="campo">
          <label class="campo-rotulo" for="campo-taxa">
            Taxa de juros ao mês (%) <span class="campo-detalhe">(só um exemplo, não é taxa real)</span>
          </label>
          <input class="campo-entrada" id="campo-taxa" name="taxa" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 0,8" value="${escaparHtml(taxa)}">
        </div>` : '';

    camposDoFormulario = `
        <div class="campo">
          <label class="campo-rotulo" for="campo-custo">
            ${rotuloCusto} <span class="campo-detalhe">(em R$)</span>
          </label>
          <input class="campo-entrada" id="campo-custo" name="custo" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 300 ou 12,50" value="${escaparHtml(custo)}">
        </div>

        <div class="campo">
          <label class="campo-rotulo" for="campo-meses">
            ${rotuloMeses} <span class="campo-detalhe">(a partir de 1 mês)</span>
          </label>
          <input class="campo-entrada" id="campo-meses" name="meses" type="text" inputmode="numeric"
            autocomplete="off" placeholder="Ex.: 6 ou 24" value="${escaparHtml(meses)}">
        </div>

        <div class="campo">
          <label class="campo-rotulo" for="campo-guardado">
            Quanto você já tem guardado? <span class="campo-detalhe">(em R$, opcional)</span>
          </label>
          <input class="campo-entrada" id="campo-guardado" name="guardado" type="text" inputmode="decimal"
            autocomplete="off" placeholder="Ex.: 0" value="${escaparHtml(guardado)}">
        </div>
        ${campoTaxa}`;

    botaoPrincipal = comJuros
      ? '<button type="button" class="botao" data-acao="calcular-meta-juros">Calcular com Juros</button>'
      : '<button type="button" class="botao" data-acao="calcular-meta">Calcular</button>';
  }

  const html = `
    <div class="calculadora" data-aba-ativa="${aba}">
      <header class="calculadora-topo">
        <h1 class="calculadora-titulo">Calculadora de Metas</h1>
        <p class="calculadora-sub">Planeje uma meta ou simule quanto seu dinheiro pode render no futuro.</p>
      </header>

      <div class="calculadora-abas" role="tablist" aria-label="Modo da calculadora">
        <button type="button" class="calculadora-aba${aba === 'sem-juros' ? ' calculadora-aba--ativa' : ''}"
          role="tab" id="aba-sem-juros" aria-selected="${aba === 'sem-juros'}" aria-controls="painel-calculadora"
          data-acao="aba-sem-juros">Meta (Na Gaveta)</button>
        <button type="button" class="calculadora-aba${aba === 'com-juros' ? ' calculadora-aba--ativa' : ''}"
          role="tab" id="aba-com-juros" aria-selected="${aba === 'com-juros'}" aria-controls="painel-calculadora"
          data-acao="aba-com-juros">Meta (Com Juros)</button>
        <button type="button" class="calculadora-aba${aba === 'simular-futuro' ? ' calculadora-aba--ativa' : ''}"
          role="tab" id="aba-simular-futuro" aria-selected="${aba === 'simular-futuro'}" aria-controls="painel-calculadora"
          data-acao="aba-simular-futuro">Simular Futuro</button>
      </div>

      <div class="painel calculadora-formulario" id="painel-calculadora" role="tabpanel"
        aria-labelledby="aba-${aba}">
        ${camposDoFormulario}
        ${botaoPrincipal}
      </div>

      <div class="calculadora-erro" id="calculadora-erro" role="alert" aria-live="polite"${temErro ? '' : ' hidden'}>
        ${temErro ? `${icone('alerta')}<p>${escaparHtml(resultado.erro)}</p>` : ''}
      </div>

      <div class="calculadora-saida" id="calculadora-resultado" aria-live="polite">
        ${resultado && resultado.valido ? desenharResultadoCalculadora(resultado) : ''}
      </div>
    </div>`;

  if (lugar && typeof lugar === 'object' && 'innerHTML' in lugar) {
    lugar.innerHTML = html;
  }
  return html;
}

// Atualiza o erro ou o resultado na tela sem recriar os campos digitados
function mostrarResultadoCalculadora(resultado) {
  const caixaErro = document.getElementById('calculadora-erro');
  const caixaResultado = document.getElementById('calculadora-resultado');
  if (!caixaErro || !caixaResultado) return;

  if (!resultado) {
    caixaErro.hidden = true;
    caixaErro.innerHTML = '';
    caixaResultado.innerHTML = '';
    return;
  }

  if (!resultado.valido) {
    caixaResultado.innerHTML = '';
    caixaErro.innerHTML = `${icone('alerta')}<p>${escaparHtml(resultado.erro)}</p>`;
    caixaErro.hidden = false;
    return;
  }

  caixaErro.hidden = true;
  caixaErro.innerHTML = '';
  caixaResultado.innerHTML = desenharResultadoCalculadora(resultado);
}


// ============================================================
// 8. PERFIL (com as Configurações dentro)
// ============================================================

function desenharEstatistica(tipo, nomeDoIcone, valor, nome) {
  return `
    <li class="estatistica estatistica--${tipo}">
      ${icone(nomeDoIcone)}
      <p><span class="estatistica-valor">${valor}</span><span class="estatistica-nome">${nome}</span></p>
    </li>`;
}

function desenharPerfil(lugar, progresso, podeSalvar) {
  const licoes = contarLicoes(progresso);
  const nivel = nivelDoXp(progresso.xp);
  const falta = nivel.proximo ? `Faltam ${nivel.faltam} XP para o nível ${nivel.proximo.numero}` : 'O nível mais alto';

  lugar.innerHTML = `
    <div class="perfil">
      <header class="perfil-topo">
        <div class="perfil-avatar">${desenharEstrela('feliz')}</div>
        <div>
          <h1 class="perfil-titulo">Perfil</h1>
          <p class="perfil-sub">Seu progresso fica salvo só neste aparelho.</p>
        </div>
      </header>

      <section aria-labelledby="titulo-estatisticas">
        <h2 class="secao-titulo" id="titulo-estatisticas">Estatísticas</h2>
        <ul class="estatisticas">
          ${desenharEstatistica('nivel', 'nivel', `Nível ${nivel.numero}: ${nivel.nome}`, falta)}
          ${desenharEstatistica('sequencia', 'sequencia', progresso.sequencia, progresso.sequencia === 1 ? 'dia seguido' : 'dias seguidos')}
          ${desenharEstatistica('xp', 'xp', progresso.xp, 'XP no total')}
          ${desenharEstatistica('moedas', 'moeda', progresso.moedas, 'moedas')}
          ${desenharEstatistica('licoes', 'estrela-licao', `${licoes.concluidas}/${licoes.disponiveis}`, 'lições concluídas')}
          ${desenharEstatistica('precisao', 'alvo', `${precisaoGeral(progresso)}%`, 'de acertos')}
          ${desenharEstatistica('vidas', 'vida', `${progresso.vidas}/${VIDAS_MAXIMAS}`, 'vidas hoje')}
        </ul>
      </section>

      <section aria-labelledby="titulo-configuracoes">
        <h2 class="secao-titulo" id="titulo-configuracoes">${icone('ajustes')} Configurações</h2>
        <div class="painel">
          <div class="config-linha">
            <div>
              <p class="config-nome">Começar do zero</p>
              <p class="config-desc">Útil entre uma apresentação e outra.</p>
            </div>
            <button type="button" class="botao botao--contorno-erro botao--compacto" data-acao="reiniciar"
              aria-expanded="false" aria-controls="confirmar-reinicio">Reiniciar progresso</button>
          </div>

          <div class="confirmacao" id="confirmar-reinicio" hidden>
            <h3 class="confirmacao-titulo">Reiniciar todo o progresso?</h3>
            <p class="confirmacao-texto">XP, moedas, vidas, sequência e lições voltam ao começo. Não dá para desfazer.</p>
            <div class="confirmacao-botoes">
              <button type="button" class="botao botao--erro" data-acao="confirmar-reinicio">Reiniciar progresso</button>
              <button type="button" class="botao botao--contorno" data-acao="cancelar-reinicio">Cancelar</button>
            </div>
          </div>

          ${podeSalvar ? '' : `
            <p class="alerta-salvar">${icone('alerta')}
              Este navegador não está deixando salvar. O progresso some quando a página fechar.</p>`}
        </div>
      </section>

      <section aria-labelledby="titulo-sobre">
        <h2 class="secao-titulo" id="titulo-sobre">${icone('info')} Sobre o FinEdu</h2>
        <div class="painel sobre">
          <p>Projeto de extensão do curso de <strong>Engenharia de Computação da Uni-CET</strong> (Teresina-PI), feito para os alunos do <strong>CETI Dom Severino</strong>.</p>
          <p>Sem cadastro e sem coleta de dados pessoais.</p>
          <p>Versão 1</p>
        </div>
      </section>
    </div>`;
}

// Abre ou fecha a confirmação do "Reiniciar progresso"
function mostrarConfirmacaoDeReinicio(mostrar) {
  const caixa = document.getElementById('confirmar-reinicio');
  const botao = document.querySelector('[data-acao="reiniciar"]');
  if (!caixa) return;
  caixa.hidden = !mostrar;
  if (botao) botao.setAttribute('aria-expanded', String(mostrar));
  if (mostrar) caixa.querySelector('[data-acao="cancelar-reinicio"]').focus();
  else if (botao) botao.focus();
}


// ============================================================
// 9. JANELAS: PAINEL "COMO FUNCIONA" E BOAS-VINDAS
// ============================================================
// As janelas são <dialog> do navegador, abertas com showModal(): o
// Esc fecha sozinho, o Tab não sai da janela e a tela de trás não
// recebe toque. Fecham também pelo botão e tocando no fundo escuro
// (app.js).

// Abre uma janela e, quando ela fechar, devolve o foco para quem
// estava com ele antes (por exemplo, o contador tocado)
function abrirJanela(janela) {
  if (janela.open) return;
  const antes = document.activeElement;
  janela.addEventListener('close', () => {
    if (antes && document.body.contains(antes)) antes.focus();
  }, { once: true });
  janela.showModal();
}

function fecharJanela(id) {
  const janela = document.getElementById(id);
  if (janela && janela.open) janela.close();
}

// Fecha qualquer janela aberta (ao trocar de tela)
function fecharJanelas() {
  for (const janela of document.querySelectorAll('dialog[open]')) janela.close();
}

// Uma parte do painel: título com o ícone do contador e os parágrafos
function desenharParteDoPainel(qual, nomeDoIcone, titulo, paragrafos) {
  return `
    <section class="painel-parte painel-parte--${qual}" aria-labelledby="painel-${qual}">
      <h3 class="painel-parte-titulo" id="painel-${qual}" tabindex="-1">${icone(nomeDoIcone)}${titulo}</h3>
      ${paragrafos.map(texto => `<p>${texto}</p>`).join('')}
    </section>`;
}

// O conteúdo do painel, com os números do aluno. Só explica: a
// recarga continua só na tela "sem vidas". Os valores vêm das
// constantes do jogo.js, então o texto muda junto com elas.
function desenharPainel(progresso) {
  const nivel = nivelDoXp(progresso.xp);
  let sobreONivel = `Nível ${nivel.numero}, ${nivel.nome}: o mais alto.`;
  if (nivel.proximo) {
    sobreONivel = `Nível ${nivel.numero}, ${nivel.nome}. ` +
      `Faltam ${nivel.faltam} XP para o nível ${nivel.proximo.numero}, ${nivel.proximo.nome}.`;
    if (!proximoPasso(progresso)) sobreONivel += ' As próximas lições chegam em breve.';
  }

  return `
    <div class="folha-caixa folha-caixa--texto">
      <h2 class="folha-titulo" id="titulo-painel" tabindex="-1">Como funciona</h2>
      ${desenharParteDoPainel('vidas', 'vida', `Vidas: ${progresso.vidas} de ${VIDAS_MAXIMAS}`, [
        'Você perde 1 vida quando erra uma questão numa lição nova. ' +
          'Na revisão, no aquecimento e no treino, errar não tira vida.',
        'Acabaram? Dá para recarregar com moedas ou treinar de graça uma lição que você já fez. ' +
          'E amanhã elas voltam todas.'
      ])}
      ${desenharParteDoPainel('moedas', 'moeda', `Moedas: ${progresso.moedas}`, [
        `São a sua reserva: se as vidas acabarem no meio de uma lição, ${PRECO_DA_RECARGA} moedas ` +
          `recarregam as ${VIDAS_MAXIMAS}.`,
        `Você começou com uma mesada de ${MESADA_DE_BOAS_VINDAS} e ganha mais ao concluir uma lição nova ` +
          `(${MOEDAS_POR_LICAO}, ou ${MOEDAS_POR_LICAO + MOEDAS_LICAO_PERFEITA} se acertar todas de primeira) ` +
          `e ao abrir o baú (${MOEDAS_DO_BAU}).`
      ])}
      ${desenharParteDoPainel('xp', 'xp', `XP: ${progresso.xp}`, [
        sobreONivel,
        `XP são pontos de experiência: quanto mais você junta, maior o nível. Você ganha ${XP_POR_ACERTO} ` +
          `por acerto de primeira numa lição nova, ${XP_DE_REVISAO} por questão consertada na revisão ` +
          `ou certa no aquecimento, e ${XP_DO_BAU} no baú.`
      ])}
      ${desenharParteDoPainel('sequencia', 'sequencia', `Sequência: ${contarCom(progresso.sequencia, 'dia', 'dias')}`, [
        'Conclua pelo menos uma lição por dia (treino também vale) para ela subir. Se passar um dia sem, volta a zero.'
      ])}
      <button type="button" class="botao" data-acao="fechar-painel">Entendi</button>
    </div>`;
}

// Abre o painel já na parte do contador tocado ('vidas', 'moedas',
// 'xp' ou 'sequencia'): ela sobe para o alto da caixa (a das vidas,
// que é a primeira, fica logo embaixo do título "Como funciona") e o
// foco vai para o título dela
function mostrarPainel(progresso, qual) {
  const painel = document.getElementById('painel');
  if (!painel || painel.open) return;
  painel.innerHTML = desenharPainel(progresso);
  abrirJanela(painel);

  const caixa = painel.querySelector('.folha-caixa');
  const titulo = document.getElementById(`painel-${qual}`) || document.getElementById('titulo-painel');
  const parte = titulo.closest('section');
  caixa.scrollTop = 0;
  if (parte && parte !== caixa.querySelector('section')) {
    const distancia = parte.getBoundingClientRect().top - caixa.getBoundingClientRect().top;
    caixa.scrollTop = distancia - parseFloat(getComputedStyle(caixa).paddingTop);
  }
  titulo.focus({ preventScroll: true });
}

// O aviso de boas-vindas, para quem começa do zero: a mesada é a
// reserva, e os contadores explicam como o jogo funciona. Embaixo do
// texto, os contadores desenhados como estão na tela (só imagem).
function desenharBoasVindas(progresso) {
  const contadores = [
    ['sequencia', 'sequencia', progresso.sequencia],
    ['xp', 'xp', progresso.xp],
    ['moedas', 'moeda', progresso.moedas],
    ['vidas', 'vida', progresso.vidas]
  ].map(([qual, nomeDoIcone, valor]) => `<span class="contador--${qual}">${icone(nomeDoIcone)}${valor}</span>`).join('');
  const mesada = `Você ganhou uma mesada de ${MESADA_DE_BOAS_VINDAS} moedas. Ela é a sua reserva para quando as vidas acabarem.`;

  return `
    <div class="folha-caixa">
      <h2 class="folha-titulo" id="titulo-boas-vindas" tabindex="-1">Boas-vindas ao FinEdu!</h2>
      <p class="folha-texto">${mesada}</p>
      <p class="folha-texto">Na dúvida, toque nos contadores para entender vidas, moedas e XP.</p>
      <p class="boas-vindas-contadores" aria-hidden="true">${contadores}</p>
      <div class="folha-botoes">
        <button type="button" class="botao" data-acao="fechar-boas-vindas">Entendi</button>
      </div>
    </div>`;
}

function mostrarBoasVindas(progresso) {
  const janela = document.getElementById('boas-vindas');
  if (!janela || janela.open) return;
  janela.innerHTML = desenharBoasVindas(progresso);
  abrirJanela(janela);
  document.getElementById('titulo-boas-vindas').focus();
}
