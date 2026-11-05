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
  telaDeFocoEmpilhada: false, // ver voltarParaTrilha()
  onboarding: null,           // apelido, avatar e tutorial em andamento (seção 7)
  modoApresentacao: false     // Mais → Apresentação: todas as lições liberadas (seção 6)
};

// Telas do menu ("mais" abre as configurações do app) e telas de foco (sem
// menu). As 3 etapas do onboarding também são telas de foco ("guia" é o
// tutorial "Como usar o FinEdu").
const TELAS_DO_MENU = ['aprender', 'calculadora', 'ligas', 'missoes', 'loja', 'perfil', 'mais'];
const TELAS_DO_ONBOARDING = ['apelido', 'avatar', 'guia'];
const TELAS_DE_FOCO = ['licao', 'resultado', 'bau', 'sem-vidas', ...TELAS_DO_ONBOARDING];


// ============================================================
// 2. INÍCIO
// ============================================================

function iniciar() {
  estado.podeSalvar = armazenamentoDisponivel();
  estado.progresso = prepararProgresso(carregarProgresso());
  estado.modoApresentacao = carregarModoApresentacao();
  salvar();

  mostrarProblemasDoConteudo(conferirConteudo());

  document.addEventListener('click', tratarClique);
  document.addEventListener('keydown', tratarTecla);
  document.addEventListener('input', guardarRascunhoDoOnboarding);
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

  if (!podeAbrirPorCausaDoOnboarding(tela)) return;

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
    case 'aprender':    desenharTrilha(lugar, estado.progresso, estado.modoApresentacao); break;
    case 'calculadora': desenharCalculadora(lugar); break;
    case 'ligas':       desenharLigas(lugar, estado.progresso); break;
    case 'missoes':     desenharMissoes(lugar, estado.progresso); break;
    case 'loja':        desenharLoja(lugar, estado.progresso); break;
    case 'perfil':      desenharPerfil(lugar, estado.progresso, estado.podeSalvar); break;
    case 'mais':        desenharConfiguracoes(lugar, estado.progresso, estado.podeSalvar, estado.modoApresentacao); break;
    case 'licao':       desenharLicao(lugar, estado.sessao, estado.progresso); break;
    case 'resultado':   desenharResultado(lugar, estado.resumo); break;
    case 'bau':         desenharBauAberto(lugar, estado.recompensaDoBau); break;
    case 'sem-vidas':   desenharSemVidas(lugar, estado.sessao, estado.progresso); break;
    case 'apelido':     desenharApelido(lugar, estado.onboarding); break;
    case 'avatar':      desenharEscolhaDoAvatar(lugar, estado.onboarding); break;
    case 'guia':        desenharTutorial(lugar, estado.onboarding, estado.progresso); break;
  }

  window.scrollTo(0, 0);

  if (tela === 'aprender') {
    const proximo = lugar.querySelector('.no--atual, .no--bau-liberado');
    if (proximo) proximo.scrollIntoView({ block: 'nearest' });
  }

  focarTitulo(lugar);
}


// ============================================================
// 4. LIÇÃO
// ============================================================

