import type { Equipe } from "./equipe.entity.js";

export class EquipeRepository {
  private readonly equipes: Equipe[] = [];
  private nextId = 1;

  findAll(): Equipe[] {
    return this.equipes;
  }

  findById(id: number): Equipe | undefined {
    return this.equipes.find((equipe) => equipe.id === id);
  }

  create(data: Omit<Equipe, "id">): Equipe {
    const equipe: Equipe = {
      id: this.nextId++,
      ...data,
    };

    this.equipes.push(equipe);

    return equipe;
  }

  update(id: number, data: Partial<Omit<Equipe, "id">>): Equipe | undefined {
    const equipe = this.findById(id);

    if (!equipe) {
      return undefined;
    }

    Object.assign(equipe, data);

    return equipe;
  }

  delete(id: number): boolean {
    const index = this.equipes.findIndex((equipe) => equipe.id === id);

    if (index === -1) {
      return false;
    }

    this.equipes.splice(index, 1);

    return true;
  }
}
