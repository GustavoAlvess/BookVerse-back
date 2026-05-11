import UsuarioModel from '../models/UsuarioModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }
        const { nome, email, senha_hash } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (!email) {
            return res.status(400).json({ error: 'O campo "email" é obrigatório!' });
        }
        if (!senha_hash) {
            return res.status(400).json({ error: 'O campo "senha" é obrigatório!' });
        }


        const usuarioExistente = await UsuarioModel.buscarTodos({ nome });

        if (usuarioExistente && usuarioExistente.length > 0) {
            return res.status(400).json({
                error: `O usuario "${nome}" já está cadastrado no sistema!`,
            });
        }

        const usuario = new UsuarioModel({
            nome,
            email,
            senha_hash,
        });

        const data = await usuario.criar();

        return res.status(201).json({ message: 'Usuario criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar usuario:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o usuario.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.buscarTodos(req.query);

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuario encontrado.' });
        }

        return res.status(200).json(usuarios);
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

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado.' });
        }

        return res.status(200).json({ data: usuario });
    } catch (error) {
        console.error('Erro ao buscar usuario:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuario.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado para atualizar.' });
        }
        if (usuario.nome !== undefined && usuario.nome !== usuario.nome) {
            const duplicado = await UsuarioModel.buscarTodos({ nome });

            if (duplicado && duplicado.length > 0) {
                return res.status(400).json({
                    error: `Não é possível mudar para o nome "${nome}", pois outro usuario já o utiliza!`,
                });
            }
        }

        if (req.body.nome !== undefined) usuario.nome = req.body.nome;
        if (req.body.email !== undefined) usuario.email = req.body.email;
        if (req.body.senha_hash !== undefined) usuario.senha_hash = req.body.senha_hash;


        const data = await usuario.atualizar();

        return res
            .status(200)
            .json({ message: `O usuario "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return res.status(500).json({ error: 'Erro ao atualizar usuario.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado para deletar.' });
        }

        await usuario.deletar();

        return res.status(200).json({
            message: `O usuario "${usuario.nome}" foi deletado com sucesso!`,
            deletado: usuario,
        });
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return res.status(500).json({ error: 'Erro ao deletar usuario.' });
    }
};
