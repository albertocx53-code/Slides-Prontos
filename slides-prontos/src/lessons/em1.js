// 1ª série EM — aulas 164 a 175
window.AULAS = window.AULAS || {};

AULAS[164] = { ill:'globo', slides:[
  {type:'capa', title:'Texto e contexto de produção', sub:'Quem diz, para quem, quando e por quê'},
  {type:'objetivos', items:['Relacionar textos às condições de produção e circulação','Identificar autor, interlocutor, finalidade e suporte','Perceber como a época influencia os sentidos','Analisar textos de diferentes épocas e esferas']},
  {type:'pergunta', q:'Uma mesma frase pode ter sentidos diferentes se dita em 1920 ou em 2026?', hint:'Pense em valores, tecnologias e costumes de cada época.', ill:'balao'},
  {type:'conceito', title:'Condições de produção', text:'Todo texto é produzido por **alguém**, para **alguém**, com uma **finalidade**, em um **momento histórico** e circula em um **suporte**. Essas condições determinam escolhas de linguagem e sentidos.', box:'Ler bem é reconstruir o contexto em que o texto nasceu.', ill:'globo'},
  {type:'exemplos', title:'Elementos do contexto', cards:[['Enunciador','Quem produz e de que lugar social'],['Interlocutor','Para quem o texto se dirige'],['Finalidade','Informar, convencer, emocionar, regular'],['Época e suporte','Quando e onde circula']]},
  {type:'texto', title:'Leitura: anúncio de jornal de 1900', text:'"Precisa-se de uma ama de leite, sadia e de bons costumes. Paga-se bem. Tratar à Rua do Ouvidor, n. 50."', source:'Anúncio adaptado, no estilo dos jornais do Rio de Janeiro do início do séc. XX', side:{h:'Contextualize', items:['Que prática social o anúncio revela?','Que valores aparecem em "bons costumes"?','Como esse anúncio seria lido hoje?']}},
  {type:'comparacao', title:'Mudança de contexto', left:{h:'No contexto original', items:['Prática comum na época','Anúncio funcional','Valores da elite urbana']}, right:{h:'Lido hoje', items:['Revela desigualdades sociais','Documento histórico','Desperta reflexão crítica']}},
  {type:'passos', title:'Roteiro de análise', steps:[['Quem?','Autor e lugar social'],['Para quem?','Público'],['Para quê?','Finalidade'],['Quando e onde?','Época e suporte']]},
  {type:'mapa', title:'Mapa mental', center:'CONTEXTO', nodes:[['Enunciador','Quem diz'],['Interlocutor','Para quem'],['Finalidade','Para quê'],['Época','Quando'],['Suporte','Onde circula'],['Sentidos','Dependem do contexto']]},
  {type:'atividade', title:'Atividade 1: analise o contexto', instr:'Identifique as condições de produção.', items:[{q:'Post de uma ONG ambiental no Instagram pedindo doações.', r:'Enunciador: ONG; interlocutor: seguidores; finalidade: mobilizar e arrecadar; suporte: rede social'},{q:'Bula de remédio.', r:'Enunciador: fabricante; interlocutor: paciente/profissional; finalidade: orientar o uso; suporte: impresso na embalagem'}]},
  {type:'desafio', title:'Desafio: um texto, dois tempos', text:'Escolha um texto antigo (anúncio, carta, notícia) e analise-o em seu contexto e hoje.', items:['Identifique época e suporte','Explique a finalidade original','Aponte o que mudou na leitura atual','Apresente em um parágrafo'], ill:'lupa'},
  {type:'quiz', q:'Condições de produção incluem...', opts:['autor, interlocutor, finalidade, época e suporte','apenas o título','somente o número de páginas','apenas a ortografia'], c:0, why:'São os elementos do contexto.'},
  {type:'quiz', q:'Reler um texto antigo hoje pode...', opts:['revelar sentidos novos','manter sempre o mesmo sentido','apagar o contexto','eliminar o autor'], c:0, why:'O contexto de leitura também influencia.'},
  {type:'quiz', q:'O suporte de um texto é...', opts:['o meio em que circula','o tema','o autor','a moral da história'], c:0, why:'Jornal, livro, site, rede social...'},
  {type:'gabarito'},
  {type:'resumo', items:['Todo texto tem condições de produção.','Época, autor e público moldam os sentidos.','O suporte influencia a forma.','Ler é reconstruir o contexto.']},
  {type:'auto', items:['Identifico condições de produção.','Relaciono texto e época.','Analiso suporte e finalidade.','Leio textos antigos criticamente.']},
  {type:'encerramento', casa:'Escolha um post e um texto de livro didático e compare suas condições de produção.'}
]};

