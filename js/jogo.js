// ============================================================
// jogo.js — As regras do FinEdu
// ============================================================
// XP, níveis, moedas, vidas, sequência de dias, o que está liberado
// na trilha, o aquecimento, a revisão, a recarga, o treino e o baú.
// Este arquivo só faz contas e decide regras: não desenha nada
// (isso é o telas.js) e não salva nada (quem salva é o app.js,
// usando o armazenamento.js).
//
// Os valores foram decididos na tarefa 2 (projeto/plano-gamificacao.md).
// Para mudar uma regra de valor, troque só a constante lá embaixo.
//
// Várias funções recebem "hoje" como último parâmetro. No uso
// normal ele é a data do aparelho; nos testes dá para passar
// outra data e simular, por exemplo, três dias seguidos.
// ============================================================


// ============================================================
// 1. VALORES DO JOGO
// ============================================================

const XP_POR_ACERTO = 10;          // cada questão nova certa de primeira
const XP_DE_REVISAO = 5;           // cada errada que o aluno acerta na revisão, e o aquecimento certo
const MOEDAS_POR_LICAO = 10;       // ao concluir uma lição (só da primeira vez)
const MOEDAS_LICAO_PERFEITA = 5;   // extra se acertar todas de primeira
const XP_DO_BAU = 20;              // ao abrir o baú da unidade
const MOEDAS_DO_BAU = 20;
const VIDAS_MAXIMAS = 5;           // voltam todas no dia seguinte, no fim do treino ou na recarga
const PRECO_DA_RECARGA = 20;       // moedas para as vidas voltarem todas, na tela "sem vidas"
const MESADA_DE_BOAS_VINDAS = 20;  // moedas com que todo aluno começa: pagam 1 recarga
const ERROS_PARA_AQUECIMENTO_DUPLO = 3;  // errou 3 ou mais de primeira na lição anterior: o aquecimento traz 2 delas

// Formato de toda lição: quantas questões de cada nível
const QUESTOES_POR_DIFICULDADE = { facil: 2, media: 2, dificil: 1 };

// Ordem em que os níveis aparecem e o nome de cada um na tela
const ORDEM_DAS_DIFICULDADES = ['facil', 'media', 'dificil'];
const NOME_DA_DIFICULDADE = { facil: 'Fácil', media: 'Média', dificil: 'Difícil' };

// Níveis do aluno: o nível começa quando o XP total chega ao valor ao
// lado. Cada nível pede 25 XP a mais que o anterior (75, 100, 125, 150).
// Quem faz a Unidade 1 sem errar chega ao nível 3 na última lição.
const NIVEIS = [
  { nome: 'Aprendiz', xp: 0 },
  { nome: 'Poupador', xp: 75 },
  { nome: 'Planejador', xp: 175 },
  { nome: 'Estrategista', xp: 300 },
  { nome: 'Investidor', xp: 450 }
];


// ============================================================
// 2. DATAS
// ============================================================

// Data de hoje no formato 'AAAA-MM-DD', pelo relógio do aparelho
function hojeComoTexto() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Quantos dias há entre duas datas 'AAAA-MM-DD' (de ontem para hoje = 1)
function diasEntre(dataInicial, dataFinal) {
  const UM_DIA = 24 * 60 * 60 * 1000;   // um dia em milissegundos
  // Meio-dia evita erro de arredondamento em mudanças de horário
  const inicio = new Date(`${dataInicial}T12:00:00`);
  const fim = new Date(`${dataFinal}T12:00:00`);
  return Math.round((fim - inicio) / UM_DIA);
}


// ============================================================
// 3. PROGRESSO DO ALUNO
// ============================================================
// O progresso é um objeto simples. É ele que o armazenamento.js
// guarda no aparelho.

function criarProgressoInicial(hoje = hojeComoTexto()) {
  return {
    versao: 1,                 // muda se o formato mudar no futuro
    xp: 0,
    moedas: MESADA_DE_BOAS_VINDAS,
    vidas: VIDAS_MAXIMAS,
    diaDasVidas: hoje,         // último dia em que as vidas foram recarregadas
    sequencia: 0,              // dias seguidos com lição concluída
    ultimoDiaDeEstudo: null,   // último dia com lição concluída
    licoesConcluidas: [],      // ids das lições concluídas
    bausAbertos: [],           // ids das unidades com o baú já aberto
    respostasCertas: 0,        // para a precisão do Perfil
    respostasDadas: 0,
    errosPorLicao: {}          // id da lição → posições das questões que o aluno
                               // errou de primeira da última vez (para o aquecimento)
  };
}

