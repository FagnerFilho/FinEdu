// ============================================================
// app.js — O maestro do FinEdu
// ============================================================
// Liga as peças. Todo toque segue o mesmo caminho:
//   1. descobre o que o aluno quer (pelo data-acao do botão);
//   2. pede a regra ao jogo.js;
//   3. salva com o armazenamento.js;
//   4. manda o telas.js desenhar o resultado.
// ============================================================


// ============================================================
// 1. ESTADO: o que está acontecendo agora
// ============================================================

const estado = {
  progresso: null,            // XP, moedas, vidas... (fica salvo no aparelho)
  sessao: null,               // lição aberta agora (null = nenhuma)
  resumo: null,               // resultado da última lição (tela de vitória)
  recompensaDoBau: null,      // o que veio no último baú aberto
  podeSalvar: true,           // o navegador deixa salvar?
  telaDeFocoEmpilhada: false  // ver voltarParaTrilha()
};

// Telas do menu ("mais" abre as configurações do app) e telas de foco (sem menu)
const TELAS_DO_MENU = ['aprender', 'calculadora', 'ligas', 'missoes', 'loja', 'perfil', 'mais', 'guia'];
const TELAS_DE_FOCO = ['licao', 'resultado', 'bau', 'sem-vidas'];


// ============================================================
// 2. INÍCIO
// ============================================================

function iniciar() {
  estado.podeSalvar = armazenamentoDisponivel();
  estado.progresso = prepararProgresso(carregarProgresso());
  salvar();

  mostrarProblemasDoConteudo(conferirConteudo());

  document.addEventListener('click', tratarClique);
  document.addEventListener('keydown', tratarTecla);
  window.addEventListener('hashchange', mostrarTelaDoEndereco);

  // Abriu sem # no endereço? Marca #aprender, sem criar um "voltar" a mais
  if (!location.hash) {
    try {
      history.replaceState(null, '', '#aprender');
    } catch (erro) {
      // alguns navegadores não deixam em arquivo local; não faz falta
    }
  }

  mostrarTelaDoEndereco();
}

function salvar() {
  salvarProgresso(estado.progresso);
}


// ============================================================
// 3. NAVEGAÇÃO
// ============================================================

function irPara(tela, substituir = false) {
  if (location.hash === '#' + tela) {
    mostrarTelaDoEndereco();
  } else if (substituir) {
    location.replace('#' + tela);
  } else {
    location.hash = tela;
  }
}

function abrirTelaDeFoco(tela) {
  estado.telaDeFocoEmpilhada = true;
  irPara(tela);
}

function voltarParaTrilha() {
  if (estado.telaDeFocoEmpilhada) {
    estado.telaDeFocoEmpilhada = false;
    history.back();
  } else {
    irPara('aprender', true);
  }
}

function mostrarTelaDoEndereco() {
  const tela = location.hash.slice(1) || 'aprender';

  fecharJanelas();

  if (!TELAS_DO_MENU.includes(tela) && !TELAS_DE_FOCO.includes(tela)) {
    irPara('aprender', true);
    return;
  }

  if (TELAS_DO_MENU.includes(tela)) {
    estado.telaDeFocoEmpilhada = false;
    if (estado.sessao) {
      estado.sessao = null;
      mostrarAviso('Você saiu da lição.');
    }
  }

  if (atualizarDia(estado.progresso)) salvar();

  const faltaAlgo =
    (tela === 'licao' && !estado.sessao) ||
    (tela === 'resultado' && !estado.resumo) ||
    (tela === 'bau' && !estado.recompensaDoBau) ||
    (tela === 'sem-vidas' && (!estado.sessao || estado.progresso.vidas > 0));
  if (faltaAlgo) {
    irPara('aprender', true);
    return;
  }

  mostrarTela(tela);
}

