# QA Automation Lab — Engenharia de Automação de Testes

[![Quality Gate](https://img.shields.io/github/actions/workflow/status/koyama8/Automation-Hub/qa-ci.yml?branch=master&label=QUALITY%20GATE&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/koyama8/Automation-Hub/actions/workflows/qa-ci.yml)
[![Relatório Cucumber](https://img.shields.io/badge/RELATORIO-CUCUMBER-00D084?style=for-the-badge&logo=cucumber&logoColor=white)](https://koyama8.github.io/Automation-Hub/)
[![Cypress Cloud](https://img.shields.io/badge/CYPRESS%20CLOUD-RUNS-04C38E?style=for-the-badge&logo=cypress&logoColor=white)](https://cloud.cypress.io/projects/2hmvki/branches/master/runs)
[![k6](https://img.shields.io/badge/PERFORMANCE-K6%20PLANEJADO-F97316?style=for-the-badge&logo=k6&logoColor=white)](#segurança-e-performance)
[![Lighthouse](https://img.shields.io/badge/PERFORMANCE-LIGHTHOUSE%20PLANEJADO-F43F5E?style=for-the-badge&logo=lighthouse&logoColor=white)](#segurança-e-performance)
[![Download do projeto](https://img.shields.io/badge/BAIXAR%20PROJETO-ZIP-1677FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/koyama8/Automation-Hub/archive/refs/heads/master.zip)

Laboratório prático de **Quality Engineering / SDET** para automações Web e API com Cypress. O projeto evolui de testes legados para uma arquitetura BDD, priorizando reutilização, validações confiáveis, prevenção de falsos positivos e integração contínua.

> **Implementação futura:** k6 será usado para carga e desempenho da API; Lighthouse para Web Vitals, acessibilidade e boas práticas da interface Web.

## Visão geral

| Área | Objetivo | Tecnologias |
| --- | --- | --- |
| `apps/api/` | API REST e automação de serviços | Node.js, Express, Prisma, PostgreSQL, Cypress |
| `apps/web/` | Interface e automação E2E | HTML, CSS, JavaScript, Cypress |
| `bruno/QA Automation Lab/` | Coleção para testes manuais de API | Bruno |
| `.github/workflows/` | Pipeline de qualidade | GitHub Actions, Cypress Cloud, GitHub Pages |

## Arquitetura em evolução

| Capacidade | Status | Padrão adotado |
| --- | --- | --- |
| Cypress Web e API | Implementado | Suítes independentes |
| BDD com Cucumber | Em evolução | Features e Steps organizados por domínio |
| Automação Web | Em evolução | Feature → Steps → Page Objects → Web |
| Automação de API | Em evolução | Feature → Steps → API Clients → API REST |
| CI/CD e evidências | Implementado | GitHub Actions, Cypress Cloud e artefatos |
| Relatórios Cucumber | Implementado | HTML/JSON para Web e API no GitHub Pages |
| Performance e DAST | Planejado | k6, Lighthouse e OWASP ZAP |

Testes antigos e BDD convivem durante a migração. Um teste legado somente é removido após a comparação das validações, execução da suíte relacionada e confirmação de que o novo cenário passou pelo motivo correto.

## Relatórios Cucumber

[![Portal](https://img.shields.io/badge/PORTAL-ABRIR-00D084?style=for-the-badge&logo=cucumber&logoColor=white)](https://koyama8.github.io/Automation-Hub/)
[![Web](https://img.shields.io/badge/WEB-RELATORIO-22E6A2?style=for-the-badge&logo=cypress&logoColor=white)](https://koyama8.github.io/Automation-Hub/web/)
[![API](https://img.shields.io/badge/API-RELATORIO-6CB6FF?style=for-the-badge&logo=cypress&logoColor=white)](https://koyama8.github.io/Automation-Hub/api/)

Os relatórios são atualizados automaticamente pela pipeline após a aprovação das suítes Web e API na branch `master`.

## Estrutura principal

```text
qa-automation-lab/
├── .github/workflows/qa-ci.yml
├── apps/
│   ├── api/
│   │   └── cypress/
│   │       ├── e2e/features/
│   │       ├── e2e/step_definitions/
│   │       └── support/api_clients/
│   └── web/
│       └── cypress/
│           ├── e2e/features/
│           ├── e2e/step_definitions/
│           └── support/
│               ├── factories/
│               └── page_objects/
│                   ├── auth/
│                   ├── clientes/
│                   ├── componentes/
│                   ├── sistema/
│                   └── usuarios/
├── bruno/QA Automation Lab/
├── database/seed/
└── docker-compose.yml
```

## Baixar e executar

Pré-requisitos: **Node.js 24**, npm e Docker Desktop com Docker Compose. Git é necessário somente para a opção de clone.

Baixe pelo botão **BAIXAR PROJETO · ZIP** no topo, extraia o arquivo e abra um PowerShell na pasta extraída. Como alternativa, clone o repositório:

```powershell
git clone https://github.com/koyama8/Automation-Hub.git
cd Automation-Hub
```

Ordem de inicialização: **PostgreSQL → API → Web → testes Cypress**. Os comandos completos estão nas próximas seções.

## Execução local

Suba o PostgreSQL:

```powershell
docker compose up -d
```

Prepare e execute a API:

```powershell
cd apps/api
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Execute a aplicação Web em outro terminal:

```powershell
cd apps/web
npm install
npm run dev
```

## Execução dos testes

API:

```powershell
cd apps/api
npx cypress run --browser electron --config video=false
```

Web:

```powershell
cd apps/web
npx cypress run --browser electron --config video=false
```

Feature específica:

```powershell
npx cypress run --spec "cypress/e2e/features/usuarios/usuarios.feature"
```

Durante a migração, as configurações aceitam testes `.cy.js` e `.feature` simultaneamente.

## Padrão BDD

As palavras estruturais permanecem em inglês e o comportamento é descrito em português:

```gherkin
Feature: Usuários da API

  Scenario: CT01 - Listar todos os usuários cadastrados
    Given que possuo um token de administrador válido
    When solicito a listagem de usuários
    And recebo a resposta da listagem de usuários
    Then os usuários cadastrados devem ser retornados
```

Steps existentes devem ser reutilizados. Page Objects concentram seletores, ações e validações Web; API Clients concentram requisições e validações dos serviços.

### Massas de teste

Massas dinâmicas e reutilizáveis ficam em `apps/web/cypress/support/factories/`, como `ClienteFactory.js`. Dados estáticos de referência permanecem em `apps/web/cypress/fixtures/`; credenciais e segredos não devem ser armazenados nesses arquivos.

## CI/CD

O workflow [`qa-ci.yml`](.github/workflows/qa-ci.yml) executa:

- preparação do PostgreSQL, Prisma e massa inicial;
- suítes Cypress Web e API em jobs separados;
- bloqueio de `.only` e registro no Cypress Cloud;
- evidências em falhas, incluindo screenshots, vídeos e logs;
- geração dos relatórios Cucumber Web/API;
- publicação automática do portal no GitHub Pages.

## Segurança e performance

| Iniciativa | Estado | Objetivo |
| --- | --- | --- |
| Autenticação, perfis e permissões | Implementado | Validar RBAC, revogação de token e acessos Admin, QA e Viewer |
| Proteção de dados e segredos | Em evolução | Evitar dados sensíveis e utilizar variáveis de ambiente |
| Contratos e JSON Schema | Planejado | Detectar quebras de contrato da API |
| Performance de API com k6 | Planejado | Carga, tempo de resposta, throughput e taxa de erro |
| Performance Web com Lighthouse | Planejado | Web Vitals, acessibilidade e boas práticas |
| DAST com OWASP ZAP | Planejado | Verificações automatizadas de segurança |
| Quality gates avançados | Planejado | Bloquear regressões de contrato, performance e segurança |

Essas implementações serão adicionadas gradualmente após a consolidação da migração BDD, sem misturar responsabilidades dos testes funcionais.

## Próximas evoluções

1. concluir a migração estrutural Web e API;
2. adicionar tags de smoke, regressão e cenários negativos;
3. ampliar contratos, métricas e identificação de testes instáveis;
4. implementar k6, Lighthouse, DAST e quality gates avançados.

## Ambiente local

| Serviço | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3030` |
| Health | `http://localhost:3030/api/health` |
| PostgreSQL | `localhost:5434` |
| PgAdmin | `http://localhost:15434` |

Credenciais exclusivas do laboratório local:

| Acesso | E-mail | Senha |
| --- | --- | --- |
| API/Web | `qa@adminlab.com` | `pwd123` |
| PgAdmin | `dba@pgadmin.com` | `dba` |

## Bruno

Abra `bruno/QA Automation Lab` no Bruno Desktop e execute primeiro `Auth/01 - Login valido` para armazenar o token das rotas protegidas. A coleção inclui cenários positivos, negativos, permissões, perfis, idempotência e auditoria.

> Rotas protegidas utilizam `Authorization: Bearer <token>`. IDs podem mudar após limpezas ou seeds; prefira os valores retornados pela API.
