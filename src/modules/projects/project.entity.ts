export const statusValues = [
  "nao iniciado",
  "em andamento",
  "concluido",
] as const;

export type StatusProjeto = (typeof statusValues)[number];

export interface Project {
  id: string;
  nome: string;
  cliente: string;
  dataInicio: Date;
  dataEntrega: Date;
  status: StatusProjeto;
  idEquipe: string | null;
}
