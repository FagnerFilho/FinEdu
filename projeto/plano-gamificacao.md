# Plano · Gamificação (tarefa 2 da fila)

> Só planejamento, nada de código. Escrito em 01/11/2026. Antes de codar, falta o OK do Fagner nos ajustes e nos números (seção 8).

## Resumo

- As 4 propostas aprovadas funcionam bem juntas: formam um ciclo em que **nenhum erro fica para trás** (aquecimento → lição → repetição → treino).
- Para uma não atrapalhar a outra, proponho 4 ajustes:
  1. Errar na repetição **não tira vida**. Se tirasse, a proposta 1 castigaria justamente quem mais erra.
  2. Refazer uma lição concluída (o "treino") **não tira vida e devolve as 5 vidas**. Com só +1 vida, o aluno entra num ciclo (seção 5).
  3. A compra também **devolve as 5 vidas** e deixa **continuar de onde parou**. Comprar 1 vida por vez pode ser dinheiro jogado fora.
  4. **XP e moedas só para lição nova.** Refazer não dá XP nem moedas. Senão, o treino vira fábrica de moedas e a compra perde o sentido.
- Números: questão nova 10 XP, revisão (repetição e aquecimento) 5 XP, recarga de vidas 20 moedas, sem relógio.
- Ordem para codar: repetição → tela "sem vidas" (compra e treino) → aquecimento. Se o tempo apertar, o aquecimento é o único que dá para deixar para depois sem afetar os outros.

## 1. As 4 propostas aprovadas

1. Repetir as erradas no fim da lição, até acertar todas. A precisão conta só a primeira tentativa.
2. Comprar vidas com moedas.
3. Suavizar a perda de vidas (1 vida a cada X minutos, ou ganhar vida refazendo lição concluída).
4. Aquecimento (ideia do Fagner): no começo de cada lição, 1 questão extra da lição anterior, de preferência uma que o aluno errou. Não tira vida e não conta na precisão. A primeira lição não tem.

## 2. Tabela de regras

"Questão nova" = a primeira resposta a uma questão numa lição que o aluno ainda não concluiu.

| Regra | Hoje | Proposta | Por quê |
|---|---|---|---|
| Concluir a lição | Basta chegar ao fim com vida: dá para concluir acertando 1 de 5 | Só conclui depois de acertar todas. As erradas voltam no fim, quantas vezes precisar | Ninguém passa de lição sem ter acertado cada questão pelo menos uma vez (proposta 1) |
| Erro na repetição | Não existe | Não tira vida. A questão volta para o fim da fila | A vida já foi paga no primeiro erro. Se tirasse, o aluno que erra 4 chegaria na repetição com 1 vida e perderia a lição inteira (hoje ele conclui) |
| Precisão (fim da lição e Perfil) | Cada questão é respondida uma vez por lição. O Perfil soma tudo, inclusive refazer | Conta só a primeira resposta de cada questão nova. Repetição, aquecimento e treino ficam de fora | A precisão mostra o que o aluno sabia de primeira (proposta 1) |
| Aquecimento | Não existe | 1 questão da lição anterior, antes da primeira questão. Prefere uma que o aluno errou; se ele não errou nenhuma, uma fácil ou média qualquer. Não tira vida, não conta na precisão e não volta na repetição. A primeira lição da trilha não tem | Rever um erro um tempo depois é o que mais fixa (repetição espaçada). Fácil ou média porque é aquecimento (proposta 4) |
| XP por acerto em questão nova | 10 | 10 | Sem mudança |
| XP na repetição | Não existe | 5 por questão, uma vez só, quando o aluno finalmente acerta | Premia quem conserta o erro, mas acertar de primeira continua valendo o dobro |
| XP no aquecimento | Não existe | 5 se acertar, 0 se errar | Sem prêmio nenhum, o aluno chuta para passar logo |
| Erro em questão nova | −1 vida na hora | Igual | Ainda tem que ter algo em jogo na primeira tentativa |
| Vidas acabaram no meio da lição | A lição para e o aluno perde o que fez. Vidas só amanhã. Com 0 vidas não abre nenhuma lição, nem as concluídas | Tela "sem vidas" com duas saídas: pagar (continua de onde parou) ou treinar (de graça, mas esta lição recomeça). As duas devolvem as 5 vidas | Ninguém fica travado até amanhã (proposta 3), e a escolha é "gastar ou guardar" (proposta 2) |
| Comprar vidas | Não existe | Só na tela "sem vidas": 20 moedas, as vidas voltam a 5 e a lição continua de onde parou | Recarga inteira para a compra nunca ser dinheiro jogado fora (seção 5). Só na tela "sem vidas", como uma reserva de emergência |
| Refazer lição concluída (treino) | Erro tira vida. Dá XP e moedas de novo, toda vez | Erro não tira vida. Ao terminar, as vidas voltam a 5. Não dá XP nem moedas. Dá para fazer com 0 vidas | É o caminho de graça para sair do "sem vidas" (proposta 3). Sem XP e moedas, ninguém fica refazendo a lição 1 só para juntar moeda |
| Relógio de vidas | Não existe | Continua sem | Numa aula, ou é lento demais para ajudar, ou rápido demais e a vida perde o sentido (seção 5) |
| Vidas no dia seguinte | Voltam todas | Igual | Já funciona e cobre o caso raro do aluno sem lição para treinar |
| Moedas por lição | 10, +5 se perfeita, toda vez que conclui (inclusive refazendo) | 10, +5 se perfeita (as 5 certas de primeira), só na primeira vez que conclui | Moeda é prêmio por avançar. Se refazer desse moeda, o treino virava fábrica de moedas |
| Baú | +20 XP, +20 moedas | Igual | Sem mudança |
| Sequência de dias | +1 por dia com lição concluída | Igual (o treino também conta) | Revisar também é estudar |
| Sair no meio | Não ganha nada; as vidas perdidas continuam perdidas | Igual, inclusive no meio da repetição | Mantém a regra simples |