AULAS[165] = { ill:'quebracabeca', slides:[
  {type:'capa', title:'Coesão, coerência e progressão temática', sub:'O que faz um texto ser um texto'},
  {type:'objetivos', items:['Diferenciar coesão e coerência','Reconhecer mecanismos de coesão referencial e sequencial','Avaliar a progressão temática','Revisar textos com problemas de textualidade']},
  {type:'pergunta', q:'Um texto pode ter todos os conectivos certos e mesmo assim não fazer sentido?', hint:'Pense em ideias contraditórias.', ill:'balao'},
  {type:'conceito', title:'Textualidade', text:'**Coesão** é a ligação **linguística** entre as partes (pronomes, conectivos, sinônimos). **Coerência** é a **lógica do sentido** global. **Progressão temática** é o avanço do texto com informações novas sobre o tema.', box:'Coesão está na superfície; coerência, no sentido.', ill:'quebracabeca'},
  {type:'comparacao', title:'Coesão x coerência', left:{h:'Coeso, mas incoerente', items:['"Comprei um carro. Ele é azul. O azul é a cor do céu. O céu tem nuvens."','Ligado, mas sem rumo']}, right:{h:'Coerente e coeso', items:['"Comprei um carro usado. Embora antigo, ele é econômico, por isso o escolhi."','Lógica e ligação']}},
  {type:'exemplos', title:'Problemas comuns', cards:[['Contradição','Afirmar e negar a mesma ideia'],['Circularidade','Repetir sem acrescentar'],['Tangência','Fugir do tema'],['Conectivo inadequado','Relação lógica falsa']]},
  {type:'texto', title:'Leitura: parágrafo para revisar', text:'A leitura é fundamental para os jovens. Por isso, muitos jovens não leem. A leitura é muito importante. Além disso, o futebol é o esporte mais popular do Brasil.', source:'Texto criado para esta aula', side:{h:'Diagnostique', items:['Que conectivo é inadequado?','Onde há circularidade?','Onde o texto foge do tema?']}},
  {type:'passos', title:'Revisão textual', steps:[['Tema','O texto mantém o foco?'],['Progressão','Cada frase acrescenta algo?'],['Coesão','Retomadas e conectivos'],['Coerência','Há contradições?']]},
  {type:'mapa', title:'Mapa mental', center:'TEXTUALIDADE', nodes:[['Coesão','Ligação linguística'],['Coerência','Lógica do sentido'],['Progressão','Informação nova'],['Referencial','Retomadas'],['Sequencial','Conectivos'],['Revisão','Diagnóstico']]},
  {type:'atividade', title:'Atividade 1: reescreva', instr:'Reescreva o parágrafo da leitura corrigindo os problemas.', items:[{q:'Parágrafo revisado', r:'Ex.: A leitura é fundamental para os jovens, pois amplia o repertório e o senso crítico. No entanto, muitos deles leem pouco, seja por falta de acesso a livros, seja por falta de incentivo.'}]},
  {type:'atividade', title:'Atividade 2: diagnostique', instr:'Identifique o problema.', items:[{q:'"Ele é vegetariano e adora churrasco de picanha."', r:'Contradição (incoerência)'},{q:'"Estudei muito, porém fui aprovado."', r:'Conectivo inadequado (deveria indicar consequência)'},{q:'"A poluição polui o ambiente porque é poluente."', r:'Circularidade'}]},
  {type:'quiz', q:'Coerência diz respeito...', opts:['à lógica e ao sentido global','apenas à pontuação','somente aos pronomes','à caligrafia'], c:0, why:'É a unidade de sentido.'},
  {type:'quiz', q:'Progressão temática significa...', opts:['acrescentar informações novas sobre o tema','repetir a mesma ideia','mudar de tema a cada frase','não usar conectivos'], c:0, why:'O texto avança.'},
  {type:'quiz', q:'"Por isso" ligando causa inexistente gera...', opts:['incoerência','progressão','paráfrase','coesão referencial'], c:0, why:'Relação lógica falsa.'},
  {type:'gabarito'},
  {type:'resumo', items:['Coesão liga as partes.','Coerência garante sentido.','Progressão acrescenta informação.','Revisar exige olhar para os três.']},
  {type:'auto', items:['Diferencio coesão e coerência.','Avalio a progressão.','Diagnostico problemas.','Reviso textos.']},
  {type:'encerramento', casa:'Revise uma redação antiga sua usando o roteiro de quatro perguntas.'}
]};

AULAS[166] = { ill:'livro', slides:[
  {type:'capa', title:'Intertextualidade e interdiscursividade', sub:'Textos e discursos em diálogo'},
  {type:'objetivos', items:['Diferenciar intertextualidade e interdiscursividade','Reconhecer formas de diálogo entre textos','Identificar discursos que atravessam textos','Analisar efeitos dialógicos (adesão, crítica, humor)']},
  {type:'pergunta', q:'Por que propagandas usam frases de filmes famosos?', hint:'Pense no efeito sobre o público.', ill:'balao'},
  {type:'conceito', title:'Textos e discursos', text:'**Intertextualidade** é a presença de um **texto** em outro (citação, paródia, alusão). **Interdiscursividade** é a presença de **discursos** — modos de pensar e falar de grupos sociais — em um texto, mesmo sem citar um texto específico.', box:'Todo texto é atravessado por outros textos e discursos.', ill:'livro'},
  {type:'exemplos', title:'Formas de intertextualidade', cards:[['Citação','Reprodução literal com fonte'],['Alusão','Referência indireta'],['Paródia','Subversão crítica ou humorística'],['Epígrafe','Citação na abertura de uma obra']]},
  {type:'exemplos', title:'Interdiscursividade', cards:[['Discurso religioso','"Amai-vos uns aos outros" em anúncio'],['Discurso científico','"Comprovado em laboratório"'],['Discurso jurídico','"Nos termos da lei..." em texto humorístico'],['Discurso empreendedor','"Seja o CEO da sua vida"']]},
  {type:'texto', title:'Leitura: dois enunciados', text:'1. Slogan: "Ser ou não ser? Seja sustentável."\n2. Post: "Disciplina é liberdade: acorde às 5h, foque no seu propósito e vença."', source:'Enunciados criados para esta aula', side:{h:'Analise', items:['Que texto o slogan retoma?','Que discurso atravessa o post?','Que efeito cada um busca?']}},
  {type:'comparacao', title:'Efeitos dialógicos', left:{h:'Adesão', items:['Retoma para concordar','Ex.: citação de autoridade']}, right:{h:'Contestação', items:['Retoma para criticar','Ex.: paródia, ironia']}},
  {type:'mapa', title:'Mapa mental', center:'DIÁLOGOS', nodes:[['Intertextualidade','Texto em texto'],['Interdiscursividade','Discurso em texto'],['Citação','Literal'],['Paródia','Crítica/humor'],['Alusão','Indireta'],['Efeitos','Adesão ou crítica']]},
  {type:'atividade', title:'Atividade 1: classifique', instr:'Intertextualidade (IT) ou interdiscursividade (ID)?', items:[{q:'Meme que reproduz a frase "Houston, temos um problema".', r:'IT (alusão/citação de filme e fato histórico)'},{q:'Propaganda de banco com vocabulário de autoajuda.', r:'ID (discurso motivacional)'},{q:'Romance com epígrafe de Camões.', r:'IT (epígrafe)'}]},
  {type:'desafio', title:'Desafio: caçadores de diálogos', text:'Encontrem 3 exemplos de intertextualidade ou interdiscursividade em mídias atuais.', items:['Identifiquem a fonte ou o discurso','Classifiquem a forma','Expliquem o efeito','Apresentem em painel'], ill:'lupa'},
  {type:'quiz', q:'Interdiscursividade é...', opts:['presença de discursos sociais em um texto','cópia literal','tradução','resumo'], c:0, why:'Modos de dizer de grupos sociais.'},
  {type:'quiz', q:'"Ser ou não ser? Seja sustentável" faz...', opts:['intertextualidade com Shakespeare','interdiscursividade jurídica','paráfrase científica','nenhum diálogo'], c:0, why:'Retoma a fala de Hamlet.'},
  {type:'quiz', q:'A paródia costuma produzir efeito de...', opts:['crítica ou humor','adesão total','neutralidade','tradução'], c:0, why:'Subverte o original.'},
  {type:'gabarito'},
  {type:'resumo', items:['Intertextualidade: texto em texto.','Interdiscursividade: discurso em texto.','Diálogos geram adesão, crítica ou humor.','Repertório amplia a leitura.']},
  {type:'auto', items:['Diferencio os conceitos.','Reconheço formas de diálogo.','Identifico discursos sociais.','Analiso efeitos dialógicos.']},
  {type:'encerramento', casa:'Analise uma propaganda e identifique um diálogo intertextual ou interdiscursivo.'}
]};