function mostrarTela(tela) {
  for (const secao of document.querySelectorAll('.tela')) {
    secao.hidden = secao.id !== `tela-${tela}`;
  }
  document.body.classList.toggle('modo-foco', TELAS_DE_FOCO.includes(tela));
  marcarMenu(tela);
  atualizarContadores(estado.progresso);
  desenharColunaDireita(estado.progresso);

  const lugar = document.getElementById(`tela-${tela}`);
  switch (tela) {
    case 'aprender':    desenharTrilha(lugar, estado.progresso); break;
    case 'calculadora': desenharCalculadora(lugar); break;
    case 'ligas':       desenharLigas(lugar, estado.progresso); break;
    case 'missoes':     desenharMissoes(lugar, estado.progresso); break;
    case 'loja':        desenharLoja(lugar, estado.progresso); break;
    case 'perfil':      desenharPerfil(lugar, estado.progresso, estado.podeSalvar); break;
    case 'mais':        desenharConfiguracoes(lugar, estado.progresso, estado.podeSalvar); break;
    case 'guia':        desenharEmBreve(lugar, 'guia'); break;
    case 'licao':       desenharLicao(lugar, estado.sessao, estado.progresso); break;
    case 'resultado':   desenharResultado(lugar, estado.resumo); break;
    case 'bau':         desenharBauAberto(lugar, estado.recompensaDoBau); break;
    case 'sem-vidas':   desenharSemVidas(lugar, estado.sessao, estado.progresso); break;
  }

  window.scrollTo(0, 0);

  if (tela === 'aprender') {
    const proximo = lugar.querySelector('.no--atual, .no--bau-liberado');
    if (proximo) proximo.scrollIntoView({ block: 'nearest' });
  }

  focarTitulo(lugar);

  if (!estado.progresso.boasVindasVistas && TELAS_DO_MENU.includes(tela)) {
    marcarBoasVindasVistas(estado.progresso);
    salvar();
    mostrarBoasVindas(estado.progresso);
  }
}


// ============================================================
// 4. LIÇÃO
// ============================================================

function abrirLicao(idLicao, substituir = false) {
  const achada = encontrarLicao(idLicao);
  if (!achada) return;

  const situacao = situacaoDaLicao(estado.progresso, achada.trilha, idLicao);
  if (situacao === 'em-breve') {
    mostrarAviso('Essa lição chega em breve.');
    return;
  }
  if (situacao === 'bloqueada') {
    mostrarAviso('Conclua a lição anterior para liberar esta.');
    return;
  }

  if (atualizarDia(estado.progresso)) salvar();
  estado.sessao = iniciarLicao(estado.progresso, achada.licao);

  const tela = !estado.sessao.treino && estado.progresso.vidas === 0 ? 'sem-vidas' : 'licao';
  if (substituir) irPara(tela, true);
  else abrirTelaDeFoco(tela);
}

function escolher(indice) {
  if (estado.sessao && marcarAlternativa(estado.sessao, indice)) {
    mostrarAlternativaMarcada(indice);
  }
}

function verificar() {
  if (!estado.sessao) return;
  const resultado = verificarResposta(estado.progresso, estado.sessao);
  if (!resultado) return;
  salvar();
  mostrarCorrecao(resultado, estado.sessao, estado.progresso);
}

function continuar() {
  if (!estado.sessao || !estado.sessao.verificada) return;
  const proximo = avancarQuestao(estado.progresso, estado.sessao);

  if (proximo === 'proxima') {
    const lugar = document.getElementById('tela-licao');
    desenharLicao(lugar, estado.sessao, estado.progresso);
    window.scrollTo(0, 0);
    focarTitulo(lugar);
    return;
  }

  if (proximo === 'sem-vidas') {
    irPara('sem-vidas', true);
    return;
  }

  terminarLicao();
}

function terminarLicao() {
  estado.resumo = concluirLicao(estado.progresso, estado.sessao);
  estado.sessao = null;
  salvar();
  irPara('resultado', true);
}

function recarregar() {
  if (!estado.sessao || !recarregarVidas(estado.progresso)) return;
  salvar();
  mostrarAviso('Vidas recarregadas.');

  if (estado.sessao.verificada && avancarQuestao(estado.progresso, estado.sessao) === 'fim') {
    terminarLicao();
    return;
  }
  irPara('licao', true);
}

function recarregarNaLoja() {
  if (!recarregarVidas(estado.progresso)) return;
  salvar();
  atualizarContadores(estado.progresso);
  desenharColunaDireita(estado.progresso);
  const lugar = document.getElementById('tela-loja');
  if (lugar && !lugar.hidden) desenharLoja(lugar, estado.progresso);
  mostrarAviso('Vidas recarregadas.');
}

function treinar(idLicao) {
  estado.sessao = null;
  abrirLicao(idLicao, true);
}

function pedirParaSair() {
  if (!estado.sessao) return;
  if (estado.sessao.respondidas === 0) {
    sairDaLicao();
    return;
  }
  mostrarConfirmacaoDeSaida(true);
}

function sairDaLicao() {
  estado.sessao = null;
  voltarParaTrilha();
}


// ============================================================
// 5. BAÚ E TROFÉU DA UNIDADE
// ============================================================

