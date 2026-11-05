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
          titulo: 'Primeiros Passos',   // provisório
          licoes: [

            // ----- Lição: Querer ou precisar? -----
            {
              id: 'querer-ou-precisar',
              titulo: 'Querer ou precisar?',
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
                  pergunta: 'Você tem um dinheiro contado até o fim do mês, e uma parte dele é a passagem do ônibus da escola. Aí aparece um fone numa promoção que "acaba hoje", mas ele só cabe se você usar o dinheiro do ônibus. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Guardar o dinheiro do ônibus e deixar o fone para depois',
                      correta: true,
                      explicacao: 'O ônibus é necessidade: é como você chega à escola. A pressa da promoção é só pressão para comprar por impulso.'
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
                  pergunta: 'Você recebeu a mesada e quer guardar uma parte. Qual é o melhor momento para separar esse dinheiro?',
                  alternativas: [
                    {
                      texto: 'Assim que receber, antes de gastar com qualquer coisa',
                      correta: true,
                      explicacao: 'Separar primeiro garante que o dinheiro guardado não some nos gastos do mês. É o famoso "pague-se primeiro".'
                    },
                    {
                      texto: 'No fim do mês, com o que sobrar',
                      explicacao: 'Quase nunca sobra: os gastos aparecem e ocupam todo o dinheiro. Por isso vale separar antes.'
                    },
                    {
                      texto: 'Quando aparecer algo que você queira muito comprar',
                      explicacao: 'Aí o dinheiro já tem destino: vira gasto, não poupança.'
                    },
                    {
                      texto: 'Só quando a mesada aumentar',
                      explicacao: 'Dá para começar com pouco. O hábito de guardar vale mais do que o valor.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Ana quer comprar uma capinha de celular e recebe mesada toda semana. Qual é o melhor jeito de ela chegar lá?',
                  alternativas: [
                    {
                      texto: 'Separar uma parte da mesada toda semana até juntar o valor',
                      correta: true,
                      explicacao: 'Guardar um pouco de cada vez, com a meta na cabeça, é o caminho mais seguro para comprar sem dívida.'
                    },
                    {
                      texto: 'Gastar a mesada toda e torcer para ganhar a capinha de presente',
                      explicacao: 'Pode até acontecer, mas não é um plano. Sem guardar, a meta fica dependendo da sorte.'
                    },
                    {
                      texto: 'Pegar dinheiro emprestado e devolver quando der',
                      explicacao: 'Assim ela compra com o dinheiro dos outros e fica devendo. Juntando antes, a capinha sai sem dívida.'
                    },
                    {
                      texto: 'Desistir, porque a mesada é pequena demais',
                      explicacao: 'Mesada pequena também chega lá, só leva mais tempo. Desistir é o único jeito certo de não conseguir.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Pedro está juntando dinheiro para uma bicicleta, mas percebeu que, mesmo guardando toda a mesada, não vai conseguir no prazo que queria. Qual é a melhor saída?',
                  alternativas: [
                    {
                      texto: 'Aumentar o prazo ou buscar um dinheiro extra, como vender algo que não usa mais',
                      correta: true,
                      explicacao: 'Ajustar o plano é normal. Mais tempo ou um dinheiro extra fazem a meta caber na realidade, sem dívida.'
                    },
                    {
                      texto: 'Pedir para comprar no cartão de crédito dos pais e ir pagando',
                      explicacao: 'Parece solução, mas vira dívida da família, às vezes com juros. E a bicicleta continua acima do que ele pode pagar agora.'
                    },
                    {
                      texto: 'Desistir da bicicleta e gastar o que já guardou',
                      explicacao: 'Desistir joga fora o esforço feito. Plano que não fecha se ajusta, não se abandona.'
                    },
                    {
                      texto: 'Deixar de comprar o lanche da escola para guardar mais rápido',
                      explicacao: 'Cortar uma necessidade não é a saída: atrapalha a saúde e os estudos. Melhor ajustar o prazo ou buscar um extra.'
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
                  pergunta: 'Na regra 50-30-20 (50% para necessidades, 30% para desejos e 20% para guardar), para onde vai a maior parte do dinheiro?',
                  alternativas: [
                    {
                      texto: 'Para as necessidades, como comida, transporte e contas',
                      correta: true,
                      explicacao: 'Metade do dinheiro (50%) vai para o essencial. O resto se divide entre desejos (30%) e guardar (20%).'
                    },
                    {
                      texto: 'Para os desejos, como passeios e roupas novas',
                      explicacao: 'Os desejos ficam com 30%. A maior parte, 50%, vai para as necessidades.'
                    },
                    {
                      texto: 'Para guardar e investir',
                      explicacao: 'Guardar fica com 20%. É importante, mas a maior fatia é das necessidades.'
                    },
                    {
                      texto: 'É tudo dividido igualmente em três partes',
                      explicacao: 'As partes não são iguais: 50% para necessidades, 30% para desejos e 20% para guardar.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Sua família quer começar uma reserva de emergência, mas no fim do mês sobra pouco dinheiro. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Começar guardando pouco, todo mês, num lugar separado',
                      correta: true,
                      explicacao: 'A reserva cresce com o tempo. Guardar pouco, mas sempre, é melhor do que esperar sobrar muito.'
                    },
                    {
                      texto: 'Esperar sobrar bastante para começar de uma vez',
                      explicacao: 'Esse dia pode nunca chegar. Sem reserva, o próximo imprevisto vira dívida.'
                    },
                    {
                      texto: 'Apostar o pouco que sobra para tentar fazer crescer rápido',
                      explicacao: 'Aposta não faz a reserva crescer: o mais comum é perder o dinheiro. Reserva precisa ser segura.'
                    },
                    {
                      texto: 'Contar com o cheque especial como reserva',
                      explicacao: 'Cheque especial é um empréstimo do banco, com juros altos. Usar como reserva é entrar em dívida justo na hora mais difícil.'
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

                // Média 2 (sem conta: o total parcelado já vem na pergunta)
                {
                  dificuldade: 'media',
                  pergunta: 'Um celular custa R$ 1.000 à vista ou R$ 1.200 em 10 parcelas de R$ 120 no cartão. O que é verdade?',
                  alternativas: [
                    {
                      texto: 'Parcelado sai mais caro: no total, você paga mais de R$ 1.000',
                      correta: true,
                      explicacao: 'O mesmo celular sai R$ 200 mais caro no parcelado. Essa diferença são os juros, escondidos dentro das parcelas.'
                    },
                    {
                      texto: 'Dá no mesmo, porque o celular é o mesmo',
                      explicacao: 'O celular é o mesmo, mas o preço não: à vista são R$ 1.000, e parcelado, R$ 1.200.'
                    },
                    {
                      texto: 'Parcelado sai mais barato, porque cada parcela é pequena',
                      explicacao: 'Parcela pequena engana. Compare sempre o total: R$ 1.200 no parcelado contra R$ 1.000 à vista.'
                    },
                    {
                      texto: 'À vista sempre sai mais caro',
                      explicacao: 'Aqui é o contrário: à vista sai mais barato, porque você não paga juros.'
                    }
                  ]
                },

                // Difícil (a questão do valor mínimo da fatura virou uma situação)
                // REVISAR: funcionamento do crédito rotativo.
                {
                  dificuldade: 'dificil',
                  pergunta: 'Sua prima tem uma fatura de cartão de R$ 400, mas agora só tem R$ 100. O aplicativo do banco oferece "pagar o mínimo". Qual é o maior risco dessa escolha?',
                  alternativas: [
                    {
                      texto: 'O que ficou sem pagar vira dívida com juros altos, que pode crescer rápido',
                      correta: true,
                      explicacao: 'O valor não pago entra no crédito rotativo, que tem juros muito altos. O melhor é pagar a fatura inteira ou negociar com o banco uma saída mais barata.'
                    },
                    {
                      texto: 'Nenhum, porque se o banco oferece é seguro',
                      explicacao: 'O banco oferece porque ganha com os juros. Estar no aplicativo não quer dizer que é bom para você.'
                    },
                    {
                      texto: 'O cartão é cancelado na hora',
                      explicacao: 'Pagar o mínimo não cancela o cartão. O problema são os juros sobre o que ficou faltando.'
                    },
                    {
                      texto: 'Ela perde só os R$ 100 que pagou',
                      explicacao: 'Os R$ 100 diminuem a dívida. O risco está nos R$ 300 que faltam, que passam a ter juros altos.'
                    }
                  ]
                }
              ]
            }
          ]
        },

        // ------------------------------------------------------
        // Unidade 2
        // ------------------------------------------------------
        // Escrita pelo planejamento e aprovada pelo líder (04/11/2026).
        // Bets (lição "Apostas e dinheiro fácil"): conferir a situação
        // legal antes de cada publicação. A MP 1.394/2026 ainda está em
        // análise no Congresso e no STF.
        {
          id: 'ef-unidade-2',
          titulo: 'Dinheiro no mundo real',
          licoes: [

            // ----- Lição: Primeiro salário -----
            {
              id: 'primeiro-salario',
              titulo: 'Primeiro salário',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Você começou a trabalhar com carteira assinada. O que é o salário líquido?',
                  alternativas: [
                    {
                      texto: 'O valor que cai na sua conta depois dos descontos',
                      correta: true,
                      explicacao: 'Líquido é o que chega de verdade para você usar. É com ele que você planeja o mês.'
                    },
                    {
                      texto: 'O valor que está escrito no contrato',
                      explicacao: 'Esse é o salário bruto, antes dos descontos. O que cai na conta é menos que isso.'
                    },
                    {
                      texto: 'O que sobra depois de pagar as contas do mês',
                      explicacao: 'O que sobra depois das contas é o que você conseguiu guardar. O líquido é o que chega antes de você gastar.'
                    },
                    {
                      texto: 'O salário somado com as horas extras e os bônus',
                      explicacao: 'Hora extra e bônus entram no salário bruto. O líquido é o que fica depois que os descontos saem.'
                    }
                  ]
                },

                // Fácil 2
                // REVISAR: benefícios do INSS.
                {
                  dificuldade: 'facil',
                  pergunta: 'No seu contracheque aparece um desconto do INSS. Para que ele serve?',
                  alternativas: [
                    {
                      texto: 'Para a sua aposentadoria e para ter uma renda se um dia você não puder trabalhar',
                      correta: true,
                      explicacao: 'O INSS é a Previdência Social. Quem contribui pode ter direito à aposentadoria e a benefícios como o auxílio quando fica doente e não consegue trabalhar.'
                    },
                    {
                      texto: 'É uma poupança sua, que você saca quando sair do emprego',
                      explicacao: 'Isso lembra o FGTS, que é outra coisa. O INSS não é sacado quando você sai do emprego: ele conta para a aposentadoria e os benefícios.'
                    },
                    {
                      texto: 'É o Imposto de Renda, que todo trabalhador paga',
                      explicacao: 'O Imposto de Renda é outro desconto, e só aparece a partir de certo valor de salário. O INSS é a contribuição para a Previdência Social.'
                    },
                    {
                      texto: 'É um dinheiro que fica com a empresa',
                      explicacao: 'A empresa só desconta e repassa o valor. O dinheiro vai para a Previdência Social, não para o caixa da empresa.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça; valores de exemplo)
                {
                  dificuldade: 'media',
                  pergunta: 'Na entrevista, disseram que o salário é R$ 2.000. No primeiro contracheque, os descontos somam R$ 200. Quanto cai na sua conta?',
                  alternativas: [
                    {
                      texto: 'R$ 1.800',
                      correta: true,
                      explicacao: 'Líquido é o bruto menos os descontos: 2.000 menos 200 dá 1.800. É esse valor que entra no seu planejamento.'
                    },
                    {
                      texto: 'R$ 2.000',
                      explicacao: 'Esse é o bruto. Quem planeja o mês por ele conta com R$ 200 que nunca chegam.'
                    },
                    {
                      texto: 'R$ 2.200',
                      explicacao: 'Desconto sai do salário, não soma. Somar daria um dinheiro que não existe.'
                    },
                    {
                      texto: 'R$ 1.600',
                      explicacao: 'Aí o desconto foi tirado duas vezes. Os descontos somam R$ 200 no total, então o líquido é R$ 1.800.'
                    }
                  ]
                },

                // Média 2
                // REVISAR: regras do FGTS.
                {
                  dificuldade: 'media',
                  pergunta: 'Seu contracheque mostra um valor de FGTS, mas o seu salário líquido não diminuiu por causa dele. Por quê?',
                  alternativas: [
                    {
                      texto: 'Quem paga o FGTS é a empresa, numa conta no seu nome, por fora do salário',
                      correta: true,
                      explicacao: 'O FGTS é depositado pela empresa além do salário. Ele fica guardado e só pode ser sacado em situações previstas em lei, como a aposentadoria.'
                    },
                    {
                      texto: 'Foi um erro, e o valor vai ser descontado no mês que vem',
                      explicacao: 'Não é erro: o FGTS aparece no contracheque só para você acompanhar. Ele não sai do seu salário.'
                    },
                    {
                      texto: 'O FGTS só é descontado de quem ganha mais',
                      explicacao: 'Isso lembra o Imposto de Renda, que depende do valor do salário. O FGTS não é descontado de ninguém: quem paga é a empresa.'
                    },
                    {
                      texto: 'É um bônus que cai na sua conta junto com o salário',
                      explicacao: 'Ele não cai na conta todo mês. Fica guardado numa conta separada, e o saque segue regras da lei.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Você conseguiu uma vaga de jovem aprendiz numa loja do Centro de Teresina. O primeiro pagamento só sai no mês que vem, e você já quer comprar um celular parcelado. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Esperar o primeiro contracheque, ver o líquido e decidir com base nele',
                      correta: true,
                      explicacao: 'Só com o líquido na mão, e depois de um mês de gastos reais, você sabe quanto dá para comprometer. Antes disso, a parcela é um chute.'
                    },
                    {
                      texto: 'Parcelar agora, usando o salário da entrevista como base',
                      explicacao: 'O valor da entrevista é o bruto. Depois dos descontos, a parcela pesa mais do que parecia.'
                    },
                    {
                      texto: 'Parcelar agora, mas uma parcela baixa, para não pesar',
                      explicacao: 'Parece prudente, mas a decisão continua no escuro: você ainda não sabe o líquido nem quanto vai gastar com passagem e lanche para trabalhar.'
                    },
                    {
                      texto: 'Parcelar agora, porque salário de carteira assinada cai todo mês',
                      explicacao: 'Nenhum emprego é garantido para sempre, e o contrato de aprendiz tem prazo para acabar. Se o salário parar, as parcelas continuam chegando.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Pix e golpes -----
            {
              id: 'pix-e-golpes',
              titulo: 'Pix e golpes',
              questoes: [

                // Fácil 1 (link falso)
                {
                  dificuldade: 'facil',
                  pergunta: 'Chega um SMS: "Seu Pix foi bloqueado. Regularize agora pelo link". O que fazer?',
                  alternativas: [
                    {
                      texto: 'Não clicar e conferir abrindo o app do banco por conta própria',
                      correta: true,
                      explicacao: 'Se tiver algum problema de verdade, ele aparece no app oficial. Indo direto por ele, você não depende do link de ninguém.'
                    },
                    {
                      texto: 'Fazer o que a mensagem pede, porque ela tem o nome do banco',
                      explicacao: 'Qualquer um pode escrever o nome do banco numa mensagem. O nome não prova quem mandou.'
                    },
                    {
                      texto: 'Clicar só para olhar, sem digitar nada',
                      explicacao: 'O link pode levar a uma página falsa feita para enganar ou tentar instalar um programa no celular. Sem clicar, o risco é zero.'
                    },
                    {
                      texto: 'Responder perguntando se a mensagem é verdadeira',
                      explicacao: 'Quem vai responder é o próprio golpista, e ele vai dizer que é verdade. Responder ainda mostra que o seu número está ativo.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'Você vai mandar um Pix para pagar o lanche que dividiu com a turma. O que conferir antes de confirmar?',
                  alternativas: [
                    {
                      texto: 'O nome de quem vai receber e o valor',
                      correta: true,
                      explicacao: 'O Pix cai na hora e, depois de confirmado, você não consegue desfazer sozinho. Conferir nome e valor antes evita mandar para a pessoa errada.'
                    },
                    {
                      texto: 'Só o valor, porque a chave já diz para quem vai',
                      explicacao: 'Um número digitado errado na chave manda o dinheiro para um desconhecido. O nome na tela é o que mostra quem recebe.'
                    },
                    {
                      texto: 'Nada, porque dá para cancelar o Pix depois',
                      explicacao: 'O Pix não tem botão de cancelar. O botão de contestação do app é para golpe, não para erro: se você errou, depende de a outra pessoa devolver.'
                    },
                    {
                      texto: 'O valor e o banco de quem vai receber',
                      explicacao: 'O banco ajuda, mas não diz quem é a pessoa: muita gente tem conta no mesmo banco. Quem confirma o destino é o nome.'
                    }
                  ]
                },

                // Média 1 (falsa central)
                {
                  dificuldade: 'media',
                  pergunta: 'Alguém liga dizendo ser do banco. Ele sabe seu nome completo e seu CPF, avisa que tem uma compra estranha na sua conta e pede para você passar o código que chegou por SMS. O que fazer?',
                  alternativas: [
                    {
                      texto: 'Desligar e ligar você mesmo para o banco, pelo número do app ou do cartão',
                      correta: true,
                      explicacao: 'Banco não pede código, senha nem transferência por telefone. Ligando você mesmo para o número oficial, você sabe com quem está falando.'
                    },
                    {
                      texto: 'Passar o código, já que ele sabe seu CPF e só o banco teria esse dado',
                      explicacao: 'Dados pessoais vazam e são vendidos. Saber seu CPF não prova que ele é do banco: é justamente o que o golpe usa para parecer verdade.'
                    },
                    {
                      texto: 'Passar o código, mas nunca a senha',
                      explicacao: 'O código vale tanto quanto a senha: com ele, o golpista entra na sua conta ou no seu WhatsApp. Não se passa nenhum dos dois.'
                    },
                    {
                      texto: 'Pedir o nome e a matrícula do atendente antes de continuar',
                      explicacao: 'Ele inventa um nome e uma matrícula na hora. A ligação continua sendo dele, e você continua sem saber quem é.'
                    }
                  ]
                },

                // Média 2 ("empresta aí")
                {
                  dificuldade: 'media',
                  pergunta: 'Um número novo, com a foto da sua tia, manda no WhatsApp: "Troquei de número. Me faz um Pix de R$ 300? Devolvo amanhã, é urgente". O que fazer?',
                  alternativas: [
                    {
                      texto: 'Ligar para a sua tia no número antigo antes de qualquer coisa',
                      correta: true,
                      explicacao: 'Confirmar por outro caminho é o que derruba esse golpe. Se for ela mesma, ela confirma em um minuto.'
                    },
                    {
                      texto: 'Mandar o Pix, porque a foto e o jeito de escrever são dela',
                      explicacao: 'Foto se copia do perfil, e o jeito de escrever se imita. Número novo pedindo dinheiro com pressa é o roteiro do golpe.'
                    },
                    {
                      texto: 'Fazer no chat uma pergunta que só ela saberia responder',
                      explicacao: 'O golpista pode achar a resposta nas redes sociais ou mudar de assunto. A conversa continua no número dele.'
                    },
                    {
                      texto: 'Mandar só uma parte, para ajudar sem arriscar tanto',
                      explicacao: 'Se for golpe, essa parte também se perde. O problema não é o valor, é para quem vai.'
                    }
                  ]
                },

                // Difícil
                {
                  dificuldade: 'dificil',
                  pergunta: 'Você viu um tênis barato num perfil do Instagram, mandou um Pix de R$ 150 e, 10 minutos depois, o perfil te bloqueou. O que faz mais sentido agora?',
                  alternativas: [
                    {
                      texto: 'Contar logo para o seu responsável, contestar o Pix no app do banco e registrar um boletim de ocorrência',
                      correta: true,
                      explicacao: 'O app do banco tem um botão para contestar Pix de golpe. Quanto mais rápido, maior a chance de segurar o dinheiro na conta do golpista, mas a devolução não é garantida.'
                    },
                    {
                      texto: 'Não contar para ninguém, por vergonha, já que foi pouco dinheiro',
                      explicacao: 'Cair em golpe acontece com adulto também, e vergonha não é motivo para perder tempo. Cada minuto parado diminui a chance de recuperar.'
                    },
                    {
                      texto: 'Pagar um perfil que promete recuperar o dinheiro por uma taxa',
                      explicacao: 'Esse é o golpe em cima do golpe: quem perdeu dinheiro vira alvo fácil. Recuperação de verdade passa pelo banco e pela polícia, sem pagar ninguém.'
                    },
                    {
                      texto: 'Esperar uns dias, porque o vendedor pode desbloquear e mandar o tênis',
                      explicacao: 'Dá vontade de acreditar, mas o tempo joga contra: quanto mais demora para contestar, menor a chance de o dinheiro ainda estar na conta do golpista.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Cartão de crédito -----
            {
              id: 'cartao-de-credito',
              titulo: 'Cartão de crédito',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Qual é a diferença entre pagar no débito e no crédito?',
                  alternativas: [
                    {
                      texto: 'No débito, o dinheiro sai da sua conta na hora; no crédito, você paga depois, na fatura',
                      correta: true,
                      explicacao: 'No crédito, o banco paga a loja agora e cobra de você depois. É um empréstimo, mesmo que pareça uma compra comum.'
                    },
                    {
                      texto: 'No crédito, você sempre paga juros',
                      explicacao: 'Só paga juros quem atrasa, parcela com juros ou não paga a fatura inteira. Com a fatura paga inteira e em dia, não tem juros.'
                    },
                    {
                      texto: 'No crédito, o dinheiro sai da sua conta na hora',
                      explicacao: 'É o contrário: quem tira na hora é o débito. O crédito fica para a fatura.'
                    },
                    {
                      texto: 'No crédito, a compra sai mais barata, porque o banco paga',
                      explicacao: 'O banco só adianta o pagamento. Quem paga no fim é você, e com juros se atrasar a fatura.'
                    }
                  ]
                },

                // Fácil 2
                // REVISAR: idade para ter cartão de crédito próprio.
                {
                  dificuldade: 'facil',
                  pergunta: 'Sua mãe te deu um cartão adicional do cartão de crédito dela. Quem paga as compras que você fizer?',
                  alternativas: [
                    {
                      texto: 'Ela, porque as suas compras entram na fatura dela',
                      correta: true,
                      explicacao: 'O adicional usa o limite e a fatura de quem é dono do cartão. Cada compra sua é uma conta a mais para ela pagar.'
                    },
                    {
                      texto: 'Você, numa fatura separada no seu nome',
                      explicacao: 'O adicional não tem fatura própria. Em geral, cartão de crédito no próprio nome é para maiores de 18 anos.'
                    },
                    {
                      texto: 'O banco, porque o adicional é um benefício do cartão',
                      explicacao: 'O benefício é poder usar, não deixar de pagar. Tudo o que você comprar vai para a fatura dela.'
                    },
                    {
                      texto: 'Cada um paga o que comprou, numa divisão da fatura',
                      explicacao: 'Em casa vocês podem combinar isso, mas para o banco quem deve tudo é a dona do cartão: todas as compras vão para a fatura dela.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça)
                // REVISAR: parcelado ocupando o limite.
                {
                  dificuldade: 'media',
                  pergunta: 'Seu primo tem R$ 1.000 de limite e compra um fone de R$ 600, em 6 parcelas de R$ 100 sem juros. Logo depois da compra, quanto de limite ele ainda tem para usar?',
                  alternativas: [
                    {
                      texto: 'R$ 400',
                      correta: true,
                      explicacao: 'A compra parcelada ocupa o valor inteiro no limite: 1.000 menos 600 dá 400. O limite volta aos poucos, conforme as parcelas são pagas.'
                    },
                    {
                      texto: 'R$ 900, porque só a primeira parcela conta agora',
                      explicacao: 'A cobrança vem de R$ 100 em R$ 100, mas o limite fica preso pelos R$ 600 de uma vez.'
                    },
                    {
                      texto: 'R$ 1.000, porque compra sem juros não usa o limite',
                      explicacao: 'Sem juros quer dizer que não tem acréscimo no preço. A compra continua sendo uma dívida e ocupa o limite.'
                    },
                    {
                      texto: 'Nada, porque o cartão bloqueia até a última parcela',
                      explicacao: 'O cartão não bloqueia. Ele só desconta o valor da compra do limite, e sobram R$ 400.'
                    }
                  ]
                },

                // Média 2 (continua a difícil de "Consumo e dívidas", da Unidade 1)
                {
                  dificuldade: 'media',
                  pergunta: 'Sua prima pagou só o mínimo da fatura e continuou usando o cartão normalmente. O que vem na próxima fatura?',
                  alternativas: [
                    {
                      texto: 'O que ficou faltando, mais os juros, mais as compras novas',
                      correta: true,
                      explicacao: 'A dívida antiga não some: ela volta com juros e se junta às compras novas. Pela lei, os juros e encargos podem chegar ao valor da própria dívida, ou seja, ela pode dobrar.'
                    },
                    {
                      texto: 'Só as compras novas, porque o mínimo resolveu o mês anterior',
                      explicacao: 'O mínimo só evita o atraso. O resto da fatura continua devido e volta na próxima.'
                    },
                    {
                      texto: 'O que ficou faltando, sem juros, porque ela pagou o mínimo em dia',
                      explicacao: 'Pagar o mínimo em dia evita a multa de atraso, mas não os juros. O que faltou entra no rotativo, que tem juros muito altos.'
                    },
                    {
                      texto: 'Uma fatura menor, porque ela já pagou uma parte',
                      explicacao: 'Ela pagou só o mínimo. O resto volta com juros e se soma às compras novas, então a próxima fatura tende a vir maior, não menor.'
                    }
                  ]
                },

                // Difícil (liga com a lição "Primeiro salário")
                {
                  dificuldade: 'dificil',
                  pergunta: 'Seu irmão mais velho tem quatro compras parceladas no cartão, e as parcelas juntas já levam quase metade do salário líquido dele. Aí aparece um tênis em 10 vezes de R$ 50, sem juros. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Esperar alguma parcela terminar antes de criar outra',
                      correta: true,
                      explicacao: 'O que pesa não é a parcela nova, é a soma de todas. Com metade do salário já comprometida, qualquer imprevisto empurra a fatura para o rotativo.'
                    },
                    {
                      texto: 'Comprar, porque sem juros não tem custo nenhum',
                      explicacao: 'Sem juros evita o acréscimo no preço, mas não o problema: é mais um pedaço do salário preso pelos próximos 10 meses.'
                    },
                    {
                      texto: 'Comprar, porque R$ 50 por mês é pouco',
                      explicacao: 'Parcela pequena engana sozinha. Somada às outras quatro, ela aperta um orçamento que já está no limite.'
                    },
                    {
                      texto: 'Comprar e, se apertar, pagar só o mínimo da fatura',
                      explicacao: 'Isso já planeja entrar no rotativo, a dívida mais cara do cartão. Parcela que só cabe com o mínimo não cabe.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Apostas e dinheiro fácil -----
            {
              id: 'apostas-e-dinheiro-facil',
              titulo: 'Apostas e dinheiro fácil',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Por que a casa de apostas ganha dinheiro no longo prazo?',
                  alternativas: [
                    {
                      texto: 'Porque as regras e os prêmios são feitos para ela ficar com uma parte do que é apostado',
                      correta: true,
                      explicacao: 'Uma pessoa pode ganhar num dia, mas a conta é feita para a empresa lucrar com o total das apostas. Quem aposta sempre, na média, perde.'
                    },
                    {
                      texto: 'Porque a maioria dos apostadores não estuda o suficiente',
                      explicacao: 'Estudar o time não muda a conta da casa: os prêmios já são calculados para ela lucrar com todo mundo junto.'
                    },
                    {
                      texto: 'Ela não ganha, só passa o dinheiro de quem perde para quem ganha',
                      explicacao: 'Se fosse só isso, a empresa não teria lucro, propaganda nem patrocínio. Ela fica com uma parte de tudo o que entra.'
                    },
                    {
                      texto: 'Porque é sorte, e a sorte da casa um dia acaba',
                      explicacao: 'Para a casa, não é sorte, é conta. Com milhares de apostas, o resultado dela fica previsível.'
                    }
                  ]
                },

                // Fácil 2 (pirâmide: crime contra a economia popular, Lei 1.521/1951)
                {
                  dificuldade: 'facil',
                  pergunta: 'Um conhecido te chama: "Entra com R$ 100 e traz mais 3 amigos. Cada um que entrar te paga, e você recebe muito mais". De onde vem esse dinheiro?',
                  alternativas: [
                    {
                      texto: 'Do dinheiro de quem entra depois',
                      correta: true,
                      explicacao: 'Isso é uma pirâmide: só se paga com gente nova entrando. Quando param de entrar, ela desaba, e a maioria perde. É golpe, e é crime no Brasil.'
                    },
                    {
                      texto: 'De um investimento que a empresa faz com o dinheiro de todos',
                      explicacao: 'Se tivesse um investimento de verdade, não precisaria trazer amigos para você receber. O ganho depende de recrutar.'
                    },
                    {
                      texto: 'Da venda de produtos da empresa',
                      explicacao: 'Quando o ganho vem de vender produtos para clientes, é outra coisa. Aqui o ganho vem só de trazer gente, sem nenhum produto.'
                    },
                    {
                      texto: 'De um robô que opera na internet e lucra todo dia',
                      explicacao: '"Robô que lucra todo dia" é uma promessa comum nesses esquemas. Ninguém garante lucro todo dia.'
                    }
                  ]
                },

                // Média 1 ("renda extra")
                // REVISAR: situação legal das bets (MP 1.394/2026). Conferir antes de cada publicação.
                {
                  dificuldade: 'media',
                  pergunta: 'Um influenciador posta o print de R$ 5.000 que ganhou num joguinho de cassino, com a legenda "renda extra, link na bio". O que esse print prova?',
                  alternativas: [
                    {
                      texto: 'Quase nada: pode ser conta de teste, ele pode ganhar por quem se cadastra no link, e ninguém posta as perdas',
                      correta: true,
                      explicacao: 'Um print mostra um momento escolhido a dedo, não o resultado do mês. E, desde setembro de 2026, as bets e a propaganda delas estão proibidas no Brasil; para menores de 18 anos, apostar sempre foi proibido.'
                    },
                    {
                      texto: 'Que esse jogo paga bem',
                      explicacao: 'Um ganho mostrado não diz quanto ele perdeu antes nem quanto as outras pessoas perderam. O jogo continua feito para a casa lucrar.'
                    },
                    {
                      texto: 'Que ele descobriu uma estratégia que funciona',
                      explicacao: 'Joguinho de cassino é sorteio: não tem estratégia que vença a conta da casa. Se tivesse, ele não precisaria divulgar o link.'
                    },
                    {
                      texto: 'Que dá para fazer renda extra, se começar com pouco',
                      explicacao: 'Renda vem de trabalho ou de algo que você vende. Aposta é um gasto que às vezes devolve um prêmio, não uma renda.'
                    }
                  ]
                },

                // Média 2 (conta simples, de cabeça)
                {
                  dificuldade: 'media',
                  pergunta: 'Seu primo de 20 anos apostou num site clandestino, R$ 20 por vez, 10 vezes no mês. Numa delas, ganhou R$ 100. Ele conta para todo mundo que "lucrou". Como ele terminou o mês?',
                  alternativas: [
                    {
                      texto: 'Com R$ 100 de prejuízo',
                      correta: true,
                      explicacao: 'Ele gastou 10 vezes R$ 20, ou seja, R$ 200, e recebeu R$ 100. No total, saiu R$ 100 a menos.'
                    },
                    {
                      texto: 'Com R$ 100 de lucro, porque ele ganhou',
                      explicacao: 'É o que a memória guarda: o ganho. Mas as 9 apostas perdidas também saíram do bolso dele.'
                    },
                    {
                      texto: 'Empatado, porque ganhou uma e perdeu as outras',
                      explicacao: 'Ganhar uma não compensa nove. Ele pôs R$ 200 e só voltaram R$ 100.'
                    },
                    {
                      texto: 'Com R$ 200 de prejuízo',
                      explicacao: 'Aí faltou contar o prêmio. Dos R$ 200 que ele gastou, R$ 100 voltaram.'
                    }
                  ]
                },

                // Difícil (liga com "Primeiro salário": dinheiro que já tem destino)
                {
                  dificuldade: 'dificil',
                  pergunta: 'Seu primo perdeu nas apostas R$ 200 que eram da passagem do mês. Agora ele quer apostar mais R$ 100 "só para recuperar". O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Parar, aceitar a perda e reorganizar o mês; se não consegue parar, pedir ajuda',
                      correta: true,
                      explicacao: 'O dinheiro perdido não volta apostando mais. Parar evita que o buraco cresça, e não conseguir parar é sinal para buscar ajuda de alguém de confiança ou de um profissional de saúde.'
                    },
                    {
                      texto: 'Apostar mais, porque depois de tanto perder a sorte tem que virar',
                      explicacao: 'Cada aposta é um sorteio novo: perder antes não aumenta a chance de ganhar agora. Essa ideia é o que faz o prejuízo crescer.'
                    },
                    {
                      texto: 'Apostar valores menores, para recuperar aos poucos',
                      explicacao: 'Valor menor só faz o prejuízo crescer mais devagar. A conta da casa continua a mesma.'
                    },
                    {
                      texto: 'Pegar emprestado para a passagem e apostar o que sobrar',
                      explicacao: 'Aí a perda vira dívida, e a aposta continua. É o caminho mais rápido para o problema sair do controle.'
                    }
                  ]
                }
              ]
            }
          ]
        },

        // ------------------------------------------------------
        // Unidade 3
        // ------------------------------------------------------
        // Escrita pelo planejamento e aprovada pelo líder (04/11/2026).
        // Cada lição usa a anterior: Inflação → Juros compostos →
        // Reserva de emergência → Metas grandes.
        {
          id: 'ef-unidade-3',
          titulo: 'Planejando o futuro',
          licoes: [

            // ----- Lição: Inflação -----
            {
              id: 'inflacao',
              titulo: 'Inflação',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Você deixou R$ 100 guardados na gaveta por dois anos, e nesse tempo os preços subiram. O que aconteceu com esse dinheiro?',
                  alternativas: [
                    {
                      texto: 'Continua sendo R$ 100, mas compra menos coisas',
                      correta: true,
                      explicacao: 'A nota não muda, mas os preços sobem. Dinheiro parado perde poder de compra, mesmo que ninguém mexa nele.'
                    },
                    {
                      texto: 'Continua valendo exatamente o mesmo, porque ninguém mexeu nele',
                      explicacao: 'O número na nota é o mesmo, mas o que ela compra diminuiu. É assim que a inflação "come" o dinheiro parado.'
                    },
                    {
                      texto: 'Rendeu um pouco, porque ficou guardado bastante tempo',
                      explicacao: 'Dinheiro na gaveta não rende nada. Só rende o dinheiro aplicado em algum lugar que paga por isso.'
                    },
                    {
                      texto: 'Só perde valor se você trocar por outra moeda, como o dólar',
                      explicacao: 'Isso é câmbio, outro assunto. A inflação faz o dinheiro comprar menos aqui mesmo, sem trocar nada.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'O número oficial da inflação no Brasil aparece todo mês no jornal. Quem faz essa medição?',
                  alternativas: [
                    {
                      texto: 'O IBGE, que acompanha os preços de muita coisa que as famílias compram',
                      correta: true,
                      explicacao: 'O IBGE calcula o IPCA, a inflação oficial do país, olhando os preços de comida, transporte, energia, roupa e muito mais.'
                    },
                    {
                      texto: 'O Banco Central',
                      explicacao: 'O Banco Central trabalha para controlar a inflação, mas quem mede o IPCA é o IBGE.'
                    },
                    {
                      texto: 'O Procon, que fiscaliza os preços',
                      explicacao: 'O Procon defende o consumidor e pode agir contra abusos, mas não calcula a inflação do país. Isso é com o IBGE.'
                    },
                    {
                      texto: 'A Receita Federal',
                      explicacao: 'A Receita Federal cuida dos impostos, não dos preços. Quem mede a inflação oficial é o IBGE.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça)
                {
                  dificuldade: 'media',
                  pergunta: 'A marmita do almoço no Centro de Teresina custava R$ 20 e agora custa R$ 22. Quanto o preço subiu?',
                  alternativas: [
                    {
                      texto: '10%',
                      correta: true,
                      explicacao: 'Subiu R$ 2 em cima de R$ 20. Como 10% de 20 é 2, o aumento foi de 10%.'
                    },
                    {
                      texto: '2%',
                      explicacao: 'R$ 2 é o aumento em reais, não em porcentagem. Para virar porcentagem, compare com o preço antigo: 2 de 20 é 10%.'
                    },
                    {
                      texto: '22%',
                      explicacao: '22 é o preço novo, não o aumento. A marmita subiu R$ 2, o que dá 10% de R$ 20.'
                    },
                    {
                      texto: '20%',
                      explicacao: '20 é o preço antigo. 20% de R$ 20 seriam R$ 4, e a marmita subiu R$ 2, ou seja, 10%.'
                    }
                  ]
                },

                // Média 2 (valores de exemplo, não são a inflação real)
                {
                  dificuldade: 'media',
                  pergunta: 'Seu tio teve 5% de aumento no salário num ano em que os preços também subiram 5%. Ele ficou mais rico?',
                  alternativas: [
                    {
                      texto: 'Não: o aumento só repôs a inflação, e ele compra o mesmo que antes',
                      correta: true,
                      explicacao: 'Se salário e preços sobem juntos, o poder de compra fica igual. Só sobra mais quando o aumento passa da inflação.'
                    },
                    {
                      texto: 'Sim, ficou 5% mais rico',
                      explicacao: 'O salário subiu 5%, mas as compras do mês também. No fim, o dinheiro compra o mesmo que antes.'
                    },
                    {
                      texto: 'Não: ele ficou mais pobre, porque os preços subiram',
                      explicacao: 'Ele ficaria mais pobre se o aumento fosse menor que a inflação. Como foram iguais, empatou.'
                    },
                    {
                      texto: 'Depende de quanto ele gasta por mês',
                      explicacao: 'Os gastos importam para o orçamento dele, mas a pergunta é sobre o poder de compra do salário. Esse fica igual quando o aumento e a inflação são iguais.'
                    }
                  ]
                },

                // Difícil
                // REVISAR: menção a guardar com rendimento (ponte para a Trilha 2).
                {
                  dificuldade: 'dificil',
                  pergunta: 'Um amigo diz: "Com a inflação, não adianta guardar dinheiro. O certo é gastar tudo logo, antes que perca valor." O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Continuar guardando; a inflação mostra que o dinheiro não deve ficar parado, não que é para gastar tudo',
                      correta: true,
                      explicacao: 'Sem dinheiro guardado, qualquer imprevisto vira dívida. Existem formas de guardar com rendimento, e menor de idade faz isso por meio de um responsável.'
                    },
                    {
                      texto: 'Ele tem razão: gastar agora é sempre melhor do que guardar',
                      explicacao: 'A inflação come o dinheiro aos poucos, mas gastar tudo deixa você sem nada para emergências e metas. O prejuízo é maior.'
                    },
                    {
                      texto: 'Comprar bastante coisa agora, para estocar antes que fique mais caro',
                      explicacao: 'Estocar prende o dinheiro em coisas que estragam ou que você nem vai usar, e ele faz falta numa emergência.'
                    },
                    {
                      texto: 'Apostar o dinheiro, para tentar ganhar da inflação',
                      explicacao: 'Aposta não protege da inflação: na média, quem aposta perde. Você só troca uma perda pequena por uma maior.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Juros compostos -----
            {
              id: 'juros-compostos',
              titulo: 'Juros compostos',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'No juro composto, o juro de cada mês é calculado em cima de quê?',
                  alternativas: [
                    {
                      texto: 'Do valor inicial mais os juros que já entraram',
                      correta: true,
                      explicacao: 'É o famoso "juros sobre juros": o juro de um mês passa a render juros no mês seguinte. Por isso o valor cresce cada vez mais rápido.'
                    },
                    {
                      texto: 'Só do valor inicial, todo mês igual',
                      explicacao: 'Isso é o juro simples. No composto, os juros que já entraram também passam a render.'
                    },
                    {
                      texto: 'Só do dinheiro que você depositar naquele mês',
                      explicacao: 'O juro composto vale para tudo o que está acumulado, não só para o depósito do mês.'
                    },
                    {
                      texto: 'Da inflação do mês',
                      explicacao: 'Alguns investimentos acompanham a inflação, mas isso é outra coisa. Juro composto é o juro de cada mês calculado sobre um valor que já inclui os juros anteriores.'
                    }
                  ]
                },

                // Fácil 2
                // REVISAR: ponte para a Trilha 2 (guardar com rendimento).
                {
                  dificuldade: 'facil',
                  pergunta: 'Duas pessoas guardam o mesmo valor por mês, com o mesmo rendimento. Uma começa aos 16 anos, e a outra, aos 26. Com 60 anos, quem tem mais?',
                  alternativas: [
                    {
                      texto: 'Quem começou aos 16, porque o dinheiro teve mais tempo para render juros sobre juros',
                      correta: true,
                      explicacao: 'No juro composto, o tempo é o ingrediente mais forte. Começar cedo, mesmo com pouco, faz muita diferença no fim. Quem é menor de idade faz isso por meio de um responsável.'
                    },
                    {
                      texto: 'As duas têm o mesmo, porque guardam o mesmo valor por mês',
                      explicacao: 'Quem começou antes guardou por mais tempo, e o dinheiro dela rendeu por mais tempo também. No fim, a diferença é grande.'
                    },
                    {
                      texto: 'Quem começou aos 26, porque já ganha mais nessa idade',
                      explicacao: 'A pergunta diz que as duas guardam o mesmo valor. Com valores iguais, ganha quem tem mais tempo.'
                    },
                    {
                      texto: 'A diferença é pequena: só os 10 anos de depósitos a mais',
                      explicacao: 'Os depósitos a mais contam, mas o que pesa é que esse dinheiro ainda rende por décadas. A diferença no fim costuma ser bem maior do que os depósitos extras.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça; juros contra você)
                {
                  dificuldade: 'media',
                  pergunta: 'Uma dívida de R$ 100 tem juros de 10% ao mês, e ninguém pagou nada por 2 meses. Com juros compostos, quanto ela vale agora?',
                  alternativas: [
                    {
                      texto: 'R$ 121',
                      correta: true,
                      explicacao: 'No 1º mês, 10% de 100 dá 10, e a dívida vai a 110. No 2º, 10% de 110 dá 11, e ela vai a 121. O juro do 2º mês foi maior porque incidiu sobre o juro do 1º.'
                    },
                    {
                      texto: 'R$ 120',
                      explicacao: 'Seria assim no juro simples, com R$ 10 por mês. No composto, o 2º mês cobra juros sobre R$ 110, não sobre R$ 100.'
                    },
                    {
                      texto: 'R$ 110',
                      explicacao: 'Esse é o valor depois de só 1 mês. No 2º mês entram mais R$ 11.'
                    },
                    {
                      texto: 'R$ 125',
                      explicacao: 'Os juros compostos crescem mais rápido, mas a conta é exata: 100 vira 110, e 110 vira 121. O juro do 2º mês é R$ 11, não R$ 15.'
                    }
                  ]
                },

                // Média 2 (juros a favor)
                {
                  dificuldade: 'media',
                  pergunta: 'Sua prima deixou um dinheiro guardado com rendimento por vários anos, sem tirar os juros. Ela reparou que, nos últimos anos, ele cresceu mais rápido do que no começo. Por quê?',
                  alternativas: [
                    {
                      texto: 'Porque os juros que entraram antes também passaram a render',
                      correta: true,
                      explicacao: 'A cada ano, o juro é calculado sobre um valor maior, que já inclui os juros antigos. O crescimento acelera com o tempo.'
                    },
                    {
                      texto: 'Porque quem guarda por mais tempo ganha um bônus do banco',
                      explicacao: 'Não é bônus: é a própria conta do juro composto. Os juros antigos passam a render junto com o dinheiro dela.'
                    },
                    {
                      texto: 'Porque a inflação fez o dinheiro dela crescer',
                      explicacao: 'A inflação faz o contrário: diminui o que o dinheiro compra. Quem fez o dinheiro crescer foram os juros.'
                    },
                    {
                      texto: 'Porque a taxa de juros foi aumentando com o tempo',
                      explicacao: 'A taxa até pode mudar, mas não precisa: mesmo com a taxa igual, o juro cresce porque é calculado sobre um valor cada vez maior.'
                    }
                  ]
                },

                // Difícil (liga com "Cartão de crédito", da Unidade 2)
                {
                  dificuldade: 'dificil',
                  pergunta: 'Seu irmão mais velho tem R$ 500 guardados rendendo e uma dívida de R$ 500 no rotativo do cartão. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Usar o dinheiro guardado para quitar a dívida e depois voltar a guardar',
                      correta: true,
                      explicacao: 'Os juros do rotativo são muito maiores que o rendimento comum de dinheiro guardado. Enquanto a dívida existir, os juros compostos jogam contra ele mais rápido do que a favor.'
                    },
                    {
                      texto: 'Deixar o dinheiro rendendo e pagar só o mínimo da fatura',
                      explicacao: 'Parece que o dinheiro está "trabalhando", mas a dívida cresce bem mais rápido do que ele rende. No fim, ele perde.'
                    },
                    {
                      texto: 'Esperar o dinheiro render mais para pagar tudo de uma vez depois',
                      explicacao: 'Esperar dá tempo para os juros da dívida crescerem, e eles crescem mais do que o rendimento. Cada mês de espera custa caro.'
                    },
                    {
                      texto: 'Pagar metade da dívida e deixar a outra metade rendendo',
                      explicacao: 'A metade que continua devendo segue com juros altos. Pagar tudo encerra o problema; dividir só adia.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Reserva de emergência -----
            {
              id: 'reserva-de-emergencia',
              titulo: 'Reserva de emergência',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Em qual destas situações faz sentido usar a reserva de emergência?',
                  alternativas: [
                    {
                      texto: 'Alguém da família perdeu o emprego de repente',
                      correta: true,
                      explicacao: 'Emergência é o que não dava para prever e não dá para adiar. Perder uma renda é exatamente o caso para que a reserva existe.'
                    },
                    {
                      texto: 'A Black Friday está com um desconto enorme num celular',
                      explicacao: 'Promoção não é emergência, por maior que seja o desconto. Se é uma compra planejada, o dinheiro vem de uma meta, não da reserva.'
                    },
                    {
                      texto: 'Os ingressos daquele show na cidade estão acabando',
                      explicacao: 'Dá vontade, mas é desejo, não imprevisto. Usar a reserva aqui deixa a família descoberta para um problema de verdade.'
                    },
                    {
                      texto: 'O aniversário da sua mãe é no mês que vem',
                      explicacao: 'Aniversário tem data marcada: dá para se planejar e guardar antes. Gasto previsível não é emergência.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'Por que a reserva de emergência deve ficar separada do dinheiro do dia a dia?',
                  alternativas: [
                    {
                      texto: 'Para não ser gasta sem perceber e estar lá quando o imprevisto chegar',
                      correta: true,
                      explicacao: 'Dinheiro misturado some nos gastos do mês. Separado, fica claro que ele tem uma função e só sai numa emergência.'
                    },
                    {
                      texto: 'Porque o dinheiro junto rende menos',
                      explicacao: 'O motivo principal não é render, é não gastar por engano. Mesmo sem rendimento nenhum, separar já protege a reserva.'
                    },
                    {
                      texto: 'Porque o banco exige que ela fique em outra conta',
                      explicacao: 'Nenhuma regra obriga. Separar é uma escolha de quem se organiza, para a reserva não se misturar com o resto.'
                    },
                    {
                      texto: 'Não precisa separar, basta lembrar quanto é a reserva',
                      explicacao: 'Na prática, a memória falha e o dinheiro misturado vai embora. Separado, ele não depende de força de vontade.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça)
                {
                  dificuldade: 'media',
                  pergunta: 'Uma família gasta R$ 2.000 por mês com o essencial (comida, contas, transporte). Uma recomendação comum é ter na reserva pelo menos 3 meses desses gastos. Quanto seria?',
                  alternativas: [
                    {
                      texto: 'R$ 6.000',
                      correta: true,
                      explicacao: '3 meses de R$ 2.000 dão R$ 6.000. Quem tem renda que varia de um mês para o outro, como quem trabalha por conta própria, costuma precisar de uma reserva maior.'
                    },
                    {
                      texto: 'R$ 2.000',
                      explicacao: 'Isso cobre só 1 mês. A recomendação é de pelo menos 3 meses, ou seja, R$ 6.000.'
                    },
                    {
                      texto: 'R$ 3.000',
                      explicacao: 'O 3 é o número de meses, não de milhares. 3 vezes R$ 2.000 dá R$ 6.000.'
                    },
                    {
                      texto: 'R$ 12.000',
                      explicacao: 'Há quem recomende 6 meses, mas a pergunta fala em 3: 3 vezes R$ 2.000 dá R$ 6.000.'
                    }
                  ]
                },

                // Média 2 (liga com "Inflação" e "Juros compostos")
                // REVISAR: características de onde guardar a reserva (ponte para a Trilha 2).
                {
                  dificuldade: 'media',
                  pergunta: 'Qual destes lugares combina mais com uma reserva de emergência?',
                  alternativas: [
                    {
                      texto: 'Um lugar seguro, de onde dá para tirar o dinheiro rápido, e que renda pelo menos um pouco',
                      correta: true,
                      explicacao: 'A reserva precisa estar lá na hora do aperto, inteira e sem demora. O rendimento ajuda a diminuir a perda para a inflação. Quem é menor de idade faz isso por meio de um responsável.'
                    },
                    {
                      texto: 'Um investimento que rende mais, mas só deixa sacar daqui a 3 anos',
                      explicacao: 'Emergência não marca data. Se o dinheiro fica preso, ele não serve como reserva, por mais que renda.'
                    },
                    {
                      texto: 'Um investimento que pode subir muito, mas também cair muito',
                      explicacao: 'Se ele cair justo na hora da emergência, a reserva some. Reserva precisa de segurança, não de emoção.'
                    },
                    {
                      texto: 'A gaveta de casa, para ter o dinheiro sempre na mão',
                      explicacao: 'Fica à mão, mas não rende nada e perde para a inflação todo mês. Ainda corre o risco de perda ou roubo.'
                    }
                  ]
                },

                // Difícil (liga com "Juros compostos")
                {
                  dificuldade: 'dificil',
                  pergunta: 'Sua família usou metade da reserva para consertar a moto que seu pai usa para trabalhar. Agora sobra pouco dinheiro por mês. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Voltar a guardar todo mês, mesmo que pouco, até a reserva se refazer',
                      correta: true,
                      explicacao: 'A reserva cumpriu o papel dela, e agora precisa ser reposta. Imprevisto não avisa, e o próximo pode chegar antes do que parece.'
                    },
                    {
                      texto: 'Deixar como está, porque o imprevisto já passou',
                      explicacao: 'Um imprevisto não impede o outro. Com meia reserva, a família fica com metade da proteção.'
                    },
                    {
                      texto: 'Pegar um empréstimo para completar a reserva logo',
                      explicacao: 'Aí a reserva vira dívida, com juros compostos contra a família. Reserva se refaz guardando, não pegando emprestado.'
                    },
                    {
                      texto: 'Usar o resto numa viagem, já que a reserva já foi mexida',
                      explicacao: 'Ter usado uma parte não é motivo para gastar o resto. A metade que sobrou continua protegendo a família.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Metas grandes -----
            {
              id: 'metas-grandes',
              titulo: 'Metas grandes',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'O que deixa uma meta grande mais fácil de alcançar?',
                  alternativas: [
                    {
                      texto: 'Saber o valor, o prazo e quanto guardar por mês',
                      correta: true,
                      explicacao: 'Com esses três números, a meta vira um plano. Você sabe o que fazer todo mês e consegue ver se está no caminho.'
                    },
                    {
                      texto: 'Pensar grande, sem se prender a números',
                      explicacao: 'Sonhar grande é ótimo, mas sem números a meta não sai do papel. É o valor e o prazo que dizem o que fazer hoje.'
                    },
                    {
                      texto: 'Guardar o que sobrar, quando sobrar',
                      explicacao: 'Quase nunca sobra. Sem um valor por mês combinado, a meta fica para depois e não chega.'
                    },
                    {
                      texto: 'Ter várias metas ao mesmo tempo, para ver qual anda mais rápido',
                      explicacao: 'Dividir o dinheiro entre muitas metas faz todas andarem devagar. Melhor escolher a prioridade e focar nela.'
                    }
                  ]
                },

                // Fácil 2 (liga com a ferramenta do app: aba "Meta na gaveta")
                {
                  dificuldade: 'facil',
                  pergunta: 'Na Calculadora de Metas do FinEdu, você coloca quanto custa a meta e em quantos meses quer chegar lá. O que ela responde?',
                  alternativas: [
                    {
                      texto: 'Quanto você precisa guardar por mês',
                      correta: true,
                      explicacao: 'Ela faz a conta de quanto guardar por mês para chegar ao valor no prazo. Assim você vê na hora se o plano cabe no seu dinheiro.'
                    },
                    {
                      texto: 'Se você vai conseguir o dinheiro com certeza',
                      explicacao: 'Nenhuma calculadora garante isso. Ela mostra o plano; cumprir depende de guardar todo mês.'
                    },
                    {
                      texto: 'Quanto a meta vai custar no futuro, já com a inflação',
                      explicacao: 'A calculadora não prevê preços: ela usa o valor que você coloca. Por isso vale atualizar a meta se o preço mudar.'
                    },
                    {
                      texto: 'Quanto pegar emprestado para comprar agora',
                      explicacao: 'É o contrário: ela ajuda a juntar antes de comprar, justamente para você não precisar de empréstimo.'
                    }
                  ]
                },

                // Média 1 (conta simples, de cabeça; valor de exemplo)
                {
                  dificuldade: 'media',
                  pergunta: 'Você quer tirar a carteira de motorista quando fizer 18 anos e calcula que vai custar R$ 3.000. Guardando R$ 250 por mês, em quantos meses você chega lá, sem contar rendimento?',
                  alternativas: [
                    {
                      texto: '12 meses',
                      correta: true,
                      explicacao: '3.000 dividido por 250 dá 12, ou seja, um ano. Até lá o preço pode mudar, então vale atualizar a meta de tempos em tempos.'
                    },
                    {
                      texto: '6 meses',
                      explicacao: 'Em 6 meses você junta 6 vezes R$ 250, ou seja, R$ 1.500. É só metade da meta.'
                    },
                    {
                      texto: '25 meses',
                      explicacao: 'Parece que o 25 veio do 250. Mas 25 meses de R$ 250 dariam R$ 6.250, o dobro do que você precisa.'
                    },
                    {
                      texto: '30 meses',
                      explicacao: 'O 30 veio do 3.000. Mas a conta é 3.000 dividido por 250, que dá 12 meses.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Você tem duas metas: um curso técnico que começa daqui a 6 meses e um videogame. O dinheiro que você guarda só dá para uma de cada vez. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Juntar primeiro para o curso e depois para o videogame',
                      correta: true,
                      explicacao: 'O curso tem data para começar e abre portas para o futuro. O videogame pode esperar sem perder nada, e vem logo depois.'
                    },
                    {
                      texto: 'Dividir o dinheiro igual entre as duas metas',
                      explicacao: 'Parece justo, mas aí nenhuma chega a tempo: o curso começa em 6 meses, e você estaria só na metade.'
                    },
                    {
                      texto: 'Começar pelo videogame, porque é mais rápido e dá motivação',
                      explicacao: 'A motivação é real, mas o curso tem prazo. Se o videogame vier antes, você pode perder a turma.'
                    },
                    {
                      texto: 'Parcelar o curso e, ao mesmo tempo, juntar para o videogame',
                      explicacao: 'Parece resolver as duas, mas cria uma dívida enquanto você ainda junta para outra coisa. Juntando primeiro para o curso, você evita parcelas e foca numa meta por vez.'
                    }
                  ]
                },

                // Difícil (liga com "Reserva de emergência")
                {
                  dificuldade: 'dificil',
                  pergunta: 'Você está juntando para um notebook para estudar. Faltam R$ 300, e a promoção acaba amanhã. Sua família tem uma reserva de emergência. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Não usar a reserva: esperar e juntar os R$ 300 que faltam',
                      correta: true,
                      explicacao: 'Meta não é emergência, mesmo sendo para estudar. Promoção volta, e a reserva precisa estar inteira para um imprevisto de verdade.'
                    },
                    {
                      texto: 'Pegar da reserva agora e repor depois',
                      explicacao: 'É a armadilha mais comum: "repor depois" costuma demorar, e a família fica desprotegida nesse meio-tempo.'
                    },
                    {
                      texto: 'Pedir para parcelar o que falta no cartão do responsável',
                      explicacao: 'Assim a meta vira dívida da família, e o cartão pode acabar no rotativo. Você paga a pressa com juros.'
                    },
                    {
                      texto: 'Pegar R$ 300 emprestados com um amigo e pagar quando der',
                      explicacao: 'Dívida sem prazo certo é risco para o seu dinheiro e para a amizade. Esperar um pouco resolve sem dever a ninguém.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // ==========================================================
    // TRILHA 2 · INVESTIMENTOS
    // ==========================================================
    // Escrita pelo planejamento e aprovada pelo líder, lição por lição
    // (04/11/2026). É toda de investimentos: todas as lições passam
    // pelo professor. Combinados: sem taxa real, sem promessa de
    // rendimento e sem nome de banco ou corretora; menor de idade
    // investe por meio de um responsável.
    // A ordem é própria: a primeira lição já começa liberada, sem
    // depender da Trilha 1 (regra de liberação do jogo.js).
    {
      id: 'investimentos',
      titulo: 'Investimentos',
      unidades: [

        // ------------------------------------------------------
        // Trilha 2 · Unidade 1
        // ------------------------------------------------------
        {
          id: 'inv-unidade-1',
          titulo: 'Começando a investir',
          licoes: [

            // ----- Lição: Poupar × investir -----
            // REVISAR: lição inteira (Trilha 2, investimentos).
            {
              id: 'poupar-ou-investir',
              titulo: 'Poupar × investir',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Qual é a diferença entre poupar e investir?',
                  alternativas: [
                    {
                      texto: 'Poupar é guardar uma parte do dinheiro; investir é colocar esse dinheiro guardado para render',
                      correta: true,
                      explicacao: 'Uma coisa leva à outra: primeiro você poupa, depois decide onde esse dinheiro vai render. Sem poupar, não tem o que investir.'
                    },
                    {
                      texto: 'São a mesma coisa, só com nomes diferentes',
                      explicacao: 'Guardar na gaveta é poupar, mas não é investir: o dinheiro fica parado e perde para a inflação. Investir é fazer ele render.'
                    },
                    {
                      texto: 'Poupar é seguro, e investir é sempre arriscado',
                      explicacao: 'Existem investimentos de risco bem baixo, como alguns de renda fixa. E guardar parado também tem um risco: perder para a inflação.'
                    },
                    {
                      texto: 'Poupar é para quem ganha pouco, e investir é para quem ganha muito',
                      explicacao: 'Os dois servem para todo mundo. Dá para começar a investir com pouco, e quem ganha muito também precisa poupar.'
                    }
                  ]
                },

                // Fácil 2
                // REVISAR: como menor de idade investe.
                {
                  dificuldade: 'facil',
                  pergunta: 'Você tem 16 anos e quer começar a investir o que guardou. Como funciona?',
                  alternativas: [
                    {
                      texto: 'Por meio de um responsável legal, que abre e acompanha o investimento com você',
                      correta: true,
                      explicacao: 'Menor de idade investe por meio de um responsável: é ele quem responde pela conta. Dá para começar já, aprendendo junto.'
                    },
                    {
                      texto: 'Não tem jeito: só a partir dos 18 anos',
                      explicacao: 'Não precisa esperar. Com um responsável, dá para investir antes dos 18, e o tempo a mais faz diferença nos juros compostos.'
                    },
                    {
                      texto: 'Sozinho pelo app, é só colocar uma data de nascimento de adulto',
                      explicacao: 'Mentir a idade é fraude, e a conta pode ser bloqueada com o seu dinheiro dentro. O caminho certo é com o responsável.'
                    },
                    {
                      texto: 'Pedindo para um amigo maior de idade investir no nome dele',
                      explicacao: 'O dinheiro fica no nome do amigo, e você não tem garantia nenhuma de receber de volta. Investimento precisa estar em seu nome, com o responsável.'
                    }
                  ]
                },

                // Média 1 (liga com "Juros compostos" e com a pirâmide da Unidade 2)
                {
                  dificuldade: 'media',
                  pergunta: 'Quando você investe, de onde vem o dinheiro que você recebe a mais?',
                  alternativas: [
                    {
                      texto: 'De quem usa o seu dinheiro e paga juros por isso, como o governo, um banco ou uma empresa',
                      correta: true,
                      explicacao: 'Investir é, muitas vezes, emprestar: alguém usa o seu dinheiro por um tempo e devolve com juros. O rendimento é o pagamento por esse empréstimo.'
                    },
                    {
                      texto: 'Do dinheiro de outros investidores que entram depois',
                      explicacao: 'Esse é o jeito de funcionar de uma pirâmide, que é golpe. Investimento de verdade paga com o uso do dinheiro, não com gente nova entrando.'
                    },
                    {
                      texto: 'O banco cria esse dinheiro para premiar quem investe',
                      explicacao: 'Banco não dá prêmio. Ele paga juros porque usa o seu dinheiro, por exemplo, emprestando a outras pessoas por juros maiores.'
                    },
                    {
                      texto: 'Da inflação, que faz o valor aumentar',
                      explicacao: 'A inflação faz os preços subirem, não o seu dinheiro. O rendimento vem de quem paga juros pelo uso dele.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Um aplicativo mostra que um investimento rendeu muito no ano passado. O que isso garante para o ano que vem?',
                  alternativas: [
                    {
                      texto: 'Nada: rendimento passado não garante rendimento futuro',
                      correta: true,
                      explicacao: 'O passado mostra como o investimento se comportou, não como vai se comportar. Desconfie de quem usa o resultado de ontem como promessa.'
                    },
                    {
                      texto: 'Que ele vai render igual no ano que vem',
                      explicacao: 'Rendimentos mudam com o tempo, com os juros do país e com o mercado. Um ano bom não garante outro.'
                    },
                    {
                      texto: 'Que ele é o mais seguro de todos',
                      explicacao: 'Render muito não quer dizer ser seguro. Às vezes, o que rende mais é justamente o que tem mais risco.'
                    },
                    {
                      texto: 'Que vale a pena colocar todo o seu dinheiro nele',
                      explicacao: 'Colocar tudo num lugar só, baseado no passado, aumenta o risco. E a reserva de emergência precisa ficar em lugar seguro.'
                    }
                  ]
                },

                // Difícil (liga com "Cartão de crédito", da Unidade 2, e "Reserva de emergência", da Unidade 3)
                {
                  dificuldade: 'dificil',
                  pergunta: 'Seu primo de 19 anos recebeu o primeiro salário e quer começar a investir. Ele tem uma dívida no rotativo do cartão e nenhuma reserva de emergência. Qual ordem faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Quitar a dívida do cartão, depois montar a reserva, depois investir para as metas',
                      correta: true,
                      explicacao: 'Nenhum investimento comum rende mais do que os juros do rotativo cobram. Sem dívida e com reserva, o investimento cresce sem risco de ter que ser desfeito no primeiro imprevisto.'
                    },
                    {
                      texto: 'Investir tudo agora, para aproveitar os juros compostos desde cedo',
                      explicacao: 'Começar cedo é bom, mas os juros compostos da dívida correm contra ele mais rápido do que os do investimento correm a favor.'
                    },
                    {
                      texto: 'Montar a reserva primeiro e pagar só o mínimo da fatura enquanto isso',
                      explicacao: 'Pagando só o mínimo, a dívida cresce todo mês. A reserva que ele montar vai embora pagando juros.'
                    },
                    {
                      texto: 'Dividir o salário em três partes iguais: dívida, reserva e investimento',
                      explicacao: 'Parece equilibrado, mas a dívida cara continua crescendo enquanto as outras partes andam devagar. Quitá-la primeiro libera mais dinheiro depois.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Renda fixa -----
            // REVISAR: lição inteira (Trilha 2, investimentos).
            {
              id: 'renda-fixa',
              titulo: 'Renda fixa',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Num investimento de renda fixa, o que fica combinado logo no começo?',
                  alternativas: [
                    {
                      texto: 'A regra de como o dinheiro vai render, como acompanhar uma taxa ou render um percentual combinado',
                      correta: true,
                      explicacao: 'O "fixa" é da regra, não do valor. Você sabe desde o início como o rendimento vai ser calculado, mesmo que o valor final mude.'
                    },
                    {
                      texto: 'O valor exato que você vai receber no fim, em qualquer caso',
                      explicacao: 'Isso só acontece em alguns casos, como o prefixado levado até o fim do prazo. Em muitos, o rendimento acompanha uma taxa que muda com o tempo.'
                    },
                    {
                      texto: 'Que o rendimento vai ser maior que a inflação',
                      explicacao: 'Alguns investimentos combinam isso, mas a renda fixa em geral não garante. Já houve anos em que a poupança rendeu menos que a inflação.'
                    },
                    {
                      texto: 'Que você só pode tirar o dinheiro no fim do prazo',
                      explicacao: 'Depende do investimento: alguns deixam sacar a qualquer hora, outros só no vencimento. Isso não é o que define a renda fixa.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'Quando alguém investe no Tesouro Direto, para quem está emprestando o dinheiro?',
                  alternativas: [
                    {
                      texto: 'Para o governo federal',
                      correta: true,
                      explicacao: 'O Tesouro Direto vende títulos públicos: o governo federal usa o dinheiro e devolve com juros, nas regras combinadas.'
                    },
                    {
                      texto: 'Para o banco ou a corretora onde a conta foi aberta',
                      explicacao: 'O banco ou a corretora só faz a ponte. Quem recebe o dinheiro e paga os juros é o governo federal.'
                    },
                    {
                      texto: 'Para a Bolsa de Valores',
                      explicacao: 'A B3, que é a bolsa, guarda o registro de quem tem cada título. Mas quem pega o dinheiro emprestado é o governo.'
                    },
                    {
                      texto: 'Para o governo do seu estado',
                      explicacao: 'O Tesouro Direto é só de títulos do governo federal. Estados e prefeituras não vendem títulos por ele.'
                    }
                  ]
                },

                // Média 1
                {
                  dificuldade: 'media',
                  pergunta: 'Entre um CDB e a poupança, qual rende mais?',
                  alternativas: [
                    {
                      texto: 'Depende das taxas do momento, do prazo e do imposto, que a poupança não tem',
                      correta: true,
                      explicacao: 'Não existe vencedor fixo: é preciso comparar o rendimento de cada um já descontado o imposto. A poupança não paga Imposto de Renda; o CDB paga.'
                    },
                    {
                      texto: 'O CDB, sempre, porque é um investimento de verdade',
                      explicacao: 'Muitos CDBs rendem mais, mas nem todos. Um CDB com taxa baixa, depois do imposto, pode render menos que a poupança.'
                    },
                    {
                      texto: 'A poupança, sempre, porque não tem imposto',
                      explicacao: 'Não ter imposto ajuda, mas não basta. Um CDB com taxa melhor pode render mais mesmo pagando imposto.'
                    },
                    {
                      texto: 'Rendem igual, porque os dois são renda fixa',
                      explicacao: 'Ser renda fixa só quer dizer que a regra é combinada no começo. Cada um tem a sua regra, e os rendimentos são diferentes.'
                    }
                  ]
                },

                // Média 2
                // REVISAR: garantia do FGC (sem citar o valor do limite, que pode mudar).
                {
                  dificuldade: 'media',
                  pergunta: 'Seu tio tinha dinheiro num CDB de um banco que quebrou. O que acontece com o dinheiro dele?',
                  alternativas: [
                    {
                      texto: 'O FGC, um fundo mantido pelos bancos, devolve o dinheiro até um limite por pessoa',
                      correta: true,
                      explicacao: 'O CDB tem a garantia do FGC, que cobre o investidor até um limite por pessoa e por banco. Por isso vale conferir a garantia antes de investir.'
                    },
                    {
                      texto: 'Ele perde tudo, porque o banco quebrou',
                      explicacao: 'É o que muita gente teme, mas o CDB tem a garantia do FGC. Ela devolve o dinheiro até um limite.'
                    },
                    {
                      texto: 'O governo devolve tudo, qualquer que seja o valor',
                      explicacao: 'Quem garante é o FGC, mantido pelos próprios bancos, e não o governo. E a garantia tem limite: acima dele, o dinheiro pode se perder.'
                    },
                    {
                      texto: 'O dinheiro passa automaticamente para o Tesouro Direto',
                      explicacao: 'São coisas diferentes: no CDB você emprestou a um banco; no Tesouro, ao governo. Quem cobre o CDB é o FGC.'
                    }
                  ]
                },

                // Difícil (liga com "Metas grandes" e "Poupar × investir")
                {
                  dificuldade: 'dificil',
                  pergunta: 'Sua irmã de 15 anos quer juntar dinheiro para a viagem de formatura, daqui a 2 anos, e vai investir com a mãe. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Comparar opções de renda fixa de baixo risco cujo prazo combine com a data da viagem',
                      correta: true,
                      explicacao: 'O prazo do investimento precisa combinar com o da meta, e o risco precisa ser baixo, porque a data não muda. Comparar, junto com a mãe, mostra qual rende mais nessas condições.'
                    },
                    {
                      texto: 'Escolher a poupança sem comparar, porque é a mais conhecida',
                      explicacao: 'A poupança pode até servir, mas escolher só por ser conhecida, sem comparar, pode deixar dinheiro na mesa. O problema é não comparar.'
                    },
                    {
                      texto: 'Um investimento que só libera o dinheiro em 5 anos, porque rende mais',
                      explicacao: 'Render mais não adianta se o dinheiro estiver preso na hora da viagem. O prazo do investimento tem que caber no prazo da meta.'
                    },
                    {
                      texto: 'O investimento que mais rendeu no ano passado, mesmo com risco alto',
                      explicacao: 'Rendimento passado não garante o futuro, e risco alto pode fazer o dinheiro cair justo perto da viagem.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Risco, retorno e liquidez -----
            // REVISAR: lição inteira (Trilha 2, investimentos).
            {
              id: 'risco-retorno-liquidez',
              titulo: 'Risco, retorno e liquidez',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'O que é a liquidez de um investimento?',
                  alternativas: [
                    {
                      texto: 'A rapidez para transformar o investimento em dinheiro na mão, sem perder valor',
                      correta: true,
                      explicacao: 'Liquidez alta é poder sacar rápido e receber o valor certo. É o que a reserva de emergência precisa.'
                    },
                    {
                      texto: 'Poder sacar a qualquer hora, mesmo perdendo uma parte do valor',
                      explicacao: 'Quase isso, mas falta o principal: liquidez de verdade é sacar rápido sem perder valor. Se você perde uma parte para sair, a liquidez é baixa.'
                    },
                    {
                      texto: 'O quanto o investimento rende',
                      explicacao: 'Isso é o retorno. Um investimento pode render muito e ter pouca liquidez, como os que prendem o dinheiro por anos.'
                    },
                    {
                      texto: 'O quanto o investimento é seguro',
                      explicacao: 'Isso é o risco. Um investimento pode ser seguro e ter pouca liquidez, se só liberar o dinheiro no fim do prazo.'
                    }
                  ]
                },

                // Fácil 2
                {
                  dificuldade: 'facil',
                  pergunta: 'Um investimento oferece um rendimento bem maior que os parecidos com ele. O que isso costuma indicar?',
                  alternativas: [
                    {
                      texto: 'Que ele tem mais risco',
                      correta: true,
                      explicacao: 'Quem paga mais para pegar dinheiro emprestado costuma ter mais chance de não pagar. Rendimento maior quase sempre vem com risco maior.'
                    },
                    {
                      texto: 'Que é golpe, com certeza',
                      explicacao: 'Pode ser, e vale desconfiar. Mas nem todo rendimento alto é golpe: às vezes é um investimento real, só que mais arriscado.'
                    },
                    {
                      texto: 'Que é a melhor opção disponível',
                      explicacao: 'Olhar só o rendimento é o erro mais comum. O melhor investimento depende também do risco e de quando você vai precisar do dinheiro.'
                    },
                    {
                      texto: 'Que a empresa está premiando quem confia nela',
                      explicacao: 'Ninguém paga mais por gentileza. O rendimento maior é o preço do risco que o investidor aceita correr.'
                    }
                  ]
                },

                // Média 1
                // REVISAR: casos em que a renda fixa pode dar prejuízo.
                {
                  dificuldade: 'media',
                  pergunta: 'Um investimento de renda fixa pode dar prejuízo?',
                  alternativas: [
                    {
                      texto: 'Sim, em alguns casos, como vender antes do prazo um título que caiu de preço',
                      correta: true,
                      explicacao: 'Alguns títulos mudam de preço até o fim do prazo. Quem vende antes pode receber menos. E se quem pegou emprestado não pagar, a perda pode passar da garantia.'
                    },
                    {
                      texto: 'Não, nunca: o "fixa" quer dizer garantido',
                      explicacao: 'É o erro mais comum. O "fixa" é da regra de rendimento, não uma garantia de que nada pode dar errado.'
                    },
                    {
                      texto: 'Só se o banco quebrar, e aí a pessoa perde tudo',
                      explicacao: 'Quebra de banco é um risco, mas existe a garantia do FGC até um limite. E há outro caso de prejuízo: vender antes do prazo.'
                    },
                    {
                      texto: 'Só se a inflação subir muito',
                      explicacao: 'A inflação pode fazer o rendimento valer menos, mas isso não é o mesmo que perder o valor investido. O prejuízo de verdade vem de outros casos, como vender antes do prazo.'
                    }
                  ]
                },

                // Média 2
                {
                  dificuldade: 'media',
                  pergunta: 'Por que muita gente divide o dinheiro em mais de um investimento, em vez de colocar tudo num só?',
                  alternativas: [
                    {
                      texto: 'Para que um problema num investimento não leve todo o dinheiro',
                      correta: true,
                      explicacao: 'É o "não colocar todos os ovos na mesma cesta". Se um investimento vai mal, os outros seguram o resultado.'
                    },
                    {
                      texto: 'Porque a garantia do FGC tem limite por banco',
                      explicacao: 'Esse é um motivo a mais para quem tem muito dinheiro num banco só, mas não é o principal. Dividir protege contra vários tipos de problema, não só a quebra de banco.'
                    },
                    {
                      texto: 'Para o dinheiro render o dobro',
                      explicacao: 'Dividir não multiplica o rendimento. O objetivo é diminuir o risco de perder muito de uma vez.'
                    },
                    {
                      texto: 'Para pagar menos imposto',
                      explicacao: 'Cada investimento tem a sua regra de imposto, e dividir não diminui isso por si só. O motivo principal é diminuir o risco.'
                    }
                  ]
                },

                // Difícil (liga com "Reserva de emergência" e "Metas grandes")
                {
                  dificuldade: 'dificil',
                  pergunta: 'Você e sua mãe vão investir R$ 1.000. Desse valor, R$ 600 são a sua reserva de emergência e R$ 400 são para uma meta daqui a 3 anos. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'A reserva num investimento seguro e de saque rápido; a meta num seguro com prazo de até 3 anos, que pode render um pouco mais',
                      correta: true,
                      explicacao: 'Cada dinheiro tem uma função. A reserva precisa de liquidez; a meta tem data, então pode ficar num prazo combinado e render mais, sem risco alto.'
                    },
                    {
                      texto: 'Tudo num investimento seguro de saque rápido, para simplificar',
                      explicacao: 'Funciona, e não é um erro grave. Mas a meta de 3 anos não precisa de saque rápido e poderia render mais num prazo combinado.'
                    },
                    {
                      texto: 'Tudo num investimento que só libera o dinheiro em 3 anos, porque rende mais',
                      explicacao: 'Serve para a meta, mas não para a reserva: se surgir uma emergência antes, o dinheiro vai estar preso.'
                    },
                    {
                      texto: 'Tudo no investimento que rende mais, mesmo com risco alto',
                      explicacao: 'Risco alto não combina com nenhum dos dois: a reserva precisa estar inteira, e a meta tem data para acontecer.'
                    }
                  ]
                }
              ]
            },

            // ----- Lição: Promessa boa demais -----
            // REVISAR: lição inteira (Trilha 2, investimentos).
            {
              id: 'promessa-boa-demais',
              titulo: 'Promessa boa demais',
              questoes: [

                // Fácil 1
                {
                  dificuldade: 'facil',
                  pergunta: 'Qual destes sinais mais indica que uma oferta de investimento pode ser golpe?',
                  alternativas: [
                    {
                      texto: 'Prometer rendimento alto e garantido, sem risco nenhum',
                      correta: true,
                      explicacao: 'Rendimento alto sempre vem com risco. Quem promete as duas coisas juntas está prometendo algo que não existe.'
                    },
                    {
                      texto: 'Ser uma empresa nova, que você nunca ouviu falar',
                      explicacao: 'Vale pesquisar mais, mas ser nova não é sinal de golpe. Muitas empresas sérias são novas; o que pesa é a promessa e a autorização.'
                    },
                    {
                      texto: 'Pedir o seu CPF para fazer o cadastro',
                      explicacao: 'Empresas sérias também pedem CPF, porque o investimento precisa estar no seu nome. Isso, sozinho, não indica golpe.'
                    },
                    {
                      texto: 'O rendimento mudar de um mês para o outro',
                      explicacao: 'Isso é normal em muitos investimentos de verdade. Suspeito é o contrário: um rendimento alto que nunca muda.'
                    }
                  ]
                },

                // Fácil 2
                // REVISAR: onde consultar se a empresa é autorizada.
                {
                  dificuldade: 'facil',
                  pergunta: 'Onde dá para conferir se uma empresa pode oferecer investimentos?',
                  alternativas: [
                    {
                      texto: 'Nos sites oficiais da CVM e do Banco Central, que mostram quem é autorizado',
                      correta: true,
                      explicacao: 'A CVM e o Banco Central fiscalizam quem oferece investimentos e mostram, nos seus sites, quem tem autorização.'
                    },
                    {
                      texto: 'No CNPJ: se a empresa tem CNPJ, é autorizada',
                      explicacao: 'O CNPJ só mostra que a empresa existe. Para oferecer investimentos, ela precisa de autorização da CVM ou do Banco Central.'
                    },
                    {
                      texto: 'Nos comentários e avaliações do perfil dela',
                      explicacao: 'Comentários podem ser comprados ou escritos pelo próprio golpista. Autorização se confere em fonte oficial.'
                    },
                    {
                      texto: 'Perguntando para quem já investiu lá',
                      explicacao: 'Quem já investiu pode estar recebendo agora e só descobrir o golpe depois. Opinião não substitui a consulta oficial.'
                    }
                  ]
                },

                // Média 1 (liga com "Risco, retorno e liquidez")
                {
                  dificuldade: 'media',
                  pergunta: 'Um perfil promete "5% ao mês, garantido e sem risco". O que torna essa oferta suspeita?',
                  alternativas: [
                    {
                      texto: 'Juntar rendimento alto com "garantido" e "sem risco"',
                      correta: true,
                      explicacao: 'Na vida real, quem paga mais corre mais risco. Prometer muito e "sem risco" ao mesmo tempo é a marca da promessa falsa.'
                    },
                    {
                      texto: 'Só o número: com 2% ao mês, seria confiável',
                      explicacao: 'O número alto chama atenção, mas o problema principal é o "garantido e sem risco". Um número menor com a mesma promessa continua suspeito.'
                    },
                    {
                      texto: 'Ser no Instagram: num site próprio, seria confiável',
                      explicacao: 'Golpista também tem site bonito. O que importa é a promessa e se a empresa é autorizada, não onde ela aparece.'
                    },
                    {
                      texto: 'Nada, se a pessoa mostrar prints de quem já recebeu',
                      explicacao: 'Prints se fabricam, e golpes costumam pagar os primeiros para ganhar confiança. Prova de verdade é a autorização oficial.'
                    }
                  ]
                },

                // Média 2 (liga com a pirâmide, da Unidade 2)
                {
                  dificuldade: 'media',
                  pergunta: 'Um amigo entrou num investimento, recebeu os primeiros rendimentos certinho e agora chama você. Isso prova que é confiável?',
                  alternativas: [
                    {
                      texto: 'Não: golpes costumam pagar os primeiros para ganhar confiança e atrair mais gente',
                      correta: true,
                      explicacao: 'Pagar no começo é a isca. O dinheiro dos que entram depois paga os primeiros, até o esquema parar de pagar todo mundo.'
                    },
                    {
                      texto: 'Sim: se ele já recebeu, é porque funciona',
                      explicacao: 'Receber no começo é exatamente o que faz as pessoas confiarem e chamarem outras. Não prova que vai continuar.'
                    },
                    {
                      texto: 'Sim, se for um amigo próximo, que não mentiria para você',
                      explicacao: 'Ele pode estar sendo sincero e mesmo assim estar sendo enganado. Muita vítima de golpe chama amigos sem saber.'
                    },
                    {
                      texto: 'Sim, se ele já conseguiu sacar o dinheiro',
                      explicacao: 'No começo, os golpes deixam sacar justamente para parecer confiáveis. O problema aparece depois, quando o saque trava.'
                    }
                  ]
                },

                // Difícil (liga com "Pix e golpes", da Unidade 2)
                {
                  dificuldade: 'dificil',
                  pergunta: 'Um "gerente" simpático liga para sua mãe oferecendo um investimento exclusivo, "só até hoje", com rendimento acima de todos, e pede um Pix para a conta de uma pessoa física. O que faz mais sentido?',
                  alternativas: [
                    {
                      texto: 'Não fazer nada na hora: conferir se a empresa é autorizada e desconfiar da pressa e do Pix para pessoa física',
                      correta: true,
                      explicacao: 'Investimento de verdade é feito no seu nome, por uma instituição autorizada, e não some se você esperar um dia. Pressa e conta de pessoa física são sinais clássicos de golpe.'
                    },
                    {
                      texto: 'Investir só um pouco, para testar se é verdade',
                      explicacao: 'Parece prudente, mas é assim que o golpe começa: o teste pode até render, para criar confiança e trazer um valor maior depois.'
                    },
                    {
                      texto: 'Pedir o contrato por e-mail e, se estiver tudo escrito, investir',
                      explicacao: 'Golpista também manda contrato bonito. Um papel não substitui a autorização oficial nem explica o Pix para pessoa física.'
                    },
                    {
                      texto: 'Pesquisar o nome da empresa na internet e, se tiver site, investir',
                      explicacao: 'Ter site não prova nada: qualquer um cria um. O que vale é a consulta nos sites da CVM e do Banco Central.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
