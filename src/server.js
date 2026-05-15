import express from 'express';
import 'dotenv/config';
import LivroRoute from './routes/LivroRoute.js';
import PersonagemRoute from './routes/PersonagemRoute.js'
import simuladoRoutes from "./routes/simuladoRoutes.js";
import CuriosidadeRoute from './routes/CuriosidadeRoute.js';
import EquipeRoute from './routes/EquipeRoute.js';
import UsuarioRoute from './routes/UsuarioRoute.js';
import ApiKey from './lib/middlewares/ApiKey.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'x-api-key'],
    }),
);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/livros',ApiKey, LivroRoute);
app.use('/personagem',ApiKey, PersonagemRoute);
app.use("/simulados",ApiKey, simuladoRoutes);
app.use('/curiosidades',ApiKey, CuriosidadeRoute);
app.use('/membros',ApiKey, EquipeRoute);
app.use('/usuarios',ApiKey, UsuarioRoute);
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
