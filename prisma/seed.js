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
    // <-- Bloco adicionado para popular a tabela Equipe
    const membroEquipe1 = await prisma.equipe.create({
        data: {
            nome: 'Desenvolvedor(a) Fullstack',
            objetivo: 'Desenvolvimento da plataforma, banco de dados e integração da API.',
            curso: 'Ciência da Computação',
            fotoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        },
    });

    const membroEquipe2 = await prisma.equipe.create({
        data: {
            nome: 'Curador(a) de Conteúdo',
            objetivo: 'Elaboração das questões, resumos e curiosidades literárias.',
            curso: 'Letras - Português/Inglês',
            fotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        },
    });

    console.log('Iniciando seed do livro...');
    const livro = await prisma.livro.create({
        data: {
            titulo: 'Vidas Secas',
            autor: 'Graciliano Ramos',
            genero_pt: 'Romance Regionalista',
            genero_en: 'Regionalist Fiction',
            ano: 1938,
            movimento_pt: 'Modernismo (Geração de 30)',
            movimento_en: 'Modernism',
            descricao_pt: 'A história de uma família de retirantes no sertão nordestino.',
            descricao_en: 'The story of a family of migrants in the Brazilian Northeast.',
            enredo_pt: 'Fabiano, Vitória e seus filhos lutam contra a seca e a opressão.',
            enredo_en: 'Fabiano, Vitória and their children struggle against drought and oppression.',
            detalhes_autor_pt: 'Graciliano Ramos é um dos maiores nomes da literatura brasileira.',
            detalhes_autor_en: 'Graciliano Ramos is one of the greatest names in Brazilian literature.',
            estilo_escrita_pt: 'Linguagem seca e direta, mimetizando a escassez do sertão.',
            estilo_escrita_en: 'Dry and direct language, mimicking the desert scarcity.',
            verossimilhanca_pt: 'Retrato fiel da realidade social do Nordeste.',
            verossimilhanca_en: 'Faithful portrait of Northeast social reality.',
            caracteristicas_literarias_pt: 'Determinismo biológico e crítica social.',
            caracteristicas_literarias_en: 'Biological determinism and social criticism.',
            conclusao_pt: 'Uma obra atemporal sobre a condição humana.',
            conclusao_en: 'A timeless work about the human condition.',
        },
    });

    console.log('Iniciando seed de personagens...');
    const personagem1 = await prisma.personagem.create({
  data: {
    livro_id: 1,
    nome: "Sherlock Holmes",
    descricao_pt:
      "Detetive extremamente inteligente conhecido por sua habilidade de dedução.",
    descricao_en:
      "Highly intelligent detective known for his deduction skills.",

    papel: "Protagonista",

    imagem_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
})

    console.log('Iniciando seed de curiosidades...');
    const curiosidade1 = await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Redacao,
            categoria_en: Categoria_en.Writing,
            titulo_pt: 'Capítulos Desconexos',
            titulo_en: 'Disconnected Chapters',
            conteudo_pt:
                'O livro foi escrito de forma que os capítulos pudessem ser lidos em quase qualquer ordem.',
            conteudo_en: 'The book was written so that chapters could be read in almost any order.',
        },
    });

    const curiosidade2 = await prisma.curiosidade.create({
        data: {
            livro_id: livro.id,
            categoria_pt: Categoria.Dicas,
            categoria_en: Categoria_en.Tips,
            titulo_pt: 'Baleia',
            titulo_en: 'Baleia',
            conteudo_pt: 'A cadela Baleia é um dos personagens mais humanizados da obra.',
            conteudo_en: 'The dog Baleia is one of the most humanized characters in the work.',
        },
    });

    console.log('Iniciando seed de simulados (questões)...');
    const questao1 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'Qual o nome da cadela da família?',
            pergunta_en: 'What is the dog\'s name?',
            opcao_a: 'Baleia',
            opcao_b: 'Sereia',
            opcao_c: 'Estrela',
            opcao_d: 'Luna',
            opcao_a_en: 'Baleia',
            opcao_b_en: 'Sereia',
            opcao_c_en: 'Estrela',
            opcao_d_en: 'Luna',
            resposta_correta: 'a',
            explicacao_pt: 'Baleia é o nome da icônica cadela da família.',
            explicacao_en: 'Baleia is the iconic family dog.',
        },
    });

    const questao2 = await prisma.simulado.create({
        data: {
            livro_id: livro.id,
            pergunta_pt: 'Quem é o protagonista da obra?',
            pergunta_en: 'Who is the protagonist?',
            opcao_a: 'Fabiano',
            opcao_b: 'Seu Tomás',
            opcao_c: 'Soldado Amarelo',
            opcao_d: 'Menino mais novo',
            opcao_a_en: 'Fabiano',
            opcao_b_en: 'Seu Tomás',
            opcao_c_en: 'Yellow Soldier',
            opcao_d_en: 'Younger boy',
            resposta_correta: 'a',
            explicacao_pt: 'Fabiano é o pai e protagonista.',
            explicacao_en: 'Fabiano is the father and protagonist.',
        },
    });

    console.log('✅ Seed finalizado com sucesso!');
    console.log(`Usuários: ${user1.email}, ${user2.email}`);
    console.log(`Membros da equipe criados: 2`);
    console.log(`Livro: ${livro.titulo} (ID: ${livro.id})`);
    console.log(`Curiosidades criadas: 2`);
    console.log(`Questões criadas para este livro: 2`);
}

main()
    .catch((error) => {
        console.error('❌ Erro no seed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
