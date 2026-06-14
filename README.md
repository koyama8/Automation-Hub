# QA Automation Lab

Laboratorio local para estudos de QA Automation, com interface Web, fluxo de checkout, automacoes E2E com Cypress e base preparada para evolucao de API e banco.

## Visao Geral

| Pasta | Objetivo | Stack principal | Status |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web local com login, dashboard, formulario e checkout | HTML, CSS, JavaScript, Serve | Execucao local |
| `apps/web/cypress/e2e/` | Automacao Web E2E com login, usuarios, consultoria e checkout | Cypress 14, JavaScript | Suite local |
| `apps/web/cypress/fixtures/` | Massa de dados para os testes Web | JSON | Dados locais |
| `apps/api/` | Base para API REST e testes HTTP futuros | Node.js, Prisma, Cypress API | Em construcao |
| `database/` + `docker-compose.yml` | Banco local e apoio para seed | PostgreSQL, PgAdmin, Docker | Ambiente local |
| `.github/workflows/` | Base para CI futura | GitHub Actions | Em construcao |

> Playwright nao possui pasta versionada neste momento; sera instalado/configurado por comando quando entrar na suite.

## Estrutura

```text
qa-automation-lab/
|-- .github/
|   `-- workflows/                  # CI em construcao
|-- apps/
|   |-- api/                        # API em construcao
|   |   |-- cypress/                # Testes API futuros
|   |   |-- prisma/                 # Modelagem futura
|   |   `-- src/                    # Codigo da API
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
