import SimuladoModel from "../models/SimuladoModel.js";

export const criar = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Corpo da requisição vazio!" });
    }

    const {
      livro_id,
      pergunta_pt,
      pergunta_en,
      opcao_a,
      opcao_b,
      opcao_c,
      opcao_d,
      resposta_correta,
      explicacao_pt,
      explicacao_en,
    } = req.body;

    if (
      !livro_id ||
      !pergunta_pt ||
      !resposta_correta ||
      !opcao_a ||
      !opcao_b
    ) {
      return res
        .status(400)
        .json({ error: "Faltam dados obrigatórios para o simulado!" });
    }

    const respostaFormatada = resposta_correta.toUpperCase();
    const opcoesValidas = ["A", "B", "C", "D"];
    if (!opcoesValidas.includes(respostaFormatada)) {
      return res
        .status(400)
        .json({ error: "A resposta correta deve ser A, B, C ou D!" });
    }

    const questoesExistentes = await SimuladoModel.buscarTodos({ livro_id });
    const perguntaJaExiste = questoesExistentes.some(
      (q) => q.pergunta_pt === pergunta_pt,
    );
    if (perguntaJaExiste) {
      return res
        .status(400)
        .json({ error: "Esta pergunta já está cadastrada para este livro!" });
    }

    const simulado = new SimuladoModel({
      livro_id,
      pergunta_pt,
      pergunta_en,
      opcao_a,
      opcao_b,
      opcao_c,
      opcao_d,
      resposta_correta: respostaFormatada,
      explicacao_pt,
      explicacao_en,
    });

    const data = await simulado.criar();
    return res
      .status(201)
      .json({ message: "Questão de simulado criada com sucesso!", data });
  } catch (error) {
    console.error("Erro ao criar simulado:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao salvar o simulado." });
  }
};

export const buscarTodos = async (req, res) => {
  try {
    const registros = await SimuladoModel.buscarTodos(req.query);
    if (!registros || registros.length === 0) {
      return res.status(404).json({ message: "Nenhuma questão encontrada." });
    }
    return res.status(200).json(registros);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar simulados." });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const simulado = await SimuladoModel.buscarPorId(parseInt(id));
    if (!simulado)
      return res.status(404).json({ error: "Questão não encontrada." });

    return res.status(200).json({ data: simulado });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar questão." });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const simulado = await SimuladoModel.buscarPorId(parseInt(id));
    if (!simulado)
      return res
        .status(404)
        .json({ error: "Questão não encontrada para atualizar." });

    if (req.body.resposta_correta !== undefined) {
      const novaResposta = req.body.resposta_correta.toUpperCase();
      if (!["A", "B", "C", "D"].includes(novaResposta)) {
        return res
          .status(400)
          .json({ error: "A resposta deve ser A, B, C ou D!" });
      }
      simulado.resposta_correta = novaResposta;
    }

    if (
      req.body.pergunta_pt !== undefined &&
      req.body.pergunta_pt !== simulado.pergunta_pt
    ) {
      const duplicada = await SimuladoModel.buscarTodos({
        livro_id: simulado.livro_id,
      });
      if (duplicada.some((q) => q.pergunta_pt === req.body.pergunta_pt)) {
        return res
          .status(400)
          .json({ error: "Já existe outra questão com este enunciado!" });
      }
      simulado.pergunta_pt = req.body.pergunta_pt;
    }

    if (req.body.pergunta_en !== undefined)
      simulado.pergunta_en = req.body.pergunta_en;
    if (req.body.opcao_a !== undefined) simulado.opcao_a = req.body.opcao_a;
    if (req.body.opcao_b !== undefined) simulado.opcao_b = req.body.opcao_b;
    if (req.body.opcao_c !== undefined) simulado.opcao_c = req.body.opcao_c;
    if (req.body.opcao_d !== undefined) simulado.opcao_d = req.body.opcao_d;
    if (req.body.explicacao_pt !== undefined)
      simulado.explicacao_pt = req.body.explicacao_pt;
    if (req.body.explicacao_en !== undefined)
      simulado.explicacao_en = req.body.explicacao_en;

    const data = await simulado.atualizar();
    return res
      .status(200)
      .json({ message: "Questão atualizada com sucesso!", data });
  } catch (error) {
    console.error("Erro ao atualizar simulado:", error);
    return res.status(500).json({ error: "Erro ao atualizar questão." });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const simulado = await SimuladoModel.buscarPorId(parseInt(id));
    if (!simulado)
      return res.status(404).json({ error: "Questão não encontrada." });

    await simulado.deletar();
    return res.status(200).json({ message: "Questão deletada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar questão." });
  }
};
