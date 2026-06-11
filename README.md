# QA Automation Lab

Laboratorio local para estudos de QA Automation, com interface Web e automacoes separadas para Cypress e Playwright.

## Visao Geral

| Pasta | Objetivo | Stack principal | CI / Evidencias |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web local para treino | HTML, CSS, JavaScript, Serve | Execucao local |
| `apps/web/cypress/` | Automacao web E2E com Cypress | Cypress 14, JavaScript, Serve | Em construcao |
| `playwright/web/` | Automacao web E2E alternativa | Playwright, JavaScript | Suite Playwright local |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   `-- web/                  # Interface Web
|       |-- dist/             # Tela local
|       |-- src/              # Organizacao base
|       |-- cypress/          # Automacao Cypress
|       |   `-- e2e/          # Testes E2E
|       `-- package.json
|-- playwright/
|   `-- web/                  # Suite Playwright Web
`-- README.md
```
