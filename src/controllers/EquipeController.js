import EquipeModel from '../models/EquipeModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }
        const { nome, objetivo, curso, fotoURL } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (!objetivo ) {
            return res.status(400).json({ error: 'O campo "objetivo" é obrigatório!' });
        }
        if (!curso ) {
            return res.status(400).json({ error: 'O campo "curso" é obrigatório!' });
        }
        if (!fotoURL ) {
            return res.status(400).json({ error: 'O campo "fotoURL" é obrigatório!' });
        }

        const membroExistente = await EquipeModel.buscarTodos({ nome });

        if (membroExistente && membroExistente.length > 0) {
            return res.status(400).json({
                error: `O membro "${nome}" já está cadastrado no sistema!`
            });
        }

        const membro = new EquipeModel({
            nome,
            objetivo,
            curso,
            fotoURL

        });

        const data = await membro.criar();

        return res.status(201).json({ message: 'Membro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar membro:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o membro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const membros = await EquipeModel.buscarTodos(req.query);

        if (!membros || membros.length === 0) {
            return res.status(404).json({ message: 'Nenhum personagem encontrado.' });
        }

        return res.status(200).json(membros);
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagens.' });
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
        console.error('Erro ao buscar membro:', error);
        return res.status(500).json({ error: 'Erro ao buscar membro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const membro = await EquipeModel.buscarPorId(parseInt(id));
        membro.nome = nome;

        if (!membro) {
            return res.status(404).json({ error: 'Membro não encontrado para atualizar.' });
        }
        if (nome !== undefined && nome !== membro.nome) {

            const duplicado = await EquipeModel.buscarTodos({ nome });

            if (duplicado && duplicado.length > 0) {
                return res.status(400).json({
                    error: `Não é possível mudar para o nome "${nome}", pois outro membro já o utiliza!`
                });
            }
        }


        if (req.body.nome !== undefined) membro.nome = req.body.nome;
        if (req.body.objetivo !== undefined) membro.objetivo = req.body.objetivo;
        if (req.body.curso !== undefined) membro.curso = req.body.curso;
        if (req.body.fotoURL !== undefined) membro.fotoURL = req.body.fotoURL;

        const data = await membro.atualizar();

        return res.status(200).json({ message: `O membro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar membro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar membro.' });
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
            return res.status(404).json({ error: 'Membro não encontrado para deletar.' });
        }

        await membro.deletar();

        return res.status(200).json({
            message: `O membro "${membro.nome}" foi deletado com sucesso!`,
            deletado: membro
        });
    } catch (error) {
        console.error('Erro ao deletar membro:', error);
        return res.status(500).json({ error: 'Erro ao deletar membro.' });
    }
};
