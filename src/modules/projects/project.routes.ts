import {Router} from "express";
import {ProjectRepository} from "./project.repository.js";
import {ProjectService} from "./project.service.js";
import {ProjectController} from "./project.controller.js";

const router = Router();

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

router.get("/",  projectController.findAll);
router.get("/:id", projectController.findById);
router.post("/", projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.delete);

export default router;