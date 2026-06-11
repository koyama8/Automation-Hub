# QA Automation Lab

Laboratorio local para estudos de QA Automation, com interface Web e automacoes separadas para Cypress e Playwright.

## Visao Geral

| Pasta | Objetivo | Stack principal | CI / Evidencias |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web e automacao Cypress | HTML, CSS, JavaScript, Cypress 14 | Suite local |
| `playwright/web/` | Automacao Web alternativa | Playwright, JavaScript | Suite local |
| `database/` | Apoio para massa e banco local | PostgreSQL, Docker | Ambiente local |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   `-- web/
|       |-- cypress/          # Testes Cypress
|       |-- dist/             # Interface Web
|       |-- src/              # Organizacao da interface
|       `-- package.json
|-- playwright/
|   `-- web/                  # Testes Playwright
|-- database/                 # Scripts e seed
|-- docker-compose.yml
`-- README.md
```