AULAS[167] = { ill:'pena', slides:[
  {type:'capa', title:'Citação e paráfrase na argumentação', sub:'Usar vozes de autoridade com ética'},
  {type:'objetivos', items:['Usar citações e paráfrases para sustentar posições','Diferenciar citação direta e indireta','Referenciar fontes adequadamente','Integrar vozes ao próprio texto']},
  {type:'pergunta', q:'Citar um especialista garante que seu argumento está certo?', hint:'Pense em relevância e contexto da citação.', ill:'balao'},
  {type:'conceito', title:'Vozes como argumento', text:'Citações e paráfrases trazem **vozes de autoridade** que fortalecem a argumentação. Mas precisam ser **pertinentes**, **bem integradas** e **referenciadas**.', box:'A citação não substitui o argumento: ela o sustenta.', ill:'pena'},
  {type:'exemplos', title:'Formas', cards:[['Citação direta curta','Entre aspas, no corpo do texto'],['Citação indireta','Segundo X, ...'],['Paráfrase','Reformulação fiel da ideia'],['Referência','Autor, obra, ano']]},
  {type:'texto', title:'Leitura: parágrafo argumentativo', text:'A educação é condição para a cidadania plena. Nesse sentido, Paulo Freire defendia que ensinar exige respeito à autonomia do educando, ou seja, a escola deve formar sujeitos capazes de pensar por si. Assim, investir em educação crítica é investir em democracia.', source:'Texto criado para esta aula (paráfrase de ideia de Paulo Freire, "Pedagogia da Autonomia", 1996)', side:{h:'Analise', items:['A voz de Freire é citação ou paráfrase?','Como ela se liga à tese?','O que o autor acrescenta depois?']}},
  {type:'passos', title:'Integrando a citação', steps:[['Apresente','Quem é a voz'],['Cite ou parafraseie','Com fidelidade'],['Comente','Relacione à tese'],['Referencie','Autor e obra']]},
  {type:'comparacao', title:'Uso adequado x inadequado', left:{h:'Adequado', items:['Citação pertinente','Comentada e ligada à tese','Fonte indicada']}, right:{h:'Inadequado', items:['Citação solta','"Já dizia alguém..."','Frase de efeito sem relação']}},
  {type:'mapa', title:'Mapa mental', center:'VOZES NA ARGUMENTAÇÃO', nodes:[['Citação direta','Aspas'],['Indireta','Segundo...'],['Paráfrase','Reformulação'],['Pertinência','Relação com a tese'],['Comentário','Articulação'],['Referência','Ética']]},
  {type:'atividade', title:'Atividade 1: integre', instr:'Use a informação como argumento num período.', items:[{q:'Dado: a OMS recomenda 60 minutos diários de atividade física para adolescentes. Tese: a escola deve ampliar a educação física.', r:'Ex.: Segundo a OMS, adolescentes devem praticar 60 minutos diários de atividade física; por isso, ampliar as aulas de educação física é medida necessária.'}]},
  {type:'atividade', title:'Atividade 2: transforme', instr:'Transforme a citação direta em paráfrase.', items:[{q:'O filósofo afirma: "A dúvida é o princípio da sabedoria."', r:'Para o filósofo, questionar é o ponto de partida do conhecimento.'},{q:'A pesquisadora declarou: "As redes sociais intensificam a polarização."', r:'A pesquisadora sustenta que as redes aumentam a divisão de opiniões.'}]},
  {type:'quiz', q:'Uma citação bem usada deve ser...', opts:['pertinente e comentada','solta no texto','longa e sem fonte','inventada'], c:0, why:'Precisa sustentar a tese.'},
  {type:'quiz', q:'"Segundo o IBGE, ..." é exemplo de...', opts:['citação indireta','citação direta','plágio','epígrafe'], c:0, why:'Reporta sem aspas.'},
  {type:'quiz', q:'Após a citação, o autor deve...', opts:['comentar e relacionar à tese','mudar de assunto','repetir a citação','encerrar o texto'], c:0, why:'A articulação dá força ao argumento.'},
  {type:'gabarito'},
  {type:'resumo', items:['Citações e paráfrases sustentam argumentos.','Devem ser pertinentes e referenciadas.','Comentar a citação é essencial.','Paráfrase exige fidelidade.']},
  {type:'auto', items:['Uso citação direta e indireta.','Parafraseio com fidelidade.','Integro vozes à tese.','Referencio fontes.']},
  {type:'encerramento', casa:'Escreva um parágrafo argumentativo com uma citação de autoridade e um dado estatístico.'}
]};

AULAS[168] = { ill:'balanca', slides:[
  {type:'capa', title:'Texto dissertativo-argumentativo', sub:'Estrutura, tese e projeto de texto'},
  {type:'objetivos', items:['Compreender a estrutura do texto dissertativo-argumentativo','Formular tese e projeto de texto','Desenvolver argumentos com repertório','Concluir retomando a tese']},
  {type:'pergunta', q:'O que diferencia uma redação que convence de uma que só "enrola"?', hint:'Pense em tese clara e argumentos desenvolvidos.', ill:'balao'},
  {type:'conceito', title:'Dissertar argumentando', text:'O texto **dissertativo-argumentativo** defende um **ponto de vista** sobre um tema, com **argumentos fundamentados**, em linguagem formal e impessoal. É o gênero de muitos vestibulares e do Enem.', box:'Projeto de texto: planejamento que define tese, argumentos e conclusão antes de escrever.', ill:'balanca'},
  {type:'passos', title:'Estrutura', steps:[['Introdução','Contextualização + tese + anúncio dos argumentos'],['Desenvolvimento 1','Argumento 1 + repertório'],['Desenvolvimento 2','Argumento 2 + repertório'],['Conclusão','Retomada + proposta']]},
  {type:'exemplos', title:'Repertório sociocultural', cards:[['Dados','IBGE, OMS, UNICEF'],['Leis','Constituição, ECA, LDB'],['Filosofia e sociologia','Conceitos de pensadores'],['Arte e história','Obras, fatos históricos']]},
  {type:'texto', title:'Leitura: introdução modelo', text:'A Constituição Federal de 1988 assegura a todos o direito à educação. Entretanto, no Brasil contemporâneo, a evasão escolar ainda compromete esse direito, sobretudo entre jovens de baixa renda. Tal cenário decorre tanto da necessidade precoce de trabalhar quanto da falta de políticas de permanência estudantil.', source:'Texto criado para esta aula', side:{h:'Identifique', items:['O repertório de abertura','A tese','Os dois argumentos anunciados']}},
  {type:'comparacao', title:'Tese clara x tese vaga', left:{h:'Clara', items:['"A evasão decorre da necessidade de trabalhar e da falta de políticas de permanência."','Delimita os argumentos']}, right:{h:'Vaga', items:['"A evasão é um problema muito sério."','Não diz por quê']}},
  {type:'mapa', title:'Mapa mental', center:'DISSERTAÇÃO', nodes:[['Tese','Ponto de vista'],['Projeto','Planejamento'],['Argumentos','Desenvolvidos'],['Repertório','Legitimado e pertinente'],['Coesão','Conectivos'],['Conclusão','Retomada e proposta']]},
  {type:'atividade', title:'Atividade 1: formule teses', instr:'Escreva uma tese com dois argumentos.', items:[{q:'Tema: desafios da mobilidade urbana', r:'Ex.: A mobilidade urbana é comprometida pela priorização do transporte individual e pela precariedade do transporte coletivo.'},{q:'Tema: saúde mental dos jovens', r:'Ex.: O adoecimento mental juvenil relaciona-se à pressão por desempenho e ao uso excessivo das redes sociais.'}]},
  {type:'desafio', title:'Desafio: projeto de texto', text:'Elabore o projeto de texto completo para o tema "Desafios da inclusão digital no Brasil".', items:['Tese com dois argumentos','Um repertório para cada argumento','Ideia de conclusão','Conectivos entre parágrafos'], ill:'pena'},
  {type:'quiz', q:'A tese deve aparecer preferencialmente na...', opts:['introdução','conclusão apenas','assinatura','legenda'], c:0, why:'Orienta o leitor desde o início.'},
  {type:'quiz', q:'Repertório sociocultural é...', opts:['conhecimento externo usado para fundamentar argumentos','opinião sem base','repetição do tema','título da redação'], c:0, why:'Legitima a argumentação.'},
  {type:'quiz', q:'A linguagem do texto dissertativo-argumentativo deve ser...', opts:['formal e impessoal','cheia de gírias','em versos','em 1ª pessoa com desabafos'], c:0, why:'É gênero formal.'},
  {type:'gabarito'},
  {type:'resumo', items:['Tese clara orienta todo o texto.','Projeto de texto antecede a escrita.','Argumentos precisam de repertório.','Conclusão retoma a tese.']},
  {type:'auto', items:['Formulo teses claras.','Planejo o texto.','Desenvolvo argumentos.','Concluo com coerência.']},
  {type:'encerramento', casa:'Escreva a introdução completa a partir do seu projeto de texto.'}
]};