// Recebe o que veio do armazenamento (ou null na primeira visita)
// e devolve um progresso completo, pronto para usar.
function prepararProgresso(salvo, hoje = hojeComoTexto()) {
  const inicial = criarProgressoInicial(hoje);
  const progresso = criarProgressoInicial(hoje);

  // Copia o que estava salvo por cima dos valores iniciais.
  // Um campo novo, que não existia quando o aluno salvou,
  // fica com o valor inicial.
  if (salvo) {
    for (const campo in progresso) {
      if (salvo[campo] !== undefined) progresso[campo] = salvo[campo];
    }
  }

  // Proteção: se algum valor veio estragado, volta ao inicial
  for (const campo of ['xp', 'moedas', 'vidas', 'sequencia', 'respostasCertas', 'respostasDadas']) {
    if (!Number.isFinite(progresso[campo]) || progresso[campo] < 0) {
      progresso[campo] = inicial[campo];
    }
  }
  for (const campo of ['licoesConcluidas', 'bausAbertos']) {
    if (!Array.isArray(progresso[campo])) progresso[campo] = [];
  }
  const erros = progresso.errosPorLicao;
  if (typeof erros !== 'object' || erros === null || Array.isArray(erros)) {
    progresso.errosPorLicao = {};
  }
  progresso.vidas = Math.min(progresso.vidas, VIDAS_MAXIMAS);

  atualizarDia(progresso, hoje);
  return progresso;
}

// Aplica o que muda com a virada do dia. Devolve true se mudou
// alguma coisa (aí o app.js sabe que precisa salvar).
function atualizarDia(progresso, hoje = hojeComoTexto()) {
  let mudou = false;

  // Dia novo: as vidas voltam todas
  if (progresso.diaDasVidas !== hoje) {
    progresso.vidas = VIDAS_MAXIMAS;
    progresso.diaDasVidas = hoje;
    mudou = true;
  }

  // Passou mais de um dia sem concluir lição: a sequência zera
  if (progresso.sequencia > 0 && progresso.ultimoDiaDeEstudo &&
      diasEntre(progresso.ultimoDiaDeEstudo, hoje) > 1) {
    progresso.sequencia = 0;
    mudou = true;
  }

  return mudou;
}

// Conta o dia de hoje na sequência (chamada ao concluir uma lição)
function registrarDiaDeEstudo(progresso, hoje = hojeComoTexto()) {
  if (progresso.ultimoDiaDeEstudo === hoje) return;   // hoje já contou

  const estudouOntem = progresso.ultimoDiaDeEstudo !== null &&
    diasEntre(progresso.ultimoDiaDeEstudo, hoje) === 1;

  progresso.sequencia = estudouOntem ? progresso.sequencia + 1 : 1;
  progresso.ultimoDiaDeEstudo = hoje;
}

// Porcentagem de respostas certas desde o começo (para o Perfil)
function precisaoGeral(progresso) {
  if (progresso.respostasDadas === 0) return 0;
  return Math.round((progresso.respostasCertas / progresso.respostasDadas) * 100);
}

// O nível para um total de XP (ver NIVEIS):
//   { numero, nome, proximo: { numero, nome, xp } ou null, faltam }
// "faltam" é o XP que falta para o próximo nível (0 no mais alto).
function nivelDoXp(xp) {
  let indice = 0;
  NIVEIS.forEach((nivel, i) => {
    if (xp >= nivel.xp) indice = i;
  });
  const proximo = NIVEIS[indice + 1];
  return {
    numero: indice + 1,
    nome: NIVEIS[indice].nome,
    proximo: proximo ? { numero: indice + 2, nome: proximo.nome, xp: proximo.xp } : null,
    faltam: proximo ? proximo.xp - xp : 0
  };
}


