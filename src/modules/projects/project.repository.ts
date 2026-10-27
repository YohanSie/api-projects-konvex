import { Prisma, type Project as PrismaProject } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { Project, StatusProjeto } from "./project.entity.js";

function toProject(project: PrismaProject): Project {
  return {
    ...project,
    status: project.status as StatusProjeto,
  };
}

export class ProjectRepository {
  async findAll(): Promise<Project[]> {
    const projects = await prisma.project.findMany();

    return projects.map(toProject);
  }

  async findById(id: string): Promise<Project | undefined> {
    const project = await prisma.project.findUnique({ where: { id } });

    return project ? toProject(project) : undefined;
  }

  async create(project: Omit<Project, "id">): Promise<Project> {
    const created = await prisma.project.create({
      data: {
        ...project,
      } satisfies Prisma.ProjectUncheckedCreateInput,
    });

    return toProject(created);
  }

  async update(
    id: string,
    data: Partial<Omit<Project, "id">>,
  ): Promise<Project | undefined> {
    try {
      const updated = await prisma.project.update({
        where: { id },
        data: data satisfies Prisma.ProjectUncheckedUpdateInput,
      });

      return toProject(updated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return undefined;
      }

      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.project.delete({ where: { id } });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return false;
      }

      throw error;
    }
  }
}
