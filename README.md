# QA Automation Lab

Laboratorio isolado para estudar automacao Web e API com uma unica interface Web, uma unica API e suites separadas para Cypress e Playwright.

## Visao Geral

| Area | Pasta | Porta | Objetivo |
| --- | --- | --- | --- |
| Web | `apps/web` | `3000` | Interface unica para automacao Web com Cypress e Playwright |
| API | `apps/api` | `3030` | API Node.js com Express, Prisma e PostgreSQL |
| Banco | `docker-compose.yml` | `5434` | PostgreSQL local para a API |
| PgAdmin | `docker-compose.yml` | `15434` | Interface para visualizar o banco |
| Cypress Web | `tests/cypress/web` | `3000` | Testes E2E da interface |
| Cypress API | `tests/cypress/api` | `3030` | Testes HTTP da API |
| Playwright Web | `tests/playwright/web` | `3000` | Testes E2E da mesma interface |
| Playwright API | `tests/playwright/api` | `3030` | Testes HTTP da mesma API |

## Fluxo

```text
Docker -> PostgreSQL
API Express -> Prisma -> PostgreSQL
Web -> API Express
Cypress Web -> Web
Cypress API -> API
Playwright Web -> Web
Playwright API -> API
```

## Dados locais de estudo

- Email administrador: `alab@hotmail.com`
- Senha administrador: `123`

Esses dados existem apenas para ambiente local de estudo. Nao use em producao.

## Comandos principais

```bash
npm run docker:up
npm --prefix apps/api install
npm run api:migrate
npm run api:seed
npm run api:dev
```

Em outro terminal:

```bash
npm --prefix apps/web install
npm run web:dev
```

Testes:

```bash
npm --prefix tests/cypress/web install
npm run cypress:web

npm --prefix tests/cypress/api install
npm run cypress:api

npm --prefix tests/playwright/web install
npm run playwright:web

npm --prefix tests/playwright/api install
npm run playwright:api
```