function tocarNoBau(idUnidade) {
  const unidade = encontrarUnidade(idUnidade);
  if (!unidade) return;

  const situacao = situacaoDoBau(estado.progresso, unidade);
  if (situacao === 'aberto') {
    mostrarAviso('Você já abriu este baú.');
    return;
  }
  if (situacao === 'trancado') {
    mostrarAviso(unidadeEmBreve(unidade)
      ? 'As lições desta unidade chegam em breve.'
      : 'Conclua todas as lições da unidade para abrir o baú.');
    return;
  }

  const recompensa = abrirBau(estado.progresso, unidade);
  salvar();
  estado.recompensaDoBau = {
    xp: recompensa.xp,
    moedas: recompensa.moedas,
    nivel: recompensa.nivel,
    subiuDeNivel: recompensa.subiuDeNivel,
    tituloDaUnidade: unidade.titulo
  };
  abrirTelaDeFoco('bau');
}

function tocarNoTrofeu(idUnidade) {
  const unidade = encontrarUnidade(idUnidade);
  if (!unidade) return;

  const situacao = situacaoDoBau(estado.progresso, unidade);
  if (situacao === 'liberado') {
    tocarNoBau(idUnidade);
    return;
  }
  if (situacao === 'aberto') {
    mostrarAviso('Troféu conquistado! Você concluiu esta unidade.');
    return;
  }
  mostrarAviso(unidadeEmBreve(unidade)
    ? 'As lições desta unidade chegam em breve.'
    : 'Conclua todas as lições e o baú desta unidade para conquistar o troféu.');
}


// ============================================================
// 6. CALCULADORA E CONFIGURAÇÕES
// ============================================================

let camposCalculadoraEmMemoria = {
  custo: '',
  meses: '',
  aporte: '',
  anos: '',
  guardado: '',
  taxa: '0,8'
};

function lerCamposDaCalculadora() {
  const container = document.querySelector('#tela-calculadora .calculadora');
  const custo = document.getElementById('campo-custo');
  const meses = document.getElementById('campo-meses');
  const aporte = document.getElementById('campo-aporte');
  const anos = document.getElementById('campo-anos');
  const guardado = document.getElementById('campo-guardado');
  const taxa = document.getElementById('campo-taxa');

  if (custo) camposCalculadoraEmMemoria.custo = custo.value;
  if (meses) camposCalculadoraEmMemoria.meses = meses.value;
  if (aporte) camposCalculadoraEmMemoria.aporte = aporte.value;
  if (anos) camposCalculadoraEmMemoria.anos = anos.value;
  if (guardado) camposCalculadoraEmMemoria.guardado = guardado.value;
  if (taxa) camposCalculadoraEmMemoria.taxa = taxa.value;

  const abaNoDom = container ? container.dataset.abaAtiva : 'sem-juros';
  const aba = (abaNoDom === 'com-juros' || abaNoDom === 'simular-futuro') ? abaNoDom : 'sem-juros';

  return {
    ...camposCalculadoraEmMemoria,
    aba
  };
}

function calcularPorModo(aba, campos) {
  if (aba === 'simular-futuro') {
    return simularFuturo(campos.aporte, campos.anos, campos.guardado, campos.taxa);
  }
  if (aba === 'com-juros') {
    return calcularMetaComJuros(campos.custo, campos.meses, campos.guardado, campos.taxa);
  }
  return calcularMeta(campos.custo, campos.meses, campos.guardado);
}

function calcularMetaNaTela(modoForcado) {
  const campos = lerCamposDaCalculadora();
  const aba = modoForcado || campos.aba;
  const resultado = calcularPorModo(aba, campos);
  mostrarResultadoCalculadora(resultado);
  if (resultado.valido) contarContaNaMissao();
}

// Uma conta com resultado conta para a missão do dia. Se ela terminar
// a missão, os XP entram na hora: os contadores e o cartão da missão
// mudam, e um aviso conta a recompensa (e o nível, se subiu).
function contarContaNaMissao() {
  const recompensa = registrarContaNaCalculadora(estado.progresso);
  salvar();
  if (!recompensa) return;
  atualizarContadores(estado.progresso);
  desenharColunaDireita(estado.progresso);
  avisarMissaoConcluida(recompensa);
}

function temCamposObrigatoriosDaAba(aba, campos) {
  if (aba === 'simular-futuro') {
    return campos.aporte.trim() !== '' && campos.anos.trim() !== '';
  }
  return campos.custo.trim() !== '' && campos.meses.trim() !== '';
}

function trocarAbaCalculadora(novaAba) {
  const lugar = document.getElementById('tela-calculadora');
  if (!lugar) return;

  const campos = lerCamposDaCalculadora();
  const jaTinhaResultado = Boolean(document.querySelector('#calculadora-resultado .calculadora-resultado'));
  let resultado = null;

  if (jaTinhaResultado && temCamposObrigatoriosDaAba(novaAba, campos)) {
    const calculado = calcularPorModo(novaAba, campos);
    if (calculado.valido) resultado = calculado;
  }

  desenharCalculadora(lugar, {
    ...campos,
    aba: novaAba,
    resultado
  });
}

