import prisma from '../lib/services/prismaClient.js';

export default class EquipeModel {
    constructor({ id = null, nome, objetivo, curso, fotoURL } = {}) {
        this.id = id;
        this.nome = nome;
        this.objetivo = objetivo;
        this.curso = curso;
        this.fotoURL = fotoURL;
    }

    validar() {

        // usando o trim para tirar os espaços vazios e garantir que o campo tenha pelo menos 1 caractere visível

        if (!this.nome || this.nome.trim() === '') {
            throw new Error('O campo "nome" é obrigatório!');
        }
        if (!this.objetivo || this.objetivo.trim() === '') {
            throw new Error('O campo "objetivo" é obrigatório!');
        }
        if (!this.curso || this.curso.trim() === '') {
            throw new Error('O campo "curso" é obrigatório!');
        }
        if (!this.fotoURL || this.fotoURL.trim() === '') {
            throw new Error('O campo "fotoURL" é obrigatório!');
        }

    }

    async criar() {

        this.validar();

        const existente = await prisma.equipe.findFirst({
            where: {
                nome: this.nome,
            },
        });

        if (existente) {
            throw new Error('Este membro já está cadastrado no sistema!');
        }

        return prisma.equipe.create({
            data: {
                nome: this.nome,
                objetivo: this.objetivo,
                curso: this.curso,
                fotoURL: this.fotoURL,
            },
        });
    }

    async atualizar() {

         this.validar();

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
        return prisma.equipe.delete({
            where: { id: parseInt(this.id) },
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
        const data = await prisma.equipe.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) return null;

        return new EquipeModel(data);
    }
}