Regra de bolso para explicar ao aluno: **só perde vida quem erra questão nova; ficou sem vidas, paga ou treina.**

## 3. Números

| Constante (no topo do jogo.js) | Hoje | Proposta |
|---|---|---|
| `XP_POR_ACERTO` | 10 | 10 |
| `XP_DE_REVISAO` (nova) | — | 5 (repetição e aquecimento) |
| `MOEDAS_POR_LICAO` | 10 | 10, só na primeira conclusão |
| `MOEDAS_LICAO_PERFEITA` | 5 | 5, só na primeira conclusão |
| `XP_DO_BAU` / `MOEDAS_DO_BAU` | 20 / 20 | 20 / 20 |
| `VIDAS_MAXIMAS` | 5 | 5 |
| `PRECO_DA_RECARGA` (nova) | — | 20 moedas |

Por que esses números:

- **Recarga a 20 moedas.** Uma lição nova dá de 10 a 15 moedas, e a Unidade 1 inteira dá de 60 a 80. Com 20, a recarga custa umas duas lições: quem guardou consegue usar no aperto, mas não dá para comprar sempre. É também o valor do baú (abrir o baú = uma recarga). Com 10, toda lição pagaria uma recarga e a vida perderia o sentido. Com 30, quem erra quase nunca conseguiria comprar na Unidade 1.
- **Revisão a 5 XP.** Metade da questão nova. Mantém a ordem: quem acerta mais termina com mais XP (seção 4).
- **Tempo para a vida voltar: sem relógio.** As vidas voltam na hora, ao terminar o treino, ou todas no dia seguinte. Se mesmo assim a equipe quiser o relógio, meu número seria 1 vida a cada 30 minutos (e o progresso teria que guardar a hora, não só a data).

## 4. Simulação dos 3 alunos

### Combinado

- Uma aula, a Unidade 1 do zero (5 vidas, 0 moedas, 0 XP), tudo no mesmo dia.
- Ordem das questões: 1 e 2 fáceis, 3 e 4 médias, 5 difícil.
- Aluno A acerta tudo. Aluno B erra as questões 4 e 5 na primeira vez que vê uma lição. Aluno C acerta só a 1 e erra da 2 à 5.
- Questão que o aluno já viu explicada, ele acerta (na repetição, no aquecimento, no treino e quando recomeça uma lição). Na vida real ele erra algumas de novo; na proposta isso só custa tempo, não vida.
- Ficou sem vidas: se tem 20 moedas, paga; se não tem, treina a lição concluída mais recente e depois recomeça.
- XP só entra quando a lição termina (lição largada no meio não soma nada).
- Tempo: uns 20 segundos por questão respondida (estimativa).

### Aluno A · acerta tudo

