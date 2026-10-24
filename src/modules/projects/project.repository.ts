import type { Project } from "./project.entity.js";

export class ProjectRepository {
  private readonly projects: Project[] = [];
  private nextId = 1;

  findAll(): Project[] {
    return this.projects;
  }

  findById(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  create(project: Omit<Project, "id">): Project {
    const newProject: Project = {
      id: this.nextId++,
      ...project,
    };

    this.projects.push(newProject);

    return newProject;
  }

  update(id: number, data: Partial<Omit<Project, "id">>): Project | undefined {
    const project = this.findById(id);

    if (!project) {
      return undefined;
    }

    Object.assign(project, data);

    return project;
  }

  delete(id: number): boolean {
    const index = this.projects.findIndex((project) => project.id === id);

    if (index === -1) {
      return false;
    }

    this.projects.splice(index, 1);

    return true;
  }
}
