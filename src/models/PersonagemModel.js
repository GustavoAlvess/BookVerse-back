import prisma from "../lib/services/prismaClient.js";

export default class PersonagemModel {
  constructor({
    id = null,
    livro_id,
    nome,
    descricao_pt,
    descricao_en,
    papel = null,
    imagem_url = null,
  } = {}) {
    this.id = id;
    this.livro_id = livro_id;
    this.nome = nome;
    this.descricao_pt = descricao_pt;
    this.descricao_en = descricao_en;
    this.papel = papel;
    this.imagem_url = imagem_url;
  }

  async criar() {
    return prisma.personagem.create({
      data: {
        livro_id: parseInt(this.livro_id),
        nome: this.nome,
        descricao_pt: this.descricao_pt,
        descricao_en: this.descricao_en,
        papel: this.papel,
        imagem_url: this.imagem_url,
      },
    });
  }

  async atualizar() {
    return prisma.personagem.update({
      where: { id: parseInt(this.id) },
      data: {
        nome: this.nome,
        descricao_pt: this.descricao_pt,
        descricao_en: this.descricao_en,
        papel: this.papel,
        imagem_url: this.imagem_url,
      },
    });
  }

  async deletar() {
    return prisma.personagem.delete({
      where: { id: parseInt(this.id) },
    });
  }
  static async buscarTodos(filtros = {}) {
    const where = {};

    if (filtros.livro_id) {
      where.livro_id = parseInt(filtros.livro_id);
    }
    if (filtros.nome) {
      where.nome = { contains: filtros.nome, mode: "insensitive" };
    }

    return prisma.personagem.findMany({ where });
  }

  static async buscarPorId(id) {
    const data = await prisma.personagem.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) return null;

    return new PersonagemModel(data);
  }
}
