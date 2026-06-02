import { Router } from 'express';
import { buscarPorId, obterBibliotecaCompleta } from '../controllers/IntegracaoController.js';

const router = Router();

router.get('/', obterBibliotecaCompleta);
router.get('/:id', buscarPorId);

export default router;