function limparCalculadoraNaTela() {
  const lugar = document.getElementById('tela-calculadora');
  if (!lugar) return;
  const { aba } = lerCamposDaCalculadora();
  camposCalculadoraEmMemoria = {
    custo: '',
    meses: '',
    aporte: '',
    anos: '',
    guardado: '',
    taxa: '0,8'
  };
  desenharCalculadora(lugar, { aba });
  const primeiroCampo = document.getElementById(aba === 'simular-futuro' ? 'campo-aporte' : 'campo-custo');
  if (primeiroCampo) primeiroCampo.focus();
}

function apagarProgresso() {
  reiniciarProgresso();
  estado.progresso = prepararProgresso(null);
  salvar();
  mostrarAviso('Progresso reiniciado.');
  irPara('aprender');
}


// ============================================================
// 7. TOQUES E TECLADO
// ============================================================

function tratarClique(evento) {
  if (evento.target.classList.contains('folha')) {
    if (evento.target.tagName === 'DIALOG') evento.target.close();
    else mostrarConfirmacaoDeSaida(false);
    return;
  }

  const botao = evento.target.closest('[data-acao]');
  if (!botao) return;

  switch (botao.dataset.acao) {
    case 'abrir-licao':          abrirLicao(botao.dataset.id); break;
    case 'abrir-bau':            tocarNoBau(botao.dataset.id); break;
    case 'abrir-trofeu':         tocarNoTrofeu(botao.dataset.id); break;
    case 'escolher':             escolher(Number(botao.dataset.indice)); break;
    case 'verificar':            verificar(); break;
    case 'continuar':            continuar(); break;
    case 'sair-licao':           pedirParaSair(); break;
    case 'cancelar-saida':       mostrarConfirmacaoDeSaida(false); break;
    case 'confirmar-saida':      sairDaLicao(); break;
    case 'recarregar-vidas':     recarregar(); break;
    case 'recarregar-loja':      recarregarNaLoja(); break;
    case 'treinar':              treinar(botao.dataset.id); break;
    case 'voltar-trilha':        sairDaLicao(); break;
    case 'abrir-painel':         mostrarPainel(estado.progresso, botao.dataset.contador); break;
    case 'fechar-painel':        fecharJanela('painel'); break;
    case 'fechar-boas-vindas':   fecharJanela('boas-vindas'); break;
    case 'aba-sem-juros':        trocarAbaCalculadora('sem-juros'); break;
    case 'aba-com-juros':        trocarAbaCalculadora('com-juros'); break;
    case 'aba-simular-futuro':   trocarAbaCalculadora('simular-futuro'); break;
    case 'calcular-meta':        calcularMetaNaTela('sem-juros'); break;
    case 'calcular-meta-juros':  calcularMetaNaTela('com-juros'); break;
    case 'calcular-futuro':      calcularMetaNaTela('simular-futuro'); break;
    case 'limpar-calculadora':   limparCalculadoraNaTela(); break;
    case 'reiniciar':            mostrarConfirmacaoDeReinicio(true); break;
    case 'cancelar-reinicio':    mostrarConfirmacaoDeReinicio(false); break;
    case 'confirmar-reinicio':   apagarProgresso(); break;
    case 'fechar-problemas':     esconderProblemasDoConteudo(); break;
  }
}

function tratarTecla(evento) {
  if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

  const telaCalculadora = document.getElementById('tela-calculadora');
  const naCalculadora = telaCalculadora && !telaCalculadora.hidden;
  if (naCalculadora) {
    if (evento.key === 'Enter' && evento.target.closest('input')) {
      evento.preventDefault();
      calcularMetaNaTela();
    }
    return;
  }

  const naLicao = estado.sessao && !document.getElementById('tela-licao').hidden;
  if (!naLicao) return;

  const folha = document.getElementById('confirmar-saida');
  const confirmandoSaida = folha && !folha.hidden;

  if (evento.key === 'Escape') {
    if (confirmandoSaida) mostrarConfirmacaoDeSaida(false);
    else pedirParaSair();
    return;
  }
  if (confirmandoSaida) return;

  const teclas = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
  const indice = teclas[evento.key.toLowerCase()];
  if (indice !== undefined) {
    escolher(indice);
    return;
  }

  if (evento.key === 'Enter' && !evento.target.closest('button, a')) {
    evento.preventDefault();
    if (estado.sessao.verificada) continuar();
    else verificar();
  }
}


iniciar();
