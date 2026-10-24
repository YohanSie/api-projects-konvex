# API TypeScript

API REST para gerenciamento de projetos (`projetos`) e equipes (`equipes`), desenvolvida com Express e TypeScript.

## Requisitos

- Node.js e npm

## Como começar

```bash
npm install
npm run dev
```

O servidor inicia em `http://localhost:3000`. A porta está definida em `src/server.ts`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com recarga automática. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm start` | Executa a versão compilada. Antes, rode `npm run build`. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run format` | Formata os arquivos com Prettier. |

## API

Todas as rotas recebem e retornam JSON. A API não possui middleware de autenticação e mantém os dados em memória; os registros são apagados quando o processo é reiniciado. Os IDs são números inteiros positivos gerados pelo servidor.

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
| `id` | número | Gerado pelo servidor. |
| `nome` | texto | Obrigatório na criação; não pode ficar em branco. |
| `cliente` | texto | Obrigatório na criação; não pode ficar em branco. |
| `dataInicio` | `YYYY-MM-DD` | Obrigatório na criação; opcional na atualização. |
| `dataEntrega` | `YYYY-MM-DD` | Obrigatório na criação; opcional na atualização. |
| `status` | texto | `nao iniciado`, `em andamento` ou `concluido`; na criação, o padrão é `nao iniciado`. |
| `idEquipe` | número ou `null` | Opcional na criação e na atualização. Use `null` para deixar o projeto sem equipe. Um ID informado deve pertencer a uma equipe existente. |

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
| `id` | número | Gerado pelo servidor. |
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
