import type { Request, Response } from "express";
import { EquipeService } from "./equipe.service.js";
import {
  createEquipeSchema,
  updateEquipeSchema,
  equipeParamSchema,
} from "./equipe.dto.js";

export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const equipes = await this.equipeService.findAll();

    res.status(200).json(equipes);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const { id } = equipeParamSchema.parse(req.params);

    const equipe = await this.equipeService.findById(id);

    res.status(200).json(equipe);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const data = createEquipeSchema.parse(req.body);

    const equipe = await this.equipeService.create(data);

    res.status(201).json(equipe);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = equipeParamSchema.parse(req.params);
    const data = updateEquipeSchema.parse(req.body);

    const equipe = await this.equipeService.update(id, data);

    res.status(200).json(equipe);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = equipeParamSchema.parse(req.params);

    await this.equipeService.delete(id);

    res.status(204).send();
  };
}
