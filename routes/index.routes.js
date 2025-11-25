import { Router } from 'express';
import perfumeRouter from "./perfume.routes.js";
import ejemploRouter from './ejemplo.routes.js'; 
const router = Router();

router.use("/perfumes", perfumeRouter);
router.use('/ejemplo', ejemploRouter);

// Ruta 404
router.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada ⚠️' });
});

export default router;
