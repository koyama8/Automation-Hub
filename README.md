# QA Automation Lab

Laboratorio local para estudo de QA Automation com API REST, web, PostgreSQL, Bruno e Cypress.

## Stack

- API: Node.js, Express e Prisma
- Banco: PostgreSQL e PgAdmin via Docker
- Web: HTML, CSS, JavaScript e `serve`
- Apoio/testes: Bruno, Cypress e cypress-plugin-api

## Como rodar

Banco:

```powershell
docker compose up -d
```

API:

```powershell
cd apps/api
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Web:

```powershell
cd apps/web
npm install
npm run dev
```

## Acessos

- Web: `http://localhost:3000`
- Login: `http://localhost:3000/admin/login`
- API: `http://localhost:3030`
- Health: `http://localhost:3030/api/health`
- PgAdmin: `http://localhost:15434`

Credencial local:

```text
email: qa@adminlab.com
senha: pwd123
```

## Modulos

- Auth: `/api/auth`
- Usuarios: `/api/users`
- Clientes: `/api/clients`
- Contratos: `/api/contracts`
- Produtos: `/api/products`
- Carrinho: `/api/cart`
- Pedidos: `/api/orders`
- Pagamentos: `/api/payments`
- Cupons: `/api/coupons`
- Upload de Evidencias: `/api/evidences`
- Senha: `/api/password`
- Sistema: `/api/system`

Rotas protegidas usam `Authorization: Bearer <token>`.

## Web e Bruno

A web possui telas administrativas para os modulos do lab, incluindo as telas novas de **Cupons** e **Upload de Evidencias**.

A colecao Bruno fica em `bruno/QA Automation Lab`. Abra essa pasta no Bruno Desktop e execute primeiro `Auth/01 - Login valido` para salvar o token.

Pastas novas no Bruno:

- **Cupons:** 22 requisicoes com cenarios positivos e negativos.
- **Upload de Evidencias:** 16 requisicoes com upload, metadata, tipo invalido, tamanho maximo, vinculo divergente e 404.

## Upload de Evidencias

O upload usa JSON com arquivo em base64. Tipos aceitos: PNG, JPG, WEBP, PDF, TXT, CSV, JSON, DOC, DOCX, XLS e XLSX. Tamanho maximo decodificado: `1MB`.

## Cypress

```powershell
cd apps/api
npm run cypress:open

cd apps/web
npm run cypress:open
```

Cupons e Upload de Evidencias ja possuem API, web e Bruno prontos. Os testes Cypress desses dois modulos ficam para criacao manual durante o estudo.

## Observacoes

- Prisma controla schema, migrations e acesso ao PostgreSQL.
- IDs podem saltar depois de limpezas; use os IDs retornados pela API.
- Use as requisicoes de `Sistema` no Bruno para resetar massa local.
