-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nao iniciado',
    "idEquipe" INTEGER
);
