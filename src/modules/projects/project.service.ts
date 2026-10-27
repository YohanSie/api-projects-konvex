import { ProjectRepository } from "./project.repository.js";
import { EquipeRepository } from "../equipes/equipe.repository.js";
import type { Project } from "./project.entity.js";
import { CreateProjectDto, UpdateProjectDto } from "./project.dto.js";

export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly equipeRepository: EquipeRepository,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    return project;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    await this.validateEquipe(data.idEquipe);

    const projectData = {
      ...data,
      dataInicio: new Date(data.dataInicio),
      dataEntrega: new Date(data.dataEntrega),
      status: "nao iniciado" as const,
      idEquipe: data.idEquipe ?? null,
    };

    return this.projectRepository.create(projectData);
  }

  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    await this.validateEquipe(data.idEquipe);

    const { dataInicio, dataEntrega, ...rest } = data;

    const updatedProject = await this.projectRepository.update(id, {
      ...rest,
      ...(dataInicio !== undefined && {
        dataInicio: new Date(dataInicio),
      }),
      ...(dataEntrega !== undefined && {
        dataEntrega: new Date(dataEntrega),
      }),
    });

    if (!updatedProject) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    return updatedProject;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.projectRepository.delete(id);

    if (!deleted) {
      throw new Error("PROJECT_NOT_FOUND");
    }
  }

  private async validateEquipe(idEquipe: string | null | undefined): Promise<void> {
    if (idEquipe == null) {
      return;
    }

    const equipe = await this.equipeRepository.findById(idEquipe);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }
  }
}