// ============================================================
// 4. O QUE ESTÁ LIBERADO NA TRILHA
// ============================================================

// Todas as lições de uma trilha, em ordem, cada uma com a sua unidade
function licoesDaTrilha(trilha) {
  const lista = [];
  for (const unidade of trilha.unidades) {
    for (const licao of unidade.licoes) {
      lista.push({ trilha, unidade, licao });
    }
  }
  return lista;
}

// Procura uma lição pelo id em todas as trilhas
function encontrarLicao(idLicao) {
  for (const trilha of CONTEUDO.trilhas) {
    const achada = licoesDaTrilha(trilha).find(item => item.licao.id === idLicao);
    if (achada) return achada;
  }
  return null;
}

// Procura uma unidade pelo id em todas as trilhas
function encontrarUnidade(idUnidade) {
  for (const trilha of CONTEUDO.trilhas) {
    const unidade = trilha.unidades.find(item => item.id === idUnidade);
    if (unidade) return unidade;
  }
  return null;
}

function licaoConcluida(progresso, idLicao) {
  return progresso.licoesConcluidas.includes(idLicao);
}

// Situação de uma lição na trilha:
//   'concluida' → já feita (dá para refazer)
//   'atual'     → liberada: é a próxima a fazer
//   'bloqueada' → precisa concluir a anterior primeiro
//   'em-breve'  → ainda sem conteúdo
// Regra: uma lição libera quando a anterior DA MESMA TRILHA está
// concluída. A primeira lição de cada trilha já começa liberada.
function situacaoDaLicao(progresso, trilha, idLicao) {
  const lista = licoesDaTrilha(trilha);
  const posicao = lista.findIndex(item => item.licao.id === idLicao);
  const licao = lista[posicao].licao;

  if (licao.emBreve) return 'em-breve';
  if (licaoConcluida(progresso, licao.id)) return 'concluida';

  const anterior = lista[posicao - 1];
  if (!anterior || licaoConcluida(progresso, anterior.licao.id)) return 'atual';
  return 'bloqueada';
}

// Uma unidade está "em breve" quando nenhuma lição dela tem conteúdo
function unidadeEmBreve(unidade) {
  return unidade.licoes.every(licao => licao.emBreve);
}

// Situação do baú de uma unidade: 'aberto', 'liberado' ou 'trancado'.
// Ele libera quando TODAS as lições da unidade estão concluídas.
function situacaoDoBau(progresso, unidade) {
  if (progresso.bausAbertos.includes(unidade.id)) return 'aberto';
  const tudoConcluido = unidade.licoes.length > 0 &&
    unidade.licoes.every(licao => licaoConcluida(progresso, licao.id));
  return tudoConcluido ? 'liberado' : 'trancado';
}

// Próximo passo do aluno, seguindo o caminho em ordem: a primeira
// lição 'atual' ou o primeiro baú 'liberado'. Devolve null se não
// houver nada para fazer agora.
function proximoPasso(progresso) {
  for (const trilha of CONTEUDO.trilhas) {
    for (const unidade of trilha.unidades) {
      for (const licao of unidade.licoes) {
        if (situacaoDaLicao(progresso, trilha, licao.id) === 'atual') {
          return { tipo: 'licao', trilha, unidade, licao };
        }
      }
      if (situacaoDoBau(progresso, unidade) === 'liberado') {
        return { tipo: 'bau', trilha, unidade };
      }
    }
  }
  return null;
}

// Quantas lições já têm conteúdo e quantas delas o aluno concluiu
function contarLicoes(progresso) {
  let disponiveis = 0;
  let concluidas = 0;
  for (const trilha of CONTEUDO.trilhas) {
    for (const item of licoesDaTrilha(trilha)) {
      if (item.licao.emBreve) continue;
      disponiveis += 1;
      if (licaoConcluida(progresso, item.licao.id)) concluidas += 1;
    }
  }
  return { disponiveis, concluidas };
}


