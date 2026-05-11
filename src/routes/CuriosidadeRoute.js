import { Router } from 'express';
import * as CuriosidadeController from '../controllers/CuriosidadeController.js';

const router = Router();

router.post('/', CuriosidadeController.criar);
router.get('/', CuriosidadeController.buscarTodos);
router.get('/:id', CuriosidadeController.buscarPorId);
router.put('/:id', CuriosidadeController.atualizar);
router.delete('/:id', CuriosidadeController.deletar);

export default router;