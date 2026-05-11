import prisma from '../lib/services/prismaClient.js';

export default class CuriosidadeModel {
    constructor({
        id = null,
        livro_id,
        titulo_pt,
        titulo_en,
        conteudo_pt,
        conteudo_en,
        categoria_pt,
        categoria_en
    } = {}) {
        this.id = id;
        this.livro_id = livro_id;
        this.titulo_pt = titulo_pt;
        this.titulo_en = titulo_en;
        this.conteudo_pt = conteudo_pt;
        this.conteudo_en = conteudo_en;
        this.categoria_pt = categoria_pt;
        this.categoria_en = categoria_en;
    }

    async criar() {
        return prisma.curiosidade.create({
            data: {
                livro_id: parseInt(this.livro_id),
                titulo_pt: this.titulo_pt,
                titulo_en: this.titulo_en,
                conteudo_pt: this.conteudo_pt,
                conteudo_en: this.conteudo_en,
                categoria_pt: this.categoria_pt,
                categoria_en: this.categoria_en,
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        if (filtros.livro_id) where.livro_id = parseInt(filtros.livro_id);
        return prisma.curiosidade.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.curiosidade.findUnique({ where: { id: parseInt(id) } });
        if (!data) return null;
        return new CuriosidadeModel(data);
    }

    async atualizar() {
        return prisma.curiosidade.update({
            where: { id: parseInt(this.id) },
            data: {
                titulo_pt: this.titulo_pt,
                titulo_en: this.titulo_en,
                conteudo_pt: this.conteudo_pt,
                categoria_pt: this.categoria_pt,
                categoria_en: this.categoria_en,
            },
        });
    }

    async deletar() {
        return prisma.curiosidade.delete({ where: { id: parseInt(this.id) } });
    }
}