AULAS[169] = { ill:'livro', slides:[
  {type:'capa', title:'Gramática normativa e gramáticas de uso', sub:'Norma, uso e reflexão linguística'},
  {type:'objetivos', items:['Diferenciar gramática normativa, descritiva e de uso','Comparar prescrições tradicionais e usos reais','Compreender por que a norma-padrão existe','Refletir sobre adequação linguística']},
  {type:'pergunta', q:'Se quase todo brasileiro diz "Me dá um copo d’água", por que a gramática tradicional prescreve "Dê-me"?', hint:'Pense em origem histórica e prestígio.', ill:'balao'},
  {type:'conceito', title:'Três olhares sobre a língua', text:'A **gramática normativa** prescreve o que é considerado "correto" segundo um padrão. A **descritiva** descreve como a língua é usada, sem julgar. As **gramáticas de uso** analisam a língua real em textos e situações.', box:'A norma-padrão é uma referência social, construída historicamente, não a "língua verdadeira".', ill:'livro'},
  {type:'comparacao', title:'Prescrição x uso', left:{h:'Norma tradicional', items:['Dê-me o livro.','Assisti ao filme.','Haviam = inadequado']}, right:{h:'Uso brasileiro frequente', items:['Me dá o livro.','Assisti o filme.','Tinha muita gente.']}},
  {type:'exemplos', title:'Por que existe a norma-padrão?', cards:[['Unidade','Comunicação ampla e oficial'],['Prestígio histórico','Ligada a grupos de poder'],['Documentos e leis','Exigência de precisão'],['Acesso','Direito de todos dominá-la']]},
  {type:'texto', title:'Leitura: reflexão', text:'O linguista não condena "a gente vamos" nem "nós vai": registra que essas formas existem e têm regras próprias. O professor, por sua vez, ensina a norma-padrão não para apagar a variedade do aluno, mas para ampliar seu repertório e garantir acesso a espaços sociais que a exigem.', source:'Texto criado para esta aula', side:{h:'Reflita', items:['Qual é o papel do linguista?','E o do professor?','Por que dominar a norma é um direito?']}},
  {type:'passos', title:'Adequação', steps:[['Situação','Formal ou informal?'],['Interlocutor','Quem vai ler/ouvir?'],['Gênero','Que registro exige?'],['Escolha','Forma adequada']]},
  {type:'mapa', title:'Mapa mental', center:'GRAMÁTICAS', nodes:[['Normativa','Prescreve'],['Descritiva','Descreve'],['De uso','Analisa textos reais'],['Norma-padrão','Referência social'],['Variação','Natural'],['Adequação','Critério central']]},
  {type:'atividade', title:'Atividade 1: compare', instr:'Indique a forma da norma-padrão e a forma frequente no uso.', items:[{q:'Colocação pronominal no início da frase (pedir algo)', r:'Padrão: Empreste-me. / Uso: Me empresta.'},{q:'Verbo haver = existir no plural', r:'Padrão: Havia muitos alunos. / Uso: Tinha muitos alunos.'},{q:'Regência de "ir"', r:'Padrão: Vou ao cinema. / Uso: Vou no cinema.'}]},
  {type:'desafio', title:'Desafio: debate', text:'Debatam: "A escola deve ensinar só a norma-padrão?"', items:['Usem argumentos da aula','Considerem variação e acesso','Respeitem turnos','Registrem as conclusões'], ill:'megafone'},
  {type:'quiz', q:'A gramática descritiva...', opts:['descreve a língua sem julgar','prescreve regras','proíbe variações','ensina caligrafia'], c:0, why:'Descreve usos reais.'},
  {type:'quiz', q:'A norma-padrão deve ser ensinada principalmente porque...', opts:['é a única língua verdadeira','amplia o repertório e o acesso social','elimina sotaques','proíbe gírias'], c:1, why:'É um direito e uma ferramenta.'},
  {type:'quiz', q:'O critério mais adequado para avaliar usos linguísticos é...', opts:['adequação ao contexto','certo/errado absoluto','número de palavras','velocidade de fala'], c:0, why:'Depende da situação.'},
  {type:'gabarito'},
  {type:'resumo', items:['Normativa prescreve; descritiva descreve.','Gramáticas de uso analisam textos reais.','Norma-padrão é referência social e histórica.','Adequação é o critério central.']},
  {type:'auto', items:['Diferencio as gramáticas.','Comparo norma e uso.','Explico a função da norma-padrão.','Adequo minha linguagem.']},
  {type:'encerramento', casa:'Observe uma conversa e anote 3 usos que diferem da norma-padrão, explicando-os sem julgamento.'}
]};

