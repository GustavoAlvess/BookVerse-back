import CuriosidadeModel from '../models/CuriosidadeModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { livro_id, titulo_pt, titulo_en, conteudo_pt, conteudo_en, categoria } = req.body;

        if (!livro_id || !titulo_pt || !titulo_en || !conteudo_pt || !conteudo_en) {
            return res.status(400).json({ error: 'Todos os campos de título e conteúdo (PT/EN) são obrigatórios!' });
        }
        const existentes = await CuriosidadeModel.buscarTodos({ livro_id });
        if (existentes.some(c => c.titulo_pt.toLowerCase() === titulo_pt.toLowerCase())) {
            return res.status(400).json({ error: `A curiosidade "${titulo_pt}" já existe para este livro!` });
        }

        const curiosidade = new CuriosidadeModel({
            livro_id, titulo_pt, titulo_en, conteudo_pt, conteudo_en, categoria
        });

        const data = await curiosidade.criar();
        return res.status(201).json({ message: 'Curiosidade criada com sucesso!', data });

    } catch (error) {
        console.error('Erro ao criar curiosidade:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar curiosidade.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await CuriosidadeModel.buscarTodos(req.query);
        return res.status(200).json(registros);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar curiosidades.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curiosidade = await CuriosidadeModel.buscarPorId(id);
        if (!curiosidade) return res.status(404).json({ error: 'Curiosidade não encontrada.' });
        return res.status(200).json(curiosidade);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar curiosidade.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const curiosidade = await CuriosidadeModel.buscarPorId(id);

        if (!curiosidade) return res.status(404).json({ error: 'Curiosidade não encontrada.' });

        if (req.body.titulo_pt && req.body.titulo_pt !== curiosidade.titulo_pt) {
            const existentes = await CuriosidadeModel.buscarTodos({ livro_id: curiosidade.livro_id });
            if (existentes.some(c => c.titulo_pt === req.body.titulo_pt)) {
                return res.status(400).json({ error: 'Já existe outra curiosidade com este título.' });
            }
            curiosidade.titulo_pt = req.body.titulo_pt;
        }

        if (req.body.titulo_en) curiosidade.titulo_en = req.body.titulo_en;
        if (req.body.conteudo_pt) curiosidade.conteudo_pt = req.body.conteudo_pt;
        if (req.body.conteudo_en) curiosidade.conteudo_en = req.body.conteudo_en;
        if (req.body.categoria) curiosidade.categoria = req.body.categoria;

        const data = await curiosidade.atualizar();
        return res.status(200).json({ message: 'Curiosidade atualizada!', data });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar curiosidade.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const curiosidade = await CuriosidadeModel.buscarPorId(id);
        if (!curiosidade) return res.status(404).json({ error: 'Curiosidade não encontrada.' });

        await curiosidade.deletar();
        return res.status(200).json({ message: 'Curiosidade removida com sucesso!' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar curiosidade.' });
    }
};
