export const obterBibliotecaCompleta = async (req, res) => {
    try {

        const endpointsLivros = [
            {
                nomeLivro: 'Capitães da Areia',
                urlCompleta: 'https://readflow-m8o6.onrender.com/api/livros',
                apiKey: process.env.KEY_LIVRO_CAPITAES_DA_AREIA,
                tipoAuth: 'x-api-key',
            },
            {
                nomeLivro: 'O Guarani',
                urlCompleta: 'https://bookpedia-backend-4ab3.onrender.com/livros',
                apiKey: process.env.KEY_LIVRO_O_GUARANI,
                tipoAuth: 'x-api-key',
            },
            {
                nomeLivro: 'Quartos de despejo',
                urlCompleta: 'https://backend-projeto-integrador-rana.onrender.com/api/livro',
                apiKey: process.env.KEY_LIVRO_QUARTOS_DESPEJO,
                tipoAuth: 'x-api-key',
            },
            {
                nomeLivro: 'Memórias Póstumas de Brás Cubas',
                urlCompleta: 'https://projeto-clubyx.onrender.com/livros',
                apiKey: process.env.KEY_LIVRO_MEMORIAS,
                tipoAuth: 'x-api-key',
            },
        ];

        console.log(`Total de livros cadastrados no array: ${endpointsLivros.length}`);

        let contadorGlobal = 0;

        const promessas = endpointsLivros.map(async (livro, index) => {
            console.log(`[Índice ${index}] Iniciando processo para: ${livro.nomeLivro}`);

            try {
                if (!livro.urlCompleta || !livro.apiKey) {
                    console.log(`[Índice ${index}] Erro: URL ou Key faltando para ${livro.nomeLivro}`);
                    return {
                        livro: livro.nomeLivro,
                        statusApi: 'Configuração Ausente',
                        conteudo: []
                    };
                }

                console.log(`[Índice ${index}] Disparando Fetch para: ${livro.urlCompleta}`);

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': livro.apiKey,
                    },
                });

                console.log(`[Índice ${index}] Resposta recebida de ${livro.nomeLivro}. Status: ${resposta.status}`);

                if (!resposta.ok) {
                    return {
                        livro: livro.nomeLivro,
                        statusApi: `Erro HTTP ${resposta.status}`,
                        conteudo: []
                    };
                }

                const dadosBrutos = await resposta.json();
                console.log(`[Índice ${index}] JSON convertido com sucesso para ${livro.nomeLivro}`);


                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [];


                const dadosFormatados = listaDeLivros.map((item) => ({

                    titulo:
                        item.titulo ||
                        item.title ||
                        item.tituloDoLivro ||
                        item.tituloPT ||
                        item.nome ||
                        'Título não informado',
                    autor:
                        item.autor ||
                        item.author ||
                        item.autores ||
                        'Autor não informado',
                    capa_url: item.capa || item.image || item.capaURL || item.foto || item.capa_url|| null,
                    ano: item.ano || item.year || item.anoPublicacao || item.publicacao || 'N/A',
                    genero_pt:
                        item.genero_pt || item.genero || item.generoPT || 'Gênero não informado',
                    genero_en:
                        item.genero_en || item.genre || item.generoEN || 'Genre not informed',
                    enredo_pt: item.enredo_pt || item.resumo || 'Enredo não informado',
                    enredo_en:
                        item.enredo_en ||
                        item.description ||
                        item.resumoEn ||
                        'Description not informed',
                }));

                return {
                    //adicionando o id p cada livro
                    id: ++contadorGlobal,
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };

            } catch (erroLivro) {
                console.error(`🚨 [Erro interno no mapa do livro ${livro.nomeLivro}]:`, erroLivro.message);
                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Erro Interno na Requisição',
                    conteudo: [],
                };
            }
        });

        const bibliotecaCompleta = await Promise.all(promessas);
        console.log('--- PROCESSO CONCLUÍDO COM SUCESSO ---');

        return res.status(200).json(bibliotecaCompleta);

    } catch (error) {
        console.error('💥 ERRO CRÍTICO NO CATCH PRINCIPAL:', error.message);
        return res.status(500).json({ erro: 'Erro crítico no servidor.', detalhe: error.message });
    }
};
