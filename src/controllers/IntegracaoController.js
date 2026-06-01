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


export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validação se o ID do seu sistema é um número
        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const idInteiro = parseInt(id);
        let urlCompleta = '';
        let apiKey = '';
        let nomeLivro = '';

        // 2. O "Switch Case" / Estrutura de Decisão para escolher a API certa
        switch (idInteiro) {
            case 1:
                nomeLivro = 'Capitães da Areia';
                urlCompleta = 'https://readflow-m8o6.onrender.com/api/livros';
                apiKey = process.env.KEY_LIVRO_CAPITAES_DA_AREIA;
                break;
            case 2:
                nomeLivro = 'O Guarani';
                urlCompleta = 'https://bookpedia-backend-4ab3.onrender.com/livros';
                apiKey = process.env.KEY_LIVRO_O_GUARANI;
                break;
            case 3:
                nomeLivro = 'Quartos de despejo';
                urlCompleta = 'https://backend-projeto-integrador-rana.onrender.com/api/livro';
                apiKey = process.env.KEY_LIVRO_QUARTOS_DESPEJO;
                break;
            case 4:
                nomeLivro = 'Memórias Póstumas de Brás Cubas';
                urlCompleta = 'https://projeto-clubyx.onrender.com/livros';
                apiKey = process.env.KEY_LIVRO_MEMORIAS;
                break;
            default:
                // Se não for nenhum dos IDs do seu array, já para aqui
                return res.status(404).json({ error: 'Livro não encontrado na integração.' });
        }

        // 3. Validação de segurança das chaves
        if (!urlCompleta || !apiKey) {
            return res
                .status(500)
                .json({ error: `Configuração ausente para o livro: ${nomeLivro}` });
        }

        // 4. Bate direto e unicamente na API parceira escolhida
        console.log(`[Switch ID ${idInteiro}] Buscando dados em: ${urlCompleta}`);
        const resposta = await fetch(urlCompleta, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (!resposta.ok) {
            return res
                .status(resposta.status)
                .json({ error: `Erro na API parceira (${nomeLivro}): HTTP ${resposta.status}` });
        }

        const dadosBrutos = await resposta.json();
        const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [dadosBrutos]; // Garante que é array

        // Como essas APIs externas trazem apenas 1 livro específico por rota, pegamos o primeiro item
        const item = listaDeLivros[0];

        if (!item) {
            return res.status(404).json({ error: 'Nenhum conteúdo retornado pela API parceira.' });
        }

        // 5. Captura o ID original que veio DELES para mandar pro front caso precise
        const idOriginal =
            item.id ||
            item._id ||
            item.idDoLivro ||
            (Array.isArray(item.autor) && item.autor[0]?.idDoLivro) ||
            null;

        // 6. Formata os dados no seu padrão do conteúdo
        const dadosFormatados = {
            idOrigin: idOriginal, // O id real deles guardado aqui
            titulo:
                item.titulo ||
                item.title ||
                item.tituloDoLivro ||
                item.tituloPT ||
                item.nome ||
                'Título não informado',
            autor: item.autor || item.author || item.autores || 'Autor não informado',
            capa_url: item.capa || item.image || item.capaURL || item.foto || item.capa_url || null,
            ano: item.ano || item.year || item.anoPublicacao || item.publicacao || 'N/A',
            genero_pt: item.genero_pt || item.genero || item.generoPT || 'Gênero não informado',
            genero_en: item.genero_en || item.genre || item.generoEN || 'Genre not informed',
            enredo_pt: item.enredo_pt || item.resumo || 'Enredo não informado',
            enredo_en:
                item.enredo_en || item.description || item.resumoEn || 'Description not informed',
        };

        // 7. Retorna envelopado no padrão { data: membro } que você usa no EquipeModel
        return res.status(200).json({ data: dadosFormatados });
    } catch (error) {
        console.error('Erro no controller buscarPorId:', error);
        return res.status(500).json({ error: 'Erro ao buscar membro.' });
    }
};
