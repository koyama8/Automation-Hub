@web
@clientes
@regression
Feature: Clientes

  @smoke
  Scenario: CT01 - Cadastrar cliente com sucesso
    Given que estou autenticado como administrador
    When acesso a tela de clientes
    And cadastro um cliente com dados validos
    Then devo visualizar a confirmacao do cadastro do cliente

  Scenario: CT02 - Validar e inativar cliente cadastrado
    Given que estou autenticado como administrador
    When acesso a tela de clientes
    And cadastro um cliente com dados validos
    And visualizo os dados do cliente cadastrado na tabela
    And solicito a inativacao do cliente
    Then devo visualizar a confirmacao e o status inativo do cliente