| Passo | O que acontece | Vidas | Moedas | XP |
|---|---|---|---|---|
| 1 | Lição 1: 5 de 5 (+50). Perfeita: +15 moedas | 5 | 15 | 50 |
| 2 | Lição 2: aquecimento certo (+5), 5 de 5 (+50), +15 moedas | 5 | 30 | 105 |
| 3 | Lição 3: igual à 2 | 5 | 45 | 160 |
| 4 | Lição 4: igual à 2 | 5 | 60 | 215 |
| 5 | Baú: +20 XP, +20 moedas | 5 | 80 | 235 |

23 questões (uns 8 min), precisão 100%. Das novidades, só vê o aquecimento. Termina com 80 moedas e nada em que gastar.

### Aluno B · erra 2

| Passo | O que acontece | Vidas | Moedas | XP |
|---|---|---|---|---|
| 1 | Lição 1: acerta 1 a 3 (+30), erra 4 e 5 (−2 vidas). Repetição: acerta as duas (+10). +10 moedas | 3 | 10 | 40 |
| 2 | Lição 2: aquecimento com uma questão que ele errou na lição 1, acerta (+5). De novo +30, −2 vidas, repetição +10. +10 moedas | 1 | 20 | 85 |
| 3 | Lição 3: aquecimento certo, acerta 1 a 3, erra a 4: **sem vidas**. Paga 20 moedas, as vidas voltam a 5 e ele continua. Erra a 5 (−1). Repetição +10. +10 moedas | 4 | 10 | 130 |
| 4 | Lição 4: aquecimento (+5), +30, −2 vidas, repetição +10. +10 moedas | 2 | 20 | 175 |
| 5 | Baú | 2 | 40 | 195 |

31 questões (uns 10 min), precisão 60%. Conclui a unidade na mesma aula, com 1 compra. Refez os 8 erros no fim das lições e reviu 3 deles no aquecimento.

O outro caminho, guardando as moedas: no passo 3, em vez de pagar, ele treina a lição 2 (vidas voltam a 5, sem XP), recomeça a lição 3 e só erra a 5. Termina com **60 moedas e 200 XP**, mas responde 10 questões a mais (uns 3 min). É exatamente a escolha "gastar ou guardar": pagar compra tempo.

### Aluno C · erra 4

| Passo | O que acontece | Vidas | Moedas | XP |
|---|---|---|---|---|
| 1 | Lição 1: acerta a 1 (+10), erra 2 a 5 (−4 vidas). Repetição: 4 × 5 = +20. +10 moedas | 1 | 10 | 30 |
| 2 | Lição 2: aquecimento certo, acerta a 1, erra a 2: **sem vidas**. 10 moedas não pagam a recarga. Larga a lição 2 | 0 | 10 | 30 |
| 3 | Treino da lição 1: acerta tudo (já viu). As vidas voltam a 5, sem XP | 5 | 10 | 30 |
| 4 | Lição 2 de novo: aquecimento (+5), acerta 1 e 2 (+20), erra 3 a 5 (−3). Repetição +15. +10 moedas | 2 | 20 | 70 |
| 5 | Lição 3: aquecimento (+5), acerta a 1 (+10), erra 2 e 3: **sem vidas**. Paga 20, as vidas voltam a 5. Erra 4 e 5 (−2). Repetição +20. +10 moedas | 3 | 10 | 105 |
| 6 | Lição 4: aquecimento, acerta a 1, erra 2, 3 e 4: **sem vidas**. Com 10 moedas não paga. Larga a lição 4 | 0 | 10 | 105 |
| 7 | Treino da lição 3. As vidas voltam a 5 | 5 | 10 | 105 |
| 8 | Lição 4 de novo: aquecimento (+5), acerta 1 a 4 (+40), erra a 5 (−1). Repetição +5. +10 moedas | 4 | 20 | 155 |
| 9 | Baú | 4 | 40 | 175 |

54 questões (uns 18 min). Precisão nas lições: 20%, 40%, 20% e 80%. Conclui a unidade na mesma aula, com 2 treinos e 1 compra, e acertou cada questão pelo menos uma vez.

### Comparação com hoje (mesmos alunos, mesma aula)

