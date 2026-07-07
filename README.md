# QA Automation Lab

Ambiente local para estudos e pratica de QA Automation, reunindo API REST, interface web, banco PostgreSQL, colecao Bruno e automacoes com Cypress.

## Objetivo

O projeto simula fluxos administrativos e comerciais usados em testes de API e E2E. A ideia e oferecer uma base completa para praticar:

- cadastro, consulta, atualizacao e exclusao de dados;
- autenticacao com JWT e rotas protegidas;
- integracao entre clientes, contratos, produtos, pedidos, carrinho, pagamentos, cupons e evidencias;
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
| Produtos | `/api/products` | CRUD, status, validacoes de preco/estoque/SKU e limpeza total |
| Pedidos | `/api/orders` | criar pedido com itens, listar, buscar, atualizar status e cancelar |
| Carrinho | `/api/cart` | adicionar, remover, atualizar quantidade e limpar itens |
| Pagamentos | `/api/payments` | Pix, cartao, boleto, confirmacao, recusa e estorno |
| Cupons | `/api/coupons` | criar, listar, buscar, atualizar, validar, aplicar, expirar e excluir |
| Evidencias | `/api/evidences` | upload base64, listar, buscar, baixar metadata e excluir |
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
|   |   |   |-- controllers/       # Entrada HTTP
|   |   |   |-- middlewares/       # Autenticacao e tratamento de erros
|   |   |   |-- repositories/      # Acesso ao Prisma
|   |   |   |-- routes/            # Rotas REST
|   |   |   |-- services/          # Regras de negocio
|   |   |   `-- utils/             # Validacoes e helpers
|   |   `-- index.js              # Inicializacao da API
|   `-- web/
|       |-- cypress/              # Automacoes E2E
|       `-- dist/                 # Interface local
|-- bruno/
|   `-- QA Automation Lab/        # Colecao Bruno
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

- Web: `http://localhost:3000`
- Login: `http://localhost:3000/admin/login`
- API: `http://localhost:3030`
- Health check: `http://localhost:3030/api/health`
- PostgreSQL: `localhost:5434`
- PgAdmin: `http://localhost:15434`

## Credenciais Locais

O seed cria um administrador padrao para uso em testes:

```text
email: qa@adminlab.com
senha: pwd123
```

Esses valores podem ser sobrescritos no `.env` com `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

## Bruno

A colecao fica em `bruno/QA Automation Lab`.

Execute primeiro `Auth/01 - Login valido` para salvar o token JWT em `authToken`. As demais requisicoes reutilizam variaveis como `clientId`, `productId`, `orderId`, `couponId` e `evidenceId`.

Pastas novas:

- **Cupons:** 22 requisicoes com cenarios positivos e negativos.
- **Upload de Evidencias:** 16 requisicoes com upload, metadata, arquivo obrigatorio, tipo invalido, tamanho maximo, vinculo divergente e evidencia inexistente.

## Observacoes

- A API usa JWT em rotas administrativas.
- O banco roda em PostgreSQL via Docker.
- O Prisma centraliza modelos, migrations e acesso aos dados.
- Upload de evidencias usa JSON com arquivo em base64 e tamanho maximo decodificado de `1MB`.
- Tipos aceitos no upload: PNG, JPG, WEBP, PDF, TXT, CSV, JSON, DOC, DOCX, XLS e XLSX.
- Cupons e Upload de Evidencias ja possuem API, web e Bruno prontos; os testes Cypress desses modulos ficam para criacao manual durante o estudo.
