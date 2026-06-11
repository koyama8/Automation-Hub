# QA Automation Lab

Laboratorio local para estudos de QA Automation, com interface Web e automacao E2E usando Cypress.

## Visao Geral

| Pasta | Objetivo | Stack principal | Status |
| --- | --- | --- | --- |
| `apps/web/` | Interface Web local para treino | HTML, CSS, JavaScript, Serve | Execucao local |
| `apps/web/cypress/` | Automacao web E2E com Cypress | Cypress 14, JavaScript | Suite local |
| `.github/workflows/` | Base para CI futura | GitHub Actions | Em construcao |

> Playwright nao possui pasta versionada neste momento; sera instalado/configurado por comando quando entrar na suite.

## Estrutura

```text
qa-automation-lab/
|-- .github/
|   `-- workflows/            # CI em construcao
|-- apps/
|   `-- web/                  # Interface Web
|       |-- dist/             # Tela local
|       |-- cypress/          # Suite Cypress
|       |   |-- e2e/          # Testes E2E
|       |   `-- support/      # Commands e autocomplete
|       |-- cypress.config.js
|       |-- jsconfig.json
|       `-- package.json
`-- README.md
```
