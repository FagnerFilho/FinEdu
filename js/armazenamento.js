// ============================================================
// armazenamento.js — O ÚNICO arquivo que lê e grava no aparelho
// ============================================================
// O progresso (XP, moedas, vidas, lições concluídas...) fica
// salvo no próprio aparelho, no "localStorage" do navegador:
// uma gaveta de texto que continua lá mesmo depois de fechar a
// página. Nada vai para a internet.
//
// Além do progresso do aluno, fica salva uma configuração do
// aparelho: o modo apresentação (Mais → Apresentação). Ela mora
// numa gaveta separada, e por isso o "Reiniciar progresso" não
// desliga o modo.
//
// Regra do projeto: nenhum outro arquivo usa localStorage.
// Se um dia o FinEdu tiver servidor, só este arquivo muda.
//
// Este arquivo não sabe o que tem dentro do progresso (isso é
// assunto do jogo.js). Ele só guarda e devolve.
//
// Todas as funções usam o localStorage. O último parâmetro,
// "gaveta", é só para os testes: o testes.html passa uma gaveta
// de mentira (um objeto com os mesmos getItem, setItem e
// removeItem), para não mexer no que está salvo no aparelho.
// ============================================================

// Nome da "gaveta" onde o progresso fica guardado
const CHAVE_DO_PROGRESSO = 'finedu-progresso';

// Gaveta do modo apresentação: 'ligado' quando ele está ligado,
// vazia quando está desligado
const CHAVE_DO_MODO_APRESENTACAO = 'finedu-modo-apresentacao';


// Devolve o progresso salvo, ou null se não houver nada
// (primeira visita) ou se o que estava salvo não der para ler.
function carregarProgresso(gaveta) {
  try {
    const texto = (gaveta || localStorage).getItem(CHAVE_DO_PROGRESSO);
    if (texto === null) return null;

    // O progresso é guardado como texto no formato JSON;
    // JSON.parse transforma o texto de volta em objeto.
    const progresso = JSON.parse(texto);
    const ehObjeto = progresso !== null && typeof progresso === 'object' && !Array.isArray(progresso);
    return ehObjeto ? progresso : null;
  } catch (erro) {
    console.warn('Não deu para ler o progresso salvo:', erro);
    return null;
  }
}


// Guarda o progresso. Devolve true se deu certo.
function salvarProgresso(progresso, gaveta) {
  try {
    (gaveta || localStorage).setItem(CHAVE_DO_PROGRESSO, JSON.stringify(progresso));
    return true;
  } catch (erro) {
    console.warn('Não deu para salvar o progresso:', erro);
    return false;
  }
}


// Apaga o progresso salvo (botão "Reiniciar progresso", em Mais).
// Só esvazia a gaveta do progresso: o modo apresentação continua
// como estava. Devolve true se deu certo.
function reiniciarProgresso(gaveta) {
  try {
    (gaveta || localStorage).removeItem(CHAVE_DO_PROGRESSO);
    return true;
  } catch (erro) {
    console.warn('Não deu para apagar o progresso:', erro);
    return false;
  }
}


// O modo apresentação está ligado neste aparelho? Sem nada salvo
// (ou sem poder ler), ele está desligado.
function carregarModoApresentacao(gaveta) {
  try {
    return (gaveta || localStorage).getItem(CHAVE_DO_MODO_APRESENTACAO) === 'ligado';
  } catch (erro) {
    console.warn('Não deu para ler o modo apresentação:', erro);
    return false;
  }
}


// Liga (true) ou desliga (false) o modo apresentação. Desligado,
// a gaveta fica vazia. Devolve true se deu certo.
function salvarModoApresentacao(ligado, gaveta) {
  try {
    const lugar = gaveta || localStorage;
    if (ligado) lugar.setItem(CHAVE_DO_MODO_APRESENTACAO, 'ligado');
    else lugar.removeItem(CHAVE_DO_MODO_APRESENTACAO);
    return true;
  } catch (erro) {
    console.warn('Não deu para salvar o modo apresentação:', erro);
    return false;
  }
}


// Confere se este navegador deixa salvar. Alguns modos privados
// ou configurações de bloqueio não deixam; aí o app funciona,
// mas o progresso some quando a página fecha.
function armazenamentoDisponivel() {
  try {
    const teste = 'finedu-teste';
    localStorage.setItem(teste, '1');
    localStorage.removeItem(teste);
    return true;
  } catch (erro) {
    return false;
  }
}