AULAS[170] = { ill:'balanca', slides:[
  {type:'capa', title:'Marcas do enunciador', sub:'Modalização e impessoalização'},
  {type:'objetivos', items:['Identificar marcas da posição do enunciador','Analisar modalizações','Reconhecer estratégias de impessoalização','Usar esses recursos com intenção']},
  {type:'pergunta', q:'Por que artigos científicos usam "observou-se" em vez de "eu observei"?', hint:'Pense em objetividade e credibilidade.', ill:'balao'},
  {type:'conceito', title:'O enunciador no texto', text:'Todo texto revela, em maior ou menor grau, a **posição de quem fala**. A **modalização** expressa certeza, dúvida, obrigação ou avaliação. A **impessoalização** apaga o enunciador para criar efeito de **objetividade**.', box:'Impessoalizar não é ser neutro: é uma estratégia de apresentação.', ill:'balanca'},
  {type:'exemplos', title:'Estratégias de impessoalização', cards:[['Voz passiva','Foram coletados dados...'],['Índice de indeterminação','Acredita-se que...'],['3ª pessoa','O estudo demonstra...'],['Nominalização','A análise dos resultados...']]},
  {type:'exemplos', title:'Modalização', cards:[['Epistêmica','É provável que..., certamente'],['Deôntica','É necessário, deve-se'],['Apreciativa','Infelizmente, é lamentável'],['Atenuação','Parece que, talvez']]},
  {type:'texto', title:'Leitura: dois trechos', text:'A (relatório): "Constatou-se que 40% dos estudantes não têm acesso regular à internet. É necessário ampliar políticas de conexão."\nB (blog pessoal): "Eu fiquei chocada: quase metade dos meus colegas não tem internet! Isso é um absurdo."', source:'Textos criados para esta aula', side:{h:'Compare', items:['Que marcas apagam o enunciador em A?','Que marcas o revelam em B?','Que modalização há em cada um?']}},
  {type:'comparacao', title:'Efeitos', left:{h:'Impessoalização', items:['Efeito de objetividade','Gêneros científicos e jurídicos']}, right:{h:'Pessoalização', items:['Efeito de envolvimento','Crônicas, blogs, depoimentos']}},
  {type:'mapa', title:'Mapa mental', center:'ENUNCIADOR', nodes:[['Modalização','Atitude'],['Epistêmica','Certeza'],['Deôntica','Obrigação'],['Apreciativa','Avaliação'],['Impessoalização','Apagamento'],['Efeito','Objetividade']]},
  {type:'atividade', title:'Atividade 1: impessoalize', instr:'Reescreva com efeito de objetividade.', items:[{q:'Eu acho que a medida vai funcionar.', r:'Acredita-se que a medida será eficaz.'},{q:'Nós analisamos os dados e percebemos falhas.', r:'Os dados foram analisados, e foram identificadas falhas.'}]},
  {type:'atividade', title:'Atividade 2: classifique', instr:'Que tipo de modalização?', items:[{q:'Deve-se respeitar o prazo.', r:'Deôntica (obrigação)'},{q:'Possivelmente, haverá atrasos.', r:'Epistêmica (possibilidade)'},{q:'Lamentavelmente, o projeto foi cancelado.', r:'Apreciativa'}]},
  {type:'quiz', q:'"Constatou-se que..." é estratégia de...', opts:['impessoalização','pessoalização','ironia','metáfora'], c:0, why:'Apaga o sujeito que constatou.'},
  {type:'quiz', q:'Modalização deôntica expressa...', opts:['obrigação ou permissão','certeza','tempo','lugar'], c:0, why:'Dever, ser necessário.'},
  {type:'quiz', q:'A impessoalização gera efeito de...', opts:['objetividade','intimidade','humor','confusão'], c:0, why:'O texto parece neutro.'},
  {type:'gabarito'},
  {type:'resumo', items:['Todo texto revela uma posição.','Modalização: certeza, obrigação, avaliação.','Impessoalização cria efeito de objetividade.','Escolhas dependem do gênero.']},
  {type:'auto', items:['Identifico marcas do enunciador.','Classifico modalizações.','Uso impessoalização.','Adequo ao gênero.']},
  {type:'encerramento', casa:'Transforme um parágrafo de opinião pessoal em parágrafo impessoal de relatório.'}
]};

AULAS[171] = { ill:'lampada', slides:[
  {type:'capa', title:'Escolhas lexicais', sub:'Palavras, ordem e efeitos de sentido'},
  {type:'objetivos', items:['Analisar efeitos de sentido de escolhas lexicais','Perceber a carga ideológica das palavras','Analisar a ordem dos elementos na frase','Escolher palavras com consciência']},
  {type:'pergunta', q:'"Invasão" ou "ocupação"? "Gasto" ou "investimento"? A escolha muda o sentido?', hint:'Pense em quem usa cada palavra.', ill:'balao'},
  {type:'conceito', title:'Palavras não são neutras', text:'A escolha de **palavras** e a **ordem** em que aparecem revelam pontos de vista e produzem efeitos: valorização, depreciação, atenuação, ênfase.', box:'Denotação: sentido literal. Conotação: sentidos associados, afetivos ou ideológicos.', ill:'lampada'},
  {type:'exemplos', title:'Pares e seus efeitos', cards:[['Gasto x investimento','Negativo x positivo'],['Morador de rua x pessoa em situação de rua','Rótulo x condição temporária'],['Rebelião x protesto','Desordem x reivindicação'],['Velho x idoso','Informal/pejorativo x respeitoso']]},
  {type:'comparacao', title:'Ordem e destaque', left:{h:'Ordem A', items:['"O time perdeu, mas jogou bem."','Destaque: jogou bem']}, right:{h:'Ordem B', items:['"O time jogou bem, mas perdeu."','Destaque: perdeu']}},
  {type:'texto', title:'Leitura: duas manchetes', text:'1. "Governo gasta R$ 2 bilhões com programa de merenda"\n2. "Governo investe R$ 2 bilhões em alimentação escolar"', source:'Manchetes criadas para esta aula', side:{h:'Analise', items:['Que palavra muda a avaliação?','Que imagem cada manchete cria?','Qual parece mais crítica?']}},
  {type:'passos', title:'Analisando escolhas', steps:[['Identifique palavras-chave','Verbos, adjetivos'],['Busque alternativas','Sinônimos possíveis'],['Compare efeitos','Positivo, negativo'],['Interprete','Que ponto de vista?']]},
  {type:'mapa', title:'Mapa mental', center:'ESCOLHAS LEXICAIS', nodes:[['Denotação','Literal'],['Conotação','Associações'],['Carga ideológica','Ponto de vista'],['Ordem','Destaque'],['Eufemismo','Atenuação'],['Consciência','Escolha crítica']]},
  {type:'atividade', title:'Atividade 1: reescreva', instr:'Reescreva com efeito oposto (valorizar/depreciar).', items:[{q:'O jogador é teimoso.', r:'Ex.: O jogador é determinado.'},{q:'A cidade é barulhenta.', r:'Ex.: A cidade é vibrante.'},{q:'Ela é econômica.', r:'Ex.: Ela é mesquinha.'}]},
  {type:'atividade', title:'Atividade 2: ordem', instr:'Inverta a ordem para mudar o destaque.', items:[{q:'O filme é longo, mas emocionante.', r:'O filme é emocionante, mas longo.'},{q:'O celular é caro, mas durável.', r:'O celular é durável, mas caro.'}]},
  {type:'quiz', q:'"Investimento" em vez de "gasto" produz efeito...', opts:['positivo','negativo','neutro absoluto','humorístico'], c:0, why:'Sugere retorno e benefício.'},
  {type:'quiz', q:'Conotação é...', opts:['sentido associado, afetivo ou ideológico','sentido de dicionário apenas','erro ortográfico','pontuação'], c:0, why:'Vai além do literal.'},
  {type:'quiz', q:'Em "Perdeu, mas jogou bem", o destaque recai sobre...', opts:['ter jogado bem','ter perdido','nenhum','o técnico'], c:0, why:'A ideia após o MAS ganha força.'},
  {type:'gabarito'},
  {type:'resumo', items:['Palavras carregam pontos de vista.','Conotação vai além do literal.','A ordem cria destaque.','Escolher palavras é escolher sentidos.']},
  {type:'auto', items:['Analiso escolhas lexicais.','Percebo carga ideológica.','Uso a ordem para destacar.','Escolho palavras conscientemente.']},
  {type:'encerramento', casa:'Compare duas manchetes sobre o mesmo fato e analise as escolhas de palavras.'}
]};

