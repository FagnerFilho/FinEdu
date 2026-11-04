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
  const classes = classeExtra ? `icone ${classeExtra}` : 'icone';
  return `<svg class="${classes}" aria-hidden="true" focusable="false"><use href="#i-${nome}"></use></svg>`;
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

// O que cada missão do dia conta, para o leitor de tela ("1 de 2 lições").
// A chave é a "conta" da missão (MISSOES, no jogo.js).
const NOMES_DOS_NUMEROS_DA_MISSAO = {
  licoes: ['lição', 'lições'],
  acertos: ['questão', 'questões'],
  perfeitas: ['lição perfeita', 'lições perfeitas'],
  contas: ['conta', 'contas']
};

// Espaço que não quebra a linha: o número fica junto do "XP" ("20 XP")
const ESPACO_FIXO = '\u00A0';

// Textos da recompensa da missão e do nível: os mesmos na vitória e no
// aviso da calculadora
function textoDaMissaoConcluida() {
  return `Missão do dia concluída: +${XP_DA_MISSAO}${ESPACO_FIXO}XP`;
}

// "Todo dia tem uma missão nova, que vale mais 20 XP." (tela Missões, painel
// e tutorial). O tutorial passa o valor: ver numerosDoTutorial().
function textoDaRegraDaMissao(xp = XP_DA_MISSAO) {
  return `Todo dia tem uma missão nova, que vale mais ${xp}${ESPACO_FIXO}XP.`;
}

function textoDoNivelQueSubiu(nivel) {
  return `Subiu para o nível ${nivel.numero}: ${nivel.nome}!`;
}

// Deslocamentos horizontais da curva em S dentro de cada unidade
// (fração de --amplitude-curva, seguindo o desenho do Figma).
// O troféu no fim da unidade fica sempre centralizado em 0.
function curvasDaUnidade(quantidadeAntesDoTrofeu) {
  if (quantidadeAntesDoTrofeu === 5) {
    return [0.47, -0.47, -1, -1, 0.36];
  }
  if (quantidadeAntesDoTrofeu === 4) {
    return [0.47, -0.47, -0.95, 0.32];
  }
  const padrao = [0.47, -0.47, -1, -1, -0.12, 0.65, 0.25, -0.45];
  return Array.from({ length: quantidadeAntesDoTrofeu }, (_, i) => padrao[i % padrao.length]);
}


// ============================================================
// 2. MENU, CONTADORES, COLUNA DIREITA E AVISOS
// ============================================================

// Marca no menu a tela atual (aria-current="page" destaca o item ativo)
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

// Os contadores aparecem na barra de cima (celular) e na coluna da direita (desktop)
function atualizarContadores(progresso) {
  for (const id of ['contadores-topo', 'contadores-coluna']) {
    const lugar = document.getElementById(id);
    if (lugar) lugar.innerHTML = desenharContadores(progresso);
  }
}

// Miolo do cartão "Missão do dia" (coluna da direita e tela Missões):
// a missão de hoje e a barra com o que o aluno já fez hoje. Recebe a
// situação da missão (situacaoDaMissao, no jogo.js).
function desenharCorpoDaMissao(missao) {
  const [singular, plural] = NOMES_DOS_NUMEROS_DA_MISSAO[missao.conta];
  const feito = `${missao.feito} de ${missao.meta} ${missao.meta === 1 ? singular : plural}`;
  const porcentagem = Math.round((missao.feito / missao.meta) * 100);

  return `
    <div class="missao-corpo">
      ${icone('xp', 'missao-raio')}
      <div class="missao-detalhes">
        <p class="missao-meta">${escaparHtml(missao.texto)}</p>
        <div class="missao-progresso-linha">
          <div class="missao-trilho" role="progressbar" aria-label="Progresso da missão: ${feito}"
            aria-valuemin="0" aria-valuemax="${missao.meta}" aria-valuenow="${missao.feito}">
            <span class="missao-preenchimento" style="width: ${porcentagem}%"></span>
            <span class="missao-contagem">${missao.feito}/${missao.meta}</span>
          </div>
          ${icone('missoes', 'missao-bau')}
        </div>
      </div>
    </div>`;
}

// Monta os cartões "Desbloqueie as Ligas!" e "Missão do dia" na coluna da direita
function desenharColunaDireita(progresso, hoje = hojeComoTexto()) {
  const lugar = document.getElementById('painel-lateral');
  if (!lugar) return;

  lugar.innerHTML = `
    <a class="cartao-lateral cartao-lateral--ligas" href="#ligas" aria-label="Desbloqueie as Ligas! Complete mais lições para competir">
      <h2 class="cartao-lateral-titulo">Desbloqueie as Ligas!</h2>
      <div class="cartao-lateral-corpo">
        ${icone('ligas-prata', 'cartao-lateral-medalha')}
        <p class="cartao-lateral-texto">Complete mais lições para competir</p>
      </div>
    </a>

    <section class="cartao-lateral cartao-lateral--missao" aria-labelledby="titulo-missao-lateral">
      <div class="cartao-lateral-cabecalho">
        <h2 class="cartao-lateral-titulo" id="titulo-missao-lateral">Missão do dia</h2>
        <a class="cartao-lateral-ver" href="#missoes">Ver</a>
      </div>
      ${desenharCorpoDaMissao(situacaoDaMissao(progresso, hoje))}
    </section>`;
}

