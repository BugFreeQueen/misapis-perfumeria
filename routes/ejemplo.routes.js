import { Router } from 'express';
import {
  getAllEjemplos,
  getEjemploById,
  postEjemplo,
  putEjemplo,
  deleteEjemplo
} from '../controllers/ejemplo.controller.js';

const router = Router();

router.get('/', getAllEjemplos);
router.get('/:id', getEjemploById);
router.post('/', postEjemplo);
router.put('/:id', putEjemplo);
router.delete('/:id', deleteEjemplo);

export default router;