AULAS[172] = { ill:'musica', slides:[
  {type:'capa', title:'Trovadorismo', sub:'As origens da literatura em língua portuguesa'},
  {type:'objetivos', items:['Situar o Trovadorismo no contexto medieval','Diferenciar cantigas líricas e satíricas','Reconhecer características das cantigas de amor e de amigo','Relacionar o Trovadorismo a manifestações atuais']},
  {type:'pergunta', q:'Existem músicas atuais que falam de amor não correspondido ou que zombam de alguém?', hint:'Pense em sofrência e em músicas de deboche.', ill:'balao'},
  {type:'conceito', title:'Contexto', text:'O **Trovadorismo** (séculos XII a XIV) é a primeira manifestação literária em **galego-português**. Os poemas, chamados **cantigas**, eram feitos para ser **cantados** com instrumentos, nas cortes medievais, por trovadores e jograis.', box:'Marco inicial: a "Cantiga da Ribeirinha" (c. 1189-1198), atribuída a Paio Soares de Taveirós.', ill:'musica'},
  {type:'exemplos', title:'Tipos de cantiga', cards:[['Cantiga de amor','Eu lírico masculino; amor cortês, sofrimento (coita)'],['Cantiga de amigo','Eu lírico feminino; saudade do amado (amigo)'],['Cantiga de escárnio','Crítica indireta, com ironia'],['Cantiga de maldizer','Crítica direta, com ofensas e nomes']]},
  {type:'texto', title:'Leitura: cantiga de amigo', text:'"Ondas do mar de Vigo,\nse vistes meu amigo!\nE ai Deus, se verrá cedo!"', source:'Martim Codax, séc. XIII (domínio público)', side:{h:'Analise', items:['Quem fala no poema?','Com quem ela conversa?','Que sentimento expressa?']}},
  {type:'comparacao', title:'Amor x amigo', left:{h:'Cantiga de amor', items:['Eu lírico masculino','Dama idealizada e inacessível','Ambiente da corte']}, right:{h:'Cantiga de amigo', items:['Eu lírico feminino (escrito por homens)','Saudade do namorado','Ambiente rural, natureza']}},
  {type:'passos', title:'Contexto medieval', steps:[['Feudalismo','Relação suserano-vassalo'],['Teocentrismo','Deus no centro'],['Vassalagem amorosa','Amante serve à dama'],['Oralidade','Poesia cantada']]},
  {type:'mapa', title:'Mapa mental', center:'TROVADORISMO', nodes:[['Séc. XII-XIV','Idade Média'],['Galego-português','Língua'],['Cantigas líricas','Amor e amigo'],['Cantigas satíricas','Escárnio e maldizer'],['Coita','Sofrimento amoroso'],['Refrão','Paralelismo']]},
  {type:'atividade', title:'Atividade 1: classifique', instr:'Que tipo de cantiga?', items:[{q:'Eu lírico feminino lamenta a ausência do namorado que foi para a guerra.', r:'Cantiga de amigo'},{q:'Trovador sofre por uma dama nobre que não o corresponde.', r:'Cantiga de amor'},{q:'Poema critica alguém com ironia, sem citar o nome.', r:'Cantiga de escárnio'}]},
  {type:'desafio', title:'Desafio: cantigas de hoje', text:'Relacione uma música atual a um tipo de cantiga trovadoresca.', items:['Escolha a música','Identifique o eu lírico','Aponte o sentimento ou a crítica','Compare com as características estudadas'], ill:'musica'},
  {type:'quiz', q:'As cantigas eram feitas para ser...', opts:['cantadas','lidas em silêncio','encenadas no cinema','publicadas em jornais'], c:0, why:'Poesia ligada à música.'},
  {type:'quiz', q:'Na cantiga de amigo, o eu lírico é...', opts:['feminino','masculino','um animal','Deus'], c:0, why:'Uma mulher fala do amigo (namorado).'},
  {type:'quiz', q:'"Coita" significa...', opts:['sofrimento amoroso','alegria','guerra','viagem'], c:0, why:'Dor de amor.'},
  {type:'gabarito'},
  {type:'resumo', items:['Trovadorismo: séc. XII a XIV.','Cantigas líricas: amor e amigo.','Cantigas satíricas: escárnio e maldizer.','Poesia cantada, ligada à corte e ao feudalismo.']},
  {type:'auto', items:['Situo o Trovadorismo.','Diferencio tipos de cantiga.','Analiso o eu lírico.','Relaciono com o presente.']},
  {type:'encerramento', casa:'Pesquise outra cantiga de amigo e identifique o refrão e o paralelismo.'}
]};