| Aluno | Hoje | Proposta |
|---|---|---|
| A · acerta tudo | Unidade inteira. 220 XP, 80 moedas, ~7 min | Unidade inteira. 235 XP, 80 moedas, ~8 min |
| B · erra 2 | Fica sem vidas na lição 3 ("voltam amanhã"): 2 lições, 60 XP, 20 moedas. Termina a unidade no 2º dia, e 7 das 20 questões ele nunca acertou | Unidade inteira na aula. 195 XP, 40 moedas. Acertou todas |
| C · erra 4 | Conclui a lição 1 acertando 1 de 5 e fica sem vidas na lição 2: 10 XP, 10 moedas. Termina a unidade no 4º dia, e metade das questões ele nunca acertou | Unidade inteira na aula (~18 min). 175 XP, 40 moedas. Acertou todas |

O XP fica na ordem certa (A 235 > B 195 > C 175), e quem erra mais gasta mais tempo, não fica travado.

## 5. Opinião sincera

### O que está bom

- **A repetição (1) é a mais importante.** Resolve o problema de verdade (concluir acertando 1 de 5), e a precisão só de primeira mantém o número honesto.
- **O aquecimento (4) é a melhor ideia pedagógica das quatro.** É o que se chama de repetição espaçada: rever um erro um tempo depois é o que mais fixa. Bom argumento para a banca.
- **Juntas, elas fecham um ciclo:** aquecimento (revê a lição anterior) → lição → repetição (conserta na hora) → treino (revê quando as vidas acabam). Cada erro aparece de novo 2 ou 3 vezes. Frase para a apresentação: "no FinEdu, nenhum erro fica para trás".
- **A compra (2) combina com o tema** se a tela "sem vidas" falar a língua da lição "Planejamento e orçamento": as moedas são a sua reserva de emergência, e ficar sem vidas é o imprevisto.

### Onde elas se atrapalham, e o ajuste

1. **Repetição × vidas.** Se errar na repetição tirasse vida, o aluno C chegaria na repetição com 1 vida, erraria de novo e perderia a lição inteira. Hoje ele pelo menos conclui. A proposta 1 ficaria mais dura justamente com quem mais precisa. Ajuste: a repetição não tira vida.
2. **"+1 vida refazendo" cria um ciclo.** Quando as vidas acabam, a lição recomeça do zero. Com 1 vida, o aluno volta, erra a primeira questão nova e cai de novo, e de novo. No aluno C seriam uns 4 treinos para passar de cada lição. Ajuste: o treino devolve as 5 vidas.
3. **Comprar 1 vida pode ser dinheiro jogado fora.** O aluno B pagaria na questão 4, erraria a 5 e ficaria sem vidas e sem moedas do mesmo jeito. Ajuste: a compra devolve as 5 vidas.
4. **Treino × moedas.** Hoje refazer dá XP e moedas toda vez. Com o treino de graça, a lição 1 vira fábrica de moedas: refaz, ganha 15, compra vida... e a compra perde o sentido. Ajuste: XP e moedas só para lição nova.
5. **O relógio não serve para escola.** Para ajudar numa aula de 50 minutos, ele teria que devolver vida a cada 5 ou 10 minutos, e aí a vida não vale nada. Com 30 minutos ou mais, o aluno espera a aula acabar. E na apresentação ninguém vê o relógio funcionar. O treino resolve o mesmo problema e ainda faz o aluno estudar.

### O que continua fraco

- **Moeda sobrando para quem acerta tudo.** O aluno A termina com 80 moedas e nada em que gastar: a compra só dá uso à moeda de quem erra. Ideia para depois da apresentação (fora desta tarefa): as moedas guardadas "rendem" um pouco por dia, o que liga direto com a Trilha 2, de investimentos.
- **A vida vira "pare e revise", não castigo.** Com o treino devolvendo 5 vidas em 2 minutos, ninguém fica travado. Para uma escola, acho o certo. Se a equipe quiser mais peso, o ajuste é subir o preço da recarga, não diminuir o que o treino devolve (por causa do ciclo do item 2).
- **Poucas questões viram decoreba.** São 5 questões fixas por lição: na 2ª ou 3ª vez, o aluno já decorou a resposta. O valor está em ler a explicação. Um banco maior de questões resolveria, mas isso é conteúdo e fica para depois.
- **Lição mais longa para quem erra.** O aluno C responde 54 questões na aula, contra 23 do A. Faz sentido, mas vale observar no teste se ninguém desanima.
- **Numa aula só, o aquecimento é pouco espaçado.** Se o aluno faz as 4 lições em seguida, o aquecimento revê algo de 3 minutos atrás. Ele vale mais quando as lições são feitas em dias diferentes.
- **Caso raro sem saída.** Quem erra as 5 questões da lição 1 no primeiro dia fica sem vidas, sem moedas e sem lição para treinar: as vidas só voltam amanhã, como hoje. Na prática, "Reiniciar progresso" resolve sem perder nada (ele ainda não tem nada). Não vale criar regra para isso agora.

