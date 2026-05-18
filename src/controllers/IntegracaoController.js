export const obterBibliotecaCompleta = async (req, res) => {
    try {
        // CADASTRO DE LIVROS: Sempre que quiser adicionar um grupo novo,
        // basta criar um novo objeto {} aqui dentro da lista separando por vírgula.
        const endpointsLivros = [
            {
                nomeLivro: 'Capitães da Areia',
                urlCompleta: 'https://readflow-m8o6.onrender.com/api/livros',
                apiKey: process.env.KEY_LIVRO_CAPITAES_DA_AREIA,
            }
            /* Exemplo de como adicionar o próximo:
            ,{
                nomeLivro: 'Dom Casmurro',
                urlCompleta: 'https://link-do-outro-grupo.onrender.com/api/dados',
                apiKey: process.env.KEY_LIVRO_DOM_CASMURRO,
            }
            */
        ];

        // Mapeia cada livro e executa todas as requisições em paralelo
        const promessas = endpointsLivros.map(async (livro) => {
            try {
                // Validação de segurança: se faltar a URL ou a chave no .env, avisa no log
                if (!livro.urlCompleta || !livro.apiKey) {
                    throw new Error('Configuração de URL ou API Key ausente para este livro no arquivo .env.');
                }

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': livro.apiKey, // Certifique-se na documentação se eles esperam 'x-api-key' ou 'Authorization'
                    },
                });

                // Se a API externa retornar erro (como 401 não autorizado ou 404), captura aqui
                if (!resposta.ok) {
                    throw new Error(`Erro na API externa - Status: ${resposta.status}`);
                }

                const dadosBrutos = await resposta.json();

                const dadosFormatados = dadosBrutos.map((item) => {
                    return {
                        titulo: item.titulo || item.title || 'Título não informado',
                        autor: item.autor || item.author || 'Autor não informado',
                        capa_url: item.capa || item.image || item.cover || item.url_capa || null,
                        ano: item.ano || item.year || item.ano_publicacao || 'N/A',

                        // Gênero em PT e EN
                        genero_pt:
                            item.genero_pt ||
                            item.genero ||
                            'Gênero não informado',
                        genero_en:
                            item.genero_en || item.genre || 'Genre not informed',

                        // Enredo em PT e EN
                        enredo_pt:
                            item.enredo_pt ||
                            item.resumo ||
                            item.sinopse ||
                            'Enredo não informado',
                        enredo_en:
                            item.enredo_en ||
                            item.description ||
                            'Description not informed',
                    };
                });

                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };

            } catch (erroLivro) {
                // Tratamento individual: Se uma API cair ou der erro, o servidor não quebra.
                // Esse livro específico fica como "Indisponível", mas o resto continua carregando.
                console.error(`[Erro de Integração] Falha ao acessar o livro "${livro.nomeLivro}":`, erroLivro.message);

                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Indisponível',
                    conteudo: null,
                };
            }
        });

        // Aguarda todas as promessas serem resolvidas juntas
        const bibliotecaCompleta = await Promise.all(promessas);

        // Retorna o array unificado para o seu Front-end
        return res.status(200).json(bibliotecaCompleta);
    } catch (error) {
        console.error('Erro crítico no servidor centralizador:', error.message);
        return res.status(500).json({ erro: 'Erro interno ao processar a biblioteca integrada.' });
    }
};
