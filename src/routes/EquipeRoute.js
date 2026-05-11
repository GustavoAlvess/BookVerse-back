import { Router } from 'express';
import * as EquipeController from '../controllers/EquipeController.js';

const router = Router();

router.post('/', EquipeController.criar);
router.get('/', EquipeController.buscarTodos);
router.get('/:id', EquipeController.buscarPorId);
router.put('/:id', EquipeController.atualizar);
router.delete('/:id', EquipeController.deletar);

export default router;
