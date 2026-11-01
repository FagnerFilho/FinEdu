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

// Telas do menu, e telas "de foco" (sem menu, para o aluno se concentrar)
const TELAS_DO_MENU = ['aprender', 'calculadora', 'guia', 'perfil'];
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
// A tela atual fica no fim do endereço: index.html#perfil,
// index.html#licao... Assim o botão "voltar" do celular volta
// para a tela anterior em vez de sair do site.

// Vai para uma tela. Com substituir = true, a tela atual sai do
// histórico (o "voltar" não passa mais por ela).
function irPara(tela, substituir = false) {
  if (location.hash === '#' + tela) {
    mostrarTelaDoEndereco();          // já está nela: só redesenha
  } else if (substituir) {
    location.replace('#' + tela);
  } else {
    location.hash = tela;             // o navegador avisa e mostrarTelaDoEndereco() roda
  }
}

// Abre uma tela de foco (lição, baú...) lembrando que dá para voltar
function abrirTelaDeFoco(tela) {
  estado.telaDeFocoEmpilhada = true;
  irPara(tela);
}

// Volta para a trilha sem deixar telas "fantasmas" no histórico:
// se a tela de foco foi aberta a partir da trilha, é só "voltar".
function voltarParaTrilha() {
  if (estado.telaDeFocoEmpilhada) {
    estado.telaDeFocoEmpilhada = false;
    history.back();
  } else {
    irPara('aprender', true);
  }
}

// Lê o endereço e mostra a tela certa
function mostrarTelaDoEndereco() {
  const tela = location.hash.slice(1) || 'aprender';

  // Trocou de tela (inclusive pelo voltar do Android): fecha o painel
  fecharJanelas();

  if (!TELAS_DO_MENU.includes(tela) && !TELAS_DE_FOCO.includes(tela)) {
    irPara('aprender', true);         // endereço desconhecido: vai para a trilha
    return;
  }

  // Chegou numa tela do menu vindo de uma lição aberta (botão voltar):
  // a lição é abandonada.
  if (TELAS_DO_MENU.includes(tela)) {
    estado.telaDeFocoEmpilhada = false;
    if (estado.sessao) {
      estado.sessao = null;
      mostrarAviso('Você saiu da lição.');
    }
  }

  // Virou o dia? As vidas voltam e a sequência é conferida.
  if (atualizarDia(estado.progresso)) salvar();

  // Telas que dependem de algo que não existe mais
  // (por exemplo, a página foi recarregada no meio da lição)
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
  // Mostra só a <section> da tela pedida
  for (const secao of document.querySelectorAll('.tela')) {
    secao.hidden = secao.id !== `tela-${tela}`;
  }
  document.body.classList.toggle('modo-foco', TELAS_DE_FOCO.includes(tela));
  marcarMenu(tela);
  atualizarContadores(estado.progresso);
  desenharDica(dicaDoDia());

  const lugar = document.getElementById(`tela-${tela}`);
  switch (tela) {
    case 'aprender':    desenharTrilha(lugar, estado.progresso); break;
    case 'calculadora': desenharEmBreve(lugar, 'calculadora'); break;
    case 'guia':        desenharEmBreve(lugar, 'guia'); break;
    case 'perfil':      desenharPerfil(lugar, estado.progresso, estado.podeSalvar); break;
    case 'licao':       desenharLicao(lugar, estado.sessao, estado.progresso); break;
    case 'resultado':   desenharResultado(lugar, estado.resumo); break;
    case 'bau':         desenharBauAberto(lugar, estado.recompensaDoBau); break;
    case 'sem-vidas':   desenharSemVidas(lugar, estado.sessao, estado.progresso); break;
  }

  window.scrollTo(0, 0);

  // Na trilha, se o próximo passo estiver fora da tela, rola até ele
  if (tela === 'aprender') {
    const proximo = lugar.querySelector('.no--atual, .no--bau-liberado');
    if (proximo) proximo.scrollIntoView({ block: 'nearest' });
  }

  focarTitulo(lugar);

  // Quem começa do zero vê as boas-vindas uma vez, numa tela do menu
  // (nunca no meio da lição). Já fica salvo que elas apareceram.
  if (!estado.progresso.boasVindasVistas && TELAS_DO_MENU.includes(tela)) {
    marcarBoasVindasVistas(estado.progresso);
    salvar();
    mostrarBoasVindas(estado.progresso);
  }
}


// ============================================================
// 4. LIÇÃO
// ============================================================

