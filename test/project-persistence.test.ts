import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/lib/prisma.js";
import app from "../src/app.js";

describe("project persistence on the existing route", () => {
  let server: ReturnType<typeof app.listen>;
  let baseUrl: string;

  beforeAll(async () => {
    server = app.listen(0);
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const address = server.address();

    if (!address || typeof address === "string") {
      throw new Error("Could not determine test server address");
    }

    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  beforeEach(async () => {
    await prisma.project.deleteMany();
    await prisma.equipe.deleteMany();
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await prisma.$disconnect();
  });

  it("stores projects created through POST /projetos in SQLite", async () => {
    const response = await fetch(`${baseUrl}/projetos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nome: "Projeto persistido",
        cliente: "Postman",
        dataInicio: "2026-10-27",
        dataEntrega: "2026-11-30",
      }),
    });

    expect(response.status).toBe(201);
    const created = (await response.json()) as { id: string; nome: string };
    expect(created.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    const persisted = await prisma.project.findUnique({ where: { id: created.id } });

    expect(persisted?.nome).toBe("Projeto persistido");

    const readResponse = await fetch(`${baseUrl}/projetos/${created.id}`);

    expect(readResponse.status).toBe(200);
  });

  it("stores teams created through POST /equipes in SQLite", async () => {
    const response = await fetch(`${baseUrl}/equipes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        lider: "Equipe persistida",
        membros: ["Ana", "Bia"],
      }),
    });

    expect(response.status).toBe(201);
    const created = (await response.json()) as { id: string };
    expect(created.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    const persisted = await prisma.equipe.findFirst({
      where: { lider: "Equipe persistida" },
    });

    expect(persisted?.lider).toBe("Equipe persistida");
    expect(persisted?.membros).toEqual(["Ana", "Bia"]);
  });

  it("keeps the existing project-to-team relationship behavior", async () => {
    const equipeResponse = await fetch(`${baseUrl}/equipes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lider: "Equipe do projeto" }),
    });
    const equipe = (await equipeResponse.json()) as { id: string };

    const projectResponse = await fetch(`${baseUrl}/projetos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nome: "Projeto com equipe",
        cliente: "Postman",
        dataInicio: "2026-10-27",
        dataEntrega: "2026-11-30",
        idEquipe: equipe.id,
      }),
    });
    const project = (await projectResponse.json()) as { idEquipe: string };

    expect(equipeResponse.status).toBe(201);
    expect(projectResponse.status).toBe(201);
    expect(project.idEquipe).toBe(equipe.id);
  });
});
