import { Prisma, type Equipe as PrismaEquipe } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { Equipe } from "./equipe.entity.js";

function toEquipe(equipe: PrismaEquipe): Equipe {
  const members = equipe.membros;

  return {
    id: equipe.id,
    lider: equipe.lider,
    membros: Array.isArray(members)
      ? members.filter((member): member is string => typeof member === "string")
      : [],
  };
}

export class EquipeRepository {
  async findAll(): Promise<Equipe[]> {
    const equipes = await prisma.equipe.findMany();

    return equipes.map(toEquipe);
  }

  async findById(id: string): Promise<Equipe | undefined> {
    const equipe = await prisma.equipe.findUnique({ where: { id } });

    return equipe ? toEquipe(equipe) : undefined;
  }

  async create(data: Omit<Equipe, "id">): Promise<Equipe> {
    const equipe = await prisma.equipe.create({
      data: {
        lider: data.lider,
        membros: data.membros as Prisma.InputJsonValue,
      },
    });

    return toEquipe(equipe);
  }

  async update(id: string, data: Partial<Omit<Equipe, "id">>): Promise<Equipe | undefined> {
    try {
      const equipe = await prisma.equipe.update({
        where: { id },
        data: {
          ...data,
          ...(data.membros !== undefined && {
            membros: data.membros as Prisma.InputJsonValue,
          }),
        },
      });

      return toEquipe(equipe);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return undefined;
      }

      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.equipe.delete({ where: { id } });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return false;
      }

      throw error;
    }
  }
}
