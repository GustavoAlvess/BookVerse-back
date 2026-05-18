import prisma from "../lib/services/prismaClient.js";

export default class SimuladoModel {
  constructor({
    id = null,
    livro_id,
    pergunta_pt,
    pergunta_en,
    opcao_a,
    opcao_b,
    opcao_c,
    opcao_d,
    resposta_correta,
    explicacao_pt = null,
    explicacao_en = null,
  } = {}) {
    this.id = id;
    this.livro_id = livro_id;
    this.pergunta_pt = pergunta_pt;
    this.pergunta_en = pergunta_en;
    this.opcao_a = opcao_a;
    this.opcao_b = opcao_b;
    this.opcao_c = opcao_c;
    this.opcao_d = opcao_d;
    this.resposta_correta = resposta_correta?.toUpperCase();
    this.explicacao_pt = explicacao_pt;
    this.explicacao_en = explicacao_en;
  }

  async criar() {
    return prisma.simulado.create({
      data: {
        livro_id: parseInt(this.livro_id),
        pergunta_pt: this.pergunta_pt,
        pergunta_en: this.pergunta_en,
        opcao_a: this.opcao_a,
        opcao_b: this.opcao_b,
        opcao_c: this.opcao_c,
        opcao_d: this.opcao_d,
        resposta_correta: this.resposta_correta,
        explicacao_pt: this.explicacao_pt,
        explicacao_en: this.explicacao_en,
      },
    });
  }

  static async buscarTodos(filtros = {}) {
    const where = {};
    if (filtros.livro_id) where.livro_id = parseInt(filtros.livro_id);
    return prisma.simulado.findMany({ where });
  }

  static async buscarPorId(id) {
    const data = await prisma.simulado.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) return null;
    return new SimuladoModel(data);
  }

  async atualizar() {
    return prisma.simulado.update({
      where: { id: parseInt(this.id) },
      data: {
        pergunta_pt: this.pergunta_pt,
        pergunta_en: this.pergunta_en,
        opcao_a: this.opcao_a,
        opcao_b: this.opcao_b,
        opcao_c: this.opcao_c,
        opcao_d: this.opcao_d,
        resposta_correta: this.resposta_correta,
        explicacao_pt: this.explicacao_pt,
        explicacao_en: this.explicacao_en,
      },
    });
  }

  async deletar() {
    return prisma.simulado.delete({ where: { id: parseInt(this.id) } });
  }
}