AULAS[173] = { ill:'globo', slides:[
  {type:'capa', title:'Quinhentismo', sub:'Literatura de informação e de catequese'},
  {type:'objetivos', items:['Situar o Quinhentismo no contexto da colonização','Analisar a Carta de Pero Vaz de Caminha','Reconhecer a literatura de catequese','Ler criticamente o olhar europeu sobre o Brasil']},
  {type:'pergunta', q:'Como os povos indígenas eram descritos pelos europeus em 1500? Quem tinha o poder de escrever essa história?', hint:'Pense no ponto de vista.', ill:'balao'},
  {type:'conceito', title:'Contexto', text:'O **Quinhentismo** reúne textos produzidos no Brasil no **século XVI**. Divide-se em **literatura de informação** (relatos de viajantes) e **literatura de catequese** (textos jesuítas para converter os indígenas).', box:'Marco: Carta de Pero Vaz de Caminha ao rei D. Manuel (1500).', ill:'globo'},
  {type:'exemplos', title:'Duas vertentes', cards:[['Informação','Carta de Caminha, tratados de Gândavo'],['Finalidade','Descrever a terra e suas riquezas à Coroa'],['Catequese','Autos e poemas de José de Anchieta'],['Finalidade','Converter os indígenas ao catolicismo']]},
  {type:'texto', title:'Leitura: Carta de Caminha (trecho)', text:'"Eram pardos, todos nus, sem coisa alguma que lhes cobrisse suas vergonhas. Nas mãos traziam arcos com suas setas. [...] Esta terra, Senhor, [...] em tal maneira é graciosa que, querendo-a aproveitar, dar-se-á nela tudo."', source:'Pero Vaz de Caminha, Carta a El-Rei D. Manuel, 1500 (domínio público; ortografia atualizada)', side:{h:'Analise', items:['Como os indígenas são descritos?','Que interesse revela "dar-se-á nela tudo"?','Que ponto de vista predomina?']}},
  {type:'comparacao', title:'Olhar europeu x leitura crítica', left:{h:'Olhar europeu', items:['Terra a ser explorada','Indígenas como "sem fé, sem lei"','Visão eurocêntrica']}, right:{h:'Leitura crítica hoje', items:['Povos com culturas próprias','Invasão e violência','Vozes indígenas silenciadas']}},
  {type:'passos', title:'Lendo textos coloniais', steps:[['Quem escreve?','Lugar social'],['Para quem?','Rei, Igreja'],['Com que interesse?','Exploração, conversão'],['O que fica de fora?','Vozes silenciadas']]},
  {type:'mapa', title:'Mapa mental', center:'QUINHENTISMO', nodes:[['Séc. XVI','Colonização'],['Informação','Relatos'],['Caminha','Carta de 1500'],['Catequese','Jesuítas'],['Anchieta','Autos e poemas'],['Eurocentrismo','Leitura crítica']]},
  {type:'atividade', title:'Atividade 1: análise', instr:'Responda sobre o trecho da Carta.', items:[{q:'Que aspectos físicos dos indígenas Caminha destaca?', r:'A cor ("pardos"), a nudez e as armas (arcos e setas)'},{q:'Como a terra é avaliada?', r:'Como fértil e graciosa, pronta para ser aproveitada'},{q:'Que interesse da Coroa o texto revela?', r:'O interesse econômico na exploração da terra'}]},
  {type:'desafio', title:'Desafio: outras vozes', text:'Pesquise um autor ou autora indígena contemporâneo(a) e compare sua visão com a de Caminha.', items:['Escolha um texto ou fala','Identifique o ponto de vista','Compare com a Carta','Apresente em um parágrafo'], ill:'livro'},
  {type:'quiz', q:'A literatura de informação tinha como objetivo...', opts:['descrever a terra para a Coroa','converter os indígenas','entreter o público','criticar a Igreja'], c:0, why:'Relatos para Portugal.'},
  {type:'quiz', q:'José de Anchieta é associado à literatura de...', opts:['catequese','informação','escárnio','vanguarda'], c:0, why:'Jesuíta que escreveu autos e poemas.'},
  {type:'quiz', q:'Uma leitura crítica da Carta de Caminha considera...', opts:['o ponto de vista eurocêntrico','apenas a ortografia','que tudo é verdade absoluta','que não há interesses'], c:0, why:'Reconhece o lugar de quem escreve.'},
  {type:'gabarito'},
  {type:'resumo', items:['Quinhentismo: textos do século XVI.','Informação: relatos para a Coroa.','Catequese: textos jesuítas.','Leitura crítica revela o eurocentrismo.']},
  {type:'auto', items:['Situo o Quinhentismo.','Analiso a Carta de Caminha.','Diferencio informação e catequese.','Leio com olhar crítico.']},
  {type:'encerramento', casa:'Leia outro trecho da Carta de Caminha e identifique um interesse econômico ou religioso.'}
]};

AULAS[174] = { ill:'pena', slides:[
  {type:'capa', title:'Barroco', sub:'Conflito, contraste e rebuscamento'},
  {type:'objetivos', items:['Situar o Barroco no contexto do século XVII','Reconhecer o dualismo e a linguagem rebuscada','Diferenciar cultismo e conceptismo','Analisar textos de Gregório de Matos e Padre Antônio Vieira']},
  {type:'pergunta', q:'Você já se sentiu dividido entre fazer o que quer e o que acha certo?', hint:'Esse conflito é central no Barroco.', ill:'balao'},
  {type:'conceito', title:'O homem dividido', text:'O **Barroco** (séc. XVII) expressa o **conflito** entre o **teocentrismo** medieval e o **antropocentrismo** renascentista, intensificado pela **Contrarreforma**. O resultado é uma arte de contrastes: fé x prazer, eterno x efêmero, céu x terra.', box:'No Brasil: Gregório de Matos (poesia) e Padre Antônio Vieira (sermões).', ill:'pena'},
  {type:'comparacao', title:'Cultismo x conceptismo', left:{h:'Cultismo (gongorismo)', items:['Jogo de palavras e imagens','Linguagem rebuscada','Metáforas, hipérbatos']}, right:{h:'Conceptismo (quevedismo)', items:['Jogo de ideias','Raciocínio lógico','Sermões de Vieira']}},
  {type:'exemplos', title:'Figuras barrocas', cards:[['Antítese','luz / sombra'],['Paradoxo','"Ardor em firme coração nascido"'],['Hipérbato','Inversão da ordem direta'],['Carpe diem','Aproveitar o tempo que passa']]},
  {type:'texto', title:'Leitura: Gregório de Matos', text:'"Nasce o Sol, e não dura mais que um dia,\nDepois da Luz se segue a noite escura,\nEm tristes sombras morre a formosura,\nEm contínuas tristezas a alegria."', source:'Gregório de Matos, séc. XVII (domínio público)', side:{h:'Analise', items:['Que antíteses aparecem?','Que reflexão sobre o tempo há?','Que visão da vida o poema expressa?']}},
  {type:'passos', title:'Lendo um poema barroco', steps:[['Ache os contrastes','Antíteses, paradoxos'],['Reordene','Desfaça os hipérbatos'],['Tema','Tempo, fé, pecado'],['Contexto','Contrarreforma']]},
  {type:'mapa', title:'Mapa mental', center:'BARROCO', nodes:[['Séc. XVII','Contrarreforma'],['Dualismo','Fé x prazer'],['Cultismo','Palavras'],['Conceptismo','Ideias'],['Gregório de Matos','"Boca do Inferno"'],['Vieira','Sermões']]},
  {type:'atividade', title:'Atividade 1: interpretação', instr:'Responda sobre o poema.', items:[{q:'Que pares de opostos aparecem?', r:'Sol/noite, luz/sombra, alegria/tristeza'},{q:'Qual o tema central?', r:'A brevidade e instabilidade da vida e da beleza'},{q:'Por que o poema é barroco?', r:'Usa antíteses e reflete sobre a efemeridade, típicas do Barroco'}]},
  {type:'atividade', title:'Atividade 2: ordem direta', instr:'Reescreva na ordem direta.', items:[{q:'"Em tristes sombras morre a formosura"', r:'A formosura morre em tristes sombras.'},{q:'"Depois da Luz se segue a noite escura"', r:'A noite escura se segue depois da luz.'}]},
  {type:'quiz', q:'O dualismo barroco opõe...', opts:['fé e prazer','prosa e verso','campo e cidade apenas','rima e métrica'], c:0, why:'Conflito espiritual e material.'},
  {type:'quiz', q:'O conceptismo valoriza...', opts:['o jogo de ideias e o raciocínio','apenas a sonoridade','o verso livre','a linguagem coloquial'], c:0, why:'Típico dos sermões de Vieira.'},
  {type:'quiz', q:'Gregório de Matos ficou conhecido como...', opts:['Boca do Inferno','Poeta dos Escravos','Bruxo do Cosme Velho','Príncipe dos Poetas'], c:0, why:'Pela sátira mordaz.'},
  {type:'gabarito'},
  {type:'resumo', items:['Barroco: séc. XVII, Contrarreforma.','Conflito entre fé e prazer.','Cultismo e conceptismo.','Gregório de Matos e Vieira no Brasil.']},
  {type:'auto', items:['Situo o Barroco.','Reconheço antíteses e paradoxos.','Diferencio cultismo e conceptismo.','Analiso poemas barrocos.']},
  {type:'encerramento', casa:'Leia um trecho do "Sermão da Sexagésima" de Vieira e identifique um jogo de ideias.'}
]};

