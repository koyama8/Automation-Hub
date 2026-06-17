# QA Automation Lab

Laboratorio local para estudos de QA Automation, com interface Web, API REST, banco PostgreSQL local e automacoes com Cypress Web/API.

## Visao Geral

| Pasta | Objetivo | Stack principal | Status |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web local com login, dashboard, formulario e checkout | HTML, CSS, JavaScript, Serve | Execucao local |
| `apps/web/cypress/e2e/` | Automacao Web E2E dos fluxos da interface | Cypress 14, JavaScript | Suite local |
| `apps/api/` | API REST de usuarios para estudos de HTTP e banco | Node.js, Express, Prisma | Execucao local |
| `apps/api/cypress/e2e/` | Testes API para criar, listar, atualizar, deletar e validar excecoes | Cypress 14, cypress-plugin-api | Suite local |
| `database/` + `docker-compose.yml` | Banco local, PgAdmin e apoio para seed | PostgreSQL, PgAdmin, Docker | Ambiente local |
| `.github/workflows/` | Base para CI futura | GitHub Actions | Em construcao |

> Playwright nao possui pasta versionada neste momento; sera instalado/configurado por comando quando entrar na suite.

## Estrutura

```text
qa-automation-lab/
|-- .github/
|   `-- workflows/                  # CI em construcao
|-- apps/
|   |-- api/                        # API REST + Cypress API
|   |   |-- cypress/
|   |   |   |-- e2e/                # Testes HTTP
|   |   |   |-- fixtures/           # Massa API
|   |   |   `-- support/            # Commands e task de banco
|   |   |-- lib/                    # Conexao Prisma
|   |   |-- prisma/                 # Schema e migrations
|   |   |-- .env.example
|   |   |-- cypress.config.js
|   |   |-- index.js
|   |   |-- prisma.config.ts
|   |   `-- package.json
|   `-- web/                        # Interface Web
|       |-- dist/                   # Tela local
|       |-- cypress/                # Suite Cypress Web
|       |   |-- e2e/                # Login, usuarios, consultoria e checkout
|       |   |   |-- checkout-web.cy.js
|       |   |   |-- consultancy.cy.js
|       |   |   |-- login.cy.js
|       |   |   `-- usuarios.cy.js
|       |   |-- fixtures/           # Massa de dados
|       |   `-- support/            # Commands e autocomplete
|       |-- cypress.config.js
|       |-- jsconfig.json
|       `-- package.json
|-- database/
|   |-- scripts/                    # Scripts de apoio
|   `-- seed/                       # Massa inicial
|-- docker-compose.yml              # PostgreSQL e PgAdmin
`-- README.md
```

## Comandos principais

```bash
docker compose up -d
cd apps/api
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

API local:

```text
http://localhost:3030
```