// Aviso rápido que aparece embaixo e some sozinho (texto mais longo
// pode pedir mais tempo na tela)
let temporizadorDoAviso = null;

function mostrarAviso(texto, duracao = 2600) {
  const aviso = document.getElementById('aviso');
  aviso.textContent = texto;
  aviso.classList.add('aviso--visivel');
  clearTimeout(temporizadorDoAviso);
  temporizadorDoAviso = setTimeout(() => aviso.classList.remove('aviso--visivel'), duracao);
}

// Aviso da calculadora quando a conta termina a missão do dia (e,
// se for o caso, o nível que os XP da missão fizeram subir)
function avisarMissaoConcluida(recompensa) {
  const textos = [textoDaMissaoConcluida()];
  if (recompensa.subiuDeNivel) textos.push(textoDoNivelQueSubiu(recompensa.nivel));
  mostrarAviso(textos.join('. '), 4000);
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
// 3. TRILHA
// ============================================================

function desenharTrilha(lugar, progresso) {
  let html = '<h1 class="visualmente-oculto">Sua trilha</h1>';
  // Saudação com o apelido (Parte 4), com o avatar pequeno ao lado.
  // Sem apelido, nada aparece.
  if (progresso.apelido) {
    const avatar = avatarPeloId(progresso.avatar);
    const desenho = avatar ? `<span class="trilha-saudacao-avatar">${icone(`avatar-${avatar.id}`)}</span>` : '';
    html += `<p class="trilha-saudacao">${desenho}<span>Oi, ${escaparHtml(progresso.apelido)}!</span></p>`;
  }
  let numeroGlobalDaUnidade = 0;

  for (const trilha of CONTEUDO.trilhas) {
    if (trilha.unidades.length === 0) {
      html += `
        <section class="trilha trilha-futura">
          <h2 class="trilha-nome">${escaparHtml(trilha.titulo)}</h2>
          <span class="selo">Em breve</span>
        </section>`;
      continue;
    }

    html += `<section class="trilha" aria-label="${escaparHtml(trilha.titulo)}">`;

    trilha.unidades.forEach((unidade) => {
      numeroGlobalDaUnidade += 1;
      // Alterna a cor de cada unidade: 1 = roxo, 2 = laranja, 3 = verde
      const tema = ((numeroGlobalDaUnidade - 1) % 3) + 1;

      // Unidade sem nenhuma lição pronta: só um cartão compacto "Em breve"
      if (unidadeEmBreve(unidade)) {
        html += desenharUnidadeEmBreve(unidade, numeroGlobalDaUnidade, tema);
        return;
      }

      const curvas = curvasDaUnidade(unidade.licoes.length + 1);
      const indiceDoBau = unidade.licoes.length >= 4
        ? Math.ceil((unidade.licoes.length + 1) / 2)
        : Math.ceil(unidade.licoes.length / 2);
      let posNaCurva = 0;

      html += `<div class="bloco-unidade bloco-unidade--tema-${tema}">`;
      html += desenharCabecalhoDaUnidade(unidade, numeroGlobalDaUnidade);
      html += '<ol class="caminho">';

      unidade.licoes.forEach((licao, j) => {
        if (j === indiceDoBau) {
          html += desenharNoDoBau(
            progresso,
            unidade,
            `Baú da unidade ${numeroGlobalDaUnidade}`,
            curvas[posNaCurva++]
          );
        }
        html += desenharNoDaLicao(
          progresso,
          trilha,
          licao,
          `Unidade ${numeroGlobalDaUnidade}, lição ${j + 1}`,
          curvas[posNaCurva++]
        );
      });

      if (indiceDoBau >= unidade.licoes.length) {
        html += desenharNoDoBau(
          progresso,
          unidade,
          `Baú da unidade ${numeroGlobalDaUnidade}`,
          curvas[posNaCurva++]
        );
      }

      html += desenharNoDoTrofeu(
        progresso,
        unidade,
        `Troféu da unidade ${numeroGlobalDaUnidade}`
      );

      html += '</ol></div>';
    });

    html += '</section>';
  }

  lugar.innerHTML = html;
}

// Faixa colorida da unidade: "Unidade N" e o título
function desenharCabecalhoDaUnidade(unidade, numero) {
  return `
    <header class="unidade">
      <div class="unidade-info">
        <p class="unidade-rotulo">Unidade ${numero}</p>
        <h2 class="unidade-titulo">${escaparHtml(unidade.titulo)}</h2>
      </div>
    </header>`;
}

// Unidade ainda sem lições: cartão compacto "Em breve", sem o caminho de
// discos. A bolinha do cartão tem a cor da unidade (classe do tema).
function desenharUnidadeEmBreve(unidade, numero, tema) {
  const titulo = unidade.titulo.toLowerCase() === 'em breve'
    ? ''
    : `<p class="unidade-futura-titulo">${escaparHtml(unidade.titulo)}</p>`;

  return `
    <section class="unidade-futura bloco-unidade--tema-${tema}">
      <div>
        <h2 class="unidade-futura-nome">Unidade ${numero}</h2>
        ${titulo}
      </div>
      <span class="selo">Em breve</span>
    </section>`;
}

// Bolinha de lição: disco oval 3D com estrela de 5 pontas (ou check quando concluída)
function desenharNoDaLicao(progresso, trilha, licao, nome, curva) {
  const situacao = situacaoDaLicao(progresso, trilha, licao.id);

  const desenho = situacao === 'concluida' ? 'check' : 'estrela-licao';

  const descricao = {
    concluida: `${nome}, ${licao.titulo}: concluída. Toque para treinar.`,
    atual: `${nome}, ${licao.titulo}: começar.`,
    bloqueada: `${nome}, ${licao.titulo}: trancada.`,
    'em-breve': `${nome}: em breve.`
  }[situacao];

  return `
    <li class="no no--${situacao}" style="--curva: ${curva}">
      <div class="no-anel">
        <button type="button" class="no-botao" data-acao="abrir-licao" data-id="${escaparHtml(licao.id)}"
          aria-label="${escaparHtml(descricao)}">${icone(desenho)}</button>
      </div>
    </li>`;
}

// Nó do baú da unidade: disco oval 3D com o baú em cima
function desenharNoDoBau(progresso, unidade, nome, curva) {
  const situacao = situacaoDoBau(progresso, unidade);

  const descricao = {
    trancado: `${nome}: trancado.`,
    liberado: `${nome}: liberado. Toque para abrir.`,
    aberto: `${nome}: já aberto.`
  }[situacao];

  return `
    <li class="no no--bau no--bau-${situacao}" style="--curva: ${curva}">
      <div class="no-anel">
        <button type="button" class="no-botao no-botao--bau" data-acao="abrir-bau" data-id="${escaparHtml(unidade.id)}"
          aria-label="${descricao}">${icone(situacao === 'aberto' ? 'bau-aberto' : 'bau')}</button>
      </div>
    </li>`;
}

// Nó final da unidade: troféu centralizado no fim da curva
function desenharNoDoTrofeu(progresso, unidade, nome) {
  const situacaoBau = situacaoDoBau(progresso, unidade);
  const estadoTrofeu = situacaoBau === 'aberto' ? 'conquistado' : (situacaoBau === 'liberado' ? 'liberado' : 'trancado');

  const descricao = {
    trancado: `${nome}: conclua as lições da unidade para conquistar.`,
    liberado: `${nome}: abra o baú da unidade para concluir.`,
    conquistado: `${nome}: unidade concluída!`
  }[estadoTrofeu];

  return `
    <li class="no no--trofeu no--trofeu-${estadoTrofeu}" style="--curva: 0">
      <div class="no-anel">
        <button type="button" class="no-botao no-botao--trofeu" data-acao="abrir-trofeu" data-id="${escaparHtml(unidade.id)}"
          aria-label="${descricao}">${icone('trofeu')}</button>
      </div>
    </li>`;
}


// ============================================================
// 4. LIÇÃO
// ============================================================

function classeDaParte(sessao, i) {
  const vez = vezAtual(sessao);
  if (sessao.resultados[i] === true || sessao.consertadas.includes(i)) return 'barra-parte barra-parte--certa';
  if (vez.tipo !== 'aquecimento' && vez.indice === i) return 'barra-parte barra-parte--atual';
  if (sessao.resultados[i] === false) return 'barra-parte barra-parte--errada';
  return 'barra-parte';
}

function nomeDoAquecimento(sessao) {
  const total = sessao.aquecimento.length;
  return total > 1 ? `Aquecimento ${vezAtual(sessao).indice + 1} de ${total}` : 'Aquecimento';
}

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

function mostrarAlternativaMarcada(indice) {
  document.querySelectorAll('.alternativa').forEach((botao, i) => {
    const marcada = i === indice;
    botao.classList.toggle('alternativa--marcada', marcada);
    botao.setAttribute('aria-pressed', String(marcada));
  });
  const verificar = document.querySelector('[data-acao="verificar"]');
  if (verificar) verificar.disabled = false;
}

function textoDepoisDoErro(resultado, sessao) {
  let volta = resultado.tipo === 'revisao' ? 'Ela volta de novo no fim.' : 'Ela volta no fim para você acertar.';
  if (resultado.tipo === 'aquecimento' || resultado.acabaramAsVidas) volta = '';

  let semPerderVida = '';
  if (resultado.tipo === 'revisao') semPerderVida = 'Na revisão, errar não tira vida.';
  else if (resultado.tipo === 'aquecimento') semPerderVida = 'No aquecimento, errar não tira vida.';
  else if (sessao.treino) semPerderVida = 'No treino, errar não tira vida.';

  return [volta, semPerderVida].filter(Boolean).join(' ');
}

function mostrarCorrecao(resultado, sessao, progresso) {
  document.querySelectorAll('.alternativa').forEach((botao, i) => {
    botao.disabled = true;
    if (i === resultado.indiceDaCorreta) botao.classList.add('alternativa--certa');
    else if (i === sessao.escolhida) botao.classList.add('alternativa--errada');
    else botao.classList.add('alternativa--apagada');
  });

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
// 5. COMEMORAÇÃO, BAÚ E SEM VIDAS
// ============================================================

function desenharFaiscas() {
  return [1, 2, 3, 4].map(numero =>
    `<svg class="faisca faisca--${numero}" aria-hidden="true" focusable="false"><use href="#i-faisca"></use></svg>`
  ).join('');
}

function desenharSequenciaQueSubiu(resumo) {
  return resumo.sequenciaSubiu ? `
    <p class="comemoracao-sequencia">${icone('sequencia')} Sequência de ${contarCom(resumo.sequencia, 'dia', 'dias')}</p>` : '';
}

function desenharNivelQueSubiu(resumo) {
  return resumo.subiuDeNivel ? `
    <p class="comemoracao-nivel">${icone('nivel')} ${textoDoNivelQueSubiu(resumo.nivel)}</p>` : '';
}

// A lição (ou o treino) terminou a missão do dia: a linha vem antes da
// do nível, porque os XP da missão podem ser o que fez o aluno subir
function desenharMissaoConcluida(resumo) {
  return resumo.missaoConcluida ? `
    <p class="comemoracao-missao">${icone('missoes')} ${textoDaMissaoConcluida()}</p>` : '';
}

function desenharResultado(lugar, resumo) {
  if (resumo.treino) {
    desenharFimDoTreino(lugar, resumo);
    return;
  }

  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${icone('trofeu', 'icone-grande')}${desenharFaiscas()}</div>
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

      ${desenharMissaoConcluida(resumo)}
      ${desenharNivelQueSubiu(resumo)}
      ${desenharSequenciaQueSubiu(resumo)}

      <button type="button" class="botao" data-acao="voltar-trilha">Continuar</button>
    </div>`;
}

function desenharFimDoTreino(lugar, resumo) {
  lugar.innerHTML = `
    <div class="comemoracao">
      <div class="comemoracao-figura">${icone('trofeu', 'icone-grande')}${desenharFaiscas()}</div>
      <h1 class="comemoracao-titulo">Treino concluído!</h1>
      <p class="comemoracao-texto">${resumo.vidasVoltaram ? 'Suas vidas voltaram.' : 'Suas vidas já estavam completas.'}</p>

      <div class="placar">
        <div class="placar-item placar-item--vidas">
          <p class="placar-rotulo">Vidas</p>
          <p class="placar-valor">${icone('vida')}${resumo.vidas}</p>
        </div>
      </div>

      ${desenharMissaoConcluida(resumo)}
      ${desenharNivelQueSubiu(resumo)}
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
      <div class="comemoracao-figura">${icone('vida', 'icone-grande icone-grande--vida')}</div>
      <h1 class="comemoracao-titulo">Suas vidas acabaram</h1>
      <p class="comemoracao-texto">${texto}</p>
      ${temSaida ? `<div class="opcoes">${recarga}${treino}</div>` : ''}
      <button type="button" class="botao${temSaida ? ' botao--texto' : ''}" data-acao="voltar-trilha">Voltar para a trilha</button>
    </div>`;
}


// ============================================================
// 6. LIGAS, MISSÕES E LOJA
// ============================================================

// Tela Ligas: conectada ao progresso real de lições e nível do aluno
function desenharLigas(lugar, progresso) {
  const licoes = contarLicoes(progresso);
  const nivel = nivelDoXp(progresso.xp);

  lugar.innerHTML = `
    <div class="em-breve">
      <div class="em-breve-figura em-breve-figura--medalha">${icone('ligas-prata')}</div>
      <h1 class="em-breve-titulo">Desbloqueie as Ligas!</h1>
      <span class="selo">Em breve</span>
      <p class="em-breve-texto">Complete mais lições para competir com a turma. Hoje você está no <strong>Nível ${nivel.numero} (${nivel.nome})</strong> com <strong>${licoes.concluidas} de ${licoes.disponiveis}</strong> lições concluídas.</p>
      <a class="botao" href="#aprender">Continuar aprendendo</a>
    </div>`;
}

// Tela Missões: a missão de hoje, com o que o aluno já fez hoje, e a sequência
function desenharMissoes(lugar, progresso, hoje = hojeComoTexto()) {
  const missao = situacaoDaMissao(progresso, hoje);

  lugar.innerHTML = `
    <div class="secao-pagina">
      <header class="secao-pagina-topo">
        <h1 class="perfil-titulo">Missões</h1>
        <p class="perfil-sub">${textoDaRegraDaMissao()}</p>
      </header>

      <section class="cartao-lateral cartao-lateral--pagina" aria-labelledby="titulo-missao-pagina">
        <div class="cartao-lateral-cabecalho">
          <h2 class="cartao-lateral-titulo" id="titulo-missao-pagina">Missão do dia</h2>
          <span class="selo">${missao.concluida ? 'Concluída!' : 'Em andamento'}</span>
        </div>
        ${desenharCorpoDaMissao(missao)}
      </section>

      <section class="painel config-linha">
        <div>
          <p class="config-nome">Sequência de estudo: ${contarCom(progresso.sequencia, 'dia', 'dias')}</p>
          <p class="config-desc">Conclua pelo menos 1 lição por dia para manter sua ofensiva acesa.</p>
        </div>
        <a class="botao botao--compacto" href="#aprender">Ir para a trilha</a>
      </section>
    </div>`;
}

// Tela Loja: conectada à reserva de moedas e à recarga de vidas existente no jogo.js
function desenharLoja(lugar, progresso) {
  const podeComprar = podeRecarregar(progresso);
  let statusRecarga = `Suas vidas estão completas (${progresso.vidas}/${VIDAS_MAXIMAS}). Guarde suas moedas como reserva!`;
  if (progresso.vidas === 0 && podeComprar) {
    statusRecarga = `Você está sem vidas. Use ${PRECO_DA_RECARGA} moedas da sua reserva para restaurar todas as ${VIDAS_MAXIMAS} vidas agora.`;
  } else if (progresso.vidas === 0) {
    statusRecarga = `Você precisa de ${PRECO_DA_RECARGA} moedas para recarregar (ou refaça uma lição concluída como treino gratuito).`;
  } else if (progresso.vidas < VIDAS_MAXIMAS) {
    statusRecarga = `Você tem ${progresso.vidas} de ${VIDAS_MAXIMAS} vidas. A recarga libera quando as vidas chegam a 0.`;
  }

  lugar.innerHTML = `
    <div class="secao-pagina">
      <header class="secao-pagina-topo">
        <h1 class="perfil-titulo">Loja</h1>
        <p class="perfil-sub">Você tem <strong>${contarCom(progresso.moedas, 'moeda', 'moedas')}</strong> na sua reserva.</p>
      </header>

      <section class="painel config-linha">
        <div class="loja-item-info">
          ${icone('vida', 'loja-icone loja-icone--vida')}
          <div>
            <p class="config-nome">Recarga de Vidas (${PRECO_DA_RECARGA} moedas)</p>
            <p class="config-desc">${statusRecarga}</p>
          </div>
        </div>
        <button type="button" class="botao botao--compacto" data-acao="recarregar-loja" ${podeComprar ? '' : 'disabled'}>
          ${progresso.vidas === VIDAS_MAXIMAS ? 'Vidas cheias' : `Usar ${PRECO_DA_RECARGA} moedas`}
        </button>
      </section>

      <section class="painel config-linha">
        <div>
          <p class="config-nome">Como funcionam as moedas e vidas?</p>
          <p class="config-desc">Veja todas as regras da sua reserva, XP e níveis.</p>
        </div>
        <button type="button" class="botao botao--contorno botao--compacto" data-acao="abrir-painel" data-contador="moedas">
          Como funciona
        </button>
      </section>
    </div>`;
}


// ============================================================
// 7. CALCULADORA DE METAS
// ============================================================

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

function desenharPrazoEmMeses(resultado) {
  const equivalente = resultado.equivalenteAnos !== undefined
    ? resultado.equivalenteAnos
    : descreverEquivalenteEmAnos(resultado.meses);
  const textoMeses = contarCom(resultado.meses, 'mês', 'meses');
  return equivalente
    ? `<strong>${textoMeses}</strong> (${escaparHtml(equivalente)})`
    : `<strong>${textoMeses}</strong>`;
}

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
            <p class="rendimento-rotulo">Com juros compostos</p>
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
            <p class="rendimento-rotulo">Com juros compostos</p>
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
    botaoPrincipal = '<button type="button" class="botao" data-acao="calcular-futuro">Simular futuro</button>';
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
      ? '<button type="button" class="botao" data-acao="calcular-meta-juros">Calcular com juros</button>'
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
          data-acao="aba-sem-juros">Meta na gaveta</button>
        <button type="button" class="calculadora-aba${aba === 'com-juros' ? ' calculadora-aba--ativa' : ''}"
          role="tab" id="aba-com-juros" aria-selected="${aba === 'com-juros'}" aria-controls="painel-calculadora"
          data-acao="aba-com-juros">Meta com juros</button>
        <button type="button" class="calculadora-aba${aba === 'simular-futuro' ? ' calculadora-aba--ativa' : ''}"
          role="tab" id="aba-simular-futuro" aria-selected="${aba === 'simular-futuro'}" aria-controls="painel-calculadora"
          data-acao="aba-simular-futuro">Simular futuro</button>
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
// 8. PERFIL E CONFIGURAÇÕES (MAIS)
// ============================================================

function desenharEstatistica(tipo, nomeDoIcone, valor, nome) {
  return `
    <li class="estatistica estatistica--${tipo}">
      ${icone(nomeDoIcone)}
      <p><span class="estatistica-valor">${valor}</span><span class="estatistica-nome">${nome}</span></p>
    </li>`;
}

// O Perfil mostra o avatar e o apelido do onboarding. Sem avatar, fica o
// chapéu do menu; sem apelido, o título continua "Perfil".
function desenharPerfil(lugar, progresso) {
  const licoes = contarLicoes(progresso);
  const nivel = nivelDoXp(progresso.xp);
  const falta = nivel.proximo ? `Faltam ${nivel.faltam} XP para o nível ${nivel.proximo.numero}` : 'O nível mais alto';

  const avatar = avatarPeloId(progresso.avatar);
  const desenho = avatar
    ? `<div class="perfil-avatar" role="img" aria-label="Seu avatar: ${escaparHtml(avatar.nome)}">${icone(`avatar-${avatar.id}`, 'perfil-avatar-bicho')}</div>`
    : `<div class="perfil-avatar">${icone('perfil', 'perfil-avatar-icone')}</div>`;
  const titulo = progresso.apelido
    ? `<span class="visualmente-oculto">Perfil de </span>${escaparHtml(progresso.apelido)}`
    : 'Perfil';

  lugar.innerHTML = `
    <div class="perfil">
      <header class="perfil-topo">
        ${desenho}
        <div class="perfil-quem">
          <h1 class="perfil-titulo perfil-titulo--apelido">${titulo}</h1>
          <p class="perfil-sub">Seu progresso fica salvo só neste aparelho.</p>
          <button type="button" class="botao botao--contorno botao--compacto perfil-trocar"
            data-acao="trocar-apelido-e-avatar">Trocar apelido e avatar</button>
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

      <section class="painel config-linha">
        <div>
          <p class="config-nome">Configurações do aplicativo</p>
          <p class="config-desc">Reiniciar progresso, tutorial, regras do jogo e informações do projeto.</p>
        </div>
        <a class="botao botao--contorno botao--compacto" href="#mais">Abrir Configurações</a>
      </section>
    </div>`;
}

// Tela "Mais": as configurações do aplicativo (reiniciar progresso, ajuda e sobre)
function desenharConfiguracoes(lugar, progresso, podeSalvar) {
  lugar.innerHTML = `
    <div class="perfil">
      <header class="perfil-topo">
        <div class="perfil-avatar">${icone('ajustes', 'perfil-avatar-icone')}</div>
        <div>
          <h1 class="perfil-titulo">Configurações</h1>
          <p class="perfil-sub">Ajustes do aplicativo, ajuda das regras e informações.</p>
        </div>
      </header>

      <section aria-labelledby="titulo-configuracoes">
        <h2 class="secao-titulo" id="titulo-configuracoes">${icone('ajustes')} Progresso</h2>
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
            <p class="confirmacao-texto">XP, moedas, vidas, sequência e lições voltam ao começo, e o apelido e o avatar são apagados. Não dá para desfazer.</p>
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

      <section aria-labelledby="titulo-ajuda-config">
        <h2 class="secao-titulo" id="titulo-ajuda-config">${icone('info')} Como funciona</h2>
        <div class="painel painel--linhas">
          <div class="config-linha">
            <div>
              <p class="config-nome">Como usar o FinEdu</p>
              <p class="config-desc">Trilha, lição, vidas, XP e calculadora em ${cartoesDoTutorial().length} cartões.</p>
            </div>
            <button type="button" class="botao botao--contorno botao--compacto" data-acao="ver-tutorial">Ver tutorial</button>
          </div>
          <div class="config-linha">
            <div>
              <p class="config-nome">Regras de vidas, moedas, XP e níveis</p>
              <p class="config-desc">Entenda como ganhar recompensas e usar sua reserva.</p>
            </div>
            <button type="button" class="botao botao--contorno botao--compacto" data-acao="abrir-painel" data-contador="vidas">
              Ver regras
            </button>
          </div>
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
// 9. JANELAS: PAINEL "COMO FUNCIONA"
// ============================================================

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

function fecharJanelas() {
  for (const janela of document.querySelectorAll('dialog[open]')) janela.close();
}

function desenharParteDoPainel(qual, nomeDoIcone, titulo, paragrafos) {
  return `
    <section class="painel-parte painel-parte--${qual}" aria-labelledby="painel-${qual}">
      <h3 class="painel-parte-titulo" id="painel-${qual}" tabindex="-1">${icone(nomeDoIcone)}${titulo}</h3>
      ${paragrafos.map(texto => `<p>${texto}</p>`).join('')}
    </section>`;
}

function desenharPainel(progresso, hoje = hojeComoTexto()) {
  const nivel = nivelDoXp(progresso.xp);
  let sobreONivel = `Nível ${nivel.numero}, ${nivel.nome}: o mais alto.`;
  if (nivel.proximo) {
    sobreONivel = `Nível ${nivel.numero}, ${nivel.nome}. ` +
      `Faltam ${nivel.faltam} XP para o nível ${nivel.proximo.numero}, ${nivel.proximo.nome}.`;
    if (!proximoPasso(progresso)) sobreONivel += ' As próximas lições chegam em breve.';
  }

  // A missão de hoje entra no meio da frase: "A de hoje: conclua 1 lição."
  const missao = situacaoDaMissao(progresso, hoje);
  const missaoNaFrase = missao.texto.charAt(0).toLowerCase() + missao.texto.slice(1);
  const missaoDeHoje = missao.concluida ? 'A de hoje você já concluiu.' : `A de hoje: ${escaparHtml(missaoNaFrase)}.`;

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
          `ou certa no aquecimento, e ${XP_DO_BAU} no baú.`,
        `${textoDaRegraDaMissao()} ${missaoDeHoje}`
      ])}
      ${desenharParteDoPainel('sequencia', 'sequencia', `Sequência: ${contarCom(progresso.sequencia, 'dia', 'dias')}`, [
        'Conclua pelo menos uma lição por dia (treino também vale) para ela subir. Se passar um dia sem, volta a zero.'
      ])}
      <button type="button" class="botao" data-acao="fechar-painel">Entendi</button>
    </div>`;
}

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



// ============================================================
// 10. ONBOARDING: APELIDO, AVATAR E TUTORIAL (Parte 4)
// ============================================================
// Telas de foco (sem menu) com o esqueleto da lição: o conteúdo em cima e
// o botão principal embaixo, ao alcance do polegar. Cada uma recebe o
// "fluxo" que o app.js guarda enquanto o aluno passa por elas:
//   { modo, apelido, avatar, cartao }
// 'primeira-vez': apelido → avatar → tutorial. Dá para seguir sem apelido
//   e pular o tutorial, mas o aluno só chega à trilha pelo fim do fluxo.
// 'trocar': apelido → avatar, a partir do Perfil, com "Cancelar".
// 'mais': só o tutorial, a partir de Mais.

// "Etapa 1 de 3. " só para o leitor de tela (na tela, a etapa não aparece)
function textoDaEtapa(fluxo, numero) {
  const total = fluxo.modo === 'trocar' ? 2 : 3;
  return `<span class="visualmente-oculto">Etapa ${numero} de ${total}. </span>`;
}

// Botão de texto do canto de cima: "Cancelar" (trocar) e "Pular" ou
// "Fechar" (tutorial). O nome completo fica para o leitor de tela.
function desenharBotaoDoCanto(acao, texto, nomeCompleto) {
  return `<button type="button" class="botao-discreto" data-acao="${acao}" aria-label="${nomeCompleto}">${texto}</button>`;
}

function desenharCancelarTroca() {
  return `<div class="etapa-topo">${desenharBotaoDoCanto('cancelar-troca', 'Cancelar', 'Cancelar e voltar ao Perfil')}</div>`;
}

// Etapa 1: o apelido. Na primeira vez, é a primeira tela que o aluno vê
// (pelo QR code): o lobo grande e as boas-vindas são o destaque.
function desenharApelido(lugar, fluxo) {
  const primeiraVez = fluxo.modo === 'primeira-vez';
  const topo = primeiraVez ? `
        <div class="etapa-lobo">
          <svg class="etapa-lobo-marca" aria-hidden="true" focusable="false"><use href="#i-logo"></use></svg>
        </div>` : desenharCancelarTroca();
  const boasVindas = primeiraVez ? '<span class="etapa-boas-vindas">Boas-vindas ao FinEdu!</span> ' : '';

  lugar.innerHTML = `
    <div class="licao etapa">
      <div class="licao-conteudo">
        ${topo}
        <h1 class="etapa-titulo">${textoDaEtapa(fluxo, 1)}${boasVindas}<span class="etapa-pergunta">Como a gente te chama?</span></h1>
        <div class="campo etapa-campo">
          <label class="campo-rotulo" for="campo-apelido">Apelido <span class="campo-detalhe">(opcional)</span></label>
          <input class="campo-entrada" id="campo-apelido" name="apelido" type="text" maxlength="${APELIDO_MAXIMO}"
            value="${escaparHtml(fluxo.apelido)}" autocomplete="off" autocapitalize="words" spellcheck="false"
            enterkeyhint="next" aria-describedby="dica-apelido">
          <p class="campo-detalhe" id="dica-apelido">Ele fica salvo só neste aparelho.</p>
        </div>
      </div>

      <div class="licao-acoes">
        <div class="licao-acoes-dentro">
          <button type="button" class="botao" data-acao="confirmar-apelido">Continuar</button>
        </div>
      </div>
    </div>`;
}

// Etapa 2: o avatar. Os 6 bichos são botões de opção de verdade (as setas
// do teclado trocam, e o leitor de tela fala o nome e se está marcado).
// Um já vem marcado: o sorteado na primeira vez ou o atual, na troca.
function desenharEscolhaDoAvatar(lugar, fluxo) {
  const primeiraVez = fluxo.modo === 'primeira-vez';
  const opcoes = AVATARES.map(avatar => `
    <label class="avatar-opcao">
      <input class="avatar-radio" type="radio" name="avatar" value="${avatar.id}"${avatar.id === fluxo.avatar ? ' checked' : ''}>
      <span class="avatar-cartao">
        <span class="avatar-figura">${icone(`avatar-${avatar.id}`, 'avatar-desenho')}</span>
        <span class="avatar-nome">${escaparHtml(avatar.nome)}</span>
        <span class="avatar-marca">${icone('check')}</span>
      </span>
    </label>`).join('');

  lugar.innerHTML = `
    <div class="licao etapa">
      <div class="licao-conteudo">
        ${primeiraVez ? '' : desenharCancelarTroca()}
        <h1 class="etapa-titulo">${textoDaEtapa(fluxo, 2)}<span id="titulo-avatar">Escolha seu avatar</span></h1>
        ${primeiraVez ? '<p class="etapa-texto">Dá para trocar depois, no Perfil.</p>' : ''}
        <div class="avatares" role="radiogroup" aria-labelledby="titulo-avatar">${opcoes}</div>
      </div>

      <div class="licao-acoes">
        <div class="licao-acoes-dentro">
          <button type="button" class="botao" data-acao="confirmar-avatar">${primeiraVez ? 'Continuar' : 'Salvar'}</button>
        </div>
      </div>
    </div>`;
}

// Os números das regras que o tutorial conta, lidos das constantes do
// jogo.js: se uma regra mudar lá, o texto muda junto
function numerosDoTutorial() {
  return {
    questoes: QUESTOES_POR_LICAO,
    vidas: VIDAS_MAXIMAS,
    mesada: MESADA_DE_BOAS_VINDAS,
    recarga: PRECO_DA_RECARGA,
    xpPorAcerto: XP_POR_ACERTO,
    xpDaMissao: XP_DA_MISSAO
  };
}

// Os 5 cartões do tutorial "Como usar o FinEdu": a figura (ícones do
// estojo, cada um na cor da sua regra), o título e o texto
function cartoesDoTutorial(numeros = numerosDoTutorial()) {
  return [
    {
      id: 'trilha', icones: ['estrela-licao'], titulo: 'A trilha',
      texto: 'Cada lição concluída libera a próxima. No fim da unidade, tem um baú com prêmio.'
    },
    {
      id: 'licao', icones: ['check'], titulo: 'A lição',
      texto: `São ${numeros.questoes} questões, do fácil ao difícil. ` +
        'Errou? Você vê o porquê, e a questão volta no fim para você consertar.'
    },
    {
      id: 'vidas', icones: ['vida', 'moeda'], titulo: 'Vidas e moedas',
      texto: `Você começa com ${numeros.vidas} vidas e uma mesada de ${numeros.mesada} moedas. ` +
        'Errar uma questão nova tira 1 vida. ' +
        `Sem vidas? Recarregue com ${numeros.recarga} moedas da sua reserva ou treine de graça uma lição que você já fez.`
    },
    {
      id: 'xp', icones: ['xp'], titulo: 'XP e missão do dia',
      texto: `Cada acerto de primeira vale ${numeros.xpPorAcerto}${ESPACO_FIXO}XP, e o XP sobe o seu nível. ` +
        `${textoDaRegraDaMissao(numeros.xpDaMissao)} Na dúvida, toque nos contadores para ver as regras.`
    },
    {
      id: 'calculadora', icones: ['calculadora'], titulo: 'Calculadora de Metas',
      texto: 'Quer comprar alguma coisa? A Calculadora de Metas mostra quanto guardar por mês.'
    }
  ];
}

// Os contadores do aluno, como na barra de cima, para o cartão do XP
// mostrar do que ele está falando (só desenho: o leitor de tela pula)
function desenharContadoresDeExemplo(progresso) {
  const contadores = [
    ['sequencia', 'sequencia', progresso.sequencia],
    ['xp', 'xp', progresso.xp],
    ['moedas', 'moeda', progresso.moedas],
    ['vidas', 'vida', progresso.vidas]
  ].map(([qual, nomeDoIcone, valor]) => `<span class="contador--${qual}">${icone(nomeDoIcone)}${valor}</span>`).join('');
  return `<p class="tutorial-contadores" aria-hidden="true">${contadores}</p>`;
}

// Etapa 3 (e "Como usar o FinEdu", em Mais): um cartão por vez. Os cartões
// trocam no lugar, sem mexer no histórico do voltar do Android.
function desenharTutorial(lugar, fluxo, progresso) {
  const cartoes = cartoesDoTutorial();
  const total = cartoes.length;
  const numero = fluxo.cartao + 1;
  const cartao = cartoes[fluxo.cartao];
  const primeiraVez = fluxo.modo === 'primeira-vez';
  const ultimo = numero === total;

  const partes = cartoes
    .map((_, i) => `<span class="barra-parte${i <= fluxo.cartao ? ' barra-parte--atual' : ''}"></span>`)
    .join('');
  const canto = primeiraVez
    ? desenharBotaoDoCanto('fechar-tutorial', 'Pular', 'Pular o tutorial')
    : desenharBotaoDoCanto('fechar-tutorial', 'Fechar', 'Fechar o tutorial');
  const paraOLeitor = `${primeiraVez ? 'Etapa 3 de 3. ' : ''}Como usar o FinEdu, cartão ${numero} de ${total}: `;

  const voltar = fluxo.cartao > 0
    ? '<button type="button" class="botao botao--contorno" data-acao="cartao-anterior">Voltar</button>'
    : '';
  const principal = ultimo
    ? `<button type="button" class="botao" data-acao="fechar-tutorial">${primeiraVez ? 'Bora começar' : 'Entendi'}</button>`
    : '<button type="button" class="botao" data-acao="proximo-cartao">Próximo</button>';

  lugar.innerHTML = `
    <div class="licao etapa tutorial">
      <div class="licao-conteudo">
        <div class="licao-topo">
          <div class="barra" aria-hidden="true">${partes}</div>
          <p class="tutorial-contagem" aria-hidden="true">${numero} de ${total}</p>
          ${canto}
        </div>

        <div class="tutorial-cartao tutorial-cartao--${cartao.id}">
          <div class="tutorial-figura" aria-hidden="true">${cartao.icones.map(nome => icone(nome)).join('')}</div>
          <h1 class="tutorial-titulo"><span class="visualmente-oculto">${paraOLeitor}</span>${cartao.titulo}</h1>
          <p class="tutorial-texto">${cartao.texto}</p>
          ${cartao.id === 'xp' ? desenharContadoresDeExemplo(progresso) : ''}
          ${ultimo && primeiraVez ? '<p class="tutorial-nota">Para ver de novo, é só abrir Mais.</p>' : ''}
        </div>
      </div>

      <div class="licao-acoes">
        <div class="licao-acoes-dentro tutorial-botoes">${voltar}${principal}</div>
      </div>
    </div>`;
}
