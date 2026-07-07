# QA Automation Lab

Ambiente local para estudos de QA Automation com API REST, interface web, PostgreSQL, Bruno e Cypress.

## Objetivo

O projeto simula fluxos administrativos e comerciais para praticar testes de API e web, criacao de massa, autenticacao, validacoes positivas e negativas, e integracao entre entidades como clientes, contratos, produtos, pedidos, pagamentos, cupons e evidencias.

## Stack

| Camada | Tecnologias |
| --- | --- |
| API | Node.js, Express, Prisma |
| Banco | PostgreSQL, PgAdmin, Docker Compose |
| Web | HTML, CSS, JavaScript, Serve |
| Automacao | Cypress, cypress-plugin-api |
| Apoio de API | Bruno |

## Modulos da API

| Modulo | Base path | Principais recursos |
| --- | --- | --- |
| Auth | `/api/auth` | login e sessao atual |
| Usuarios | `/api/users` | CRUD, ativacao, inativacao e exclusao |
| Clientes | `/api/clients` | CRUD, status, busca e limpeza de massa |
| Contratos | `/api/contracts` | criar, listar, buscar, atualizar, cancelar, ativar e excluir |
| Produtos | `/api/products` | CRUD, validacoes de preco, estoque, SKU e status |
| Pedidos | `/api/orders` | criar pedido com itens, listar, buscar, atualizar status e cancelar |
| Carrinho | `/api/cart` | adicionar item, remover item, atualizar quantidade e limpar carrinho |
| Pagamentos | `/api/payments` | Pix, cartao, boleto, confirmacao, recusa e estorno |
| Cupons | `/api/coupons` | criar, listar, buscar, atualizar, validar, aplicar, expirar e excluir |
| Evidencias | `/api/evidences` | upload base64, listar, buscar, baixar metadata e excluir |
| Senha | `/api/password` | solicitacao e redefinicao de senha |
| Sistema | `/api/system` | reset do laboratorio |
| Health | `/api/health` | status da API e conexao com banco |

## URLs locais

| Recurso | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| Login | `http://localhost:3000/admin/login` |
| API | `http://localhost:3030` |
| Health | `http://localhost:3030/api/health` |
| PgAdmin | `http://localhost:15434` |

## Credencial local

| Perfil | Email | Senha |
| --- | --- | --- |
| Administrador | `qa@adminlab.com` | `pwd123` |

## Web e Bruno

A interface web possui telas administrativas para os modulos do laboratorio, incluindo **Cupons** e **Upload de Evidencias**.

A colecao Bruno fica em `bruno/QA Automation Lab`. Execute primeiro `Auth/01 - Login valido` para salvar o token e reutilizar as variaveis da colecao.

| Pasta Bruno | Cobertura |
| --- | --- |
| Cupons | 22 requisicoes com cenarios positivos e negativos |
| Upload de Evidencias | 16 requisicoes com upload, metadata, validacoes de arquivo, vinculo divergente e 404 |

## Observacoes

- Rotas protegidas usam `Authorization: Bearer <token>`.
- Upload de evidencias usa JSON com arquivo em base64.
- Tipos aceitos no upload: PNG, JPG, WEBP, PDF, TXT, CSV, JSON, DOC, DOCX, XLS e XLSX.
- Tamanho maximo do arquivo decodificado: `1MB`.
- Os testes Cypress de Cupons e Upload de Evidencias ficam para criacao manual durante o estudo.