function abrirLicao(idLicao, substituir = false) {
  const achada = encontrarLicao(idLicao);
  if (!achada) return;

  const situacao = situacaoDaLicao(estado.progresso, achada.trilha, idLicao, estado.modoApresentacao);
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

// Mais → Apresentação: liga ou desliga o modo apresentação, que libera
// todas as lições para a equipe mostrar o app. Ele fica salvo no aparelho,
// fora do progresso do aluno: continua ligado depois de fechar o site e
// depois de "Reiniciar progresso", e só desliga por este interruptor.
function alternarModoApresentacao() {
  estado.modoApresentacao = !estado.modoApresentacao;
  salvarModoApresentacao(estado.modoApresentacao);
  mostrarModoApresentacao(estado.modoApresentacao);
  mostrarAviso(estado.modoApresentacao ? 'Modo apresentação ligado.' : 'Modo apresentação desligado.');
}

// Apaga tudo, inclusive o apelido e o avatar: o onboarding volta
// (ver podeAbrirPorCausaDoOnboarding). O modo apresentação não muda.
function apagarProgresso() {
  reiniciarProgresso();
  estado.progresso = prepararProgresso(null);
  estado.onboarding = null;
  salvar();
  mostrarAviso('Progresso reiniciado.');
  irPara('aprender');
}


// ============================================================
// 7. ONBOARDING: APELIDO, AVATAR E TUTORIAL (Parte 4)
// ============================================================
// O fluxo em andamento fica em estado.onboarding:
//   { modo: 'primeira-vez' | 'trocar' | 'mais', apelido, avatar, cartao }
// (apelido e avatar são o rascunho do que o aluno digitou e marcou;
// cartao é o cartão do tutorial que está na tela, de 0 a 4).
//
// Voltar do Android: cada etapa é um passo no histórico, e o endereço de
// cada uma guarda quantas etapas o fluxo já empilhou (history.state.etapa).
// No fim, o app volta esse tanto (history.go), e o voltar do Android não cai
// de novo no onboarding. Os cartões do tutorial trocam no lugar, sem passo.
//   primeira vez: #apelido → #avatar → #guia; no fim, volta ao #apelido do
//                 começo, que vira #aprender (o voltar da trilha sai do app)
//   Perfil:       #perfil → #apelido → #avatar; no fim, volta ao #perfil
//   Mais:         #mais → #guia; no fim, volta ao #mais

function novoFluxo(modo) {
  return {
    modo,
    apelido: estado.progresso.apelido,
    avatar: estado.progresso.avatar || sortearAvatar(),
    cartao: 0
  };
}

// Decide se a tela pode abrir agora. Se não puder, troca o endereço
// (a tela certa abre em seguida) e devolve false.
function podeAbrirPorCausaDoOnboarding(tela) {
  const naEtapa = TELAS_DO_ONBOARDING.includes(tela);

  // Primeira vez (ou depois de "Reiniciar progresso"): qualquer endereço
  // leva ao apelido, e a página recarregada no meio recomeça dele
  if (!estado.progresso.onboardingFeito) {
    const fluxoNovo = !estado.onboarding || estado.onboarding.modo !== 'primeira-vez';
    if (fluxoNovo) estado.onboarding = novoFluxo('primeira-vez');
    if (tela === 'apelido' || (naEtapa && !fluxoNovo)) return true;
    comecarPeloApelido();
    return false;
  }

  if (!naEtapa) {
    estado.onboarding = null;   // saiu da troca (ou do tutorial) pelo voltar: nada é salvo
    return true;
  }
  if (estado.onboarding) return true;

  // Etapa velha no histórico (fluxo que já acabou, ou página recarregada
  // no meio da troca): volta para onde o fluxo começou, ou para a trilha
  const passos = passoNoHistorico();
  if (passos > 0) history.go(-passos);
  else irPara('aprender', true);
  return false;
}

// Quantas etapas do onboarding estão empilhadas até o endereço atual
function passoNoHistorico() {
  const guardado = history.state;
  return guardado && Number.isInteger(guardado.etapa) ? guardado.etapa : 0;
}

// Põe o #apelido no lugar do endereço atual, sem criar um "voltar" a mais
function comecarPeloApelido() {
  try {
    history.replaceState(null, '', '#apelido');
  } catch (erro) {
    location.replace('#apelido');   // o hashchange abre a tela
    return;
  }
  mostrarTelaDoEndereco();
}

// Abre a próxima etapa como um passo novo no histórico
function irParaEtapa(tela) {
  try {
    history.pushState({ etapa: passoNoHistorico() + 1 }, '', '#' + tela);
  } catch (erro) {
    irPara(tela);   // sem pushState: navega sem contar a etapa
    return;
  }
  mostrarTelaDoEndereco();
}

// Fim do fluxo (ou "Cancelar"): volta as etapas que ele empilhou. Se o
// navegador não voltar (histórico diferente do esperado), vai direto.
function sairDoOnboarding() {
  const destinos = { 'primeira-vez': 'aprender', trocar: 'perfil', mais: 'mais' };
  const destino = (estado.onboarding && destinos[estado.onboarding.modo]) || 'aprender';
  const passos = passoNoHistorico();
  const enderecoAntes = location.hash;
  estado.onboarding = null;

  if (passos === 0) {
    irPara(destino, true);
    return;
  }
  history.go(-passos);
  setTimeout(() => {
    if (location.hash === enderecoAntes) irPara(destino, true);
  }, 400);
}

// "Trocar apelido e avatar", no Perfil
function trocarApelidoEAvatar() {
  estado.onboarding = novoFluxo('trocar');
  irParaEtapa('apelido');
}

// "Ver tutorial", em Mais
function verTutorial() {
  estado.onboarding = novoFluxo('mais');
  irParaEtapa('guia');
}

// O que o aluno digita ou marca fica guardado no fluxo: voltar uma etapa
// pelo Android (e ir de novo) não apaga a escolha
function guardarRascunhoDoOnboarding(evento) {
  const fluxo = estado.onboarding;
  if (!fluxo) return;
  if (evento.target.id === 'campo-apelido') fluxo.apelido = evento.target.value;
  if (evento.target.name === 'avatar') fluxo.avatar = evento.target.value;
}

// Etapa 1 → 2. Na primeira vez, o apelido já fica salvo (a página
// recarregada no meio recomeça do apelido, com ele preenchido). Na troca,
// nada é salvo antes do "Salvar".
function confirmarApelido() {
  const fluxo = estado.onboarding;
  if (!fluxo) return;
  const campo = document.getElementById('campo-apelido');
  if (campo) fluxo.apelido = limparApelido(campo.value);
  if (fluxo.modo === 'primeira-vez') {
    definirApelido(estado.progresso, fluxo.apelido);
    salvar();
  }
  irParaEtapa('avatar');
}

// Etapa 2 → tutorial (primeira vez) ou de volta ao Perfil (troca)
function confirmarAvatar() {
  const fluxo = estado.onboarding;
  if (!fluxo) return;
  const marcado = document.querySelector('input[name="avatar"]:checked');
  if (marcado) fluxo.avatar = marcado.value;

  if (fluxo.modo === 'trocar') {
    definirApelido(estado.progresso, fluxo.apelido);
    definirAvatar(estado.progresso, fluxo.avatar);
    salvar();
    mostrarAviso('Apelido e avatar salvos.');
    sairDoOnboarding();
    return;
  }

  definirAvatar(estado.progresso, fluxo.avatar);
  salvar();
  fluxo.cartao = 0;
  irParaEtapa('guia');
}

// Troca o cartão do tutorial no lugar (passo 1 ou -1) e põe o foco no
// título do cartão novo, como a lição faz com a questão nova
function mudarCartao(passo) {
  const fluxo = estado.onboarding;
  const lugar = document.getElementById('tela-guia');
  if (!fluxo || lugar.hidden) return;
  const cartao = fluxo.cartao + passo;
  if (cartao < 0 || cartao >= cartoesDoTutorial().length) return;

  fluxo.cartao = cartao;
  desenharTutorial(lugar, fluxo, estado.progresso);
  window.scrollTo(0, 0);
  focarTitulo(lugar);
}

// Fim do tutorial: "Bora começar" ou "Pular" (primeira vez, o onboarding
// fica feito) e "Entendi" ou "Fechar" (vindo de Mais)
function fecharTutorial() {
  const fluxo = estado.onboarding;
  if (!fluxo) return;
  if (fluxo.modo === 'primeira-vez') {
    concluirOnboarding(estado.progresso);
    salvar();
  }
  sairDoOnboarding();
}


// ============================================================
// 8. TOQUES E TECLADO
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
    case 'modo-apresentacao':    alternarModoApresentacao(); break;
    case 'fechar-problemas':     esconderProblemasDoConteudo(); break;
    case 'trocar-apelido-e-avatar': trocarApelidoEAvatar(); break;
    case 'ver-tutorial':         verTutorial(); break;
    case 'confirmar-apelido':    confirmarApelido(); break;
    case 'confirmar-avatar':     confirmarAvatar(); break;
    case 'cancelar-troca':       sairDoOnboarding(); break;
    case 'proximo-cartao':       mudarCartao(1); break;
    case 'cartao-anterior':      mudarCartao(-1); break;
    case 'fechar-tutorial':      fecharTutorial(); break;
  }
}

