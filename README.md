# QA Automation Lab

Ambiente local para estudos e pratica de QA Automation, reunindo API REST, interface web, banco PostgreSQL, colecoes Bruno e automacoes com Cypress.

## Objetivo

O projeto simula fluxos administrativos e comerciais usados em testes de API e E2E. A ideia e oferecer uma base completa para praticar:

- cadastro, consulta, atualizacao e exclusao de dados;
- autenticacao com JWT e rotas protegidas;
- integracao entre clientes, contratos, produtos, pedidos, carrinho e pagamentos;
- preparo de massa de dados para automacao;
- validacao de cenarios positivos e negativos via Cypress e Bruno.

## Stack

| Camada | Tecnologias |
| --- | --- |
| API | Node.js, Express, Prisma |
| Banco | PostgreSQL, PgAdmin, Docker Compose |
| Web | HTML, CSS, JavaScript, Serve |
| Automacao | Cypress 14, cypress-plugin-api |
| Apoio de API | Bruno |

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
|   |   |-- src/
|   |   |   |-- controllers/      # Entrada HTTP
|   |   |   |-- middlewares/      # Autenticacao e tratamento de erros
|   |   |   |-- repositories/     # Acesso ao Prisma
|   |   |   |-- routes/           # Rotas REST
|   |   |   |-- services/         # Regras de negocio
|   |   |   `-- utils/            # Validacoes e helpers
|   |   `-- index.js              # Inicializacao da API
|   `-- web/
|       |-- cypress/              # Automacoes E2E
|       `-- dist/                 # Interface local
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

## URLs Locais

| Recurso | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3030` |
| Health check | `http://localhost:3030/api/health` |
| PostgreSQL | `localhost:5434` |
| PgAdmin | `http://localhost:15434` |

## Credenciais Locais

O seed cria um administrador padrao para uso em testes:

```text
email: qa@adminlab.com
senha: pwd123
```

Esses valores podem ser sobrescritos no `.env` com `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

## Automacao

API:

```powershell
cd apps/api
npm run cypress:open
# ou
npm run cypress:run
```

Web:

```powershell
cd apps/web
npm run cypress:open
# ou
npm run cypress:run
```

As suites usam dados criados durante o proprio teste sempre que possivel, reduzindo dependencia de massa fixa no banco.

## Bruno

As colecoes Bruno sao usadas como apoio para validar manualmente as rotas da API. Elas seguem o mesmo fluxo esperado pelas automacoes:

1. autenticar e salvar o token;
2. criar entidades base, como cliente e produto;
3. reutilizar IDs salvos em variaveis;
4. validar respostas positivas e negativas.

## Reset de Massa

Algumas rotas administrativas removem massas de teste e reiniciam sequencias de IDs, como clientes, usuarios e produtos. Use esses endpoints apenas em ambiente local de laboratorio.

## Observacoes

- A API usa JWT em rotas administrativas.
- O banco roda em PostgreSQL via Docker.
- O Prisma centraliza modelos, migrations e acesso aos dados.
- O projeto foi desenhado para estudo, pratica e evolucao incremental de automacao.
