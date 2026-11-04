// ============================================================
// jogo.js — As regras do FinEdu
// ============================================================
// XP, níveis, moedas, vidas, sequência de dias, o que está liberado
// na trilha, o aquecimento, a revisão, a recarga, o treino, o baú e
// a missão do dia.
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

// Missão do dia (seção 8): uma por dia, a mesma para todo mundo
const XP_DA_MISSAO = 20;   // recompensa, uma vez por dia (sem moedas)
const PRIMEIRO_DIA_DAS_MISSOES = '2026-11-01';   // dia da 1ª missão da lista

// As missões, em rodízio: um item por dia, na ordem da lista, e depois
// ela recomeça. Com 5 missões, a 1ª volta a cada 5 dias: 01/11, 06/11,
// 11/11 (o dia da apresentação)... "conta" diz qual número do dia a
// missão olha (ver missaoZerada) e "meta" é quanto ele precisa chegar.
const MISSOES = [
  { texto: 'Conclua 1 lição', conta: 'licoes', meta: 1 },
  { texto: 'Conclua 2 lições', conta: 'licoes', meta: 2 },
  { texto: 'Acerte 10 questões', conta: 'acertos', meta: 10 },
  { texto: 'Acerte de primeira todas as questões de uma lição', conta: 'perfeitas', meta: 1 },
  { texto: 'Faça uma conta na Calculadora de Metas', conta: 'contas', meta: 1 }
];