function tratarTecla(evento) {
  if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

  const etapa = TELAS_DO_ONBOARDING.find(tela => !document.getElementById(`tela-${tela}`).hidden);
  if (etapa) {
    tratarTeclaDoOnboarding(evento, etapa);
    return;
  }

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

// Teclado no onboarding: o Enter no apelido (ou num avatar) faz o mesmo que
// o botão de baixo; no tutorial, as setas trocam de cartão e o Enter (fora
// de um botão) passa para o próximo; o Esc aperta o botão do canto de cima
// (Cancelar, Pular ou Fechar)
function tratarTeclaDoOnboarding(evento, etapa) {
  const fluxo = estado.onboarding;
  if (!fluxo) return;

  if (evento.key === 'Escape') {
    if (fluxo.modo === 'trocar') sairDoOnboarding();
    else if (etapa === 'guia') fecharTutorial();
    return;
  }

  if (evento.key === 'Enter' && etapa === 'apelido' && evento.target.id === 'campo-apelido') {
    evento.preventDefault();
    confirmarApelido();
    return;
  }
  if (evento.key === 'Enter' && etapa === 'avatar' && evento.target.name === 'avatar') {
    evento.preventDefault();
    confirmarAvatar();
    return;
  }
  if (etapa !== 'guia') return;

  if (evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') {
    evento.preventDefault();
    mudarCartao(evento.key === 'ArrowRight' ? 1 : -1);
  } else if (evento.key === 'Enter' && !evento.target.closest('button, a')) {
    evento.preventDefault();
    if (fluxo.cartao < cartoesDoTutorial().length - 1) mudarCartao(1);
    else fecharTutorial();
  }
}


iniciar();
