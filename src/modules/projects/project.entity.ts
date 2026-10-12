export const statusValues = [
  "nao iniciado",
  "em andamento",
  "concluido",
] as const;

export type StatusProjeto = typeof statusValues[number];

export interface Project {
  id: number;
  nome: string;
  cliente: string;
  dataInicio: number;
  dataEntrega: number;
  status: StatusProjeto;
  idEquipe: number | null;
}