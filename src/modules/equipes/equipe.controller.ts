import type { Request, Response } from "express";
import { EquipeService } from "./equipe.service.js";
import {
  createEquipeSchema,
  updateEquipeSchema,
  equipeParamSchema,
} from "./equipe.dto.js";

export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  findAll = (_req: Request, res: Response): void => {
    const equipes = this.equipeService.findAll();

    res.status(200).json(equipes);
  };

  findById = (req: Request, res: Response): void => {
    const { id } = equipeParamSchema.parse(req.params);

    const equipe = this.equipeService.findById(id);

    res.status(200).json(equipe);
  };

  create = (req: Request, res: Response): void => {
    const data = createEquipeSchema.parse(req.body);

    const equipe = this.equipeService.create(data);

    res.status(201).json(equipe);
  };

  update = (req: Request, res: Response): void => {
    const { id } = equipeParamSchema.parse(req.params);
    const data = updateEquipeSchema.parse(req.body);

    const equipe = this.equipeService.update(id, data);

    res.status(200).json(equipe);
  };

  delete = (req: Request, res: Response): void => {
    const { id } = equipeParamSchema.parse(req.params);

    this.equipeService.delete(id);

    res.status(204).send();
  };
}
