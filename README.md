# QA Automation Lab

Laboratorio local de estudos em QA Automation, reunindo uma interface Web, uma API REST, banco PostgreSQL com Docker e suites separadas para automacao com Cypress e Playwright.

## Visao Geral

| Pasta | Objetivo | Stack principal | CI / Evidencias |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web unica para treinar fluxos E2E | HTML, CSS, JavaScript, Serve | Base para testes Web locais |
| `apps/api/` | API REST para usuarios, login, senha e formularios | Node.js, Express, Prisma | Execucao local |
| `database/` + `docker-compose.yml` | Banco e massa inicial para estudos | PostgreSQL, PgAdmin, Docker | Ambiente local isolado |
| `tests/cypress/web/` | Automacao E2E da interface Web | Cypress 14, JavaScript | Suite Cypress Web local |
| `tests/cypress/api/` | Testes HTTP da API | Cypress 14, cypress-plugin-api | Suite Cypress API local |
| `tests/playwright/web/` | Automacao E2E Web alternativa | Playwright, JavaScript | Suite Playwright Web local |
| `docs/` | Apoio para contrato, arquitetura e estrategia | Markdown | Documentacao base |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   |-- web/                  # Interface Web para automacao
|   `-- api/                  # API Node.js + Express + Prisma
|-- database/
|   `-- seed/                 # Massa inicial local
|-- tests/
|   |-- cypress/
|   |   |-- web/              # Cypress E2E Web
|   |   `-- api/              # Cypress API
|   `-- playwright/
|       `-- web/              # Playwright E2E Web
|-- docs/                     # Arquitetura, contrato e estrategia
|-- docker-compose.yml        # PostgreSQL e PgAdmin
`-- README.md
```