AULAS[175] = { ill:'pena', slides:[
  {type:'capa', title:'Arcadismo', sub:'Simplicidade, natureza e razão'},
  {type:'objetivos', items:['Situar o Arcadismo no contexto do Iluminismo','Reconhecer o bucolismo e o pastoralismo','Identificar lemas árcades','Relacionar o Arcadismo à Inconfidência Mineira']},
  {type:'pergunta', q:'Por que tantas pessoas sonham em largar a cidade e viver no campo?', hint:'Pense em simplicidade e tranquilidade.', ill:'balao'},
  {type:'conceito', title:'Contexto', text:'O **Arcadismo** (séc. XVIII) reage ao exagero barroco, propondo **simplicidade**, **equilíbrio** e **razão**, sob influência do **Iluminismo**. Os poetas adotam pseudônimos de pastores e idealizam a vida no campo.', box:'Marco no Brasil: "Obras", de Cláudio Manuel da Costa (1768).', ill:'pena'},
  {type:'exemplos', title:'Lemas árcades', cards:[['Fugere urbem','Fugir da cidade'],['Locus amoenus','Lugar ameno, natureza agradável'],['Carpe diem','Aproveitar o dia'],['Aurea mediocritas','Vida simples e equilibrada']]},
  {type:'texto', title:'Leitura: Tomás Antônio Gonzaga', text:'"Eu, Marília, não sou algum vaqueiro,\nQue viva de guardar alheio gado;\nDe tosco trato, de expressões grosseiro,\nDos frios gelos e dos sóis queimado."', source:'Tomás Antônio Gonzaga, "Marília de Dirceu", 1792 (domínio público)', side:{h:'Analise', items:['Quem fala e com quem?','Que imagem de pastor aparece?','Que traço árcade se nota?']}},
  {type:'comparacao', title:'Barroco x Arcadismo', left:{h:'Barroco', items:['Conflito e rebuscamento','Fé x prazer','Linguagem complexa']}, right:{h:'Arcadismo', items:['Equilíbrio e simplicidade','Natureza idealizada','Linguagem clara']}},
  {type:'passos', title:'Arcadismo e Inconfidência', steps:[['Minas Gerais','Ciclo do ouro'],['Poetas árcades','Gonzaga, Cláudio Manuel'],['Inconfidência','Movimento de 1789'],['Consequência','Prisão e exílio']]},
  {type:'mapa', title:'Mapa mental', center:'ARCADISMO', nodes:[['Séc. XVIII','Iluminismo'],['Bucolismo','Campo idealizado'],['Pseudônimos','Pastores'],['Lemas latinos','Fugere urbem...'],['Gonzaga','Marília de Dirceu'],['Inconfidência','Contexto político']]},
  {type:'atividade', title:'Atividade 1: lemas', instr:'Associe o trecho ao lema árcade.', items:[{q:'Elogio de um riacho cristalino e da sombra das árvores.', r:'Locus amoenus'},{q:'Convite para aproveitar a juventude antes que passe.', r:'Carpe diem'},{q:'Desejo de deixar a corte e viver no campo.', r:'Fugere urbem'}]},
  {type:'desafio', title:'Desafio: árcades de hoje', text:'Encontre na publicidade ou nas redes atuais uma imagem que retome o ideal árcade.', items:['Descreva a imagem ou o texto','Identifique o lema','Explique o efeito persuasivo','Compare com o Arcadismo'], ill:'celular'},
  {type:'quiz', q:'O Arcadismo valoriza...', opts:['simplicidade e natureza','rebuscamento e conflito','vida urbana agitada','temas sobrenaturais'], c:0, why:'Reação ao Barroco.'},
  {type:'quiz', q:'"Fugere urbem" significa...', opts:['fugir da cidade','aproveitar o dia','lugar ameno','morrer jovem'], c:0, why:'Lema da vida no campo.'},
  {type:'quiz', q:'Tomás Antônio Gonzaga participou da...', opts:['Inconfidência Mineira','Semana de Arte Moderna','Revolta da Vacina','Proclamação da República'], c:0, why:'Foi preso e exilado por isso.'},
  {type:'gabarito'},
  {type:'resumo', items:['Arcadismo: séc. XVIII, Iluminismo.','Simplicidade e natureza idealizada.','Lemas latinos e pseudônimos pastoris.','Ligação com a Inconfidência Mineira.']},
  {type:'auto', items:['Situo o Arcadismo.','Reconheço lemas árcades.','Comparo com o Barroco.','Analiso poemas de Gonzaga.']},
  {type:'encerramento', casa:'Leia outra lira de "Marília de Dirceu" e identifique um lema árcade.'}
]};
