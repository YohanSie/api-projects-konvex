import type { Request, Response } from "express";
import {ProjectService} from "./project.service.js";
import {
    createProjectSchema, projectParamSchema,
    updateProjectSchema,
} from "./project.dto.js";

export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    findAll = (_req: Request, res: Response): void => {
        const projects = this.projectService.findAll();

        res.status(200).json(projects);
    }

    findById = (req: Request, res: Response): void => {
        const { id } = projectParamSchema.parse(req.params);

        const project = this.projectService.findById(id);

        res.status(200).json(project);
    }

    create = (req: Request, res: Response): void => {
        const data = createProjectSchema.parse(req.body);

        const project = this.projectService.create(data);

        res.status(201).json(project);
    }

    update = (req: Request, res: Response): void => {
        const { id } = projectParamSchema.parse(req.params);
        const data = updateProjectSchema.parse(req.body);

        const project = this.projectService.update(id, data);

        res.status(200).json(project);
    }

    delete = (req: Request, res: Response): void => {
        const { id } = projectParamSchema.parse(req.params);

        this.projectService.delete(id);

        res.status(204).send();
    }
}