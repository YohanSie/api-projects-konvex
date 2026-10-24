import { z } from "zod";
import { statusValues } from "./project.entity.js";

const dateSchema = z.iso.date();

export const createProjectSchema = z.object({
  nome: z.string().trim().min(1),
  cliente: z.string().trim().min(1),
  dataInicio: dateSchema,
  dataEntrega: dateSchema,
  idEquipe: z.number().int().positive().nullable().optional(),
});

export const updateProjectSchema = z
  .object({
    nome: z.string().trim().min(1).optional(),
    cliente: z.string().trim().min(1).optional(),
    dataInicio: dateSchema.optional(),
    dataEntrega: dateSchema.optional(),
    status: z.enum(statusValues).optional(),
    idEquipe: z.number().int().positive().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export const projectParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