// ============================================================
// 5. LIÇÃO EM ANDAMENTO
// ============================================================
// Quando o aluno abre uma lição, criamos uma "sessão": um objeto
// que guarda o que falta responder e como ele está indo. Ela só
// existe enquanto a lição está aberta (não é salva).
//
// A sessão tem uma fila com a vez de cada questão. A primeira da
// fila é a vez atual. Cada vez tem um tipo:
//   'aquecimento' → 1 ou 2 questões da lição anterior, antes de tudo (ver
//                   escolherAquecimento). Não tira vida, não conta na
//                   precisão e não volta na revisão.
//   'nova'        → as 5 questões da lição, do fácil para o difícil
//   'revisao'     → uma questão que o aluno errou, de novo no fim da
//                   fila, até ele acertar. Errar na revisão não tira vida.
// A lição só termina quando a fila esvazia.
//
// Refazer uma lição já concluída é um treino: errar não tira vida,
// não vale XP nem moedas e, no fim, as vidas voltam todas.

function iniciarLicao(progresso, licao) {
  const questoes = ordenarPorDificuldade(licao.questoes.map((questao, posicao) => ({
    posicao,   // lugar da questão no dados-licoes.js (para lembrar as erradas)
    dificuldade: questao.dificuldade,
    pergunta: questao.pergunta,
    alternativas: embaralhar(questao.alternativas)
  })));

  const aquecimento = escolherAquecimento(progresso, licao);
  const fila = [
    ...aquecimento.map((_, indice) => ({ tipo: 'aquecimento', indice })),
    ...questoes.map((_, indice) => ({ tipo: 'nova', indice }))
  ];

  return {
    licao,
    treino: licaoConcluida(progresso, licao.id),
    questoes,
    aquecimento,              // questões da lição anterior (nenhuma, 1 ou 2)
    fila,
    escolhida: null,          // alternativa marcada, antes de verificar
    verificada: false,        // o aluno já apertou "Verificar"?
    respondidas: 0,           // quantas vezes ele já apertou "Verificar"
    acertos: 0,               // questões certas de primeira (é a precisão)
    resultados: [],           // true/false da primeira resposta de cada questão
    consertadas: [],          // índices das erradas que ele acertou na revisão
    certasNoAquecimento: []   // índices (em aquecimento) das que ele acertou
  };
}

// O aquecimento: questões da lição anterior na mesma trilha. De
// preferência, as que o aluno errou de primeira da última vez:
//   - errou ERROS_PARA_AQUECIMENTO_DUPLO (3) ou mais: 2 delas (aquecimento duplo);
//   - errou 1 ou 2: 1 delas;
//   - não errou nenhuma: 1 fácil ou média qualquer.
// Devolve a lista de questões, da mais fácil para a mais difícil. A
// primeira lição da trilha não tem aquecimento (lista vazia).
function escolherAquecimento(progresso, licao) {
  const achada = encontrarLicao(licao.id);
  if (!achada) return [];
  const lista = licoesDaTrilha(achada.trilha);
  const lugar = lista.findIndex(item => item.licao.id === licao.id);
  const anterior = lugar > 0 ? lista[lugar - 1].licao : null;
  if (!anterior || !Array.isArray(anterior.questoes) || anterior.questoes.length === 0) return [];

  const todas = anterior.questoes.map((_, posicao) => posicao);
  const salvas = progresso.errosPorLicao[anterior.id];
  const erradas = Array.isArray(salvas) ? todas.filter(posicao => salvas.includes(posicao)) : [];
  const leves = todas.filter(posicao => anterior.questoes[posicao].dificuldade !== 'dificil');

  let posicoes;
  if (erradas.length >= ERROS_PARA_AQUECIMENTO_DUPLO) {
    posicoes = embaralhar(erradas).slice(0, 2);   // 2 diferentes, sorteadas
  } else if (erradas.length > 0) {
    posicoes = [sortear(erradas)];
  } else {
    posicoes = [sortear(leves.length > 0 ? leves : todas)];
  }

  return ordenarPorDificuldade(posicoes.map(posicao => {
    const questao = anterior.questoes[posicao];
    return {
      idLicao: anterior.id,
      posicao,
      dificuldade: questao.dificuldade,
      pergunta: questao.pergunta,
      alternativas: embaralhar(questao.alternativas)
    };
  }));
}

