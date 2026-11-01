// ============================================================
// dados-licoes.js — Todo o conteúdo do FinEdu (e só conteúdo)
// ============================================================
// Aqui ficam as trilhas, as unidades, as lições e as questões.
// Para criar ou mudar uma lição, mexa SÓ neste arquivo.
//
// Como o conteúdo se organiza:
//   trilha   → um tema grande (Educação financeira, Investimentos)
//   unidade  → um bloco de lições; toda unidade termina num baú
//   lição    → 5 questões: 2 fáceis, 2 médias e 1 difícil
//   questão  → uma pergunta e de 2 a 4 alternativas
//
// Combinados (o app confere sozinho e mostra um aviso no topo
// da tela se algo estiver fora do padrão):
//   - Todo "id" é único e NUNCA muda depois que a lição for ao ar:
//     o progresso salvo no aparelho guarda as lições pelo id.
//   - Cada questão tem uma só alternativa com  correta: true
//   - Toda alternativa tem uma "explicacao": o porquê de ela estar
//     certa ou errada, em uma ou duas frases curtas.
//   - "dificuldade" é 'facil', 'media' ou 'dificil'. O app mostra
//     sempre do fácil para o difícil e embaralha as alternativas,
//     então a ordem escrita aqui não importa. (Para facilitar a
//     revisão, deixamos a certa sempre em primeiro.)
//   - Lição ainda sem conteúdo leva  emBreve: true  e aparece
//     trancada na trilha. O id dela pode mudar à vontade enquanto
//     ela estiver "em breve" (ninguém concluiu ela ainda).
//   - // REVISAR marca o que o professor deve conferir.
// ============================================================

