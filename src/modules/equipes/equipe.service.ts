import { EquipeRepository } from "./equipe.repository.js";
import type { Equipe } from "./equipe.entity.js";
import { CreateEquipeDto, UpdateEquipeDto } from "./equipe.dto.js";

export class EquipeService {
  constructor(private readonly equipeRepository: EquipeRepository) {}

  findAll(): Promise<Equipe[]> {
    return this.equipeRepository.findAll();
  }

  async findById(id: string): Promise<Equipe> {
    const equipe = await this.equipeRepository.findById(id);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    return equipe;
  }

  async create(data: CreateEquipeDto): Promise<Equipe> {
    const equipeData = {
      ...data,
      lider: data.lider,
      membros: data.membros ?? [],
    };

    return this.equipeRepository.create(equipeData);
  }

  async update(id: string, data: UpdateEquipeDto): Promise<Equipe> {
    const equipe = await this.equipeRepository.findById(id);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    const updatedEquipe = await this.equipeRepository.update(id, data);

    if (!updatedEquipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    return updatedEquipe;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.equipeRepository.delete(id);

    if (!deleted) {
      throw new Error("EQUIPE_NOT_FOUND");
    }
  }
}
