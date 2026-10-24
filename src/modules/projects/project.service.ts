import { ProjectRepository } from "./project.repository.js";
import { EquipeRepository } from "../equipes/equipe.repository.js";
import type { Project } from "./project.entity.js";
import { CreateProjectDto, UpdateProjectDto } from "./project.dto.js";

export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly equipeRepository: EquipeRepository,
  ) {}

  findAll(): Project[] {
    return this.projectRepository.findAll();
  }

  findById(id: number): Project {
    const project = this.projectRepository.findById(id);

    if (!project) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    return project;
  }

  create(data: CreateProjectDto): Project {
    this.validateEquipe(data.idEquipe);

    const projectData = {
      ...data,
      dataInicio: new Date(data.dataInicio),
      dataEntrega: new Date(data.dataEntrega),
      status: "nao iniciado" as const,
      idEquipe: data.idEquipe ?? null,
    };

    return this.projectRepository.create(projectData);
  }

  update(id: number, data: UpdateProjectDto): Project {
    const project = this.projectRepository.findById(id);

    if (!project) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    this.validateEquipe(data.idEquipe);

    const { dataInicio, dataEntrega, ...rest } = data;

    const updatedProject = this.projectRepository.update(id, {
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

  delete(id: number): void {
    const deleted = this.projectRepository.delete(id);

    if (!deleted) {
      throw new Error("PROJECT_NOT_FOUND");
    }
  }

  private validateEquipe(idEquipe: number | null | undefined): void {
    if (idEquipe == null) {
      return;
    }

    const equipe = this.equipeRepository.findById(idEquipe);

    if (!equipe) {
      throw new Error("EQUIPE_NOT_FOUND");
    }
  }
}