// Com substituir = true, a lição entra no lugar da tela atual no
// histórico (usado pelo "Treinar de graça" da tela "sem vidas")
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

  // Lição nova sem vidas: primeiro a tela "sem vidas". O treino
  // (lição já concluída) não precisa de vida.
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
  if (!resultado) return;                 // nenhuma alternativa marcada
  salvar();                               // a vida perdida já fica salva
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

  // A lição fica guardada: se o aluno recarregar, ela continua daqui
  if (proximo === 'sem-vidas') {
    irPara('sem-vidas', true);
    return;
  }

  terminarLicao();   // proximo === 'fim'
}

// Lição (ou treino) concluída!
function terminarLicao() {
  estado.resumo = concluirLicao(estado.progresso, estado.sessao);
  estado.sessao = null;
  salvar();
  irPara('resultado', true);
}

// Sem vidas: paga a recarga e volta para a lição de onde parou
function recarregar() {
  if (!estado.sessao || !recarregarVidas(estado.progresso)) return;
  salvar();
  mostrarAviso('Vidas recarregadas.');

  // Parou depois de responder uma questão? Segue para a próxima vez.
  if (estado.sessao.verificada && avancarQuestao(estado.progresso, estado.sessao) === 'fim') {
    terminarLicao();
    return;
  }
  irPara('licao', true);
}

// Sem vidas: deixa a lição parada para trás e treina uma concluída
function treinar(idLicao) {
  estado.sessao = null;
  abrirLicao(idLicao, true);
}

function pedirParaSair() {
  if (!estado.sessao) return;
  // Ainda não respondeu nada? Sai direto, sem perguntar.
  if (estado.sessao.respondidas === 0) {
    sairDaLicao();
    return;
  }
  mostrarConfirmacaoDeSaida(true);
}

// Deixa para trás a lição aberta (se tiver) e volta para a trilha
function sairDaLicao() {
  estado.sessao = null;
  voltarParaTrilha();
}


// ============================================================
// 5. BAÚ
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
    mostrarAviso('Conclua todas as lições da unidade para abrir o baú.');
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


// ============================================================
// 6. PERFIL
// ============================================================

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

// Um "ouvinte" só para o app inteiro: olha o data-acao do botão tocado
function tratarClique(evento) {
  // Toque no fundo escuro: fecha a janela (o painel ou as boas-vindas)
  // ou, na confirmação de saída, continua a lição
  if (evento.target.classList.contains('folha')) {
    if (evento.target.tagName === 'DIALOG') evento.target.close();
    else mostrarConfirmacaoDeSaida(false);
    return;
  }

  const botao = evento.target.closest('[data-acao]');
  if (!botao) return;

  switch (botao.dataset.acao) {
    case 'abrir-licao':        abrirLicao(botao.dataset.id); break;
    case 'abrir-bau':          tocarNoBau(botao.dataset.id); break;
    case 'escolher':           escolher(Number(botao.dataset.indice)); break;
    case 'verificar':          verificar(); break;
    case 'continuar':          continuar(); break;
    case 'sair-licao':         pedirParaSair(); break;
    case 'cancelar-saida':     mostrarConfirmacaoDeSaida(false); break;
    case 'confirmar-saida':    sairDaLicao(); break;
    case 'recarregar-vidas':   recarregar(); break;
    case 'treinar':            treinar(botao.dataset.id); break;
    case 'voltar-trilha':      sairDaLicao(); break;   // a tela "sem vidas" pode ter lição parada
    case 'abrir-painel':       mostrarPainel(estado.progresso, botao.dataset.contador); break;
    case 'fechar-painel':      fecharJanela('painel'); break;
    case 'fechar-boas-vindas': fecharJanela('boas-vindas'); break;
    case 'reiniciar':          mostrarConfirmacaoDeReinicio(true); break;
    case 'cancelar-reinicio':  mostrarConfirmacaoDeReinicio(false); break;
    case 'confirmar-reinicio': apagarProgresso(); break;
    case 'fechar-problemas':   esconderProblemasDoConteudo(); break;
  }
}

// Atalhos no notebook, durante a lição:
//   1 a 4 (ou A a D) escolhem a alternativa
//   Enter verifica ou continua
//   Esc pede para sair
function tratarTecla(evento) {
  const naLicao = estado.sessao && !document.getElementById('tela-licao').hidden;
  if (!naLicao || evento.ctrlKey || evento.metaKey || evento.altKey) return;

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

  // Se o foco estiver num botão, o próprio botão já responde ao Enter
  if (evento.key === 'Enter' && !evento.target.closest('button, a')) {
    // Sem isto, o mesmo Enter "aperta" também o Continuar, que
    // acabou de receber o foco, e pula a explicação
    evento.preventDefault();
    if (estado.sessao.verificada) continuar();
    else verificar();
  }
}


// Os scripts estão no fim do <body>: a página já existe, pode começar
iniciar();