// Questões sempre do fácil para o difícil
function ordenarPorDificuldade(questoes) {
  const peso = dificuldade => ORDEM_DAS_DIFICULDADES.indexOf(dificuldade);
  return [...questoes].sort((a, b) => peso(a.dificuldade) - peso(b.dificuldade));
}

// Embaralha uma lista sem mexer na original (algoritmo Fisher-Yates:
// de trás para a frente, troca cada item com outro sorteado antes dele)
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const sorteado = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[sorteado]] = [copia[sorteado], copia[i]];   // troca os dois de lugar
  }
  return copia;
}

// Escolhe um item ao acaso
function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// A vez atual: { tipo, indice }. O índice aponta para sessao.questoes
// (no aquecimento, aponta para sessao.aquecimento).
function vezAtual(sessao) {
  return sessao.fila[0];
}

function questaoAtual(sessao) {
  const vez = vezAtual(sessao);
  return vez.tipo === 'aquecimento' ? sessao.aquecimento[vez.indice] : sessao.questoes[vez.indice];
}

// Marca uma alternativa. Devolve false se não puder (já verificou,
// ou essa alternativa não existe nesta questão).
function marcarAlternativa(sessao, indice) {
  const total = questaoAtual(sessao).alternativas.length;
  if (sessao.verificada || indice < 0 || indice >= total) return false;
  sessao.escolhida = indice;
  return true;
}

// Confere a alternativa marcada. Só a questão nova de uma lição que
// não é treino tira vida (na hora) e conta na precisão do Perfil.
// Errou uma questão da lição? Ela volta no fim da fila.
function verificarResposta(progresso, sessao) {
  if (sessao.verificada || sessao.escolhida === null) return null;

  const vez = vezAtual(sessao);
  const questao = questaoAtual(sessao);
  const escolhida = questao.alternativas[sessao.escolhida];
  const correta = questao.alternativas.find(alternativa => alternativa.correta);
  const acertou = escolhida === correta;
  const valeVida = vez.tipo === 'nova' && !sessao.treino;
  const perdeuVida = valeVida && !acertou;

  sessao.verificada = true;
  sessao.respondidas += 1;

  if (vez.tipo === 'aquecimento') {
    if (acertou) sessao.certasNoAquecimento.push(vez.indice);
  } else if (vez.tipo === 'nova') {
    sessao.resultados.push(acertou);
    if (acertou) sessao.acertos += 1;
  } else if (acertou) {
    sessao.consertadas.push(vez.indice);
  }

  if (valeVida) {
    progresso.respostasDadas += 1;
    if (acertou) progresso.respostasCertas += 1;
  }

  if (perdeuVida) progresso.vidas = Math.max(0, progresso.vidas - 1);
  if (!acertou && vez.tipo !== 'aquecimento') sessao.fila.push({ tipo: 'revisao', indice: vez.indice });

  return {
    acertou,
    escolhida,
    correta,
    indiceDaCorreta: questao.alternativas.indexOf(correta),
    tipo: vez.tipo,
    perdeuVida,
    acabaramAsVidas: perdeuVida && progresso.vidas === 0
  };
}

// Depois do "Continuar". Devolve o que acontece agora:
//   'proxima'   → vem outra questão (nova ou revisão)
//   'fim'       → a fila esvaziou: a lição foi concluída
//   'sem-vidas' → as vidas acabaram e a lição para aqui
function avancarQuestao(progresso, sessao) {
  if (!sessao.treino && progresso.vidas === 0) return 'sem-vidas';
  sessao.fila.shift();
  sessao.escolhida = null;
  sessao.verificada = false;
  if (sessao.fila.length === 0) return 'fim';

  // Na revisão, as alternativas voltam em outra ordem: o aluno
  // precisa ler de novo, não só lembrar onde estava a certa
  const vez = vezAtual(sessao);
  if (vez.tipo === 'revisao') {
    const questao = sessao.questoes[vez.indice];
    questao.alternativas = embaralhar(questao.alternativas);
  }
  return 'proxima';
}

