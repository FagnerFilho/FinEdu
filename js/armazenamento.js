// ============================================================
// armazenamento.js — O ÚNICO arquivo que lê e grava o progresso
// ============================================================
// O progresso (XP, moedas, vidas, lições concluídas...) fica
// salvo no próprio aparelho, no "localStorage" do navegador:
// uma gaveta de texto que continua lá mesmo depois de fechar a
// página. Nada vai para a internet.
//
// Regra do projeto: nenhum outro arquivo usa localStorage.
// Se um dia o FinEdu tiver servidor, só este arquivo muda.
//
// Este arquivo não sabe o que tem dentro do progresso (isso é
// assunto do jogo.js). Ele só guarda e devolve.
// ============================================================

// Nome da "gaveta" onde o progresso fica guardado
const CHAVE_DO_PROGRESSO = 'finedu-progresso';


// Devolve o progresso salvo, ou null se não houver nada
// (primeira visita) ou se o que estava salvo não der para ler.
function carregarProgresso() {
  try {
    const texto = localStorage.getItem(CHAVE_DO_PROGRESSO);
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
function salvarProgresso(progresso) {
  try {
    localStorage.setItem(CHAVE_DO_PROGRESSO, JSON.stringify(progresso));
    return true;
  } catch (erro) {
    console.warn('Não deu para salvar o progresso:', erro);
    return false;
  }
}


// Apaga o progresso salvo (botão "Reiniciar progresso" do Perfil).
// Devolve true se deu certo.
function reiniciarProgresso() {
  try {
    localStorage.removeItem(CHAVE_DO_PROGRESSO);
    return true;
  } catch (erro) {
    console.warn('Não deu para apagar o progresso:', erro);
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
