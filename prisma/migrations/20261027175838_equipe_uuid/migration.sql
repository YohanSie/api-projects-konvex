/*
  Warnings:

  - The primary key for the `Equipe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "__EquipeUuidMap" (
    "oldId" INTEGER NOT NULL PRIMARY KEY,
    "newId" TEXT NOT NULL
);
INSERT INTO "__EquipeUuidMap" ("oldId", "newId")
SELECT
    "id",
    lower(hex(randomblob(4))) || '-' ||
    lower(hex(randomblob(2))) || '-4' ||
    substr(lower(hex(randomblob(2))), 2) || '-' ||
    substr('89ab', (random() & 3) + 1, 1) ||
    substr(lower(hex(randomblob(2))), 2) || '-' ||
    lower(hex(randomblob(6)))
FROM "Equipe";
CREATE TABLE "new_Equipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lider" TEXT NOT NULL,
    "membros" JSONB NOT NULL DEFAULT []
);
INSERT INTO "new_Equipe" ("id", "lider", "membros")
SELECT "__EquipeUuidMap"."newId", "Equipe"."lider", "Equipe"."membros"
FROM "Equipe"
JOIN "__EquipeUuidMap" ON "__EquipeUuidMap"."oldId" = "Equipe"."id";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nao iniciado',
    "idEquipe" TEXT,
    CONSTRAINT "Project_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "Equipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cliente", "dataEntrega", "dataInicio", "id", "idEquipe", "nome", "status")
SELECT
    "Project"."cliente",
    "Project"."dataEntrega",
    "Project"."dataInicio",
    "Project"."id",
    "__EquipeUuidMap"."newId",
    "Project"."nome",
    "Project"."status"
FROM "Project"
LEFT JOIN "__EquipeUuidMap" ON "__EquipeUuidMap"."oldId" = "Project"."idEquipe";
DROP TABLE "Project";
DROP TABLE "Equipe";
ALTER TABLE "new_Equipe" RENAME TO "Equipe";
ALTER TABLE "new_Project" RENAME TO "Project";
DROP TABLE "__EquipeUuidMap";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
