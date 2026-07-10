# QA Automation Lab

[![QA Automation Lab CI](https://github.com/koyama8/Automation-Hub/actions/workflows/qa-ci.yml/badge.svg)](https://github.com/koyama8/Automation-Hub/actions)
[![Cypress Cloud](https://img.shields.io/badge/Cypress%20Cloud-runs-04C38E?logo=cypress&logoColor=white)](https://cloud.cypress.io/projects/2hmvki/branches/master/runs)
[![Node.js](https://img.shields.io/badge/Node.js-Express%20%2B%20Prisma-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Repositorio de estudos praticos em QA Automation, reunindo API REST, interface web, banco PostgreSQL, colecao Bruno, testes Cypress e CI/CD com GitHub Actions + Cypress Cloud.

## Visao Geral

| Pasta | Objetivo | Stack principal | CI / Evidencias |
| --- | --- | --- | --- |
| `apps/api/` | API REST para estudos de API Testing e massa de dados | Node.js, Express, Prisma, PostgreSQL | Cypress API + GitHub Actions |
| `apps/web/` | Interface local para praticar testes E2E | HTML, CSS, JavaScript, Serve | Cypress E2E + Cypress Cloud |
| `bruno/QA Automation Lab/` | Colecao de requisicoes para estudo de API | Bruno | Cenarios positivos e negativos |
| `database/` | Seed e apoio de massa local | Prisma, PostgreSQL | Base usada no CI |

## Stack

| Camada | Tecnologias |
| --- | --- |
| API | Node.js, Express, Prisma |
| Banco | PostgreSQL, PgAdmin, Docker Compose |
| Web | HTML, CSS, JavaScript, Serve |
| Automacao | Cypress 14, cypress-plugin-api |
| Apoio de API | Bruno |
| CI / Evidencias | GitHub Actions, Cypress Cloud |

## Modulos da API

| Modulo | Base path | Principais recursos |
| --- | --- | --- |
| Auth | `/api/auth` | login e sessao atual |
| Usuarios | `/api/users` | CRUD, ativacao, inativacao e limpeza de massa |
| Clientes | `/api/clients` | CRUD, status, busca e reset de IDs |
| Contratos | `/api/contracts` | criar, listar, buscar, atualizar, cancelar, ativar e excluir |
| Produtos | `/api/products` | CRUD, status, validacoes de preco/estoque e limpeza total |
| Pedidos | `/api/orders` | criar pedido com itens, listar, buscar, atualizar status e cancelar |
| Carrinho | `/api/cart` | adicionar, remover, atualizar quantidade e limpar itens |
| Pagamentos | `/api/payments` | Pix, cartao, boleto, confirmacao, recusa e estorno |
| Cupons | `/api/coupons` | criar, validar, aplicar desconto, expirar e controlar uso |
| Evidencias | `/api/evidences` | upload, listagem, metadata e exclusao de arquivos |
| Senha | `/api/password` | solicitacao e redefinicao de senha |
| Sistema | `/api/system` | reset de laboratorio |
| Health | `/api/health` | status da API e conexao com banco |

## Estrutura

```text
qa-automation-lab/
|-- apps/
|   |-- api/
|   |   |-- cypress/              # Automacoes de API
|   |   |-- prisma/               # Schema e migrations
|   |   |-- src/                  # Controllers, rotas, services e repositories
|   |   `-- index.js              # Inicializacao da API
|   `-- web/
|       |-- cypress/              # Automacoes E2E
|       |-- dist/                 # Interface local
|       `-- src/                  # Scripts da interface
|-- bruno/
|   `-- QA Automation Lab/        # Requisicoes da API no Bruno
|-- database/
|   `-- seed/                     # Massa inicial
|-- docker-compose.yml            # PostgreSQL e PgAdmin
`-- README.md
```

## Como Rodar

Suba o banco:

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

Execute a interface web em outro terminal:

```powershell
cd apps/web
npm install
npm run dev
```

## Execucao dos Testes

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

CI e evidencias:

| Ferramenta | Link |
| --- | --- |
| GitHub Actions | [Runs do QA Automation Lab](https://github.com/koyama8/Automation-Hub/actions) |
| Cypress Cloud | [Runs no Cypress Cloud](https://cloud.cypress.io/projects/2hmvki/branches/master/runs) |

## URLs Locais

| Servico | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3030` |
| Health | `http://localhost:3030/api/health` |
| PostgreSQL | `localhost:5434` |
| PgAdmin | `http://localhost:15434` |

## Credenciais Locais

| Acesso | Usuario | Senha |
| --- | --- | --- |
| API/Web | `qa@adminlab.com` | `pwd123` |
| PgAdmin | `dba@pgadmin.com` | `dba` |

## Bruno

A colecao fica em `bruno/QA Automation Lab`. Abra essa pasta no Bruno Desktop e execute primeiro `Auth/01 - Login valido` para salvar o token usado nas rotas protegidas.

## Observacoes

- IDs podem mudar depois de limpezas ou seeds; use os retornos da API como referencia.
- Rotas protegidas usam `Authorization: Bearer <token>`.
- GitHub Actions executa as suites de API e Web a cada push.
- Cypress Cloud guarda historico, videos/screenshots quando habilitados e evidencias dos runs.
