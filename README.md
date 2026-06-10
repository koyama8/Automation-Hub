# QA Automation Lab

Laboratorio local para estudos de QA Automation, com aplicacao Web, API REST, banco em Docker e automacoes separadas por ferramenta.

## Visao Geral

| Pasta | Objetivo | Stack principal | CI / Evidencias |
| --- | --- | --- | --- |
| `apps/` | Interface Web base para estudos E2E | HTML, CSS, JavaScript, Serve | Execucao local |
| `cypress/` | API REST e automacoes Web/API com Cypress | Node.js, Express, Prisma, Cypress 14 | Suite Cypress local |
| `playwright/` | Automacao Web E2E alternativa | Playwright, JavaScript | Suite Playwright local |
| `database/` | Banco e massa inicial do laboratorio | PostgreSQL, PgAdmin, Docker | Ambiente local |
| `docs/` | Apoio tecnico do projeto | Markdown | Documentacao base |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   `-- web/                  # Interface Web
|-- cypress/
|   |-- api/                  # API REST + Cypress API
|   `-- web/                  # Testes Cypress Web
|-- playwright/
|   `-- web/                  # Testes Playwright Web
|-- database/                 # Seed e scripts de banco
|-- docs/                     # Documentacao de apoio
|-- docker-compose.yml
`-- README.md
```
