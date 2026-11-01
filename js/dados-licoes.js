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

                // Média 2 (sem conta: a pergunta é qual opção sai mais caro)
                {
                  dificuldade: 'media',
                  pergunta: 'Um celular custa R$ 1.000 à vista ou 10 parcelas de R$ 120 no cartão. O que é verdade?',
                  alternativas: [
                    {
                      texto: 'Parcelado sai mais caro: no total, você paga mais de R$ 1.000',
                      correta: true,
                      explicacao: 'As 10 parcelas de R$ 120 somam R$ 1.200. São R$ 200 a mais, que são os juros escondidos nas parcelas.'
                    },
                    {
                      texto: 'Dá no mesmo, porque o celular é o mesmo',
                      explicacao: 'O celular é o mesmo, mas o total pago não: parcelado, você paga R$ 1.200.'
                    },
                    {
                      texto: 'Parcelado sai mais barato, porque cada parcela é pequena',
                      explicacao: 'Parcela pequena engana. O que importa é o total: parcelado, você paga R$ 1.200, mais do que à vista.'
                    },
                    {
                      texto: 'À vista sempre sai mais caro',
                      explicacao: 'Aqui é o contrário: à vista custa R$ 1.000, e parcelado, R$ 1.200.'
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
