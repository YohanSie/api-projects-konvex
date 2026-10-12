
import { z } from "zod";
import { statusValues } from "./project.entity.js";

export const createProjectSchema = z.object({
  nome: z.string().trim().min(1),
  cliente: z.string().trim().min(1),
  dataInicio: z.number().int(),
  dataEntrega: z.number().int(),
  idEquipe: z.number().int().positive().nullable().optional(),
});

export const updateProjectSchema = z.object({
  nome: z.string().trim().min(1).optional(),
  cliente: z.string().trim().min(1).optional(),
  dataInicio: z.number().int().optional(),
  dataEntrega: z.number().int().optional(),
  status: z.enum(statusValues).optional(),
  idEquipe: z.number().int().positive().nullable().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "Informe ao menos um campo para atualizar." },
);

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;