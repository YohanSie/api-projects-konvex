import type { Request, Response } from "express";
import { ProjectService } from "./project.service.js";
import {
  createProjectSchema,
  projectParamSchema,
  updateProjectSchema,
} from "./project.dto.js";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const projects = await this.projectService.findAll();

    res.status(200).json(projects);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const { id } = projectParamSchema.parse(req.params);

    const project = await this.projectService.findById(id);

    res.status(200).json(project);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const data = createProjectSchema.parse(req.body);

    const project = await this.projectService.create(data);

    res.status(201).json(project);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = projectParamSchema.parse(req.params);
    const data = updateProjectSchema.parse(req.body);

    const project = await this.projectService.update(id, data);

    res.status(200).json(project);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = projectParamSchema.parse(req.params);

    await this.projectService.delete(id);

    res.status(204).send();
  };
}
