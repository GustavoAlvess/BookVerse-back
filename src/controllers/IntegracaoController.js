export const obterBibliotecaCompleta = async (req, res) => {
  try {
    const endpointsLivros = [
      {
        nomeLivro: "Capitães da Areia",
        urlCompleta: "https://readflow-m8o6.onrender.com/api/livros",
        apiKey: process.env.KEY_LIVRO_CAPITAES_DA_AREIA,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "O Guarani",
        urlCompleta: "https://bookpedia-backend-4ab3.onrender.com/livros",
        apiKey: process.env.KEY_LIVRO_O_GUARANI,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "Quartos de despejo",
        urlCompleta:
          "https://backend-projeto-integrador-rana.onrender.com/api/livro",
        apiKey: process.env.KEY_LIVRO_QUARTOS_DESPEJO,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "Memórias Póstumas de Brás Cubas",
        urlCompleta: "https://projeto-clubyx.onrender.com/livros",
        apiKey: process.env.KEY_LIVRO_MEMORIAS,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "Os Ratos",
        urlCompleta:"https://ratsjs.onrender.com/api/livros",
        apiKey: process.env.KEY_OS_RATOS,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "A Moreninha",
        urlCompleta:"https://clubelivro-backend.onrender.com/api/livros",
        apiKey: process.env.KEY_MORENINHA,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "O Caminho de Pedras",
        urlCompleta:"https://devstones-backend.onrender.com/api/livro",
        apiKey: process.env.KEY_CAMINHO,
        tipoAuth: "x-api-key",
      },
      {
        nomeLivro: "Olhos d'Água",
        urlCompleta:"https://olhosdagua.onrender.com/api/livro",
        apiKey: process.env.KEY_OLHOS,
        tipoAuth: "x-api-key",
      },
    ];

    console.log(
      `Total de livros cadastrados no array: ${endpointsLivros.length}`,
    );

    const promessas = endpointsLivros.map(async (livro, index) => {
      console.log(
        `[Índice ${index}] Iniciando processo para: ${livro.nomeLivro}`,
      );

      try {
        if (!livro.urlCompleta || !livro.apiKey) {
          console.log(
            `[Índice ${index}] Erro: URL ou Key faltando para ${livro.nomeLivro}`,
          );
          return {
            livro: livro.nomeLivro,
            statusApi: "Configuração Ausente",
            conteudo: [],
          };
        }

        const resposta = await fetch(livro.urlCompleta, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": livro.apiKey,
          },
        });

        if (!resposta.ok) { // usando ".ok" para retornar true todo status http entre 200 e 299 e false para erros
          return {
            livro: livro.nomeLivro,
            statusApi: `Erro HTTP ${resposta.status}`,
            conteudo: [],
          };
        }

        const dadosBrutos = await resposta.json();
        const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [];

        const dadosFormatados = listaDeLivros.map((item) => {
          const idOriginal =
            item.id ||
            item._id ||
            item.idDoLivro ||
            (Array.isArray(item.autor) && item.autor[0]?.idDoLivro) ||
            (Array.isArray(item.autor) && item.autor[0]?.id) ||
            null;

          return {
            idOrigin: idOriginal,
            titulo:
              item.titulo ||
              item.title ||
              item.tituloDoLivro ||
              item.tituloPT ||
              item.nome ||
              "Título não informado",
            autor:
              item.autor ||
              item.author ||
              item.autores ||
              "Autor não informado",
            capa_url:
              item.capa ||
              item.image ||
              item.capaURL ||
              item.foto ||
              item.capa_url ||
              null,
            ano:
              item.ano ||
              item.year ||
              item.anoPublicacao ||
              item.publicacao ||
              "N/A",
            genero_pt:
              item.genero_pt ||
              item.genero ||
              item.generoPT ||
              "Gênero não informado",
            genero_en:
              item.genero_en ||
              item.genre ||
              item.generoEN ||
              "Genre not informed",
            enredo_pt: item.enredo_pt || item.resumo || "Enredo não informado",
            enredo_en:
              item.enredo_en ||
              item.description ||
              item.resumoEn || 
              item.resumo_en ||
              "Description not informed",
          };
        });

        return {
          id: index + 1, // indice começa do zero e quero que no meu json comece do 1
          livro: livro.nomeLivro,
          statusApi: "Online",
          conteudo: dadosFormatados,
        };
      } catch (erroLivro) {
        console.error(
          `🚨 [Erro interno no mapa do livro ${livro.nomeLivro}]:`,
          erroLivro.message,
        );
        return {
          livro: livro.nomeLivro,
          statusApi: "Erro Interno na Requisição",
          conteudo: [],
        };
      }
    });

    const bibliotecaCompleta = await Promise.all(promessas);
    return res.status(200).json(bibliotecaCompleta);
  } catch (error) {
    console.error("💥 ERRO CRÍTICO NO CATCH PRINCIPAL:", error.message);
    return res
      .status(500)
      .json({ erro: "Erro crítico no servidor.", detalhe: error.message });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const idInteiro = parseInt(id);
    let urlCompleta = "";
    let apiKey = "";
    let nomeLivro = "";

    switch (idInteiro) {
      case 1:
        nomeLivro = "Capitães da Areia";
        urlCompleta = "https://readflow-m8o6.onrender.com/api/livros";
        apiKey = process.env.KEY_LIVRO_CAPITAES_DA_AREIA;
        break;
      case 2:
        nomeLivro = "O Guarani";
        urlCompleta = "https://bookpedia-backend-4ab3.onrender.com/livros";
        apiKey = process.env.KEY_LIVRO_O_GUARANI;
        break;
      case 3:
        nomeLivro = "Quartos de despejo";
        urlCompleta =
          "https://backend-projeto-integrador-rana.onrender.com/api/livro";
        apiKey = process.env.KEY_LIVRO_QUARTOS_DESPEJO;
        break;
      case 4:
        nomeLivro = "Memórias Póstumas de Brás Cubas";
        urlCompleta = "https://projeto-clubyx.onrender.com/livros";
        apiKey = process.env.KEY_LIVRO_MEMORIAS;
        break;
      case 5:
        nomeLivro = "Os Ratos";
        urlCompleta = "https://ratsjs.onrender.com/api/livros";
        apiKey = process.env.KEY_OS_RATOS;
        break;
      case 6:
        nomeLivro = "A Moreninha";
        urlCompleta = "https://clubelivro-backend.onrender.com/api/livros";
        apiKey = process.env.KEY_MORENINHA;
        break;
      case 7:
        nomeLivro = "O Caminho das Pedras";
        urlCompleta = "https://devstones-backend.onrender.com/api/livro";
        apiKey = process.env.KEY_CAMINHO;
        break;
      case 8:
        nomeLivro = "Olhos d'Água";
        urlCompleta = "https://olhosdagua.onrender.com/api/livro";
        apiKey = process.env.KEY_OLHOS;
        break;
      default:
        return res
          .status(404)
          .json({ error: "Livro não encontrado na integração." });
    }

    if (!urlCompleta || !apiKey) {
      return res
        .status(500)
        .json({ error: `Configuração ausente para o livro: ${nomeLivro}` });
    }

    console.log(`[Switch ID ${idInteiro}] Buscando dados em: ${urlCompleta}`); // mstrando no console.log para retorno se realmente está buscando na api externa
    const resposta = await fetch(urlCompleta, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });

    if (!resposta.ok) {
      return res
        .status(resposta.status)
        .json({
          error: `Erro na API parceira (${nomeLivro}): HTTP ${resposta.status}`,
        });
    }

    const dadosBrutos = await resposta.json();
    const listaDeLivros = Array.isArray(dadosBrutos)
      ? dadosBrutos
      : [dadosBrutos];

    const item = listaDeLivros[0];

    if (!item) {
      return res
        .status(404)
        .json({ error: "Nenhum conteúdo retornado pela API parceira." });
    }

    // captando id original da api externa
    const idOriginal =
      item.id ||
      item._id ||
      item.idDoLivro ||
      (Array.isArray(item.autor) && item.autor[0]?.idDoLivro) ||
      null;

    // formatando dados
    const dadosFormatados = {
      idOrigin: idOriginal,
      titulo:
        item.titulo ||
        item.title ||
        item.tituloDoLivro ||
        item.tituloPT ||
        item.nome ||
        "Título não informado",
      autor: item.autor || item.author || item.autores || "Autor não informado",
      capa_url:
        item.capa ||
        item.image ||
        item.capaURL ||
        item.foto ||
        item.capa_url ||
        null,
      ano:
        item.ano || item.year || item.anoPublicacao || item.publicacao || "N/A",
      genero_pt:
        item.genero_pt ||
        item.genero ||
        item.generoPT ||
        "Gênero não informado",
      genero_en:
        item.genero_en || item.genre || item.generoEN || "Genre not informed",
      enredo_pt: item.enredo_pt || item.resumo || item.descricao_pt || "Enredo não informado",
      enredo_en:
        item.enredo_en ||
        item.description ||
        item.resumoEn || 
        item.descricao_en ||
        item.resumo_en ||
        "Description not informed",
    };

    return res.status(200).json({ data: dadosFormatados });
  } catch (error) {
    console.error("Erro no controller buscarPorId:", error);
    return res.status(500).json({ error: "Erro ao buscar membro." });
  }
};
