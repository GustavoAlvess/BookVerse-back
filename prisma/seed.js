import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient, Categoria, Categoria_en } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.curiosidade.deleteMany();
    await prisma.simulado.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();

    const user1 = await prisma.usuario.create({
        data: {
            nome: 'Admin',
            email: 'admin@email.com',
            senha_hash: 'senha123',
        },
    });

    const user2 = await prisma.usuario.create({
        data: {
            nome: 'Estudante Teste',
            email: 'aluno@email.com',
            senha_hash: 'aluno123',
        },
    });

console.log('Iniciando seed da equipe...');
   const membroEquipe1 = await prisma.equipe.create({
       data: {
           nome: 'Breno Belmonte',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Eletroeletrônica',
           fotoURL: 'https://i.ibb.co/prJ4ZYD1/breno.png',
       },
   });

   const membroEquipe2 = await prisma.equipe.create({
       data: {
           nome: 'Felipe Campos',
           objetivo: 'Desenvolvedor back end, api, banco de dados e integração.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/q3szrgXf/campos.png',
       },
   });

   const membroEquipe3 = await prisma.equipe.create({
       data: {
           nome: 'Rafael Fahl',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Fabricação Mecânica',
           fotoURL: 'https://i.ibb.co/kV9gkmP8/fahl.png',
       },
   });

   const membroEquipe4 = await prisma.equipe.create({
       data: {
           nome: 'Melissa Freitas',
           objetivo: 'Desenvolvedora front-end.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/Q7SsfWWN/melissa.png',
       },
   });

   const membroEquipe5 = await prisma.equipe.create({
       data: {
           nome: 'Felipe Jardim',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Eletroeletrônica',
           fotoURL: 'https://i.ibb.co/G3fkn9Hm/jardim.png',
       },
   });

   const membroEquipe6 = await prisma.equipe.create({
       data: {
           nome: 'Gustavo Alves',
           objetivo: 'Desenvolvedor back end, api, banco de dados e integração.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/ynJJ1PKJ/alves.png',
       },
   });

   const membroEquipe7 = await prisma.equipe.create({
       data: {
           nome: 'Victor Barbosa',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Fabricação Mecânica',
           fotoURL: 'https://i.ibb.co/jkDr1P8F/victor.png',
       },
   });

   const membroEquipe8 = await prisma.equipe.create({
       data: {
           nome: 'Luana Follegati',
           objetivo: 'Desenvolvedora front-end.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/YVCqk9H/luana.png',
       },
   });

   const membroEquipe9 = await prisma.equipe.create({
       data: {
           nome: 'Heloísa Stefanini',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Eletroeletrônica',
           fotoURL: 'https://i.ibb.co/GhDz8nk/heloisa.png',
       },
   });

   const membroEquipe10 = await prisma.equipe.create({
       data: {
           nome: 'Isabela Duetes',
           objetivo: 'Desenvolvedora front-end.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/5g4G2t0b/duetes.png',
       },
   });

   const membroEquipe11 = await prisma.equipe.create({
       data: {
           nome: 'Maria Luiza',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Fabricação Mecânica',
           fotoURL: 'https://i.ibb.co/B2h7DvNY/maria.png',
       },
   });

   const membroEquipe12 = await prisma.equipe.create({
       data: {
           nome: 'Letícia Maria',
           objetivo: 'Desenvolvedora front-end.',
           curso: 'Desenvolvimento de Sistemas',
           fotoURL: 'https://i.ibb.co/yc9WSScY/leticia.png',
       },
   });

   const membroEquipe13 = await prisma.equipe.create({
       data: {
           nome: 'Ana Clara',
           objetivo:
               'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
           curso: 'Fabricação Mecânica',
           fotoURL: 'https://i.ibb.co/WW3hW1Sz/ana.png',
       },
   });

    const livro = await prisma.livro.create({
        data: {
            titulo: 'Vidas Secas',
            autor: 'Graciliano Ramos',
            genero_pt: 'Romance regionalista',
            genero_en: 'Regionalist novel',
            ano: 1938,
            movimento_pt: '“Vidas Secas” é um dos principais livros da segunda fase modernista, a do regionalismo.',
            movimento_en: '“Barren Lives” is one of the main books of the second modernist phase, that of regionalism.',
            descricao_pt: 'A seca não rouba apenas a água - rouba a voz, a esperança e a humanidade.',
            descricao_en: 'The drought does not only steal water - it steals the voice, hope, and humanity.',
            enredo_pt: 'Dividido em 13 capítulos que funcionam de forma quase independente, o livro acompanha a jornada cíclica e precária de Fabiano, Sinhá Vitória, seus dois filhos e a cachorra Baleia, que cruzam o sertão nordestino em busca de sobrevivência contra a seca extrema.',
            enredo_en: 'Divided into 13 chapters that work almost independently, the book follows the cyclical and precarious journey of Fabiano, Sinhá Vitória, their two sons, and the dog Baleia, crossing the Brazilian northeastern hinterland fleeing the extreme drought to survive.',
            contexto_historico_pt: 'Vidas Secas foi escrito em um período em que o Nordeste brasileiro sofria com secas constantes, pobreza extrema e falta de apoio do governo. A obra mostra a vida difícil dos retirantes sertanejos, que precisavam abandonar suas terras para fugir da fome e da miséria. Publicado na segunda fase do Modernismo, o livro apresenta forte crítica social, denunciando a exploração, a desigualdade e a desumanização das pessoas mais pobres.',
            contexto_historico_en: 'Vidas Secas (Barren Lives) was written during a period when the Brazilian Northeast was suffering from constant droughts, extreme poverty, and a lack of government support. The work depicts the difficult lives of the rural migrants, who had to abandon their lands to escape hunger and misery. Published in the second phase of Modernism, the book presents a strong social critique, denouncing the exploitation, inequality, and dehumanization of the poorest people.',
            detalhes_autor_pt: 'Nasceu em Alagoas (1892 - 1953). Figura central do Modernismo, o autor é famoso por obras como Vidas Secas (1938) e São Bernardo (1934)',
            detalhes_autor_en: 'He was born in Alagoas (1892–1953). A central figure in Brazilian Modernism, the author is famous for having written works like Barren Lives (1938) and São Bernardo (1934).',
            estilo_escrita_pt: 'Texto conciso e linguagem objetiva, direta, concisa e realista',
            estilo_escrita_en: 'Concise, direct, and realistic language',
            verossimilhanca_pt: 'A verossimilhança é a sensação de realidade transmitida pela obra. Em Vidas Secas, isso aparece porque: os problemas mostrados realmente existiam no sertão; os personagens agem de forma humana e natural; a seca e a pobreza são descritas de maneira realista; a linguagem combina com a condição social dos personagens.',
            verossimilhanca_en: 'Verisimilitude is the sensation of reality transmitted by the work. In Vidas Secas, this appears because: the problems shown actually existed in the hinterland; the characters act in a human and natural way; the drought and poverty are described realistically; the language matches the characters social condition.',
            caracteristicas_literarias_pt: 'Regionalismo: Narrativa focada na realidade, cultura e miséria do Nordeste brasileiro. Realismo Social: Denúncia das desigualdades econômicas, exploração do trabalhador e descaso político.',
            caracteristicas_literarias_en: 'Regionalism: Narrative focused on the reality, culture and misery of the Brazilian Northeast. Social Realism: Denunciation of economic inequalities, worker exploitation and political neglect.',
            conclusao_pt: '“Vidas Secas” é um livro que retrata a vida dos nordestinos em uma época em que havia grandes dificuldades para a população, mas que infelizmente ainda é retratada nos dias de hoje. O livro é considerado importante para o entendimento e conhecimento da realidade do nordeste brasileiro, suas particularidades e desafios enfrentados através da história de Fabiano e sua família, incluindo fome e falta de oportunidades. Além disso, “Vidas Secas” é uma obra de arte literária que combina com a utilização de linguagem precisa e crítica da realidade brasileira em determinadas regiões. É um livro que deve ser lido e apreciado, devido sua história e qualidade literária.',
            conclusao_en: '“Barren Lives” is a work that illustrates the living conditions of citizens of the Northeastern region during a severe economic downturn. As a result, this area has continued to suffer, as that historical reality has yet to come to an end. The book provides an understanding of Brazil’s Northeast, with its special context, characteristics, and difficulties faced by the population of that area through the character of Fabiano and his family, including hunger and other aspects of daily problems related to opportunities. This literary piece is a classic as it has a creative use of words and a critical look at some aspects of the reality of parts of Brazil. Therefore, this book should not only be read, but also should be valued for its literature and storyline.',
            video_url: 'https://youtu.be/3shsFZRYfN0?si=6KiL63CHYpK1XEZW',
            capa_url: 'https://i.ibb.co/gLDPw5zZ/capa.jpg',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Fabiano',
            descricao_pt: 'Vaqueiro rude e lacônico. É o chefe da família dos retirantes. O nome do personagem já indica rusticidade e rudeza (o Dicionário Aurélio dá como sinônimos possíveis da palavra fabiano: "indivíduo inofensivo; pobre-diabo").',
            descricao_en: 'A rude and laconic cowboy. He is the head of the migrant family. His name indicates rusticity and roughness.',
            papel: 'Protagonista',
            imagem_url: 'https://i.ibb.co/PZ5DqbTZ/fabiano.png',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Sinhá Vitória',
            descricao_pt: 'Mulher de Fabiano. É um pouco mais dotada de conhecimentos do que o marido, pois ainda consegue, por meio de métodos rústicos, fazer contas. Humilde, seu maior sonho é ter uma cama igual à do Seu Tomás da Bolandeira.',
            descricao_en: 'Fabiano’s wife. Slightly more knowledgeable than her husband, capable of doing basic math. Her dream is to own a bed like Seu Tomás.',
            papel: 'Protagonista',
            imagem_url: 'https://i.ibb.co/dsVfKn30/sinha.png',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'O Menino Mais Velho',
            descricao_pt: 'Filho do casal. Por não ter o nome citado pelo narrador, o personagem acaba sendo caracterizado por causa dos pais. Essa falta de pessoalidade no tratamento é eloquente, pois batiza os garotos com a impessoalidade.',
            descricao_en: 'The older son. Lacks a proper name, which symbolizes the dehumanization and loss of identity caused by absolute poverty.',
            papel: 'Coadjuvante',
            imagem_url: 'https://i.ibb.co/BHwk3nTH/mais-Velho.png',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'O Menino Mais Novo',
            descricao_pt: 'Filho do casal. Assim como o irmão, não tem seu nome revelado, sendo marcado pela impessoalidade do meio precário em que vive, espelhando-se nas ações do pai.',
            descricao_en: 'The younger son. Also nameless, marked by the impersonality of his precarious environment, looking up to his father.',
            papel: 'Coadjuvante',
            imagem_url: 'https://i.ibb.co/zhc7kYss/mais-Novo.png',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Baleia',
            descricao_pt: 'Personagem curiosa. É a cadela da família, que, no meio de personagens animalizados - zoomorfizados -, acaba por sofrer o processo inverso, de humanização ou antropomorfização. Baleia, assim, demonstra um comportamento humano em muitas passagens, sobretudo no momento de sua morte.',
            descricao_en: 'The family dog. Amidst animalized humans, she undergoes anthropomorphization, showing deep human behavior and feelings, especially during her death scene.',
            papel: 'Protagonista',
            imagem_url: 'https://i.ibb.co/KtRVHt3/baleia.png',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Seu Tomás da Bolandeira',
            descricao_pt: 'Por votar e ser alfabetizado, é o modelo de erudição e de conhecimento dos demais personagens.',
            descricao_en: 'Since he can vote and read, he represents the ultimate model of erudition and knowledge to the other characters.',
            papel: 'Coadjuvante',
            imagem_url: '',
        },
    });

    await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'O Soldado Amarelo',
            descricao_pt: 'Antagonista mais direto de Fabiano, representa, assim como o fiscal da prefeitura e o dono da fazenda, a opressão do poder institucional.',
            descricao_en: 'Fabiano’s direct antagonist. He represents the abusive and institutional oppression of authorities over poor citizens.',
            papel: 'Antagonista',
            imagem_url: '',
        },
    });

    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Inspiração Real',
            titulo_en: 'Real Inspiration',
            conteudo_pt: 'Graciliano Ramos se inspirou em sua própria experiência de vida para escrever “Vidas Secas”, tendo nascido e crescido no sertão, onde a história se passa.',
            conteudo_en: 'Graciliano Ramos was inspired by his own life experience to write "Vidas Secas", having been born and raised in the hinterland, where the story takes place.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Uso de Pseudônimos',
            titulo_en: 'Use of Pseudonyms',
            conteudo_pt: 'Graciliano usava pseudônimos como Feliciano de Olivença, Soeiro Lobato, Soares de Almeida Cunha, Anastácio Anacleto e outros nas suas publicações em jornais e revistas.',
            conteudo_en: 'Graciliano used pseudonyms such as Feliciano de Olivença, Soeiro Lobato, Soares de Almeida Cunha, Anastácio Anacleto, and others in his publications in newspapers and magazines.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Premiação Internacional',
            titulo_en: 'International Award',
            conteudo_pt: 'Em 1962, Vidas Secas foi premiado pela fundação norte-americana William Faulkner como Livro Representativo da Literatura Brasileira Moderna.',
            conteudo_en: 'In 1962, Vidas Secas was awarded by the American William Faulkner Foundation as a Representative Book of Modern Brazilian Literature.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Clássico Traduzido',
            titulo_en: 'Translated Classic',
            conteudo_pt: 'O livro “Vidas Secas” foi traduzido para mais de 20 idiomas diferentes e é considerado um clássico da literatura mundial.',
            conteudo_en: 'The book “Barren Lives” has been translated into more than 20 different languages and is considered a classic of world literature.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Origem da Baleia',
            titulo_en: 'Origin of Baleia',
            conteudo_pt: 'O cachorro Baleia (personagem do livro), foi inspirado em um cachorro real que Graciliano Ramos teve em sua infância.',
            conteudo_en: 'The character dog Baleia was inspired by a real dog that Graciliano Ramos had during his childhood.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Os filhos não têm nomes',
            titulo_en: 'The children do not have names',
            conteudo_pt: 'Eles são chamados apenas de “Menino Mais Novo” e “Menino Mais Velho”. Isso mostra como a miséria acaba apagando a individualidade das pessoas.',
            conteudo_en: 'They are called only “Younger Boy” and “Older Boy.” This shows how poverty erases people’s individuality.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Adaptação famosa para o cinema',
            titulo_en: 'Famous film adaptation',
            conteudo_pt: 'O filme Vidas Secas foi lançado em 1963 por Nelson Pereira dos Santos e virou um clássico do Cinema Novo brasileiro.',
            conteudo_en: 'The movie Barren Lives (Vidas Secas) was released in 1963 by Nelson Pereira dos Santos and became a classic of the Brazilian Cinema Novo movement.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Começo e fim parecidos',
            titulo_en: 'The book begins and ends in a similar way',
            conteudo_pt: 'A família foge da seca no começo e também no final. Isso representa como a pobreza e o sofrimento parecem não ter fim no sertão.',
            conteudo_en: 'The family flees from the drought at the beginning and also at the end. This represents how poverty and suffering in the sertão seem endless.',
        },
    });

    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Redacao,
            categoria_en: Categoria_en.Writing,
            titulo_pt: 'Eixo: Desastres Climáticos Extremos',
            titulo_en: 'Theme: Extreme Climate Disasters',
            conteudo_pt: 'O livro pode ser utilizado pois a seca move a narrativa com a família fugindo da estiagem severa e inaungura o conceito de retirantes (refugiados climáticos). Enquanto no livro o desastre é a seca no semiárido, nas cidades atuais os desastres se manifestam em temporais e enchentes. Em ambos os casos, a vulnerabilidade social dita que os mais pobres são os menos estruturados para resistir aos extremos.',
            conteudo_en: 'The book can be used since the drought drives the narrative of fleeing the climate impacts. Today, this is known as climate refugees. In both past and current scenarios, social vulnerability defines that the poorest suffer the most.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Redacao,
            categoria_en: Categoria_en.Writing,
            titulo_pt: 'População infantil em situação de rua no Brasil',
            titulo_en: 'Children population living on the streets in Brazil',
            conteudo_pt: 'Os filhos de Fabiano e Sinhá Vitória não têm nomes no livro, são chamados apenas de "menino mais novo" e "menino mais velho". Eles não frequentam a escola, não possuem brinquedos e crescem em um ambiente de privação absoluta. A falta de perspectivas e a desestruturação familiar causadas pela miséria extrema como em Vidas Secas são a raiz histórica que empurra, hoje, crianças e adolescentes para as ruas das grandes cidades. O ciclo de negligência do Estado e a desumanização da infância começam exatamente ali, em um ambiente precarizado.',
            conteudo_en: 'Fabiano and Sinhá Vitória’s sons do not have names, they are called only "younger boy" and "older boy". They do not attend school and grow up in absolute deprivation. The lack of perspectives and family disruption caused by extreme misery are the historical roots that push children to the streets today. The cycle of State neglect begins precisely there.',
        },
    });

    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Dica 1: Cronograma Realista',
            titulo_en: 'Tip 1: Realistic Schedule',
            conteudo_pt: 'Crie um cronograma de estudos realista onde possa equilibrar lazer e educação.',
            conteudo_en: 'Create a realistic study schedule where you can balance leisure and education.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Dica 2: Leitura do Edital',
            titulo_en: 'Tip 2: Read the Notice',
            conteudo_pt: 'Leia o edital do vestibular para saber quais assuntos são mais comuns de cair na prova.',
            conteudo_en: 'Read the exam notice to find out which topics are most common to appear on the test.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Dica 3: Estudos em Grupo',
            titulo_en: 'Tip 3: Group Studies',
            conteudo_pt: 'Estude em grupo para possibilitar aprender com outras pessoas.',
            conteudo_en: 'Study in groups to enable learning from other people.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Dica 4: Explore Métodos',
            titulo_en: 'Tip 4: Explore Methods',
            conteudo_pt: 'Explore outras técnicas de estudo para saber qual melhor se aplica a você.',
            conteudo_en: 'Explore other study techniques to find out which one applies best to you.',
        },
    });
    await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Dica 5: Expansão de Repertório',
            titulo_en: 'Tip 5: Expand Background Knowledge',
            conteudo_pt: 'Consuma livros, filmes, jornais e todo outro tipo de entretenimento para ter repertório sobre diversos assuntos.',
            conteudo_en: 'Consume books, movies, newspapers, and all other types of entertainment to gain background knowledge on various subjects.',
        },
    });

    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '1. No livro Vidas Secas, a linguagem seca e econômica utilizada por Graciliano Ramos contribui principalmente para:',
            pergunta_en: '1. In the book, Vidas Secas, the language used by Graciliano Ramos contributes mainly for:',
            opcao_a: 'romantizar a vida no sertão nordestino.',
            opcao_b: 'enfatizar a dureza da existência das personagens.',
            opcao_c: 'valorizar o humor presente na narrativa.',
            opcao_d: 'destacar a superioridade intelectual dos retirantes.',
            opcao_a_en: 'make life in the Northeast countryside look beautiful and perfect.',
            opcao_b_en: 'show how hard the characters’ lives are.',
            opcao_c_en: 'show the humor in the story.',
            opcao_d_en: 'show that the migrants are very intelligent.',
            resposta_correta: 'b',
            explicacao_pt: 'A linguagem direta, curta e “seca” combina com a miséria, a fome e o sofrimento vividos pelas personagens retratados no livro.',
            explicacao_en: 'The direct language matches the misery, hunger, and suffering of the characters in the book.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '2. Um escritor classificou Vidas secas vista sua composição descontínua, feita de episódios relativamente independentes. Essas características da composição do livro:',
            pergunta_en: '2. A writer classified Vidas Secas by its discontinuous composition, made of relatively independent episodes. These features:',
            opcao_a: 'Constituem um traço de estilo típico dos romances de Graciliano Ramos e do Regionalismo nordestino.',
            opcao_b: 'Indicam que ele pertence à fase inicial de Graciliano Ramos, quando este ainda seguia os ditames do primeiro momento do Modernismo.',
            opcao_c: 'Diminuem o seu alcance expressivo, na medida em que dificultam uma visão adequada da realidade sertaneja.',
            opcao_d: 'Relacionam-se à visão limitada e fragmentária que as próprias personagens têm do mundo.',
            opcao_a_en: 'Are typical stylistic choices of Graciliano Ramos and Northeastern Regionalism.',
            opcao_b_en: 'Indicate that it belongs to Graciliano Ramos initial phase.',
            opcao_c_en: 'Decrease its expressive power by making the reality harder to see.',
            opcao_d_en: 'Relate to the limited and fragmented view that characters themselves have of the world.',
            resposta_correta: 'd',
            explicacao_pt: 'A estrutura fragmentada de Vidas Secas representa a visão limitada das personagens sobre o mundo, já que elas vivem em condições de miséria e dificuldade.',
            explicacao_en: 'The fragmented structure reflects the limited views that characters have due to poverty and lack of resources.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '3. Sobre o foco narrativo em Vidas Secas, é correto afirmar que:',
            pergunta_en: '3. About the point of view/narrative focus, it is correct confirm that:',
            opcao_a: 'a narrativa é feita exclusivamente em primeira pessoa por Fabiano.',
            opcao_b: 'o narrador utiliza linguagem objetiva, mas penetra nos pensamentos das personagens.',
            opcao_c: 'o narrador participa diretamente dos acontecimentos da história.',
            opcao_d: 'a obra apresenta apenas diálogos, sem interferência narrativa.',
            opcao_a_en: 'the story is told only by Fabiano in first person.',
            opcao_b_en: 'the narrator uses simple language, but shows the characters’ thoughts.',
            opcao_c_en: 'the narrator takes part in the story events.',
            opcao_d_en: 'the book has only dialogues, without narration.',
            resposta_correta: 'b',
            explicacao_pt: 'O narrador é objective, mas utiliza discurso indireto livre para mostrar pensamentos das personagens.',
            explicacao_en: 'The narrator is objective, but uses free indirect speech to show the characters’ thoughts.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '4. O processo de zoomorfização sofrido pelos seres humanos no livro manifesta-se através de:',
            pergunta_en: '4. The process of zoomorphization suffered by humans in the book manifests through:',
            opcao_a: 'Personagens que conseguem se comunicar fluentemente com os animais da fazenda.',
            opcao_b: 'A transformação física real dos filhos de Fabiano em bichos do mato.',
            opcao_c: 'A incapacidade verbal e o comportamento puramente instintivo de sobrevivência dos retirantes.',
            opcao_d: 'Um delírio místico causado pela fome coletiva da família.',
            opcao_a_en: 'Characters who can communicate fluently with the farm animals.',
            opcao_b_en: 'The real physical transformation of Fabiano’s sons into wild beasts.',
            opcao_c_en: 'The verbal inability and purely instinctive survival behavior of the migrants.',
            opcao_d_en: 'A mystical delirium caused by the collective hunger of the family.',
            resposta_correta: 'c',
            explicacao_pt: 'A zoomorfização rebaixa o ser humano ao nível animal devido às condições brutais de subsistência e falta de linguagem.',
            explicacao_en: 'Zoomorphization lowers humans to an animalistic level due to brutal living conditions and lack of language.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '5. O processo inverso, conhecido como antropomorfização ou humanização, ocorre explicitamente com qual personagem?',
            pergunta_en: '5. The inverse process, known as anthropomorphization or humanization, explicitly occurs with which character?',
            opcao_a: 'Seu Tomás da Bolandeira',
            opcao_b: 'A cachorra Baleia',
            opcao_c: 'O Soldado Amarelo',
            opcao_d: 'O Menino Mais Velho',
            opcao_a_en: 'Seu Tomás da Bolandeira',
            opcao_b_en: 'The dog Baleia',
            opcao_c_en: 'The Yellow Soldier',
            opcao_d_en: 'The Older Boy',
            resposta_correta: 'b',
            explicacao_pt: 'Baleia possui sonhos, julgamentos e sentimentos complexos, muitas vezes parecendo mais humana do que os próprios donos.',
            explicacao_en: 'Baleia has complex dreams, judgments, and feelings, often appearing more human than her owners.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '6. Qual objeto representa o maior desejo de consumo de Sinhá Vitória e simboliza uma vida digna?',
            pergunta_en: '6. Which object represents Sinhá Vitória’s greatest consumer desire and symbolizes a dignified life?',
            opcao_a: 'Um rádio de pilha moderno',
            opcao_b: 'Uma cama de lastro igual à de Seu Tomás',
            opcao_c: 'Um vestido de seda para festas religiosas',
            opcao_d: 'Uma espingarda nova para Fabiano',
            opcao_a_en: 'A modern portable radio',
            opcao_b_en: 'A cord-slatted bed just like Seu Tomás’s',
            opcao_c_en: 'A silk dress for religious festivals',
            opcao_d_en: 'A brand new shotgun for Fabiano',
            resposta_correta: 'b',
            explicacao_pt: 'A cama de lastro de Seu Tomás da Bolandeira representa o ápice de conforto e dignidade na perspectiva humilde de Sinhá Vitória.',
            explicacao_en: 'Seu Tomás’s bed represents the pinnacle of comfort and dignity from Sinhá Vitória’s humble perspective.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '7. Por que os filhos de Fabiano e Sinhá Vitória não recebem nomes próprios na narrativa?',
            pergunta_en: '7. Why do Fabiano and Sinhá Vitória’s sons not receive proper names in the narrative?',
            opcao_a: 'Porque o autor esqueceu de nomeá-los durante o processo de escrita rápida.',
            opcao_b: 'Para evidenciar a impessoalidade, o descaso social e a perda de identidade causados pela extrema miséria.',
            opcao_c: 'Porque a tradição sertaneja da época proibia dar nomes a crianças antes da crisma.',
            opcao_d: 'Para diferenciar os herdeiros legítimos dos bastardos criados na fazenda.',
            opcao_a_en: 'Because the author forgot to name them during a rushed writing process.',
            opcao_b_en: 'To demonstrate the impersonality, social neglect, and loss of identity caused by extreme misery.',
            opcao_c_en: 'Because the countryside tradition back then forbade naming children before confirmation.',
            opcao_d_en: 'To differentiate legitimate heirs from bastards raised on the farm.',
            resposta_correta: 'b',
            explicacao_pt: 'A falta de nomes (Menino Mais Velho e Menino Mais Novo) desumaniza e universaliza a condição de abandono da infância no sertão.',
            explicacao_en: 'The lack of names dehumanizes and universalizes the abandoned condition of childhood in the hinterlands.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '8. O Soldado Amarelo encarna um antagonismo institucional que atua na obra por meio de:',
            pergunta_en: '8. The Yellow Soldier embodies an institutional antagonism that operates through:',
            opcao_a: 'Ações de caridade e apoio médico às famílias necessitadas da caatinga.',
            opcao_b: 'Abuso de autoridade, opressão do poder estatal e humilhação do trabalhador rural.',
            opcao_c: 'Justiça agrária, defendendo Fabiano contra os desmandos do patrão.',
            opcao_d: 'Incompetência pacífica, sem interferir na rotina da vila.',
            opcao_a_en: 'Charitable actions and medical support for needy families in the caatinga.',
            opcao_b_en: 'Abuse of authority, oppression of state power, and humiliation of the rural worker.',
            opcao_c_en: 'Agrarian justice, defending Fabiano against the boss’s misdeeds.',
            opcao_d_en: 'Peaceful incompetence, without interfering in the town’s routine.',
            resposta_correta: 'b',
            explicacao_pt: 'O Soldado Amarelo usa a farda para prender e humilhar Fabiano injustamente, expondo a fragilidade do sertanejo perante as instituições.',
            explicacao_en: 'The Yellow Soldier uses his uniform to wrongfully arrest and humiliate Fabiano, exposing the migrant’s vulnerability.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '9. Qual o significado atribuído ao nome do protagonista Fabiano de acordo com a etimologia popular citada na obra?',
            pergunta_en: '9. What meaning is assigned to the protagonist’s name, Fabiano, according to popular etymology?',
            opcao_a: 'Guerreiro indomável das secas.',
            opcao_b: 'Indivíduo inofensivo; pobre-diabo.',
            opcao_c: 'Homem rico e afortunado.',
            opcao_d: 'Líder espiritual dos retirantes.',
            opcao_a_en: 'Indomitable warrior of the droughts.',
            opcao_b_en: 'Inoffensive individual; poor devil.',
            opcao_c_en: 'Wealthy and fortunate man.',
            opcao_d_en: 'Spiritual leader of the migrants.',
            resposta_correta: 'b',
            explicacao_pt: 'O nome denota a sua condição de fragilidade social, resignação e submissão perante as forças econômicas e climáticas.',
            explicacao_en: 'The name denotes his condition of social fragility, resignation, and subjection to economic and climate forces.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '10. Seu Tomás da Bolandeira é visto como uma referência de admiração e respeito porque ele:',
            pergunta_en: '10. Seu Tomás da Bolandeira is viewed as a reference of admiration and respect because he:',
            opcao_a: 'Possui uma montaria cara e armas de fogo modernas.',
            opcao_b: 'Sabe ler, é alfabetizado e exerce o direito de voto político.',
            opcao_c: 'Consegue prever com exatidão a chegada das chuvas.',
            opcao_d: 'Doou terras para que a família de Fabiano cultivasse.',
            opcao_a_en: 'Owns an expensive horse and modern firearms.',
            opcao_b_en: 'Knows how to read, is literate, and exercises the right to vote.',
            opcao_c_en: 'Can accurately predict when the rain will arrive.',
            opcao_d_en: 'Donated lands for Fabiano’s family to cultivate.',
            resposta_correta: 'b',
            explicacao_pt: 'Em um meio marcado pelo analfabetismo, o domínio da leitura e a participação política colocam Seu Tomás como o modelo de erudição.',
            explicacao_en: 'In an environment marked by illiteracy, reading skills and political inclusion put Seu Tomás as a model of erudition.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '11. A estrutura capitular de Vidas Secas é considerada desmontável ou não-linear porque:',
            pergunta_en: '11. The chapter structure of Vidas Secas is considered open or non-linear because:',
            opcao_a: 'Foi publicada fora de ordem propositalmente pela editora original.',
            opcao_b: 'Os capítulos funcionam quase como contos independentes, interligados apenas pela presença da família e da seca.',
            opcao_c: 'Muda de narrador a cada novo capítulo impresso.',
            opcao_d: 'Mistura passagens de ficção científica com o realismo tradicional.',
            opcao_a_en: 'It was intentionally published out of order by the original publisher.',
            opcao_b_en: 'The chapters function almost like independent short stories, linked only by the family and the drought.',
            opcao_c_en: 'It changes the narrator with each new printed chapter.',
            opcao_d_en: 'It mixes science fiction passages with traditional realism.',
            resposta_correta: 'b',
            explicacao_pt: 'Exceto pelo primeiro capítulo (mudança para a fazenda) e o último (fuga da seca), os episódios intermediários mantêm ampla autonomia.',
            explicacao_en: 'Except for the first and last chapters, the intermediate episodes retain wide autonomy.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '12. Na denúncia do Realismo Social promovido por Graciliano Ramos, o maior inimigo das famílias de retirantes além da seca é:',
            pergunta_en: '12. In the Social Realism critique by Graciliano Ramos, the greatest enemy of migrant families besides drought is:',
            opcao_a: 'O ataque constante de animais peçonhentos na caatinga.',
            opcao_b: 'A exploração econômica abusiva por parte dos latifundiários e o descaso político do Estado.',
            opcao_c: 'O conflito armado interno entre os próprios membros da família.',
            opcao_d: 'A falta de ferramentas agrícolas modernas no comércio local.',
            opcao_a_en: 'The constant attack of venomous animals in the wild.',
            opcao_b_en: 'Abusive economic exploitation by landowners and the political neglect of the State.',
            opcao_c_en: 'Internal armed conflicts among the family members themselves.',
            opcao_d_en: 'The lack of modern agricultural tools in local businesses.',
            resposta_correta: 'b',
            explicacao_pt: 'A opressão humana agrava a tragédia natural; o dono da fazenda manipula as contas para manter Fabiano eternamente endividado.',
            explicacao_en: 'Human oppression worsens natural tragedy; the landowner alters the financial accounts to keep Fabiano forever in debt.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '13. O clímax emocional do livro que expõe de forma crua a desumanização ambiental é retratado em:',
            pergunta_en: '13. The emotional climax of the book that rawly exposes environmental dehumanization is depicted in:',
            opcao_a: 'A festa de Natal ocorrida na cidade vizinha.',
            opcao_b: 'O sacrifício e a morte trágica da cachorra Baleia.',
            opcao_c: 'A contratação de Fabiano pelo dono da propriedade rural.',
            opcao_d: 'A compra da cama de lastro desejada por Sinhá Vitória.',
            opcao_a_en: 'The Christmas celebration that took place in the neighboring town.',
            opcao_b_en: 'The sacrifice and tragic death of the dog Baleia.',
            opcao_c_en: 'The hiring of Fabiano by the rural property owner.',
            opcao_d_en: 'The purchase of the cord bed desired by Sinhá Vitória.',
            resposta_correta: 'b',
            explicacao_pt: 'A morte de Baleia, executada por Fabiano por suspeita de hidrofobia, marca o sofrimento máximo do núcleo familiar.',
            explicacao_en: 'The death of Baleia, shot by Fabiano under suspicion of rabies, marks the ultimate suffering of the family unit.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '14. Graciliano Ramos pertence a qual geração do Modernismo brasileiro?',
            pergunta_en: '14. Graciliano Ramos belongs to which generation of Brazilian Modernism?',
            opcao_a: 'Primeira Fase (1922 - 1930) - Fase Heroica ou Destruidora.',
            opcao_b: 'Segunda Fase (1930 - 1945) - Fase Consolidadora ou Regionalista.',
            opcao_c: 'Terceira Fase (1945 - 1960) - Geração de 45.',
            opcao_d: 'Fase de Pré-Modernismo de transição histórica.',
            opcao_a_en: 'First Phase (1922 - 1930) - Heroic/Destructive Phase.',
            opcao_b_en: 'Second Phase (1930 - 1945) - Consolidation/Regionalist Phase.',
            opcao_c_en: 'Third Phase (1945 - 1960) - 45 Generation.',
            opcao_d_en: 'Pre-Modernism historical transition phase.',
            resposta_correta: 'b',
            explicacao_pt: 'O autor é um dos maiores expoentes do romance de 30, focado nas problemáticas sociais e realidades regionais brasileiras.',
            explicacao_en: 'The author is one of the greatest figures of the 1930 novel, focused on social problems and regional realities.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '15. O desfecho da obra manifesta um ciclo eterno na vida dos retirantes porque eles terminam o livro:',
            pergunta_en: '15. The ending of the work manifests an eternal cycle in the life of the migrants because they finish the book:',
            opcao_a: 'Enriquecendo com a descoberta de ouro nas serras.',
            opcao_b: 'Fugindo novamente da seca em direção a uma cidade grande indeterminada com incerteza.',
            opcao_c: 'Comprando a fazenda do antigo patrão opressor.',
            opcao_d: 'Fixando moradia permanente e próspera em terras litorâneas.',
            opcao_a_en: 'Becoming wealthy by discovering gold in the mountains.',
            opcao_b_en: 'Fleeing the drought once again toward an uncertain large city with doubts.',
            opcao_c_en: 'Buying the farm from their former oppressive boss.',
            opcao_d_en: 'Establishing permanent and prosperous residence on coastal lands.',
            resposta_correta: 'b',
            explicacao_pt: 'O fim repete o início: a seca retorna e força a família a caminhar sem rumo definitivo, demonstrando a circularidade da miséria.',
            explicacao_en: 'The end repeats the beginning: the drought returns, forcing the family to migrate aimlessly, showing the circularity of misery.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '16. O Discurso Indireto Livre atua na narrativa de Vidas Secas ao:',
            pergunta_en: '16. Free Indirect Speech operates in the narrative of Vidas Secas by:',
            opcao_a: 'Dar voz direta aos pensamentos íntimos das personagens sem marcas formais de diálogo.',
            opcao_b: 'Permitir que o leitor mude os rumos dos acontecimentos da história.',
            opcao_c: 'Ocultar os sentimentos dos bichos para favorecer a visão dos patrões.',
            opcao_d: 'Inserir termos técnicos em inglês no meio das falas do vaqueiro.',
            opcao_a_en: 'Giving direct voice to the characters’ private thoughts without formal dialogue punctuation markers.',
            opcao_b_en: 'Allowing the reader to change the course of the story’s events.',
            opcao_c_en: 'Hiding the animals’ feelings to favor the bosses’ points of view.',
            opcao_d_en: 'Inserting technical English terms in the middle of the cowboy’s speech.',
            resposta_correta: 'a',
            explicacao_pt: 'Essa técnica funde a voz do narrador com a consciência da personagem, revelando sua subjetividade limitada de forma fluida.',
            explicacao_en: 'This technique blends the narrator’s voice with the character’s consciousness, smoothly revealing their limited subjectivity.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '17. Em qual estado do Nordeste brasileiro nasceu Graciliano Ramos, servindo de bagagem para sua literatura regionalista?',
            pergunta_en: '17. In which state of the Brazilian Northeast was Graciliano Ramos born, providing background for his regionalist literature?',
            opcao_a: 'Bahia',
            opcao_b: 'Alagoas',
            opcao_c: 'Ceará',
            opcao_d: 'Pernambuco',
            opcao_a_en: 'Bahia',
            opcao_b_en: 'Alagoas',
            opcao_c_en: 'Ceará',
            opcao_d_en: 'Pernambuco',
            resposta_correta: 'b',
            explicacao_pt: 'Graciliano Ramos nasceu em Quebrangulo, Alagoas, em 1892, e chegou a ser prefeito de Palmeira dos Índios.',
            explicacao_en: 'Graciliano Ramos was born in Quebrangulo, Alagoas, in 1892, and even served as mayor of Palmeira dos Índios.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '18. Diante da provocação do Soldado Amarelo em um reencontro no meio do mato, Fabiano opta por não matá-lo porque:',
            pergunta_en: '18. When provoked by the Yellow Soldier in an encounter in the wild, Fabiano chooses not to kill him because:',
            opcao_a: 'Teve medo de ser assombrado pelo fantasma da autoridade.',
            opcao_b: 'Reconheceu que o soldado era apenas um infeliz cumprindo ordens e respeitou a autoridade da farda.',
            opcao_c: 'Sua esposa Sinhá Vitória surgiu a tempo de segurar o seu braço.',
            opcao_d: 'Percebeu que sua faca de vaqueiro estava completamente cega.',
            opcao_a_en: 'He feared being haunted by the ghost of authority.',
            opcao_b_en: 'He recognized that the soldier was just an unfortunate man following orders and respected the uniform authority.',
            opcao_c_en: 'His wife Sinhá Vitória arrived in time to hold his arm back.',
            opcao_d_en: 'He noticed that his cowboy knife was completely dull.',
            resposta_correta: 'b',
            explicacao_pt: 'Fabiano poupa o soldado ao ver que, sem o respaldo do Estado nas redondezas, ele era um ser frágil e assustado.',
            explicacao_en: 'Fabiano spares the soldier upon seeing that, without the state support nearby, he was a fragile and frightened entity.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '19. Qual característica climática e geográfica rege as ações e define a migração forçada da família central?',
            pergunta_en: '19. What climatic and geographic characteristic rules actions and defines the forced migration of the core family?',
            opcao_a: 'As chuvas torrenciais inundando as plantações de cana.',
            opcao_b: 'A seca severa e prolongada no semiárido nordestino.',
            opcao_c: 'O frio extremo impedindo a sobrevivência do gado.',
            opcao_d: 'Terremotos destruindo as vilas de taipa.',
            opcao_a_en: 'Torrencial rains flooding the sugarcane fields.',
            opcao_b_en: 'The severe and prolonged drought in the Northeastern semi-arid region.',
            opcao_c_en: 'Extreme cold stopping cattle survival.',
            opcao_d_en: 'Earthquakes destroying mud brick villages.',
            resposta_correta: 'b',
            explicacao_pt: 'A estiagem desidrata o sertão, mata a vegetação e força os animais e humanos ao êxodo rural.',
            explicacao_en: 'The drought dehydrates the hinterland, kills vegetation, and forces animals and humans into rural exodus.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '20. A relação linguística de Fabiano com o mundo exterior é marcada por:',
            pergunta_en: '20. Fabiano’s linguistic relationship with the outside world is marked by:',
            opcao_a: 'Monólogos longos e discursos políticos inflamados.',
            opcao_b: 'Grunhidos, frases monossilábicas e dificuldades severas de expressão verbal.',
            opcao_c: 'Uso de vocabulário rebuscado aprendido na escola.',
            opcao_d: 'Fluência em línguas estrangeiras aprendidas com viajantes.',
            opcao_a_en: 'Long monologues and fiery political speeches.',
            opcao_b_en: 'Grunts, monosyllabic phrases, and severe difficulties in verbal expression.',
            opcao_c_en: 'Use of sophisticated vocabulary learned in school.',
            opcao_d_en: 'Fluency in foreign languages learned from travelers.',
            resposta_correta: 'b',
            explicacao_pt: 'Fabiano considera-se um bicho e sente profunda vergonha por não saber articular palavras complexas como as pessoas da cidade.',
            explicacao_en: 'Fabiano considers himself a beast and feels deep shame for not knowing how to speak complex words like city people.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '21. O capítulo "O Menino Mais Velho" foca em uma crise existencial infantil motivada por:',
            pergunta_en: '21. The chapter "The Older Boy" focuses on a child existential crisis motivated by:',
            opcao_a: 'A perda de um brinquedo eletrônico moderno.',
            opcao_b: 'A busca pelo significado real e contextual da palavra "inferno".',
            opcao_c: 'O medo de frequentar a escola da cidade.',
            opcao_d: 'O desejo de se tornar um soldado militar.',
            opcao_a_en: 'The loss of a modern electronic toy.',
            opcao_b_en: 'The search for the real and contextual meaning of the word "hell" (inferno).',
            opcao_c_en: 'The fear of attending the town’s school.',
            opcao_d_en: 'The desire to become a military soldier.',
            resposta_correta: 'b',
            explicacao_pt: 'O menino ouve a palavra de uma vizinha e tenta compreendê-la, mas Sinhá Vitória reage com rispidez por não saber explicar.',
            explicacao_en: 'The boy hears the word from a neighbor and tries to understand it, but Sinhá Vitória reacts harshly because she cannot explain it.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '22. Como Sinhá Vitória consegue demonstrar uma ligeira superioridade intelectual em relação a Fabiano?',
            pergunta_en: '22. How does Sinhá Vitória manage to show a slight intellectual superiority over Fabiano?',
            opcao_a: 'Ela escreve poemas e contos artísticos nos momentos livres.',
            opcao_b: 'Ela consegue realizar contas aritméticas básicas usando grãos de milho de forma rústica.',
            opcao_c: 'Ela possui diploma de professora do ensino primário.',
            opcao_d: 'Ela sabe operar máquinas agrícolas industriais.',
            opcao_a_en: 'She writes poems and artistic stories in her free moments.',
            opcao_b_en: 'She manages to perform basic arithmetic calculations using corn kernels in a rustic way.',
            opcao_c_en: 'She holds a diploma as a primary school teacher.',
            opcao_d_en: 'She knows how to operate industrial farm machinery.',
            resposta_correta: 'b',
            explicacao_pt: 'Suas contas rudimentares servem de alerta para Fabiano perceber que está sendo constantemente enganado pelo patrão.',
            explicacao_en: 'Her rudimentary math alerts Fabiano that he is being constantly cheated by his landlord.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '23. A William Faulkner Foundation concedeu uma premiação a Vidas Secas em 1962 sob o título de:',
            pergunta_en: '23. The William Faulkner Foundation granted an award to Vidas Secas in 1962 under the title of:',
            opcao_a: 'Melhor romance policial da América Latina.',
            opcao_b: 'Livro Representativo da Literatura Brasileira Moderna.',
            opcao_c: 'Obra mais romântica do século XX.',
            opcao_d: 'Melhor biografia histórica ficcional.',
            opcao_a_en: 'Best detective novel in Latin America.',
            opcao_b_en: 'Representative Book of Modern Brazilian Literature.',
            opcao_c_en: 'Most romantic work of the 20th century.',
            opcao_d_en: 'Best fictional historical biography.',
            resposta_correta: 'b',
            explicacao_pt: 'O prêmio internacional consolidou a projeção mundial da obra e o gênio literário realista de Graciliano.',
            explicacao_en: 'The international award consolidated the worldwide reach of the work and Graciliano’s realistic literary genius.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '24. O conceito geopolítico atual que melhor define as famílias que se deslocam devido à destruição climática retratada é:',
            pergunta_en: '24. The current geopolitical concept that best defines families displaced due to climate destruction is:',
            opcao_a: 'Turistas de aventura ecológica.',
            opcao_b: 'Refugiados climáticos ou retirantes.',
            opcao_c: 'Imigrantes corporativos de alta renda.',
            opcao_d: 'Nômades digitais globais.',
            opcao_a_en: 'Ecological adventure tourists.',
            opcao_b_en: 'Climate refugees or rural migrants.',
            opcao_c_en: 'High-income corporate immigrants.',
            opcao_d_en: 'Global digital nomads.',
            resposta_correta: 'b',
            explicacao_pt: 'Vidas Secas funciona como um registro pioneiro dos movimentos migratórios causados por desastres ambientais.',
            explicacao_en: 'Vidas Secas works as a pioneer chronicle of migratory movements caused by environmental disasters.',
        },
    });
    await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '25. Por que a verossimilhança é um elemento central de sustentação e impacto na leitura de Vidas Secas?',
            pergunta_en: '25. Why is verisimilitude a core element of support and impact in the reading of Vidas Secas?',
            opcao_a: 'Porque insere elementos fantásticos e mágicos impossíveis de ocorrer no mundo real.',
            opcao_b: 'Porque os problemas, reações e ambientes exibidos reproduzem com precisão convincente a realidade real do sertão.',
            opcao_c: 'Porque foca exclusivamente em finais felizes e soluções milagrosas.',
            opcao_d: 'Porque reconta fatos históricos copiados de enciclopédias oficiais verbatim.',
            opcao_a_en: 'Because it inserts fantastic and magical elements impossible to occur in the real world.',
            opcao_b_en: 'Because the problems, reactions, and environments shown accurately and convincingly mirror the true reality of the hinterland.',
            opcao_c_en: 'Because it focuses exclusively on happy endings and miraculous solutions.',
            opcao_d_en: 'Because it recounts historical facts copied from official encyclopedias verbatim.',
            resposta_correta: 'b',
            explicacao_pt: 'A verossimilhança garante que a denúncia social ecoe fortemente no leitor ao expor dores humanas plausíveis.',
            explicacao_en: 'Verisimilitude guarantees that the social critique resonates with the reader by exposing believable human pain.',
        },
    });
}

console.log('✅ Seed finalizado com sucesso!');

main()
    .catch((error) => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
