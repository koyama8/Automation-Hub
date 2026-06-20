# QA Automation Lab

Laboratorio local de QA Automation com interface Web, API REST, PostgreSQL e fluxos integrados para automacao E2E e de API com Cypress.

## Visao Geral

| Pasta | Objetivo | Stack principal | Status |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web com login, dashboard e jornadas de teste | HTML, CSS, JavaScript, Serve | Execucao local |
| `apps/web/cypress/` | Automacao E2E dos fluxos Web | Cypress 14, JavaScript | Suite local |
| `apps/api/src/` | Autenticacao JWT, usuarios, recuperacao de senha e clientes | Node.js, Express, Prisma | Execucao local |
| `apps/api/cypress/` | Base para os testes automatizados de API | Cypress 14, cypress-plugin-api | Em construcao |
| `apps/api/prisma/` | Modelos e historico de migrations | Prisma, PostgreSQL | Versionado |
| `database/` + `docker-compose.yml` | Banco, PgAdmin e massa inicial | PostgreSQL, PgAdmin, Docker | Ambiente local |
| `.github/workflows/` | Base para integracao continua | GitHub Actions | Em construcao |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   |-- api/
|   |   |-- cypress/               # Base da automacao de API
|   |   |-- prisma/                # Schema e migrations
|   |   |-- src/
|   |   |   |-- config/            # Variaveis da aplicacao
|   |   |   |-- controllers/       # Entrada HTTP
|   |   |   |-- lib/               # Cliente Prisma
|   |   |   |-- middlewares/       # Autenticacao e erros
|   |   |   |-- repositories/      # Acesso ao Prisma
|   |   |   |-- routes/            # Endpoints REST
|   |   |   |-- services/          # Regras de negocio
|   |   |   `-- utils/             # Validacoes e seguranca
|   |   `-- index.js               # Inicializacao da API
|   `-- web/
|       |-- cypress/               # Suite Cypress Web
|       `-- dist/                  # Interface local
|-- database/
|   `-- seed/                      # Massa inicial
|-- docker-compose.yml
`-- README.md
```

## Execucao local

```powershell
docker compose up -d
cd apps/api
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Em outro terminal:

```powershell
cd apps/web
npm install
npm run dev
```

- Interface: `http://localhost:3000`
- API: `http://localhost:3030`
- Health check: `http://localhost:3030/api/health`
- PostgreSQL: `localhost:5434`
- PgAdmin: `http://localhost:15434`

A API possui CRUD de usuarios e clientes, autenticacao, recuperacao de senha e reset do ambiente de testes. As colecoes do Bruno permanecem fora do repositorio e a automacao de API sera desenvolvida separadamente em `apps/api/cypress/`.
