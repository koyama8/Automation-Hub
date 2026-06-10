# Estrategia de Testes

## API

- Validar status code.
- Validar payload de sucesso.
- Validar mensagens de erro.
- Validar campos obrigatorios.
- Validar email duplicado.
- Validar atualizacao e exclusao.

## Web

- Login com sucesso.
- Login com campos vazios.
- Cadastro com sucesso.
- Cadastro com email invalido.
- Recuperacao de senha.
- Navegacao pelo dashboard.
- Envio de formulario.
- Listagem de usuarios.

## Organizacao

Cypress e Playwright testam a mesma Web e a mesma API. Isso reforca a logica de automacao sem duplicar aplicacao.
