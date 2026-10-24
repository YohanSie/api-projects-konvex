import { Router } from "express";
import { equipeRepository } from "./equipe.repository.instance.js";
import { EquipeService } from "./equipe.service.js";
import { EquipeController } from "./equipe.controller.js";

const router = Router();

const equipeService = new EquipeService(equipeRepository);
const equipeController = new EquipeController(equipeService);

router.get("/", equipeController.findAll);
router.get("/:id", equipeController.findById);
router.post("/", equipeController.create);
router.put("/:id", equipeController.update);
router.delete("/:id", equipeController.delete);

export default router;
