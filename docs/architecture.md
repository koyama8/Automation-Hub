# Arquitetura

Este projeto foi pensado como uma pasta unica e independente para ser movida para outro repositorio quando necessario.

## Decisao tecnica

A API principal usa Node.js com Express e Prisma. Python nao entra neste projeto para evitar misturar duas arquiteturas no mesmo laboratorio.

## Responsabilidades

- `apps/web`: interface unica para automacao Web.
- `apps/api`: API real consumida pela Web e pelos testes de API.
- `tests/cypress`: automacao com Cypress separada por Web e API.
- `tests/playwright`: automacao com Playwright separada por Web e API.
- `docker-compose.yml`: banco PostgreSQL e PgAdmin.
- `docs`: contrato, arquitetura e estrategia de testes.

## Portas

- Web: `http://localhost:3000`
- API: `http://localhost:3030`
- PostgreSQL: `localhost:5434`
- PgAdmin: `http://localhost:15434`
