# QA Automation Lab - Bruno

Base URL local: `http://localhost:3030`.

1. Execute `Auth/01 - Login valido` antes das rotas protegidas.
2. O token JWT sera salvo automaticamente em `authToken`.
3. Ao cadastrar um cliente, o ID sera salvo automaticamente em `clientId`.
4. As demais requisicoes de clientes reutilizam essas variaveis.

Se a API for reiniciada ou o token expirar, execute novamente o login valido. Os IDs do PostgreSQL podem possuir intervalos; sempre use o ID retornado pela API.
