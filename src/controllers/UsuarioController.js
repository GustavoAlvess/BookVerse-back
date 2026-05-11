import UsuarioModel from '../models/UsuarioModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            nome,
            objetivo,
            curso,
            fotoURL,
        } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        if (!objetivo) {
            return res.status(400).json({ error: 'O campo "objetivo" é obrigatório!' });
        }

        if (!curso) {
            return res.status(400).json({ error: 'O campo "curso" é obrigatório!' });
        }
        if (!fotoURL) {
            return res.status(400).json({ error: 'O campo "fotoURL" é obrigatório!' });
        }

        const membro = new EquipeModel({
            nome,
            objetivo,
            curso,
            fotoURL,
        });
        const data = await membro.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const membros = await EquipeModel.buscarTodos(req.query);

        if (!membros || membros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(membros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar membros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const membro = await EquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({ error: 'Membro não encontrado.' });
        }

        return res.status(200).json({ data: membro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar membro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const membro = await EquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) membro.nome = req.body.nome;

        if (req.body.objetivo !== undefined) membro.objetivo = req.body.objetivo;

        if (req.body.curso !== undefined) membro.curso = req.body.curso;

        if (req.body.fotoURL !== undefined) membro.fotoURL = req.body.fotoURL;


        const data = await membro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const membro = await EquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await membro.deletar();

        return res.status(200).json({
            message: `O registro "${membro.nome}" foi deletado com sucesso!`,
            deletado: membro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