### Prazo e ordem

Quatro mudanças, mais o testes.html, em 04 e 05/11: dá, mas é apertado. Ordem, com um commit ao fim de cada parte:

1. Repetição (a mais importante; não muda nada do que fica salvo no aparelho).
2. Tela "sem vidas" com compra e treino, e moedas só na primeira conclusão (as três andam juntas).
3. Aquecimento (o único que precisa de um campo novo no progresso salvo).

As duas primeiras não dependem do aquecimento. Se o tempo apertar, ele fica para depois sem quebrar nada.

### Na apresentação

- Para mostrar a compra, o aluno precisa ter 20 moedas quando as vidas acabarem. Na ordem natural, isso só acontece a partir da lição 3. O roteiro da demonstração sai no ensaio de 09/11.
- Repetição e aquecimento aparecem sozinhos: basta errar uma questão na lição 1 e abrir a lição 2.

## 6. O que muda no código (mapa, sem código)

- **jogo.js**
  - Constantes novas: `XP_DE_REVISAO` e `PRECO_DA_RECARGA`.
  - A sessão da lição ganha o aquecimento (quando tem), a fila de repetição e a marca de "é treino".
  - `verificarResposta`: vida e precisão só em questão nova; o XP certo para cada tipo de questão.
  - `avancarQuestao`: depois da 5ª questão, passa para a fila de repetição; a lição só termina com a fila vazia.
  - `concluirLicao`: moedas só na primeira conclusão; o treino devolve as 5 vidas; guarda quais questões o aluno errou.
  - Funções novas: escolher a questão do aquecimento e pagar a recarga.
- **Progresso salvo:** um campo novo, `errosPorLicao` (para cada lição, a posição das questões que o aluno errou da última vez). Entra pelo `criarProgressoInicial()`, e os progressos antigos ganham o campo sozinhos. Guardar a posição (e não um id de questão) evita mexer no dados-licoes.js; se o conteúdo mudar, o pior que acontece é o aquecimento trazer outra questão da mesma lição.
- **app.js:** deixar abrir lição concluída com 0 vidas; não descartar a lição quando as vidas acabam (para continuar depois de pagar); ação nova de pagar.
- **telas.js:** tela "sem vidas" com as duas saídas; etiquetas de aquecimento e de revisão; na repetição, a parte vermelha da barra fica verde quando o aluno acerta; tela de fim do treino.
- **testes.html (novo):** um teste para cada linha da tabela da seção 2, rodando no navegador (passou/falhou). Os principais:
  - não conclui com questão errada pendente;
  - repetição não tira vida;
  - precisão só de primeira;
  - aquecimento não tira vida nem conta na precisão;
  - a primeira lição não tem aquecimento;
  - pagar sem moedas suficientes não funciona;
  - pagar devolve 5 vidas e mantém a lição;
  - treino com 0 vidas devolve 5 vidas e não dá XP nem moedas;
  - moedas só na primeira conclusão;
  - as 3 simulações da seção 4 dando os mesmos números.
- **Documentos:** seção 6 do arquitetura.md e seção Gamificação do documento-mestre, com as regras finais.

## 7. Textos novos da interface

Escrever com a skill de UX copy na hora de codar:

- Tela "sem vidas": título, as duas saídas (pagar e continuar; treinar) e o aviso quando faltam moedas.
- Etiquetas do aquecimento e da revisão.
- Aviso de que, no treino, errar não tira vida.
- Fim do treino (vidas recarregadas, sem XP).

## 8. Falta o OK do Fagner em

1. Os 4 ajustes do resumo: repetição sem perder vida; treino devolve 5 vidas; compra devolve 5 vidas; XP e moedas só para lição nova.
2. Os números: revisão 5 XP, recarga 20 moedas, sem relógio.
3. Um detalhe que a proposta 4 não dizia: quando o aluno não errou nenhuma questão da lição anterior, o aquecimento usa uma fácil ou média.
