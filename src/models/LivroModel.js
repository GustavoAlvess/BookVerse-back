import prisma from '../lib/services/prismaClient.js';

export default class Livros {
    constructor({
        id = null,
        titulo,
        autor,
        genero_pt,
        genero_en,
        ano,
        movimento_pt,
        movimento_en,
        descricao_pt,
        descricao_en,
        enredo_pt = null,
        enredo_en = null,
        contexto_historico_pt = null,
        contexto_historico_en = null,
        capa_url = null,
        video_url = null,
        detalhes_autor_pt = null,
        detalhes_autor_en = null,
        estilo_escrita_pt = null,
        estilo_escrita_en = null,
        verossimilhanca_pt = null,
        verossimilhanca_en = null,
        caracteristicas_literarias_pt = null,
        caracteristicas_literarias_en = null,
        conclusao_pt = null,
        conclusao_en = null,
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero_pt = genero_pt;
        this.genero_en = genero_en;
        this.ano = ano;
        this.movimento_pt = movimento_pt;
        this.movimento_en = movimento_en;
        this.descricao_pt = descricao_pt;
        this.descricao_en = descricao_en;
        this.enredo_pt = enredo_pt;
        this.enredo_en = enredo_en;
        this.contexto_historico_pt = contexto_historico_pt;
        this.contexto_historico_en = contexto_historico_en;
        this.detalhes_autor_pt = detalhes_autor_pt;
        this.detalhes_autor_en = detalhes_autor_en;
        this.estilo_escrita_pt = estilo_escrita_pt;
        this.estilo_escrita_en = estilo_escrita_en;
        this.verossimilhanca_pt = verossimilhanca_pt;
        this.verossimilhanca_en = verossimilhanca_en;
        this.caracteristicas_literarias_pt = caracteristicas_literarias_pt;
        this.caracteristicas_literarias_en = caracteristicas_literarias_en;
        this.conclusao_pt = conclusao_pt;
        this.conclusao_en = conclusao_en;
        this.capa_url = this.capa_url;
        this.video_url = this.video_url;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                autor: this.autor,
                genero_pt: this.genero_pt,
                genero_en: this.genero_en,
                ano: this.ano,
                movimento_pt: this.movimento_pt,
                movimento_en: this.movimento_en,
                descricao_pt: this.descricao_pt,
                descricao_en: this.descricao_en,
                enredo_pt: this.enredo_pt,
                enredo_en: this.enredo_en,
                contexto_historico_pt: this.contexto_historico_pt,
                contexto_historico_en: this.contexto_historico_en,
                detalhes_autor_pt: this.detalhes_autor_pt,
                detalhes_autor_en: this.detalhes_autor_en,
                estilo_escrita_pt: this.estilo_escrita_pt,
                estilo_escrita_en: this.estilo_escrita_en,
                verossimilhanca_pt: this.verossimilhanca_pt,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicas_literarias_pt: this.caracteristicas_literarias_pt,
                caracteristicas_literarias_en: this.caracteristicas_literarias_en,
                conclusao_pt: this.conclusao_pt,
                conclusao_en: this.conclusao_en,
                capa_url: this.capa_url,
                video_url: this.video_url,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                autor: this.autor,
                genero: this.genero,
                ano: this.ano,
                movimento: this.movimento,
                descricao_pt: this.descricao_pt,
                descricao_en: this.descricao_en,
                enredo_pt: this.enredo_pt,
                enredo_en: this.enredo_en,
                contexto_historico_pt: this.contexto_historico_pt,
                contexto_historico_en: this.contexto_historico_en,
                detalhes_autor_pt: this.detalhes_autor_pt,
                detalhes_autor_en: this.detalhes_autor_en,
                estilo_escrita_pt: this.estilo_escrita_pt,
                estilo_escrita_en: this.estilo_escrita_en,
                verossimilhanca_pt: this.verossimilhanca_pt,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicas_literarias_pt: this.caracteristicas_literarias_pt,
                caracteristicas_literarias_en: this.caracteristicas_literarias_en,
                conclusao_pt: this.conclusao_pt,
                conclusao_en: this.conclusao_en,
                capa_url: this.capa_url,
                video_url: this.video_url,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }
        if (filtros.genero) {
            where.genero = { contains: filtros.genero, mode: 'insensitive' };
        }
        if (filtros.movimento) {
            where.movimento = { contains: filtros.movimento, mode: 'insensitive' };
        }
        if (filtros.ano !== undefined) {
            where.ano = parseFloat(filtros.ano);
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new Livros(data);
    }
}
