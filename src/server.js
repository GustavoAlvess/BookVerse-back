import express from 'express';
import 'dotenv/config';
import LivroRoute from './routes/LivroRoute.js';
import PersonagemRoute from './routes/PersonagemRoute.js'
import simuladoRoutes from "./routes/simuladoRoutes.js";
import CuriosidadeRoute from './routes/CuriosidadeRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/livros', LivroRoute);
app.use('/personagem', PersonagemRoute);
app.use("/simulados", simuladoRoutes);
app.use('/curiosidades', CuriosidadeRoute);
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