const CONTEUDO = {

  trilhas: [

    // ==========================================================
    // TRILHA 1 · EDUCAÇÃO FINANCEIRA
    // ==========================================================
    {
      id: 'educacao-financeira',
      titulo: 'Educação financeira',
      unidades: [

        // ------------------------------------------------------
        // Unidade 1
        // ------------------------------------------------------
        {
          id: 'ef-unidade-1',
          titulo: 'Primeiros passos',   // provisório
          licoes: [

            // ----- Lição: Querer ou precisar? -----
            {
              id: 'querer-ou-precisar',
              titulo: 'Querer ou precisar?',
              falaDaEstrela: 'Bora? Hoje é querer × precisar!',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Qual destas compras é uma necessidade?',
                  alternativas: [
                    {
                      texto: 'O remédio que o médico receitou',
                      correta: true,
                      explicacao: 'Remédio receitado cuida da sua saúde e não dá para adiar. Isso é necessidade.'
                    },
                    {
                      texto: 'Um celular novo, mesmo com o seu funcionando',
                      explicacao: 'Se o seu celular ainda funciona, trocar só porque saiu outro modelo é vontade, não necessidade.'
                    },
                    {
                      texto: 'Uma skin nova para o seu jogo favorito',
                      explicacao: 'A skin deixa o jogo mais bonito, mas você joga (e vive) sem ela. É desejo.'
                    },
                    {
                      texto: 'Um açaí no fim de semana',
                      explicacao: 'Açaí é bom demais, mas é um agrado que pode esperar. É desejo.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'E qual destas é um desejo?',
                  alternativas: [
                    {
                      texto: 'Um fone novo, mesmo com o seu funcionando bem',
                      correta: true,
                      explicacao: 'Se o seu fone funciona, o novo é vontade. Querer não é errado, só não é essencial.'
                    },
                    {
                      texto: 'O almoço de hoje',
                      explicacao: 'Comer é básico para viver. Comida é necessidade.'
                    },
                    {
                      texto: 'O caderno que a escola pediu',
                      explicacao: 'Você precisa dele para estudar. Material pedido pela escola é necessidade.'
                    },
                    {
                      texto: 'A conta de água de casa',
                      explicacao: 'Sem água não dá para beber, cozinhar nem tomar banho. A conta de água é necessidade.'
                    }
                  ]
                },

                // Média 1
                {
                  dificuldade: 'media',
                  pergunta: 'Duas da tarde no Centro de Teresina, 40 graus, e bateu a sede. Qual escolha resolve a necessidade gastando menos?',
                  alternativas: [
                    {
                      texto: 'Uma garrafa de água',
                      correta: true,
                      explicacao: 'A necessidade é matar a sede, e a água resolve gastando pouco.'
                    },
                    {
                      texto: 'Uma cajuína bem gelada',
                      explicacao: 'Cajuína é uma delícia, mas aí você paga pelo sabor. A sede passava com água: o extra é desejo.'
                    },
                    {
                      texto: 'Um refrigerante de 2 litros só para você',
                      explicacao: 'Mata a sede, mas custa mais e é muito mais do que você precisa. O excesso é desejo.'
                    },
                    {
                      texto: 'Aguentar a sede para não gastar nada',
                      explicacao: 'Cortar uma necessidade não é economia: no calor de Teresina, ficar sem água faz mal à saúde.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Seu único tênis rasgou, e você usa ele todo dia para ir ao CETI. Qual atitude separa bem necessidade e desejo?',
                  alternativas: [
                    {
                      texto: 'Comprar um tênis simples e confortável que caiba no seu dinheiro',
                      correta: true,
                      explicacao: 'Ter um tênis é necessidade. Escolher um que resolve, sem pagar a mais pela marca, atende o essencial.'
                    },
                    {
                      texto: 'Comprar o modelo mais caro da loja, já que é necessidade',
                      explicacao: 'A necessidade é ter um tênis, não um modelo específico. O que passa disso é desejo.'
                    },
                    {
                      texto: 'Continuar com o rasgado até juntar dinheiro para o de marca',
                      explicacao: 'Aí o desejo passou na frente da necessidade, e você segue com um tênis que já não serve.'
                    },
                    {
                      texto: 'Levar dois pares, porque está na promoção "leve 2, pague menos"',
                      explicacao: 'Promoção não cria necessidade. O segundo par é desejo, mesmo com desconto.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Você tem R$ 50 até o fim do mês, e R$ 20 são para o ônibus da escola. Aí aparece um fone de R$ 45 numa promoção que "acaba hoje". O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Separar os R$ 20 do ônibus e deixar o fone para depois',
                      correta: true,
                      explicacao: 'Pagando o ônibus, sobram R$ 30, e o fone não cabe. A pressa da promoção é só pressão para comprar por impulso.'
                    },
                    {
                      texto: 'Comprar o fone agora, porque promoção assim não volta',
                      explicacao: 'A pressa faz a vontade parecer urgente. E, sem o dinheiro do ônibus, o problema fica maior que a economia.'
                    },
                    {
                      texto: 'Comprar o fone e pedir dinheiro emprestado para o ônibus',
                      explicacao: 'Pegar emprestado para cobrir o essencial depois de gastar com vontade abre caminho para dívida.'
                    },
                    {
                      texto: 'Comprar o fone e ir a pé para a escola o resto do mês',
                      explicacao: 'Cortar uma necessidade para pagar um desejo pesa no dia a dia e pode atrapalhar seus estudos.'
                    }
                  ]
                }
              ]
            },

            // ==========================================================
            // As 3 lições abaixo foram escritas por Samuel de Assunção
            // e adaptadas ao formato do app (2 fáceis, 2 médias, 1 difícil
            // e explicação em cada alternativa).
            // ==========================================================

            // ----- Lição: Dinheiro e poupança -----
            {
              id: 'dinheiro-e-poupanca',
              titulo: 'Dinheiro e poupança',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'O que significa "poupar" dinheiro?',
                  alternativas: [
                    {
                      texto: 'Guardar uma parte do dinheiro para usar mais tarde',
                      correta: true,
                      explicacao: 'Poupar é separar uma parte do que você recebe para realizar um objetivo ou enfrentar um imprevisto no futuro.'
                    },
                    {
                      texto: 'Gastar tudo assim que recebe, antes que acabe',
                      explicacao: 'Isso é o contrário de poupar: o dinheiro vai embora e nada fica para depois.'
                    },
                    {
                      texto: 'Emprestar o dinheiro para os amigos',
                      explicacao: 'Emprestar não é poupar: o dinheiro sai da sua mão e nem sempre volta na hora em que você precisa.'
                    },
                    {
                      texto: 'Guardar o dinheiro e nunca mais usar',
                      explicacao: 'Poupar não é esconder para sempre. A ideia é guardar com um objetivo e usar quando chegar a hora.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'De onde vem, normalmente, o dinheiro que as pessoas usam no dia a dia?',
                  alternativas: [
                    {
                      texto: 'Do trabalho das pessoas',
                      correta: true,
                      explicacao: 'A maior parte do dinheiro de uma família vem do trabalho: salário, bicos, venda de produtos ou serviços.'
                    },
                    {
                      texto: 'Do caixa eletrônico, que cria o dinheiro na hora',
                      explicacao: 'O caixa eletrônico só entrega o dinheiro que já está na conta de alguém. Ele não cria dinheiro.'
                    },
                    {
                      texto: 'Do banco, que dá dinheiro para quem tem conta',
                      explicacao: 'O banco guarda o dinheiro das pessoas. Quando empresta, cobra de volta com juros: não é presente.'
                    },
                    {
                      texto: 'Do governo, que paga todo mundo todo mês',
                      explicacao: 'Benefícios do governo ajudam muitas famílias, mas a maior parte do dinheiro do dia a dia vem do trabalho.'
                    }
                  ]
                },

                // Média 1 (nova: entra no lugar da questão sobre necessidade, que já está na lição "Querer ou precisar?")
                {
                  dificuldade: 'media',
                  pergunta: 'Bia guarda R$ 2 por dia de aula, de segunda a sexta. Quanto ela junta em 4 semanas?',
                  alternativas: [
                    {
                      texto: 'R$ 40',
                      correta: true,
                      explicacao: 'São 5 dias de aula por semana: 2 × 5 = R$ 10 por semana. Em 4 semanas: 10 × 4 = R$ 40.'
                    },
                    {
                      texto: 'R$ 56',
                      explicacao: 'Esse seria o valor guardando nos 7 dias da semana. Mas a Bia só guarda nos dias de aula.'
                    },
                    {
                      texto: 'R$ 8',
                      explicacao: 'R$ 8 é o que ela junta em 4 dias, não em 4 semanas.'
                    },
                    {
                      texto: 'R$ 20',
                      explicacao: 'R$ 20 são só 2 semanas. Em 4 semanas, ela junta o dobro.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Ana tem R$ 10 guardados e quer uma capinha de celular de R$ 30. Ela recebe R$ 5 de mesada por semana e guarda tudo. Em quantas semanas ela consegue comprar?',
                  alternativas: [
                    {
                      texto: '4 semanas',
                      correta: true,
                      explicacao: 'Faltam R$ 20 (30 − 10). Guardando R$ 5 por semana: 20 ÷ 5 = 4 semanas.'
                    },
                    {
                      texto: '6 semanas',
                      explicacao: 'Seriam 6 semanas se ela começasse do zero (30 ÷ 5). Mas ela já tem R$ 10 guardados.'
                    },
                    {
                      texto: '2 semanas',
                      explicacao: 'Em 2 semanas ela junta só mais R$ 10 e fica com R$ 20. Ainda faltam R$ 10.'
                    },
                    {
                      texto: '3 semanas',
                      explicacao: 'Em 3 semanas ela chega a R$ 25. Faltam R$ 5: precisa de mais uma semana.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Pedro recebe R$ 40 de mesada por mês e quer comprar uma bicicleta de R$ 360 em 6 meses. Ele já tem R$ 90 guardados. O que acontece?',
                  alternativas: [
                    {
                      texto: 'Ele precisa guardar R$ 45 por mês, mais que a mesada. Vai precisar de um dinheiro extra ou de mais tempo',
                      correta: true,
                      explicacao: 'Faltam R$ 270 (360 − 90). Em 6 meses: 270 ÷ 6 = R$ 45 por mês. Como a mesada é R$ 40, faltam R$ 5 por mês.'
                    },
                    {
                      texto: 'Guardando a mesada inteira, ele consegue com folga',
                      explicacao: 'Guardando R$ 40 por 6 meses, ele junta R$ 240. Com os R$ 90, chega a R$ 330: ainda faltam R$ 30.'
                    },
                    {
                      texto: 'Ele precisa guardar R$ 60 por mês',
                      explicacao: 'R$ 60 por mês seria o valor sem contar os R$ 90 que ele já tem (360 ÷ 6).'
                    },
                    {
                      texto: 'Ele precisa guardar R$ 30 por mês',
                      explicacao: 'Com R$ 30 por mês, ele junta R$ 180. Somando os R$ 90, dá R$ 270: faltam R$ 90.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Planejamento e orçamento -----
            {
              id: 'planejamento-e-orcamento',
              titulo: 'Planejamento e orçamento',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'O que é um orçamento pessoal?',
                  alternativas: [
                    {
                      texto: 'Um plano que organiza quanto dinheiro entra e quanto sai',
                      correta: true,
                      explicacao: 'O orçamento compara o que você recebe com o que gasta e ajuda a decidir quanto vai para cada coisa, inclusive para guardar.'
                    },
                    {
                      texto: 'Uma lista de tudo o que você quer comprar',
                      explicacao: 'Lista de desejos não é orçamento. O orçamento olha também quanto dinheiro você tem para isso.'
                    },
                    {
                      texto: 'Um tipo de conta no banco',
                      explicacao: 'Orçamento não é conta bancária. É um plano, que dá para fazer até num caderno.'
                    },
                    {
                      texto: 'O valor total das suas dívidas',
                      explicacao: 'As dívidas entram no orçamento, mas ele mostra tudo: o que entra, o que sai e o que sobra.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'O que é uma boa atitude antes de comprar algo?',
                  alternativas: [
                    {
                      texto: 'Pensar se precisa mesmo e comparar preços',
                      correta: true,
                      explicacao: 'Parar para pensar e pesquisar ajuda a economizar e evita arrependimento.'
                    },
                    {
                      texto: 'Comprar logo, antes que acabe',
                      explicacao: 'A pressa é o que a loja quer. Quase sempre o produto continua lá amanhã.'
                    },
                    {
                      texto: 'Comprar porque todos os amigos já têm',
                      explicacao: 'O que os amigos têm não diz se você precisa, nem se cabe no seu dinheiro.'
                    },
                    {
                      texto: 'Escolher sempre o mais barato, sem olhar mais nada',
                      explicacao: 'O mais barato pode quebrar rápido e sair mais caro. Comparar é olhar preço e qualidade.'
                    }
                  ]
                },

                // Média 1 (a questão da reserva de emergência virou uma situação, para ficar média)
                {
                  dificuldade: 'media',
                  pergunta: 'A geladeira de casa quebrou e o conserto custa R$ 300, um gasto que ninguém esperava. Qual dinheiro deveria cobrir isso?',
                  alternativas: [
                    {
                      texto: 'A reserva de emergência',
                      correta: true,
                      explicacao: 'A reserva existe para imprevistos como esse. Com ela, a família resolve o problema sem fazer dívida.'
                    },
                    {
                      texto: 'O dinheiro guardado para a viagem de fim de ano',
                      explicacao: 'Usar o dinheiro de uma meta atrasa o objetivo. Por isso a reserva fica separada das metas.'
                    },
                    {
                      texto: 'O cartão de crédito, parcelando em várias vezes',
                      explicacao: 'Parcelar um imprevisto vira dívida, às vezes com juros. A reserva evita isso.'
                    },
                    {
                      texto: 'Um empréstimo com um vizinho, devolvendo quando der',
                      explicacao: 'Pegar emprestado sem prazo certo cria dívida e pode atrapalhar a relação com quem emprestou.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Pela regra 50-30-20 (50% para necessidades, 30% para desejos e 20% para guardar), como fica a divisão de R$ 200 por mês?',
                  alternativas: [
                    {
                      texto: 'R$ 100 necessidades, R$ 60 desejos, R$ 40 guardados',
                      correta: true,
                      explicacao: '50% de 200 = 100; 30% de 200 = 60; 20% de 200 = 40.'
                    },
                    {
                      texto: 'R$ 100 necessidades, R$ 40 desejos, R$ 60 guardados',
                      explicacao: 'Aqui desejos e poupança trocaram de lugar: guardar ficaria com 30%, e a regra diz 20%.'
                    },
                    {
                      texto: 'R$ 60 necessidades, R$ 100 desejos, R$ 40 guardados',
                      explicacao: 'Assim, metade iria para desejos. Na regra, a maior parte vai para as necessidades.'
                    },
                    {
                      texto: 'R$ 40 necessidades, R$ 60 desejos, R$ 100 guardados',
                      explicacao: 'Guardar metade parece ótimo, mas sobrariam só R$ 40 para o essencial. Os valores ficaram invertidos.'
                    }
                  ]
                },

                // Difícil
                // REVISAR: "6 meses de gastos" é uma recomendação comum para a reserva, não uma regra fixa.
                {
                  dificuldade: 'dificil',
                  pergunta: 'Uma família gasta R$ 2.000 por mês com o essencial e quer uma reserva de emergência igual a 6 meses desses gastos. Guardando R$ 500 por mês, em quanto tempo ela chega lá?',
                  alternativas: [
                    {
                      texto: '24 meses',
                      correta: true,
                      explicacao: 'A meta é 6 × 2.000 = R$ 12.000. Guardando R$ 500 por mês: 12.000 ÷ 500 = 24 meses, ou 2 anos.'
                    },
                    {
                      texto: '12 meses',
                      explicacao: 'Em 12 meses ela junta R$ 6.000, só metade da meta.'
                    },
                    {
                      texto: '18 meses',
                      explicacao: 'Em 18 meses ela junta R$ 9.000. Ainda faltam R$ 3.000.'
                    },
                    {
                      texto: '30 meses',
                      explicacao: 'Em 30 meses ela juntaria R$ 15.000, mais do que precisa. Ela chega à meta antes.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Consumo e dívidas -----
            {
              id: 'consumo-e-dividas',
              titulo: 'Consumo e dívidas',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'O que é uma dívida?',
                  alternativas: [
                    {
                      texto: 'Dinheiro que você deve a alguém e precisa devolver',
                      correta: true,
                      explicacao: 'Dívida é um valor que você deve a uma pessoa, loja ou banco, e que precisa ser pago no prazo combinado.'
                    },
                    {
                      texto: 'Um dinheiro extra que o banco libera para você gastar',
                      explicacao: 'O limite do cartão parece dinheiro extra, mas é dinheiro do banco. Usou, ficou devendo.'
                    },
                    {
                      texto: 'Dinheiro guardado para emergências',
                      explicacao: 'Isso é reserva de emergência, o oposto da dívida: é dinheiro seu.'
                    },
                    {
                      texto: 'Um desconto que a loja dá no parcelado',
                      explicacao: 'Parcelar não é desconto. Cada parcela é uma dívida até ser paga.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'O que acontece com o seu poder de compra quando há inflação?',
                  alternativas: [
                    {
                      texto: 'Diminui: você compra menos com o mesmo dinheiro',
                      correta: true,
                      explicacao: 'Inflação é a alta geral dos preços. Com tudo mais caro, a mesma quantia compra menos coisas.'
                    },
                    {
                      texto: 'Aumenta: você compra mais com o mesmo dinheiro',
                      explicacao: 'É o contrário: com inflação os preços sobem, e o dinheiro compra menos.'
                    },
                    {
                      texto: 'Fica igual, porque a nota continua valendo o mesmo',
                      explicacao: 'O número na nota não muda, mas o que ela compra muda. O lanche de R$ 10 de hoje pode custar mais no ano que vem.'
                    },
                    {
                      texto: 'Some totalmente',
                      explicacao: 'O dinheiro perde valor aos poucos, não de uma vez. Por isso deixar dinheiro parado por muito tempo é ruim.'
                    }
                  ]
                },

                // Média 1 (a questão do empréstimo entre amigos virou uma situação, para ficar média)
                {
                  dificuldade: 'media',
                  pergunta: 'Você pegou R$ 10 emprestados com um amigo e combinou de devolver na sexta. Chegou a sexta e você só tem R$ 6. Qual é a melhor atitude?',
                  alternativas: [
                    {
                      texto: 'Avisar antes, devolver os R$ 6 e combinar quando paga o resto',
                      correta: true,
                      explicacao: 'Pagar o que dá e ser honesto sobre o resto mantém a confiança. Dívida combinada é dívida respeitada.'
                    },
                    {
                      texto: 'Não falar nada e esperar que ele esqueça',
                      explicacao: 'Sumir quebra a confiança, e a dívida continua existindo.'
                    },
                    {
                      texto: 'Pegar R$ 10 com outro amigo para pagar o primeiro',
                      explicacao: 'Assim você só troca uma dívida por outra. É desse jeito que uma dívida pequena vira bola de neve.'
                    },
                    {
                      texto: 'Devolver só quando ele cobrar',
                      explicacao: 'Esperar a cobrança joga o problema para o seu amigo. O combinado era sexta.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'O que costuma acontecer se você paga só o valor mínimo da fatura do cartão de crédito?',
                  alternativas: [
                    {
                      texto: 'O que faltou vira dívida com juros altos, e ela pode crescer rápido',
                      correta: true,
                      explicacao: 'O valor não pago entra no crédito rotativo, que tem juros muito altos. O ideal é pagar a fatura inteira.'
                    },
                    {
                      texto: 'A dívida some no mês seguinte',
                      explicacao: 'A dívida não some: o que faltou vai para a próxima fatura, com juros.'
                    },
                    {
                      texto: 'O banco perdoa o restante',
                      explicacao: 'O banco não perdoa a dívida. Ele cobra o restante depois, com juros.'
                    },
                    {
                      texto: 'Os juros ficam congelados',
                      explicacao: 'Os juros continuam correndo sobre o que ficou em aberto. Por isso a dívida cresce.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Um celular custa R$ 1.000 à vista ou 5 parcelas de R$ 230 no cartão. Quanto você paga a mais se parcelar?',
                  alternativas: [
                    {
                      texto: 'R$ 150',
                      correta: true,
                      explicacao: '5 × 230 = R$ 1.150. Comparando com R$ 1.000 à vista, você paga R$ 150 a mais, que são os juros embutidos nas parcelas.'
                    },
                    {
                      texto: 'R$ 230',
                      explicacao: 'R$ 230 é o valor de uma parcela, não a diferença. Faça 5 × 230 e compare com o preço à vista.'
                    },
                    {
                      texto: 'R$ 50',
                      explicacao: 'A diferença é maior: 5 × 230 dá R$ 1.150, ou seja, R$ 150 a mais.'
                    },
                    {
                      texto: 'R$ 100',
                      explicacao: 'Confira a conta: 5 × 230 = R$ 1.150. A diferença para os R$ 1.000 é R$ 150.'
                    }
                  ]
                }
              ]
            }
          ]
        },

        // ------------------------------------------------------
        // Unidade 2 (em breve)
        // ------------------------------------------------------
        {
          id: 'ef-unidade-2',
          titulo: 'Em breve',
          licoes: [
            { id: 'ef-u2-licao-1', titulo: 'Em breve', emBreve: true },
            { id: 'ef-u2-licao-2', titulo: 'Em breve', emBreve: true },
            { id: 'ef-u2-licao-3', titulo: 'Em breve', emBreve: true }
          ]
        }
      ]
    },

    // ==========================================================
    // TRILHA 2 · INVESTIMENTOS (conteúdo na conversa 07)
    // ==========================================================
    // Sem unidades, ela aparece no fim da trilha como "em breve".
    {
      id: 'investimentos',
      titulo: 'Investimentos',
      unidades: []
    }
  ],

  // ============================================================
  // DICAS DA ESTRELA
  // ============================================================
  // Aparecem na coluna da direita (tablet deitado e notebook).
  // Uma por dia, em rodízio.
  dicasDaEstrela: [
    'Antes de comprar algo que você só quer, espere um dia. Se a vontade continuar, aí você decide com calma.',
    'Promoção só é economia se você já ia comprar aquilo de qualquer jeito.',
    'Recebeu dinheiro? Separe primeiro a parte que vai guardar, antes de gastar o resto.',
    'Anote o que gastar durante uma semana. É o jeito mais rápido de descobrir para onde o dinheiro vai.',
    'Dizer "eu preciso" não transforma vontade em necessidade. Pergunte: dá para viver sem isso ou esperar?'
  ]
};
