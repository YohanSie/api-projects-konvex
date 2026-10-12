export type StatusProjeto = "nao iniciado" | "em andamento" | "concluido";

export interface Project {
    id: number;
    nome: string;
    cliente: string;
    dataInicio: number;
    dataEntrega: number;
    status: StatusProjeto;
    idEquipe: number;
}