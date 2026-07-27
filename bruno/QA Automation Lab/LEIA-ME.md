# QA Automation Lab - Bruno

Base URL local: `http://localhost:3030`.

1. Execute `Auth/01 - Login valido` antes das rotas protegidas.
2. O token JWT sera salvo automaticamente em `authToken`.
3. Ao cadastrar um cliente, o ID sera salvo automaticamente em `clientId`.
4. As demais requisicoes de clientes reutilizam essas variaveis.
5. Para estudar RBAC, execute a pasta `Permissoes e Perfis` na ordem numerica.
6. Os scripts dessa pasta apenas geram e propagam variaveis entre requisicoes; eles nao possuem testes automatizados.

Se a API for reiniciada ou o token expirar, execute novamente o login valido. Os IDs do PostgreSQL podem possuir intervalos; sempre use o ID retornado pela API.

## Trilha de Permissoes e Perfis

- Admin gerencia identidades, perfis, bloqueios, sessoes e auditoria.
- QA consulta e grava dados operacionais, mas nao executa exclusoes criticas.
- Viewer possui acesso de leitura e nao altera dados.
- Mudancas de perfil, bloqueios, redefinicao de senha e revogacoes invalidam sessoes existentes.
- Mutacoes administrativas exigem justificativa; alteracoes concorrentes usam `version` e `If-Match`.
- Criacao de usuario suporta `Idempotency-Key` para evitar duplicidade por repeticao de requisicao.
