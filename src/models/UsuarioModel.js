import prisma from '../lib/services/prismaClient.js';

export default class UsuarioModel {
    constructor({ id = null, nome, email, senha_hash } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha_hash = senha_hash;
    }

    async criar() {
        return prisma.usuario.create({
            data: {
                nome: this.nome,
                email: this.email,
                senha_hash: this.senha_hash,
            },
        });
    }

    async atualizar() {
        return prisma.usuario.update({
            where: { id: parseInt(this.id) },
            data: {
                nome: this.nome,
                email: this.email,
                senha_hash: this.senha_hash,
            },
        });
    }

    async deletar() {
        return prisma.usuario.delete({
            where: { id: parseInt(this.id) },
        });
    }
    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        return prisma.usuario.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) return null;

        return new UsuarioModel(data);
    }
}
