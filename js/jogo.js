// ============================================================
// jogo.js — As regras do FinEdu
// ============================================================
// XP, moedas, vidas, sequência de dias, o que está liberado na
// trilha e o baú. Este arquivo só faz contas e decide regras:
// não desenha nada (isso é o telas.js) e não salva nada (quem
// salva é o app.js, usando o armazenamento.js).
//
// Os valores são PROVISÓRIOS: a conversa 05 vai ajustar. Para
// mudar uma regra de valor, troque só a constante lá embaixo.
//
// Várias funções recebem "hoje" como último parâmetro. No uso
// normal ele é a data do aparelho; nos testes dá para passar
// outra data e simular, por exemplo, três dias seguidos.
// ============================================================


// ============================================================
// 1. VALORES DO JOGO
// ============================================================

const XP_POR_ACERTO = 10;          // cada questão nova certa de primeira
const XP_DE_REVISAO = 5;           // cada errada que o aluno acerta na revisão
const MOEDAS_POR_LICAO = 10;       // ao concluir uma lição
const MOEDAS_LICAO_PERFEITA = 5;   // extra se acertar todas
const XP_DO_BAU = 20;              // ao abrir o baú da unidade
const MOEDAS_DO_BAU = 20;
const VIDAS_MAXIMAS = 5;           // voltam todas no dia seguinte

// Formato de toda lição: quantas questões de cada nível
const QUESTOES_POR_DIFICULDADE = { facil: 2, media: 2, dificil: 1 };

// Ordem em que os níveis aparecem e o nome de cada um na tela
const ORDEM_DAS_DIFICULDADES = ['facil', 'media', 'dificil'];
const NOME_DA_DIFICULDADE = { facil: 'Fácil', media: 'Média', dificil: 'Difícil' };


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
    moedas: 0,
    vidas: VIDAS_MAXIMAS,
    diaDasVidas: hoje,         // último dia em que as vidas foram recarregadas
    sequencia: 0,              // dias seguidos com lição concluída
    ultimoDiaDeEstudo: null,   // último dia com lição concluída
    licoesConcluidas: [],      // ids das lições concluídas
    bausAbertos: [],           // ids das unidades com o baú já aberto
    respostasCertas: 0,        // para a precisão do Perfil
    respostasDadas: 0
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
//   'nova'    → as 5 questões da lição, do fácil para o difícil
//   'revisao' → uma questão que o aluno errou, de novo no fim da
//               fila, até ele acertar. Errar na revisão não tira vida.
// A lição só termina quando a fila esvazia.

function iniciarLicao(licao) {
  const questoes = ordenarPorDificuldade(licao.questoes).map(questao => ({
    dificuldade: questao.dificuldade,
    pergunta: questao.pergunta,
    alternativas: embaralhar(questao.alternativas)
  }));

  return {
    licao,
    questoes,
    fila: questoes.map((_, indice) => ({ tipo: 'nova', indice })),
    escolhida: null,    // alternativa marcada, antes de verificar
    verificada: false,  // o aluno já apertou "Verificar"?
    respondidas: 0,     // quantas vezes ele já apertou "Verificar"
    acertos: 0,         // questões certas de primeira (é a precisão)
    resultados: [],     // true/false da primeira resposta de cada questão
    consertadas: []     // índices das erradas que ele acertou na revisão
  };
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

// A vez atual: { tipo, indice }. O índice aponta para sessao.questoes.
function vezAtual(sessao) {
  return sessao.fila[0];
}

function questaoAtual(sessao) {
  return sessao.questoes[vezAtual(sessao).indice];
}

// Marca uma alternativa. Devolve false se não puder (já verificou,
// ou essa alternativa não existe nesta questão).
function marcarAlternativa(sessao, indice) {
  const total = questaoAtual(sessao).alternativas.length;
  if (sessao.verificada || indice < 0 || indice >= total) return false;
  sessao.escolhida = indice;
  return true;
}

// Confere a alternativa marcada. Só a questão nova tira vida (na
// hora) e conta na precisão. Errou? A questão volta no fim da fila.
function verificarResposta(progresso, sessao) {
  if (sessao.verificada || sessao.escolhida === null) return null;

  const vez = vezAtual(sessao);
  const questao = questaoAtual(sessao);
  const escolhida = questao.alternativas[sessao.escolhida];
  const correta = questao.alternativas.find(alternativa => alternativa.correta);
  const acertou = escolhida === correta;
  const perdeuVida = vez.tipo === 'nova' && !acertou;

  sessao.verificada = true;
  sessao.respondidas += 1;

  if (vez.tipo === 'nova') {
    sessao.resultados.push(acertou);
    progresso.respostasDadas += 1;
    if (acertou) {
      sessao.acertos += 1;
      progresso.respostasCertas += 1;
    }
  } else if (acertou) {
    sessao.consertadas.push(vez.indice);
  }

  if (perdeuVida) progresso.vidas = Math.max(0, progresso.vidas - 1);
  if (!acertou) sessao.fila.push({ tipo: 'revisao', indice: vez.indice });

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
  if (progresso.vidas === 0) return 'sem-vidas';
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
function concluirLicao(progresso, sessao, hoje = hojeComoTexto()) {
  const total = sessao.questoes.length;
  const perfeita = sessao.acertos === total;
  const xp = sessao.acertos * XP_POR_ACERTO + sessao.consertadas.length * XP_DE_REVISAO;
  const moedas = MOEDAS_POR_LICAO + (perfeita ? MOEDAS_LICAO_PERFEITA : 0);

  progresso.xp += xp;
  progresso.moedas += moedas;
  if (!licaoConcluida(progresso, sessao.licao.id)) {
    progresso.licoesConcluidas.push(sessao.licao.id);
  }

  const sequenciaAntes = progresso.sequencia;
  registrarDiaDeEstudo(progresso, hoje);

  return {
    titulo: sessao.licao.titulo,
    xp,
    moedas,
    perfeita,
    precisao: Math.round((sessao.acertos / total) * 100),
    sequencia: progresso.sequencia,
    sequenciaSubiu: progresso.sequencia > sequenciaAntes
  };
}


// ============================================================
// 6. BAÚ
// ============================================================

// Abre o baú, se estiver liberado. Devolve a recompensa (ou null).
function abrirBau(progresso, unidade) {
  if (situacaoDoBau(progresso, unidade) !== 'liberado') return null;
  progresso.xp += XP_DO_BAU;
  progresso.moedas += MOEDAS_DO_BAU;
  progresso.bausAbertos.push(unidade.id);
  return { xp: XP_DO_BAU, moedas: MOEDAS_DO_BAU };
}


// ============================================================
// 7. DICA DO DIA
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
// 8. CONFERÊNCIA DO CONTEÚDO
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
