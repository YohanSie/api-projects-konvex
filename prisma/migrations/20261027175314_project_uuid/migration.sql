/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nao iniciado',
    "idEquipe" INTEGER,
    CONSTRAINT "Project_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "Equipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cliente", "dataEntrega", "dataInicio", "id", "idEquipe", "nome", "status")
SELECT
    "cliente",
    "dataEntrega",
    "dataInicio",
    lower(hex(randomblob(4))) || '-' ||
    lower(hex(randomblob(2))) || '-4' ||
    substr(lower(hex(randomblob(2))), 2) || '-' ||
    substr('89ab', (random() & 3) + 1, 1) ||
    substr(lower(hex(randomblob(2))), 2) || '-' ||
    lower(hex(randomblob(6))),
    "idEquipe",
    "nome",
    "status"
FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