// Fecha a lição: o XP e as moedas entram agora (quem sai no meio
// não ganha), a lição fica concluída e o dia conta na sequência.
// A precisão conta só as respostas de primeira.
// No treino não entra XP nem moeda: as vidas voltam todas.
// O resumo diz também o nível e se o aluno subiu de nível.
function concluirLicao(progresso, sessao, hoje = hojeComoTexto()) {
  const total = sessao.questoes.length;
  const perfeita = sessao.acertos === total;
  const vidasAntes = progresso.vidas;
  const nivelAntes = nivelDoXp(progresso.xp).numero;
  let xp = 0;
  let moedas = 0;

  if (sessao.treino) {
    progresso.vidas = VIDAS_MAXIMAS;
  } else {
    const revisoesCertas = sessao.consertadas.length + sessao.certasNoAquecimento.length;
    xp = sessao.acertos * XP_POR_ACERTO + revisoesCertas * XP_DE_REVISAO;
    moedas = MOEDAS_POR_LICAO + (perfeita ? MOEDAS_LICAO_PERFEITA : 0);
    progresso.xp += xp;
    progresso.moedas += moedas;
    if (!licaoConcluida(progresso, sessao.licao.id)) {
      progresso.licoesConcluidas.push(sessao.licao.id);
    }
  }

  lembrarErros(progresso, sessao);

  const sequenciaAntes = progresso.sequencia;
  registrarDiaDeEstudo(progresso, hoje);
  const nivel = nivelDoXp(progresso.xp);

  return {
    titulo: sessao.licao.titulo,
    treino: sessao.treino,
    xp,
    moedas,
    perfeita,
    precisao: Math.round((sessao.acertos / total) * 100),
    vidas: progresso.vidas,
    vidasVoltaram: progresso.vidas > vidasAntes,
    sequencia: progresso.sequencia,
    sequenciaSubiu: progresso.sequencia > sequenciaAntes,
    nivel,
    subiuDeNivel: nivel.numero > nivelAntes
  };
}

// Para o aquecimento: guarda as questões que o aluno errou de primeira
// nesta vez (no lugar das da vez anterior) e tira da lista da lição
// anterior cada questão do aquecimento que ele acertou.
function lembrarErros(progresso, sessao) {
  progresso.errosPorLicao[sessao.licao.id] = sessao.questoes
    .filter((_, i) => sessao.resultados[i] === false)
    .map(questao => questao.posicao);

  for (const indice of sessao.certasNoAquecimento) {
    const questao = sessao.aquecimento[indice];
    const daAnterior = progresso.errosPorLicao[questao.idLicao];
    if (Array.isArray(daAnterior)) {
      progresso.errosPorLicao[questao.idLicao] = daAnterior.filter(posicao => posicao !== questao.posicao);
    }
  }
}


// ============================================================
// 6. SEM VIDAS: RECARGA E TREINO
// ============================================================
// Quando as vidas acabam numa lição nova, o aluno tem duas saídas:
//   - recarregar: paga PRECO_DA_RECARGA moedas, as vidas voltam
//     todas e a lição continua de onde parou;
//   - treinar: refaz de graça uma lição concluída (ver a seção 5).
//     A lição parada recomeça depois.
// Antes de concluir a primeira lição ainda não há o que treinar:
// quem fica sem vidas ali paga a recarga com a MESADA_DE_BOAS_VINDAS.

function podeRecarregar(progresso) {
  return progresso.vidas === 0 && progresso.moedas >= PRECO_DA_RECARGA;
}

// Paga a recarga. Devolve false se não puder.
function recarregarVidas(progresso) {
  if (!podeRecarregar(progresso)) return false;
  progresso.moedas -= PRECO_DA_RECARGA;
  progresso.vidas = VIDAS_MAXIMAS;
  return true;
}

// A lição concluída mais recente (a última na ordem da trilha), para
// o treino. Devolve null se o aluno ainda não concluiu nenhuma.
function licaoParaTreinar(progresso) {
  let escolhida = null;
  for (const trilha of CONTEUDO.trilhas) {
    for (const item of licoesDaTrilha(trilha)) {
      if (licaoConcluida(progresso, item.licao.id)) escolhida = item.licao;
    }
  }
  return escolhida;
}


// ============================================================
// 7. BAÚ
// ============================================================

