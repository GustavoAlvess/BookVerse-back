import { Router } from 'express';
import { buscarPorId, obterBibliotecaCompleta } from '../controllers/IntegracaoController.js';

const router = Router();

// Rota de teste
router.get('/', obterBibliotecaCompleta);
router.get('/:id', buscarPorId);

export default router;
