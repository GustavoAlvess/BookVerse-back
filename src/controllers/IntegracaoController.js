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

        const promessas = endpointsLivros.map(async (livro, index) => {
            console.log(`[Índice ${index}] Iniciando processo para: ${livro.nomeLivro}`);

            try {
                if (!livro.urlCompleta || !livro.apiKey) {
                    console.log(
                        `[Índice ${index}] Erro: URL ou Key faltando para ${livro.nomeLivro}`,
                    );
                    return {
                        livro: livro.nomeLivro,
                        statusApi: 'Configuração Ausente',
                        conteudo: [],
                    };
                }

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': livro.apiKey,
                    },
                });

                if (!resposta.ok) {
                    return {
                        livro: livro.nomeLivro,
                        statusApi: `Erro HTTP ${resposta.status}`,
                        conteudo: [],
                    };
                }

                const dadosBrutos = await resposta.json();
                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [];

                const dadosFormatados = listaDeLivros.map((item) => {
                    // Tenta capturar o ID original de várias formas possíveis na API externa
                    const idOriginal =
                        item.id ||
                        item._id ||
                        item.idDoLivro ||
                        (Array.isArray(item.autor) && item.autor[0]?.idDoLivro) ||
                        (Array.isArray(item.autor) && item.autor[0]?.id) ||
                        null;

                    return {
                        idOrigin: idOriginal, // <--- Novo campo salvo aqui
                        titulo:
                            item.titulo ||
                            item.title ||
                            item.tituloDoLivro ||
                            item.tituloPT ||
                            item.nome ||
                            'Título não informado',
                        autor: item.autor || item.author || item.autores || 'Autor não informado',
                        capa_url:
                            item.capa ||
                            item.image ||
                            item.capaURL ||
                            item.foto ||
                            item.capa_url ||
                            null,
                        ano:
                            item.ano || item.year || item.anoPublicacao || item.publicacao || 'N/A',
                        genero_pt:
                            item.genero_pt ||
                            item.genero ||
                            item.generoPT ||
                            'Gênero não informado',
                        genero_en:
                            item.genero_en || item.genre || item.generoEN || 'Genre not informed',
                        enredo_pt: item.enredo_pt || item.resumo || 'Enredo não informado',
                        enredo_en:
                            item.enredo_en ||
                            item.description ||
                            item.resumoEn ||
                            'Description not informed',
                    };
                });

                return {
                    id: index + 1,
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };
            } catch (erroLivro) {
                console.error(
                    `🚨 [Erro interno no mapa do livro ${livro.nomeLivro}]:`,
                    erroLivro.message,
                );
                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Erro Interno na Requisição',
                    conteudo: [],
                };
            }
        });

        const bibliotecaCompleta = await Promise.all(promessas);
        return res.status(200).json(bibliotecaCompleta);
    } catch (error) {
        console.error('💥 ERRO CRÍTICO NO CATCH PRINCIPAL:', error.message);
        return res.status(500).json({ erro: 'Erro crítico no servidor.', detalhe: error.message });
    }
};


export const buscarPorIdOriginal = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const idBuscado = parseInt(id);

        const endpointsLivros = [
            {
                nomeLivro: 'Capitães da Areia',
                urlCompleta: 'https://readflow-m8o6.onrender.com/api/livros',
                apiKey: process.env.KEY_LIVRO_CAPITAES_DA_AREIA,
            },
            {
                nomeLivro: 'O Guarani',
                urlCompleta: 'https://bookpedia-backend-4ab3.onrender.com/livros',
                apiKey: process.env.KEY_LIVRO_O_GUARANI,
            },
            {
                nomeLivro: 'Quartos de despejo',
                urlCompleta: 'https://backend-projeto-integrador-rana.onrender.com/api/livro',
                apiKey: process.env.KEY_LIVRO_QUARTOS_DESPEJO,
            },
            {
                nomeLivro: 'Memórias Póstumas de Brás Cubas',
                urlCompleta: 'https://projeto-clubyx.onrender.com/livros',
                apiKey: process.env.KEY_LIVRO_MEMORIAS,
            },
        ];

        // 2. Dispara a busca em paralelo nas APIs parceiras
        const promessas = endpointsLivros.map(async (livro) => {
            try {
                if (!livro.urlCompleta || !livro.apiKey) return null;

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': livro.apiKey,
                    },
                });

                if (!resposta.ok) return null;

                const dadosBrutos = await resposta.json();
                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [];

                // Procura se o ID original desejado está nesta API específica
                const itemEncontrado = listaDeLivros.find((item) => {
                    const idOriginal =
                        item.id ||
                        item._id ||
                        item.idDoLivro ||
                        (Array.isArray(item.autor) && item.autor[0]?.idDoLivro) ||
                        (Array.isArray(item.autor) && item.autor[0]?.id);

                    return parseInt(idOriginal) === idBuscado;
                });

                if (!itemEncontrado) return null;

                // 3. Caso encontre, formata o objeto seguindo o mesmo padrão da listagem
                return {
                    idOrigin: idBuscado,
                    titulo:
                        itemEncontrado.titulo ||
                        itemEncontrado.title ||
                        itemEncontrado.tituloDoLivro ||
                        itemEncontrado.tituloPT ||
                        itemEncontrado.nome ||
                        'Título não informado',
                    autor:
                        itemEncontrado.autor ||
                        itemEncontrado.author ||
                        itemEncontrado.autores ||
                        'Autor não informado',
                    capa_url:
                        itemEncontrado.capa ||
                        itemEncontrado.image ||
                        itemEncontrado.capaURL ||
                        itemEncontrado.foto ||
                        itemEncontrado.capa_url ||
                        null,
                    ano:
                        itemEncontrado.ano ||
                        itemEncontrado.year ||
                        itemEncontrado.anoPublicacao ||
                        itemEncontrado.publicacao ||
                        'N/A',
                    genero_pt:
                        itemEncontrado.genero_pt ||
                        itemEncontrado.genero ||
                        itemEncontrado.generoPT ||
                        'Gênero não informado',
                    genero_en:
                        itemEncontrado.genero_en ||
                        itemEncontrado.genre ||
                        itemEncontrado.generoEN ||
                        'Genre not informed',
                    enredo_pt:
                        itemEncontrado.enredo_pt || itemEncontrado.resumo || itemEncontrado.sinopse || 'Enredo não informado',
                    enredo_en:
                        itemEncontrado.enredo_en ||
                        itemEncontrado.description ||
                        itemEncontrado.resumoEn ||
                        'Description not informed',
                };
            } catch (error) {
                return null; // Ignora falhas individuais de APIs externas na busca por ID
            }
        });

        const resultados = await Promise.all(promessas);

        // Remove os valores nulos do array de resultados
        const livroFinal = resultados.find((livro) => livro !== null);

        // 4. Validação caso nenhum ID correspondente tenha sido retornado pelas APIs parceiras
        if (!livroFinal) {
            return res.status(404).json({ error: 'Membro não encontrado.' }); // Mantido o padrão textual solicitado
        }

        // 5. Retorno de sucesso com o padrão de envelopamento { data: membro }
        return res.status(200).json({ data: livroFinal });
    } catch (error) {
        console.error('Erro ao buscar membro por ID original:', error);
        return res.status(500).json({ error: 'Erro ao buscar membro.' });
    }
};