// Abre o baú, se estiver liberado. Devolve a recompensa (ou null),
// com o nível e se o XP do baú fez o aluno subir de nível.
function abrirBau(progresso, unidade) {
  if (situacaoDoBau(progresso, unidade) !== 'liberado') return null;
  const nivelAntes = nivelDoXp(progresso.xp).numero;
  progresso.xp += XP_DO_BAU;
  progresso.moedas += MOEDAS_DO_BAU;
  progresso.bausAbertos.push(unidade.id);
  const nivel = nivelDoXp(progresso.xp);
  return { xp: XP_DO_BAU, moedas: MOEDAS_DO_BAU, nivel, subiuDeNivel: nivel.numero > nivelAntes };
}


// ============================================================
// 8. DICA DO DIA
// ============================================================

// Uma dica da Estrela por dia, em rodízio
function dicaDoDia(hoje = hojeComoTexto()) {
  const dicas = CONTEUDO.dicasDaEstrela || [];
  if (dicas.length === 0) return '';
  const numeroDoDia = diasEntre('2026-01-01', hoje);
  const posicao = ((numeroDoDia % dicas.length) + dicas.length) % dicas.length;
  return dicas[posicao];
}


// ============================================================
// 9. CONFERÊNCIA DO CONTEÚDO
// ============================================================
// Olha o dados-licoes.js inteiro e lista o que estiver fora do
// combinado. O app mostra a lista no topo da tela para a equipe
// corrigir. Lista vazia = tudo certo.

function conferirConteudo(conteudo = CONTEUDO) {
  const problemas = [];
  const idsUsados = new Set();

  function conferirId(id, descricao) {
    if (!id) problemas.push(`${descricao} está sem id.`);
    else if (idsUsados.has(id)) problemas.push(`O id "${id}" está repetido.`);
    else idsUsados.add(id);
  }

  for (const trilha of conteudo.trilhas) {
    conferirId(trilha.id, `A trilha "${trilha.titulo}"`);
    for (const unidade of trilha.unidades) {
      conferirId(unidade.id, `A unidade "${unidade.titulo}"`);
      for (const licao of unidade.licoes) {
        conferirId(licao.id, `A lição "${licao.titulo}"`);
        if (!licao.emBreve) conferirLicao(licao, problemas);
      }
    }
  }
  return problemas;
}

function conferirLicao(licao, problemas) {
  const nome = `Lição "${licao.titulo}"`;

  if (!Array.isArray(licao.questoes) || licao.questoes.length === 0) {
    problemas.push(`${nome}: está sem questões. Se ainda não tem conteúdo, use emBreve: true.`);
    return;
  }

  const contagem = { facil: 0, media: 0, dificil: 0 };

  licao.questoes.forEach((questao, i) => {
    const onde = `${nome}, questão ${i + 1}`;
    const alternativas = questao.alternativas || [];

    if (contagem[questao.dificuldade] === undefined) {
      problemas.push(`${onde}: a dificuldade precisa ser 'facil', 'media' ou 'dificil'.`);
    } else {
      contagem[questao.dificuldade] += 1;
    }

    if (!questao.pergunta) problemas.push(`${onde}: falta a pergunta.`);

    if (alternativas.length < 2 || alternativas.length > 4) {
      problemas.push(`${onde}: precisa ter de 2 a 4 alternativas (tem ${alternativas.length}).`);
    }

    const certas = alternativas.filter(alternativa => alternativa.correta === true).length;
    if (certas !== 1) problemas.push(`${onde}: precisa ter 1 alternativa correta (tem ${certas}).`);

    alternativas.forEach((alternativa, j) => {
      if (!alternativa.texto) problemas.push(`${onde}, alternativa ${j + 1}: falta o texto.`);
      if (!alternativa.explicacao) problemas.push(`${onde}, alternativa ${j + 1}: falta a explicação.`);
    });
  });

  for (const nivel of ORDEM_DAS_DIFICULDADES) {
    const esperado = QUESTOES_POR_DIFICULDADE[nivel];
    if (contagem[nivel] !== esperado) {
      const nomeDoNivel = NOME_DA_DIFICULDADE[nivel].toLowerCase();
      problemas.push(`${nome}: precisa de ${esperado} de nível ${nomeDoNivel}, mas tem ${contagem[nivel]}.`);
    }
  }
}
