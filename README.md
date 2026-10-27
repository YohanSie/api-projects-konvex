# API TypeScript

API REST para gerenciamento de projetos (`projetos`) e equipes (`equipes`), desenvolvida com Express e TypeScript.

## Requisitos

- Node.js e npm

## Como começar

Execute na raiz do projeto. Na primeira execução (ou depois de clonar o repositório), prepare o ambiente e inicie a API:

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:generate
npm run dev
```

`cp .env.example .env` cria a configuração local com `DATABASE_URL="file:./dev.db"`. Se você já tem um `.env`, mantenha o arquivo e confira se essa variável está definida; não precisa copiá-lo novamente. `db:migrate` aplica as migrations versionadas e cria o banco SQLite se ele ainda não existir. `db:generate` gera o Prisma Client usado pela API.

O servidor inicia em `http://localhost:3000`. A porta está definida em `src/server.ts`.

Nas próximas vezes, com o ambiente já preparado, basta rodar `npm run dev`. Para abrir o banco visualmente, rode `npm run db:studio` em outro terminal.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com recarga automática. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm start` | Executa a versão compilada. Antes, rode `npm run build`. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run format` | Formata os arquivos com Prettier. |
| `npm run db:migrate` | Aplica as migrations Prisma no SQLite local. |
| `npm run db:generate` | Gera o Prisma Client a partir do schema. |
| `npm run db:studio` | Abre Prisma Studio para visualizar os registros. |

## API

Todas as rotas recebem e retornam JSON. A API não possui middleware de autenticação. Projetos e equipes são persistidos no SQLite usando Prisma ORM, com IDs UUID.

### Verificação de saúde

| Método | Caminho | Sucesso |
| --- | --- | --- |
| `GET` | `/health` | `200` — `{ "status": "ok" }` |

### Projetos

Caminho base: `/projetos`

| Método | Caminho | Descrição | Sucesso |
| --- | --- | --- | --- |
| `GET` | `/projetos/` | Lista os projetos. | `200` — lista de projetos |
| `GET` | `/projetos/:id` | Busca um projeto pelo ID. | `200` — projeto |
| `POST` | `/projetos/` | Cria um projeto. | `201` — projeto criado |
| `PUT` | `/projetos/:id` | Atualiza um ou mais campos do projeto. | `200` — projeto atualizado |
| `DELETE` | `/projetos/:id` | Exclui um projeto. | `204` — resposta vazia |

Campos do projeto:

| Campo | Tipo | Regras |
| --- | --- | --- |
| `id` | UUID | Gerado pelo Prisma. |
| `nome` | texto | Obrigatório na criação; não pode ficar em branco. |
| `cliente` | texto | Obrigatório na criação; não pode ficar em branco. |
| `dataInicio` | `YYYY-MM-DD` | Obrigatório na criação; opcional na atualização. |
| `dataEntrega` | `YYYY-MM-DD` | Obrigatório na criação; opcional na atualização. |
| `status` | texto | `nao iniciado`, `em andamento` ou `concluido`; na criação, o padrão é `nao iniciado`. |
| `idEquipe` | UUID ou `null` | Opcional na criação e na atualização. Use `null` para deixar o projeto sem equipe. Um ID informado deve pertencer a uma equipe existente. |

Exemplo de criação de projeto:

```json
{
  "nome": "Sistema Konvex",
  "cliente": "UDESC",
  "dataInicio": "2026-10-22",
  "dataEntrega": "2026-12-20",
  "idEquipe": null
}
```

Na atualização, envie um ou mais campos editáveis (`nome`, `cliente`, datas, `status` ou `idEquipe`). O corpo não pode estar vazio.

### Equipes

Caminho base: `/equipes`

| Método | Caminho | Descrição | Sucesso |
| --- | --- | --- | --- |
| `GET` | `/equipes/` | Lista as equipes. | `200` — lista de equipes |
| `GET` | `/equipes/:id` | Busca uma equipe pelo ID. | `200` — equipe |
| `POST` | `/equipes/` | Cria uma equipe. | `201` — equipe criada |
| `PUT` | `/equipes/:id` | Atualiza um ou mais campos da equipe. | `200` — equipe atualizada |
| `DELETE` | `/equipes/:id` | Exclui uma equipe. | `204` — resposta vazia |

Campos da equipe:

| Campo | Tipo | Regras |
| --- | --- | --- |
| `id` | UUID | Gerado pelo Prisma. |
| `lider` | texto | Obrigatório na criação; não pode ficar em branco. |
| `membros` | lista de textos | Opcional na criação; por padrão, é uma lista vazia. Os nomes não podem ficar em branco. |

Exemplo de criação de equipe:

```json
{
  "lider": "Ana Silva",
  "membros": ["João Costa", "Maria Souza"]
}
```

Na atualização, envie um ou mais campos (`lider` ou `membros`). O corpo não pode estar vazio.

## Erros

Corpos de requisição ou IDs inválidos retornam `400`, com uma mensagem e os detalhes de validação em JSON. Projetos e equipes não encontrados retornam `404`:

```json
{ "message": "Projeto não encontrado" }
```

```json
{ "message": "Equipe não encontrada" }
```

Erros inesperados retornam `500` com `{ "message": "Erro interno do servidor" }`.

## Postman

A [coleção do Postman](https://mission-cosmonaut-9593979-208484.postman.co/workspace/API_PHP~a4bb9d18-1caf-49cb-9e6c-0daba19a84ab/collection/47105918-1923cf3c-97ae-45a8-a4f1-11e54a47c5f4) contém as requisições desta API. Configure a variável `server` da coleção com a URL base da API (padrão: `http://localhost:3000`). A API não exige token bearer.

## Banco de dados e Prisma

As rotas existentes `/projetos` e `/equipes` usam Prisma ORM 7.10 com SQLite. Os caminhos e formatos da API permanecem os mesmos; a persistência em memória foi substituída pelo banco. Projetos e equipes têm IDs UUID; `idEquipe` é a chave UUID da relação opcional entre eles. Os membros da equipe são armazenados como JSON.

Para visualizar os registros, rode `npm run db:studio` em outro terminal e abra a URL local que o comando imprimir. Prisma Studio 7.10 precisa do formato `file://` para essa conexão SQLite; por isso use o script do projeto em vez de `npx prisma studio` diretamente.
