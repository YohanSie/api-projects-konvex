import { z } from "zod";

export const createEquipeSchema = z.object({
  lider: z.string().trim().min(1),
  membros: z.array(z.string().trim().min(1)).optional(),
});

export const updateEquipeSchema = z
  .object({
    lider: z.string().trim().min(1).optional(),
    membros: z.array(z.string().trim().min(1)).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export const equipeParamSchema = z.object({
  id: z.uuid(),
});

export type CreateEquipeDto = z.infer<typeof createEquipeSchema>;
export type UpdateEquipeDto = z.infer<typeof updateEquipeSchema>;
