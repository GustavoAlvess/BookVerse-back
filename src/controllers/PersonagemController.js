import PersonagemModel from '../models/PersonagemModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }
        const { livro_id, nome, descricao_pt, descricao_en, papel, imagem_url } = req.body;

        if (!livro_id) {
            return res.status(400).json({ error: 'O campo "livro_id" é obrigatório para vincular o personagem!' });
        }
        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (!descricao_pt || !descricao_en) {
            return res.status(400).json({ error: 'As descrições em PT e EN são obrigatórias (Internacionalização)!' });
        }

        const personagemExistente = await PersonagemModel.buscarTodos({ nome });
        
        if (personagemExistente && personagemExistente.length > 0) {
            return res.status(400).json({ 
                error: `O personagem "${nome}" já está cadastrado no sistema!` 
            });
        }

        const personagem = new PersonagemModel({ 
            livro_id: parseInt(livro_id), 
            nome, 
            descricao_pt, 
            descricao_en, 
            papel, 
            imagem_url 
        });
        
        const data = await personagem.criar();

        return res.status(201).json({ message: 'Personagem criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar personagem:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o personagem.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await PersonagemModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: 'Nenhum personagem encontrado.' });
        }

        return res.status(200).json(registros);
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

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }

        return res.status(200).json({ data: personagem });
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagem.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado para atualizar.' });
        }
        if (nome !== undefined && nome !== personagem.nome) {
            
            const duplicado = await PersonagemModel.buscarTodos({ nome });
            
            if (duplicado && duplicado.length > 0) {
                return res.status(400).json({ 
                    error: `Não é possível mudar para o nome "${nome}", pois outro personagem já o utiliza!` 
                });
            }
            personagem.nome = nome;
        }

        //Se quisermos atualizar o personagem, para não ter o risco de atualizar tudo e deixar alguns campos em vazios necessitamos criar esta parte do codigo na qual se algum campo estiver vazio ele mantem oque estava antes.
        if (req.body.nome !== undefined) personagem.nome = req.body.nome;
        if (req.body.descricao_pt !== undefined) personagem.descricao_pt = req.body.descricao_pt;
        if (req.body.descricao_en !== undefined) personagem.descricao_en = req.body.descricao_en;
        if (req.body.papel !== undefined) personagem.papel = req.body.papel;
        if (req.body.imagem_url !== undefined) personagem.imagem_url = req.body.imagem_url;
        if (req.body.livro_id !== undefined) personagem.livro_id = parseInt(req.body.livro_id);

        const data = await personagem.atualizar();

        return res.status(200).json({ message: `O personagem "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar personagem:', error);
        return res.status(500).json({ error: 'Erro ao atualizar personagem.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado para deletar.' });
        }

        await personagem.deletar();

        return res.status(200).json({ 
            message: `O personagem "${personagem.nome}" foi deletado com sucesso!`, 
            deletado: personagem 
        });
    } catch (error) {
        console.error('Erro ao deletar personagem:', error);
        return res.status(500).json({ error: 'Erro ao deletar personagem.' });
    }
};