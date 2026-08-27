Feature: Clientes da API

  Scenario: CT01 - Cadastrar novo cliente com sucesso
    Given que possuo um token de administrador para clientes
    And que possuo dados validos para cadastro de cliente
    When solicito o cadastro do cliente
    And recebo a resposta do cadastro do cliente
    Then o cliente deve ser cadastrado com sucesso

  Scenario: CT02 - Listar o cliente cadastrado
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    When solicito a listagem de clientes
    And recebo a resposta da listagem de clientes
    Then o cliente cadastrado deve ser retornado
