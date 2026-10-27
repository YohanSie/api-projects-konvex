-- CreateTable
CREATE TABLE "Equipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lider" TEXT NOT NULL,
    "membros" JSONB NOT NULL DEFAULT []
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nao iniciado',
    "idEquipe" INTEGER,
    CONSTRAINT "Project_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "Equipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cliente", "dataEntrega", "dataInicio", "id", "idEquipe", "nome", "status") SELECT "cliente", "dataEntrega", "dataInicio", "id", "idEquipe", "nome", "status" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
