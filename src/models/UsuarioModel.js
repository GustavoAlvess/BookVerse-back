import prisma from '../lib/services/prismaClient.js';

export default class EquipeModel {
    constructor({ id = null, nome, objetivo, curso, fotoURL } = {}) {
        this.id = id;
        this.nome = nome;
        this.objetivo = objetivo;
        this.curso = curso;
        this.fotoURL = fotoURL;
    }

    async criar() {
        return prisma.equipe.create({
            data: {
                nome: this.nome,
                objetivo: this.objetivo,
                curso: this.curso,
                fotoURL: this.fotoURL,
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.curso) {
            where.curso = { contains: filtros.curso, mode: 'insensitive' };
        }
        return prisma.equipe.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.equipe.findUnique({ where: { id: parseInt(id) } });
        if (!data) return null;
        return new EquipeModel(data);
    }

    async atualizar() {
        return prisma.equipe.update({
            where: { id: parseInt(this.id) },
            data: {
                nome: this.nome,
                objetivo: this.objetivo,
                curso: this.curso,
                fotoURL: this.fotoURL,
            },
        });
    }

    async deletar() {
        return prisma.equipe.delete({ where: { id: parseInt(this.id) } });
    }
}
