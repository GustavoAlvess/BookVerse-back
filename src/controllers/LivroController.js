import Livros from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            titulo,
            autor,
            genero_pt,
            genero_en,
            movimento_pt,
            movimento_en,
            descricao_pt,
            descricao_en,
            ano,
            enredo_pt,
            enredo_en,
            contexto_historico_pt,
            contexto_historico_en,
            detalhes_autor_pt,
            detalhes_autor_en,
            estilo_escrita_pt,
            estilo_escrita_en,
            verossimilhanca_pt,
            verossimilhanca_en,
            caracteristicas_literarias_pt,
            caracteristicas_literarias_en,
            conclusao_pt,
            conclusao_en,
            video_url,
            capa_url,
        } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!genero_pt && !genero_en) {
            return res
                .status(400)
                .json({ error: 'O campo "genero_pt & genero_en" é obrigatório!' });
        }
        if (!movimento_pt && !movimento_en) {
            return res
                .status(400)
                .json({ error: 'O campo "movimento_pt & movimento_en" é obrigatório!' });
        }
        if (!descricao_pt && !descricao_en) {
            return res
                .status(400)
                .json({ error: 'O campo "descricao_pt & descricao_en" é obrigatório!' });
        }
        if (ano === undefined || ano === null) {
            return res.status(400).json({ error: 'O campo "ano" é obrigatório!' });
        }

        const livro = new Livros({
            titulo,
            autor,
            genero_pt,
            genero_en,
            movimento_pt,
            movimento_en,
            descricao_pt,
            descricao_en,
            ano: parseFloat(ano),
            enredo_pt,
            enredo_en,
            contexto_historico_pt,
            contexto_historico_en,
            detalhes_autor_pt,
            detalhes_autor_en,
            estilo_escrita_pt,
            estilo_escrita_en,
            verossimilhanca_pt,
            verossimilhanca_en,
            caracteristicas_literarias_pt,
            caracteristicas_literarias_en,
            conclusao_pt,
            conclusao_en,
            video_url,
            capa_url,
        });
        const data = await livro.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const livros = await Livros.buscarTodos(req.query);

        if (!livros || livros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(livros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await Livros.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar Livro.' });
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

        const livro = await Livros.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) livro.titulo = req.body.titulo;

        if (req.body.autor !== undefined) livro.autor = req.body.autor;

        if (req.body.ano !== undefined) livro.ano = parseFloat(req.body.ano);

        if (req.body.genero_pt !== undefined) livro.genero_pt = req.body.genero_pt;

        if (req.body.genero_en !== undefined) livro.genero_en = req.body.genero_en;

        if (req.body.movimento_pt !== undefined) livro.movimento_pt = req.body.movimento_pt;

        if (req.body.movimento_en !== undefined) livro.movimento_en = req.body.movimento_en;

        if (req.body.descricao_pt !== undefined) livro.descricao_pt = req.body.descricao_pt;

        if (req.body.descricao_en !== undefined) livro.descricao_en = req.body.descricao_en;

        if (req.body.enredo_pt !== undefined) livro.enredo_pt = req.body.enredo_pt;

        if (req.body.enredo_en !== undefined) livro.enredo_en = req.body.enredo_en;

        if (req.body.contexto_historico_pt !== undefined)
            livro.contexto_historico_pt = req.body.contexto_historico_pt;

        if (req.body.contexto_historico_en !== undefined)
            livro.contexto_historico_en = req.body.contexto_historico_en;

        if (req.body.detalhes_autor_pt !== undefined)
            livro.detalhes_autor_pt = req.body.detalhes_autor_pt;

        if (req.body.detalhes_autor_en !== undefined)
            livro.detalhes_autor_en = req.body.detalhes_autor_en;

        if (req.body.estilo_escrita_pt !== undefined)
            livro.estilo_escrita_pt = req.body.estilo_escrita_pt;

        if (req.body.estilo_escrita_en !== undefined)
            livro.estilo_escrita_en = req.body.estilo_escrita_en;

        if (req.body.verossimilhanca_pt !== undefined)
            livro.verossimilhanca_pt = req.body.verossimilhanca_pt;

        if (req.body.verossimilhanca_en !== undefined)
            livro.verossimilhanca_en = req.body.verossimilhanca_en;

        if (req.body.caracteristicas_literarias_pt !== undefined)
            livro.caracteristicas_literarias_pt = req.body.caracteristicas_literarias_pt;

        if (req.body.caracteristicas_literarias_en !== undefined)
            livro.caracteristicas_literarias_en = req.body.caracteristicas_literarias_en;

        if (req.body.conclusao_pt !== undefined) livro.conclusao_pt = req.body.conclusao_pt;

        if (req.body.conclusao_en !== undefined) livro.conclusao_en = req.body.conclusao_en;

        if (req.body.video_url !== undefined) livro.video_url = req.body.video_url;

        if (req.body.capa_url !== undefined) livro.capa_url = req.body.capa_url;

        const data = await livro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
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

        const livro = await Livros.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({
            message: `O registro "${livro.titulo}" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
