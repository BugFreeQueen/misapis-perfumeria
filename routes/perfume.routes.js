import { Router } from "express";
import { 
  getPerfumes,
  getPerfumeById,
  postPerfume,
  putPerfume,
  deletePerfume
} from "../controllers/perfume.controller.js";

const perfumeRouter = Router();

perfumeRouter.get("/", getPerfumes);
perfumeRouter.get("/:id", getPerfumeById);
perfumeRouter.post("/", postPerfume);
perfumeRouter.put("/:id", putPerfume);
perfumeRouter.delete("/:id", deletePerfume);

export default perfumeRouter;