// Calculadora de Metas
const MESES_MINIMOS_META = 1;
const MESES_MAXIMOS_META = 1200;   // teto técnico de segurança (100 anos)
const ANOS_MINIMOS_FUTURO = 1;
const ANOS_MAXIMOS_FUTURO = 100;
const SEMANAS_POR_MES = 30 / 7;    // mês comercial de 30 dias dividido por 7 dias
const TAXA_EXEMPLO_PADRAO = 0.8;   // taxa mensal (%) inicial do simulador educativo
const TAXA_EXEMPLO_MAXIMA = 20;    // limite superior da taxa de exemplo (% ao mês)


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
    errosPorLicao: {},         // id da lição → posições das questões que o aluno
    // errou de primeira da última vez (para o aquecimento)
    boasVindasVistas: false,   // o aviso de boas-vindas já apareceu?
    missao: missaoZerada(hoje) // o que o aluno fez hoje para a missão do dia (seção 8)
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
  if (!missaoEstaBoa(progresso.missao)) progresso.missao = missaoZerada(hoje);
  progresso.vidas = Math.min(progresso.vidas, VIDAS_MAXIMAS);

  // O aviso de boas-vindas é só para quem começa do zero (progresso
  // novo ou reiniciado). Um progresso salvo antes de o aviso existir
  // conta como visto, para não atrapalhar quem já está jogando.
  progresso.boasVindasVistas = salvo ? salvo.boasVindasVistas !== false : false;

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

  // Dia novo: a missão do dia recomeça do zero
  if (progresso.missao.dia !== hoje) {
    progresso.missao = missaoZerada(hoje);
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

// O aviso de boas-vindas apareceu: não aparece mais (até
// "Reiniciar progresso")
function marcarBoasVindasVistas(progresso) {
  progresso.boasVindasVistas = true;
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
// No treino não entra o XP da lição nem moeda: as vidas voltam todas.
// A lição (e o treino) conta para a missão do dia (seção 8). Se a
// missão terminar agora, os XP_DA_MISSAO entram e o resumo avisa
// (missaoConcluida); o "xp" do resumo continua sendo só o da lição.
// O resumo diz também o nível e se o aluno subiu de nível (já
// contando a recompensa da missão).
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

  // Missão do dia: as questões certas valem em todas as partes
  // (aquecimento, questão nova e revisão, no treino também)
  const acertosDaLicao = sessao.acertos + sessao.consertadas.length + sessao.certasNoAquecimento.length;
  const missaoConcluida = somarNaMissao(progresso,
    { licoes: 1, acertos: acertosDaLicao, perfeitas: perfeita ? 1 : 0 }, hoje);

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
    missaoConcluida,
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
// 8. MISSÃO DO DIA
// ============================================================
// Uma missão por dia, a mesma para todo mundo no mesmo dia. O
// rodízio conta os dias desde PRIMEIRO_DIA_DAS_MISSOES e usa o resto
// da divisão pelo tamanho da lista MISSOES: com 5 missões, resto 0 é
// a 1ª da lista, resto 1 é a 2ª, e assim por diante.
//
// O progresso guarda em "missao" os números de hoje: lições concluídas
// (o treino conta), questões certas (em qualquer parte da lição),
// lições com todas as questões certas de primeira e contas feitas na
// Calculadora de Metas. A missão de hoje olha um desses números; quando
// ele chega à meta, entram os XP_DA_MISSAO, uma vez só no dia. No dia
// seguinte, tudo zera (atualizarDia).
//
// A lição e o treino só contam quando terminam, como o XP: quem sai
// no meio não ganha nada.

// Os números do dia que uma missão pode olhar
const NUMEROS_DA_MISSAO = ['licoes', 'acertos', 'perfeitas', 'contas'];

// A missão de um dia que ainda não começou: tudo zerado
function missaoZerada(hoje = hojeComoTexto()) {
  return { dia: hoje, licoes: 0, acertos: 0, perfeitas: 0, contas: 0, concluida: false };
}

// Confere a "missao" que veio do armazenamento (pode vir estragada)
function missaoEstaBoa(missao) {
  return typeof missao === 'object' && missao !== null && !Array.isArray(missao) &&
    typeof missao.dia === 'string' && typeof missao.concluida === 'boolean' &&
    NUMEROS_DA_MISSAO.every(numero => Number.isFinite(missao[numero]) && missao[numero] >= 0);
}

// A missão de um dia: um item de MISSOES ({ texto, conta, meta })
function missaoDoDia(hoje = hojeComoTexto()) {
  const total = MISSOES.length;
  const dias = diasEntre(PRIMEIRO_DIA_DAS_MISSOES, hoje);
  // O "+ total" deixa o resto positivo também para um dia antes do primeiro
  return MISSOES[((dias % total) + total) % total];
}

// Como está a missão de hoje, para as telas:
//   { texto, conta, meta, feito, concluida }
// "feito" é quanto o aluno já fez hoje (no máximo a meta).
function situacaoDaMissao(progresso, hoje = hojeComoTexto()) {
  const missao = missaoDoDia(hoje);
  const deHoje = progresso.missao.dia === hoje ? progresso.missao : missaoZerada(hoje);
  return {
    texto: missao.texto,
    conta: missao.conta,
    meta: missao.meta,
    feito: Math.min(deHoje[missao.conta], missao.meta),
    concluida: deHoje.concluida
  };
}

// Soma nos números de hoje o que o aluno acabou de fazer (ex.: uma lição,
// { licoes: 1, acertos: 6, perfeitas: 1 }, ou uma conta, { contas: 1 }).
// Se a missão de hoje chegou à meta agora, os XP_DA_MISSAO entram e a
// função devolve true. Depois disso, no mesmo dia, devolve sempre false.
function somarNaMissao(progresso, feito, hoje = hojeComoTexto()) {
  if (progresso.missao.dia !== hoje) progresso.missao = missaoZerada(hoje);
  const deHoje = progresso.missao;
  for (const numero of NUMEROS_DA_MISSAO) {
    deHoje[numero] += feito[numero] || 0;
  }

  const missao = missaoDoDia(hoje);
  if (deHoje.concluida || deHoje[missao.conta] < missao.meta) return false;
  deHoje.concluida = true;
  progresso.xp += XP_DA_MISSAO;
  return true;
}

// Uma conta feita na Calculadora de Metas (com resultado, sem erro).
// Devolve null se a missão não terminou agora. Se terminou, devolve a
// recompensa, com o nível e se os XP_DA_MISSAO fizeram o aluno subir.
function registrarContaNaCalculadora(progresso, hoje = hojeComoTexto()) {
  const nivelAntes = nivelDoXp(progresso.xp).numero;
  if (!somarNaMissao(progresso, { contas: 1 }, hoje)) return null;
  const nivel = nivelDoXp(progresso.xp);
  return { xp: XP_DA_MISSAO, nivel, subiuDeNivel: nivel.numero > nivelAntes };
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


// ============================================================
// 10. CALCULADORA DE METAS
// ============================================================
// Funções puras para ler os campos digitados, validar valores,
// arredondar centavos sempre para cima, formatar em reais (R$) e
// calcular quanto guardar por mês, por semana e no simulador de
// rendimento. Nenhuma função aqui salva nada nem mexe no HTML.

// Lê um número digitado com vírgula ou ponto decimal (ex.: "12,50"
// ou "12.50"), tirando espaços nas pontas. Devolve:
//   - 'vazio'    → campo em branco, null ou undefined
//   - 'invalido' → número negativo, letras ou formato incorreto
//   - Number     → número válido maior ou igual a zero
function lerNumeroCalculadora(entrada) {
  if (entrada === null || entrada === undefined) return 'vazio';

  if (typeof entrada === 'number') {
    if (!Number.isFinite(entrada) || entrada < 0) return 'invalido';
    return entrada;
  }

  const texto = String(entrada).trim();
  if (texto === '') return 'vazio';

  let normalizado = null;
  if (/^\d+([.,]\d+)?$/.test(texto)) {
    normalizado = texto.replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+,\d+$/.test(texto)) {
    normalizado = texto.replace(/\./g, '').replace(',', '.');
  } else {
    return 'invalido';
  }

  const numero = Number(normalizado);
  if (!Number.isFinite(numero) || numero < 0) return 'invalido';
  return numero;
}

// Qualquer fração de centavo sobe para o próximo centavo
// (ex.: 100 / 3 = 33,34). O -1e-9 evita subir por imprecisão
// binária quando a divisão já é exata em centavos.
function arredondarParaCima(valor) {
  if (!Number.isFinite(valor) || valor <= 0) return 0;
  return Math.ceil((valor - 1e-9) * 100) / 100;
}

// Formata no padrão brasileiro: R$ 1.234,56
function formatarMoeda(valor) {
  const numero = Number.isFinite(valor) ? valor : 0;
  const centavosTotais = Math.round(Math.abs(numero) * 100);
  const reais = Math.floor(centavosTotais / 100);
  const centavos = String(centavosTotais % 100).padStart(2, '0');
  const reaisComPonto = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const sinal = numero < 0 ? '-' : '';
  return `${sinal}R$ ${reaisComPonto},${centavos}`;
}

// Quando o prazo passa de 12 meses, devolve o equivalente em anos
// (ex.: 24 → "2 anos", 18 → "1 ano e 6 meses"). Até 12, devolve "".
function descreverEquivalenteEmAnos(meses) {
  if (!Number.isInteger(meses) || meses <= 12) return '';
  const anos = Math.floor(meses / 12);
  const restoMeses = meses % 12;
  const textoAnos = anos === 1 ? '1 ano' : `${anos} anos`;
  if (restoMeses === 0) return textoAnos;
  const textoResto = restoMeses === 1 ? '1 mês' : `${restoMeses} meses`;
  return `${textoAnos} e ${textoResto}`;
}

// "1 mês", "6 meses", "24 meses (2 anos)" ou "18 meses (1 ano e 6 meses)"
function formatarPrazoMeses(meses) {
  const base = meses === 1 ? '1 mês' : `${meses} meses`;
  const equivalente = descreverEquivalenteEmAnos(meses);
  return equivalente ? `${base} (${equivalente})` : base;
}

// Calcula quanto guardar por mês e por semana para atingir uma meta.
// Aceita (custo, meses, guardado) ou ({ custo, meses, guardado }).
function calcularMeta(custoEntrada, mesesEntrada, guardadoEntrada = 0) {
  if (typeof custoEntrada === 'object' && custoEntrada !== null) {
    mesesEntrada = custoEntrada.meses;
    guardadoEntrada = custoEntrada.guardado !== undefined ? custoEntrada.guardado : 0;
    custoEntrada = custoEntrada.custo;
  }

  const custo = lerNumeroCalculadora(custoEntrada);
  const meses = lerNumeroCalculadora(mesesEntrada);
  const guardadoLido = lerNumeroCalculadora(guardadoEntrada);
  const guardado = guardadoLido === 'vazio' ? 0 : guardadoLido;

  if (custo === 'invalido' || meses === 'invalido' || guardado === 'invalido') {
    return {
      valido: false,
      erro: 'Use só números, como 300 ou 12,50.'
    };
  }

  if (custo === 'vazio' || custo === 0) {
    return {
      valido: false,
      erro: 'Digite quanto custa o que você quer.'
    };
  }

  if (meses === 'vazio' || !Number.isInteger(meses) || meses < MESES_MINIMOS_META || meses > MESES_MAXIMOS_META) {
    return {
      valido: false,
      erro: 'Escolha um prazo inteiro a partir de 1 mês.'
    };
  }

  const equivalenteAnos = descreverEquivalenteEmAnos(meses);
  const prazoTexto = formatarPrazoMeses(meses);

  if (guardado >= custo) {
    const sobra = Math.round((guardado - custo) * 100) / 100;
    return {
      valido: true,
      erro: null,
      modo: 'sem-juros',
      metaAtingida: true,
      custo,
      meses,
      equivalenteAnos,
      prazoTexto,
      guardado,
      falta: 0,
      sobra,
      mensal: 0,
      semanal: 0,
      mensalFormatado: formatarMoeda(0),
      semanalFormatado: formatarMoeda(0),
      porcentagemGuardada: 100,
      mensagem: 'Você já tem o suficiente! Que tal guardar o que sobrar para a próxima meta?',
      subtexto: ''
    };
  }

  const falta = Math.round((custo - guardado) * 100) / 100;
  const mensal = arredondarParaCima(falta / meses);
  const semanal = arredondarParaCima(mensal / SEMANAS_POR_MES);
  const porcentagemGuardada = guardado > 0
    ? Math.min(99, Math.max(1, Math.round((guardado / custo) * 100)))
    : 0;
  const mensalFormatado = formatarMoeda(mensal);
  const semanalFormatado = formatarMoeda(semanal);

  return {
    valido: true,
    erro: null,
    modo: 'sem-juros',
    metaAtingida: false,
    custo,
    meses,
    equivalenteAnos,
    prazoTexto,
    guardado,
    falta,
    sobra: 0,
    mensal,
    semanal,
    mensalFormatado,
    semanalFormatado,
    porcentagemGuardada,
    mensagem: `Guardando ${mensalFormatado} por mês, você chega lá em ${prazoTexto}.`,
    subtexto: `Isso dá uns ${semanalFormatado} por semana.`
  };
}

// Compara guardar o dinheiro parado (na gaveta) com guardar rendendo
// juros compostos todo mês usando uma taxa mensal de exemplo (%).
function simularRendimento(metaOuCusto, taxaEntrada = TAXA_EXEMPLO_PADRAO, guardadoEntrada = 0, taxaExtra = TAXA_EXEMPLO_PADRAO) {
  let meta = metaOuCusto;
  let taxaBruta = taxaEntrada;

  if (typeof metaOuCusto !== 'object' || metaOuCusto === null) {
    meta = calcularMeta(metaOuCusto, taxaEntrada, guardadoEntrada);
    taxaBruta = taxaExtra;
  }

  if (!meta || !meta.valido || meta.metaAtingida) {
    return null;
  }

  const taxaLida = lerNumeroCalculadora(taxaBruta);
  if (taxaLida === 'invalido') {
    return {
      valido: false,
      erro: 'Use só números, como 300 ou 12,50.'
    };
  }
  if (taxaLida === 'vazio' || taxaLida > TAXA_EXEMPLO_MAXIMA) {
    return {
      valido: false,
      erro: `Escolha uma taxa de exemplo entre 0 e ${TAXA_EXEMPLO_MAXIMA}% ao mês.`
    };
  }

  const totalParado = Math.round((meta.guardado + meta.mensal * meta.meses) * 100) / 100;
  const taxaDecimal = taxaLida / 100;
  let saldo = meta.guardado;

  for (let mes = 1; mes <= meta.meses; mes++) {
    saldo = (saldo + meta.mensal) * (1 + taxaDecimal);
  }

  const totalRendendo = Math.round(saldo * 100) / 100;
  const rendimento = Math.max(0, Math.round((totalRendendo - totalParado) * 100) / 100);

  return {
    valido: true,
    erro: null,
    taxa: taxaLida,
    totalParado,
    totalRendendo,
    rendimento,
    totalParadoFormatado: formatarMoeda(totalParado),
    totalRendendoFormatado: formatarMoeda(totalRendendo),
    rendimentoFormatado: formatarMoeda(rendimento),
    aviso: 'Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável.'
  };
}

// Calcula quanto guardar por mês com juros compostos (Aba 2):
// considera o rendimento do valor já guardado (montanteInicial) e o
// rendimento de cada aporte mensal até atingir a meta no prazo.
function calcularMetaComJuros(custoEntrada, mesesEntrada, guardadoEntrada = 0, taxaEntrada = TAXA_EXEMPLO_PADRAO) {
  if (typeof custoEntrada === 'object' && custoEntrada !== null) {
    mesesEntrada = custoEntrada.meses;
    guardadoEntrada = custoEntrada.guardado !== undefined ? custoEntrada.guardado : 0;
    taxaEntrada = custoEntrada.taxa !== undefined ? custoEntrada.taxa : TAXA_EXEMPLO_PADRAO;
    custoEntrada = custoEntrada.custo;
  }

  const base = calcularMeta(custoEntrada, mesesEntrada, guardadoEntrada);
  if (!base.valido) {
    return base;
  }

  const taxaLida = lerNumeroCalculadora(taxaEntrada);
  if (taxaLida === 'vazio' || taxaLida === 'invalido' || taxaLida <= 0 || taxaLida > TAXA_EXEMPLO_MAXIMA) {
    return {
      valido: false,
      erro: `Informe uma taxa de juros válida usando só números (de 0,1 a ${TAXA_EXEMPLO_MAXIMA}), como 0,8 ou 1.`
    };
  }

  const { custo, meses, guardado } = base;
  const taxaDecimal = taxaLida / 100;
  const fatorInicial = Math.pow(1 + taxaDecimal, meses);
  const montanteInicialBruto = guardado * fatorInicial;
  const montanteInicial = Math.round(montanteInicialBruto * 100) / 100;
  const aviso = 'Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável.';

  if (base.metaAtingida) {
    const rendimentoInicial = Math.max(0, Math.round((montanteInicial - guardado) * 100) / 100);
    return {
      ...base,
      modo: 'com-juros',
      taxa: taxaLida,
      montanteInicial,
      montanteInicialFormatado: formatarMoeda(montanteInicial),
      mensalSemJuros: 0,
      mensalComJuros: 0,
      economiaMensal: 0,
      economiaTotal: 0,
      totalSemJuros: guardado,
      totalTiradoDoBolso: guardado,
      totalComJuros: montanteInicial,
      rendimento: rendimentoInicial,
      totalSemJurosFormatado: formatarMoeda(guardado),
      totalTiradoDoBolsoFormatado: formatarMoeda(guardado),
      totalComJurosFormatado: formatarMoeda(montanteInicial),
      rendimentoFormatado: formatarMoeda(rendimentoInicial),
      aviso
    };
  }

  const faltaComJuros = Math.max(0, custo - montanteInicialBruto);
  const fatorAportes = ((fatorInicial - 1) / taxaDecimal) * (1 + taxaDecimal);
  const mensalComJuros = faltaComJuros > 0 ? arredondarParaCima(faltaComJuros / fatorAportes) : 0;
  const semanalComJuros = arredondarParaCima(mensalComJuros / SEMANAS_POR_MES);

  const mensalSemJuros = base.mensal;
  const totalSemJuros = Math.round((guardado + mensalSemJuros * meses) * 100) / 100;
  const totalTiradoDoBolso = Math.round((guardado + mensalComJuros * meses) * 100) / 100;
  const montanteFinalBruto = montanteInicialBruto + mensalComJuros * fatorAportes;
  const totalComJuros = Math.round(montanteFinalBruto * 100) / 100;
  const rendimento = Math.max(0, Math.round((totalComJuros - totalTiradoDoBolso) * 100) / 100);

  const economiaMensal = Math.max(0, Math.round((mensalSemJuros - mensalComJuros) * 100) / 100);
  const economiaTotal = Math.max(0, Math.round((totalSemJuros - totalTiradoDoBolso) * 100) / 100);

  const equivalenteAnos = base.equivalenteAnos;
  const prazoTexto = base.prazoTexto;
  const mensalFormatado = formatarMoeda(mensalComJuros);
  const semanalFormatado = formatarMoeda(semanalComJuros);
  const mensalSemJurosFormatado = formatarMoeda(mensalSemJuros);
  const economiaMensalFormatada = formatarMoeda(economiaMensal);
  const economiaTotalFormatada = formatarMoeda(economiaTotal);
  const totalSemJurosFormatado = formatarMoeda(totalSemJuros);
  const totalTiradoDoBolsoFormatado = formatarMoeda(totalTiradoDoBolso);
  const totalComJurosFormatado = formatarMoeda(totalComJuros);
  const rendimentoFormatado = formatarMoeda(rendimento);

  return {
    valido: true,
    erro: null,
    modo: 'com-juros',
    metaAtingida: false,
    custo,
    meses,
    equivalenteAnos,
    prazoTexto,
    guardado,
    taxa: taxaLida,
    falta: base.falta,
    sobra: 0,
    montanteInicial,
    montanteInicialFormatado: formatarMoeda(montanteInicial),
    mensal: mensalComJuros,
    semanal: semanalComJuros,
    mensalComJuros,
    semanalComJuros,
    mensalSemJuros,
    mensalFormatado,
    semanalFormatado,
    mensalSemJurosFormatado,
    economiaMensal,
    economiaTotal,
    economiaMensalFormatada,
    economiaTotalFormatada,
    totalSemJuros,
    totalTiradoDoBolso,
    totalComJuros,
    totalRendendo: totalComJuros,
    rendimento,
    totalSemJurosFormatado,
    totalTiradoDoBolsoFormatado,
    totalComJurosFormatado,
    rendimentoFormatado,
    porcentagemGuardada: base.porcentagemGuardada,
    mensagem: `Guardando ${mensalFormatado} por mês, você chega lá em ${prazoTexto}.`,
    subtexto: `Isso dá uns ${semanalFormatado} por semana.`,
    aviso
  };
}

// Simula quanto dinheiro será acumulado guardando um valor fixo por
// mês durante N anos com juros compostos (Aba 3: "Simular Futuro").
function simularFuturo(aporteEntrada, anosEntrada, guardadoEntrada = 0, taxaEntrada = TAXA_EXEMPLO_PADRAO) {
  if (typeof aporteEntrada === 'object' && aporteEntrada !== null) {
    anosEntrada = aporteEntrada.anos;
    guardadoEntrada = aporteEntrada.guardado !== undefined ? aporteEntrada.guardado : 0;
    taxaEntrada = aporteEntrada.taxa !== undefined ? aporteEntrada.taxa : TAXA_EXEMPLO_PADRAO;
    aporteEntrada = aporteEntrada.aporteMensal !== undefined ? aporteEntrada.aporteMensal : aporteEntrada.aporte;
  }

  const aporteMensal = lerNumeroCalculadora(aporteEntrada);
  const anos = lerNumeroCalculadora(anosEntrada);
  const guardadoLido = lerNumeroCalculadora(guardadoEntrada);
  const guardado = guardadoLido === 'vazio' ? 0 : guardadoLido;
  const taxaLida = lerNumeroCalculadora(taxaEntrada);

  if (aporteMensal === 'invalido' || anos === 'invalido' || guardado === 'invalido' || taxaLida === 'invalido') {
    return {
      valido: false,
      erro: 'Use só números, como 200 ou 12,50.'
    };
  }

  if (aporteMensal === 'vazio' || (aporteMensal === 0 && guardado === 0)) {
    return {
      valido: false,
      erro: 'Digite quanto você vai guardar por mês.'
    };
  }

  if (anos === 'vazio' || !Number.isInteger(anos) || anos < ANOS_MINIMOS_FUTURO || anos > ANOS_MAXIMOS_FUTURO) {
    return {
      valido: false,
      erro: `Escolha um prazo inteiro entre ${ANOS_MINIMOS_FUTURO} e ${ANOS_MAXIMOS_FUTURO} anos.`
    };
  }

  if (taxaLida === 'vazio' || taxaLida < 0 || taxaLida > TAXA_EXEMPLO_MAXIMA) {
    return {
      valido: false,
      erro: `Informe uma taxa de juros usando só números (de 0 a ${TAXA_EXEMPLO_MAXIMA}), como 0,8 ou 1.`
    };
  }

  const meses = anos * 12;
  const taxa = taxaLida / 100;
  const totalInvestidoDoBolso = Math.round((guardado + (aporteMensal * meses)) * 100) / 100;

  let montanteFinalBruto;
  if (taxa === 0) {
    montanteFinalBruto = totalInvestidoDoBolso;
  } else {
    const fator = Math.pow(1 + taxa, meses);
    montanteFinalBruto = guardado * fator + aporteMensal * ((fator - 1) / taxa);
  }

  const montanteFinalComJuros = Math.round(montanteFinalBruto * 100) / 100;
  const rendimentoTotal = Math.max(0, Math.round((montanteFinalComJuros - totalInvestidoDoBolso) * 100) / 100);
  const porcentagemRendimento = montanteFinalComJuros > 0
    ? Math.min(100, Math.max(0, Math.round((rendimentoTotal / montanteFinalComJuros) * 100)))
    : 0;
  const porcentagemBolso = 100 - porcentagemRendimento;

  const aporteFormatado = formatarMoeda(aporteMensal);
  const totalInvestidoDoBolsoFormatado = formatarMoeda(totalInvestidoDoBolso);
  const montanteFinalComJurosFormatado = formatarMoeda(montanteFinalComJuros);
  const rendimentoTotalFormatado = formatarMoeda(rendimentoTotal);
  const textoAnos = anos === 1 ? '1 ano' : `${anos} anos`;
  const aviso = 'Simulação. O rendimento de verdade muda com o tempo. Menor de idade investe com um responsável.';

  return {
    valido: true,
    erro: null,
    modo: 'simular-futuro',
    aporteMensal,
    anos,
    meses,
    guardado,
    taxa: taxaLida,
    totalInvestidoDoBolso,
    montanteFinalComJuros,
    rendimentoTotal,
    porcentagemRendimento,
    porcentagemBolso,
    aporteFormatado,
    totalInvestidoDoBolsoFormatado,
    montanteFinalComJurosFormatado,
    rendimentoTotalFormatado,
    mensagem: `Guardando ${aporteFormatado} por mês durante ${textoAnos} (${meses} meses), você vai acumular ${montanteFinalComJurosFormatado}!`,
    aviso
  };
}
