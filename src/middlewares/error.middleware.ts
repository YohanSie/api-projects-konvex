import type {
    Request,
    Response
} from "express";
import { ZodError } from "zod";

export function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
): void {
    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Dados Inválidos",
            errors: error.issues
        });
        return;
    }

    if (
        error instanceof Error &&
        error.message === "PROJECT_NOT_FOUND"
    ) {
        res.status(404).json({
            message: "Projeto não encontrado",
        })
        return;
    }

    console.error(error);

    res.status(500).json({
        message: "Erro interno do servidor",
    })
}