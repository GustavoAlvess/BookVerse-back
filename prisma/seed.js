import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient, Categoria, Categoria_en } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabelas...');

    // Ordem de exclusão para evitar erros de foreign key
    await prisma.curiosidade.deleteMany();
    await prisma.simulado.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.equipe.deleteMany();

    console.log('Iniciando seed de usuários...');
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
            fotoURL: '',
        },
    });

    const membroEquipe2 = await prisma.equipe.create({
        data: {
            nome: 'Felipe Campos',
            objetivo: 'Desenvolvedor back end, api, banco de dados e integração.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        },
    });

    const membroEquipe3 = await prisma.equipe.create({
        data: {
            nome: 'Rafael Fahl',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Fabricação Mecânica',
            fotoURL: '',
        },
    });

    const membroEquipe4 = await prisma.equipe.create({
        data: {
            nome: 'Melissa Freitas',
            objetivo: 'Desenvolvedora front-end.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: '',
        },
    });

    const membroEquipe5 = await prisma.equipe.create({
        data: {
            nome: 'Felipe Gabriel',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Eletroeletrônica',
            fotoURL: '',
        },
    });

    const membroEquipe6 = await prisma.equipe.create({
        data: {
            nome: 'Gustavo Alves',
            objetivo: 'Desenvolvedor back end, api, banco de dados e integração.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: '',
        },
    });

    const membroEquipe7 = await prisma.equipe.create({
        data: {
            nome: 'Victor Barbosa',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Fabricação Mecânica',
            fotoURL: '',
        },
    });

    const membroEquipe8 = await prisma.equipe.create({
        data: {
            nome: 'Luana Folegatti',
            objetivo: 'Desenvolvedora front-end.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: '',
        },
    });

    const membroEquipe9 = await prisma.equipe.create({
        data: {
            nome: 'Heloísa Stefanini',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Eletroeletrônica',
            fotoURL: '',
        },
    });

    const membroEquipe10 = await prisma.equipe.create({
        data: {
            nome: 'Isabela Duetes',
            objetivo: 'Desenvolvedora front-end.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: '',
        },
    });

    const membroEquipe11 = await prisma.equipe.create({
        data: {
            nome: 'Maria Luiza',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Fabricação Mecânica',
            fotoURL: '',
        },
    });

    const membroEquipe12 = await prisma.equipe.create({
        data: {
            nome: 'Felipe',
            objetivo: 'Elaboração das questões, resumos e curiosidades literárias.',
            curso: 'Letras - Português/Inglês',
            fotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        },
    });

    const membroEquipe13 = await prisma.equipe.create({
        data: {
            nome: 'Letícia Maria',
            objetivo: 'Desenvolvedora front-end.',
            curso: 'Desenvolvimento de Sistemas',
            fotoURL: '',
        },
    });

    const membroEquipe14 = await prisma.equipe.create({
        data: {
            nome: 'Ana Clara',
            objetivo:
                'Responsabilidade sobre dados do livro, extrair informações para conter no site.',
            curso: 'Fabricação Mecânica',
            fotoURL: '',
        },
    });

    console.log('Iniciando seed do livro...');
    const livro = await prisma.livro.create({
        data: {
            titulo: 'Vidas Secas',
            autor: 'Graciliano Ramos',
            genero_pt: 'Romance regionalista',
            genero_en: 'Regionalist novel',
            ano: 1938,
            movimento_pt:
                '“Vidas Secas” é um dos principais livros da segunda fase modernista, a do regionalismo.',
            movimento_en: '',
            descricao_pt: '',
            descricao_en: '',
            enredo_pt: '',
            enredo_en:
                '',
            contexto_historico_pt: '',
            contexto_historico_en:
                '',
            detalhes_autor_pt:
                'Nasceu em Alagoas (**1892 - 1953).** Figura central do Modernismo, o autor é famoso por obras como Vidas Secas (1938) e São Bernardo (1934)',
            detalhes_autor_en:
                'He was born in Alagoas (1892–1953). A central figure in Brazilian Modernism, the author is famous for having written works like Barren Lives (1938) and São Bernardo (1934).',
            estilo_escrita_pt: 'Texto conciso e linguagem objetiva, direta, concisa e realista',
            estilo_escrita_en: 'Concise, direct, and realistic language',
            verossimilhanca_pt: '',
            verossimilhanca_en: '',
            caracteristicas_literarias_pt:
                'Regionalismo: Narrativa focada na realidade, cultura e miséria do Nordeste brasileiro. Realismo Social: Denúncia das desigualdades econômicas, exploração do trabalhador e descaso político.',
            caracteristicas_literarias_en: '',
            conclusao_pt: '',
            conclusao_en: '',
            video_url: '',
            capa_url: '',
        },
    });

    console.log('Iniciando seed de personagens...');
    const personagem1 = await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Fabiano',
            descricao_pt:
                'Pai da família, vaqueiro rude e sofrido, que tenta sustentar a família no sertão',
            descricao_en:
                'The father, a ryde and suffered cowboy, who try to support his family in hinterland.',
            papel: '',
            imagem_url: '',
        },
    });

    const personagem2 = await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Sinhá Vitória',
            descricao_pt: 'Esposa de Fabiano, mais crítica e sonhadora; deseja uma vida melhor.',
            descricao_en:
                '  Fabiano’s wife, more critical and imaginative; she wishs for a better life.',
            papel: '',
            imagem_url: '',
        },
    });
    const personagem3 = await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Baleia',
            descricao_pt: 'A cachorra, animal de estimação da família.',
            descricao_en: 'The dog, it’s the family pet.',
            papel: '',
            imagem_url: '',
        },
    });
    const personagem4 = await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Menino mais velho',
            descricao_pt: 'Esposa de Fabiano, mais crítica e sonhadora; deseja uma vida melhor.',
            descricao_en: 'Couple’s son, curious and fascinated by words.',
            papel: '',
            imagem_url: '',
        },
    });
    const personagem5 = await prisma.personagem.create({
        data: {
            livro_id: livro.id,
            nome: 'Menino mais novo',
            descricao_pt: 'Admira o pai e tenta imitá-lo.',
            descricao_en: 'He looks up to his father and tries to copy him.',
            papel: '',
            imagem_url: '',
        },
    });

    console.log('Iniciando seed de curiosidades...');
    const curiosidade1 = await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Inspiração Real',
            titulo_en: '',
            conteudo_pt:
                'Graciliano Ramos se inspirou em sua própria experiência de vida para escrever “Vidas Secas”, tendo nascido e crescido no sertão, onde a história se passa.',
            conteudo_en: '',
        },
    });

    const curiosidade2 = await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Uso de Pseudônimos',
            titulo_en: '',
            conteudo_pt:
                'Graciliano usava pseudônimos como Feliciano de Olivença, Soeiro Lobato, Soares de Almeida Cunha, Anastácio Anacleto e outros nas suas publicações em jornais e revistas.',
            conteudo_en: '',
        },
    });

    const curiosidade3 = await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Curiosidades,
            categoria_en: Categoria_en.Curiosities,
            titulo_pt: 'Premiação Internacional',
            titulo_en: '',
            conteudo_pt:
                'Em 1962, Vidas Secas foi premiado pela fundação norte-americana William Faulkner como Livro Representativo da Literatura Brasileira Moderna.',
            conteudo_en: '',
        },
    });

    console.log('Iniciando seed de simulados (questões)...');
    const questao1 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'No livro Vidas Secas, a linguagem seca e econômica utilizada por Graciliano Ramos contribui principalmente para:',
            pergunta_en: 'In the book, Vidas Secas, the language used by Graciliano Ramos contributes mainly for',
            opcao_a: 'A) romantizar a vida no sertão nordestino.',
            opcao_b: 'B) enfatizar a dureza da existência das personagens.',
            opcao_c: 'C) valorizar o humor presente na narrativa.',
            opcao_d: 'D) destacar a superioridade intelectual dos retirantes.',
            opcao_a_en: 'A) make life in the Northeast countryside look beautiful and perfect.',
            opcao_b_en: 'B) show how hard the characters’ lives are.',
            opcao_c_en: 'C) show the humor in the story.',
            opcao_d_en: 'D) show that the migrants are very intelligent',
            resposta_correta: 'b',
            explicacao_pt: 'A linguagem direta, curta e “seca” combina com a miséria, a fome e o sofrimento vividos pelas personagens retratados no livro.',
            explicacao_en: 'The direct language matches the misery, hunger, and suffering of the characters in the book.',
        },
    });

    const questao2 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: '(FUVEST 2001) Um escritor classificou Vidas secas vista sua composição descontínua, feita de episódios relativamente independentes e sequências parcialmente truncadas. Essas características da composição do livro:',
            pergunta_en: '',
            opcao_a: 'a) Constituem um traço de estilo típico dos romances de Graciliano Ramos e do Regionalismo nordestino.',
            opcao_b: 'b) Indicam que ele pertence à fase inicial de Graciliano Ramos, quando este ainda seguia os ditames do primeiro momento do Modernismo.',
            opcao_c: 'c) Diminuem o seu alcance expressivo, na medida em que dificultam uma visão adequada da realidade sertaneja.',
            opcao_d: 'd) Revelam, nele, a influência da prosa seca e lacônica de Euclides da Cunha, em Os sertões.',
            opcao_e: 'e) Relacionam-se à visão limitada e fragmentária que as próprias personagens têm do mundo',
            opcao_a_en: '',
            opcao_b_en: '',
            opcao_c_en: '',
            opcao_d_en: '',
            resposta_correta: 'e',
            explicacao_pt: 'A estrutura fragmentada de Vidas Secas representa a visão limitada das personagens sobre o mundo, já que elas vivem em condições de miséria, pouca educação e dificuldade de compreensão da própria realidade.',
            explicacao_en: '',
        },
    });

    const questao3 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'Sobre o foco narrativo em Vidas Secas, é correto afirmar que:',
            pergunta_en: 'About the point of view/narrative focus, it is correct confirm that',
            opcao_a: 'A) a narrative é feita exclusivamente em primeira pessoa por Fabiano.',
            opcao_b: 'B) o narrador utiliza linguagem objetiva, mas penetra nos pensamentos das personagens.',
            opcao_c: 'C) o narrador participa diretamente dos acontecimentos da história.',
            opcao_d: 'D) a obra apresenta apenas diálogos, sem interferência narrativa.',
            opcao_a_en: 'A) the story is told only by Fabiano in first person.',
            opcao_b_en: 'B) the narrator uses simple language, but shows the characters’ thoughts.',
            opcao_c_en: 'C) the narrator takes part in the story events.',
            opcao_d_en: 'D) the book has only dialogues, without narration.',
            resposta_correta: 'b',
            explicacao_pt: 'O narrador é objetivo, mas utiliza discurso indireto livre para mostrar pensamentos das personagens.',
            explicacao_en: 'The narrator is objective, but uses free indirect speech to show the characters’ thoughts.',
        },
    });

    const questao4 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'Para as questões 4 e 5, considere o fragmento abaixo, extraído de Vidas secas, de Graciliano Ramos. O pequeno sentou-se, acomodou-se nas pernas a cabeça da cachorra, pôs-se a contar-lhe baixinho uma história. Tinha um vocabulário quase tão minguado como o do papagaio que morrera no tempo da seca. Valia-se, pois, de exclamações e de gestos, e Baleia respondeia com o rabo, com a língua, com movimentos fáceis de entender. (Graciliano Ramos. Vidas secas. Rio de Janeiro: Record, 2012, p. 57.) QUESTÃO 4 Uma definição possível de alteridade é “a capacidade de se colocar no lugar do outro”. No excerto, o menino mais velho, após ter recebido um cocorote de sinhá Vitória, ao lhe ter feito uma pergunta sobre a palavra “inferno”, conta uma história para Baleia. Da leitura desse trecho, podemos concluir que',
            pergunta_en: '',
            opcao_a: 'a) o narrador tem êxito na construção da alteridade, ao se colocar no lugar do menino e de Baleia e permitir a relação entre essas duas personagens.',
            opcao_b: 'b) o vocabulário minguado do menino mais velho o impede de se relacionar com Baleia, o que demonstra que, sem linguagem, não há alteridade entre o homem e o mundo.',
            opcao_c: 'c) o vocabulário minguado é próprio da infância e não resulta das condições sociais e materiais adversas das personagens.',
            opcao_d: 'd) a resposta de Baleia reduz o menino mais velho à condição de bicho, privando-o dos atributos necessários para se tornar homem.',
            opcao_a_en: '',
            opcao_b_en: '',
            opcao_c_en: '',
            opcao_d_en: '',
            resposta_correta: 'a',
            explicacao_pt: 'O narrador consegue mostrar os sentimentos e a forma de comunicação tanto do menino quanto de Baleia. Mesmo com poucas palavras, os dois se entendem por gestos, sons e afeto. O narrador “entra” no universo dos dois personagens e faz o leitor compreender essa conexão.',
            explicacao_en: '',
        },
    });

    const questao5 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'Para as questões 4 e 5, considere o fragmento abaixo, extraído de Vidas secas, de Graciliano Ramos. O pequeno sentou-se, acomodou-se nas pernas a cabeça da cachorra, pôs-se a contar-lhe baixinho uma história. Tinha um vocabulário quase tão minguado como o do papagaio que morrera no tempo da seca. Valia-se, pois, de exclamações e de gestos, e Baleia respondeia com o rabo, com a língua, com movimentos fáceis de entender. (Graciliano Ramos. Vidas secas. Rio de Janeiro: Record, 2012, p. 57.) QUESTÃO 5 No romance Vidas secas, a alteridade é construída ficcionalmente. Isso porque o narrador',
            pergunta_en: '',
            opcao_a: 'a) impõe seu ponto de vista sobre a miséria social das personagens, desconsiderando a luta dessas personagens por uma vida mais digna.',
            opcao_b: 'b) permite conhecer o ponto de vista de cada uma das personagens e manifesta um juízo crítico sobre o drama da miséria social e econômica.',
            opcao_c: 'c) relativiza o universo social das personagens, uma vez que elas estão privadas da capacidade de comunicação.',
            opcao_d: 'd) analisa os dilemas de todas as personagens e propõe, ao final da narrativa, uma solução para o drama da miséria social e econômica.',
            opcao_a_en: '',
            opcao_b_en: '',
            opcao_c_en: '',
            opcao_d_en: '',
            resposta_correta: 'b',
            explicacao_pt: 'O narrador de Vidas Secas mostra os pensamentos e sentimentos das personagens, inclusive de Baleia. Além disso, a obra faz uma forte crítica social à miséria, à seca e à desumanização dos retirantes.',
            explicacao_en: '',
        },
    });

    console.log('✅ Seed finalizado com sucesso!');
    console.log(`Usuários: ${user1.email}, ${user2.email}`);
    console.log(`Membros da equipe: 2`);
    console.log(`Livro: ${livro.titulo}`);
    console.log(`Personagens: 2`);
    console.log(`Curiosidades: 2`);
    console.log(`Questões: 2`);
}

main()
    .catch((error) => {
        console.error('❌ Erro no seed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
