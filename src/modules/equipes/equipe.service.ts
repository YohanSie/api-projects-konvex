import { EquipeRepository } from "./equipe.repository.js";
import type { Equipe } from "./equipe.entity.js";
import { CreateEquipeDto, UpdateEquipeDto } from "./equipe.dto.js";

export class EquipeService {
  constructor(private readonly equipeRepository: EquipeRepository) {}

  findAll(): Equipe[] {
    return this.equipeRepository.findAll();
  }

  findById(id: number): Equipe {
    const equipe = this.equipeRepository.findById(id);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    return equipe;
  }

  create(data: CreateEquipeDto): Equipe {
    const equipeData = {
      ...data,
      lider: data.lider,
      membros: data.membros ?? [],
    };

    return this.equipeRepository.create(equipeData);
  }

  update(id: number, data: UpdateEquipeDto): Equipe {
    const equipe = this.equipeRepository.findById(id);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    const updatedEquipe = this.equipeRepository.update(id, data);

    if (!updatedEquipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }

    return updatedEquipe;
  }

  delete(id: number): void {
    const deleted = this.equipeRepository.delete(id);

    if (!deleted) {
      throw new Error("EQUIPE_NOT_FOUND");
    }
  }
}
