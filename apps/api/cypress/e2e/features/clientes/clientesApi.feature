@api
@clientes
@regression
Feature: Clientes da API

  @smoke
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

  Scenario: CT03 - Buscar cliente cadastrado pelo ID
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    When solicito a busca do cliente cadastrado pelo ID
    And recebo a resposta da busca do cliente
    Then os dados do cliente cadastrado devem ser retornados

  Scenario: CT04 - Atualizar os dados de um cliente cadastrado
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    And que possuo novos dados validos para o cliente
    When solicito a atualizacao do cliente cadastrado
    And recebo a resposta da atualizacao do cliente
    Then os dados do cliente devem ser atualizados com sucesso

  Scenario: CT05 - Inativar cliente cadastrado
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    When solicito a inativacao do cliente cadastrado
    And recebo a resposta da inativacao do cliente
    Then o cliente deve ser retornado com status inativo

  Scenario: CT06 - Excluir cliente cadastrado pelo ID
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    And que existe outro cliente cadastrado para preservacao
    When solicito a exclusao do cliente cadastrado pelo ID
    And recebo a resposta da exclusao do cliente
    Then somente o cliente solicitado deve ser excluido

  Scenario: CT07 - Excluir todos os clientes cadastrados
    Given que possuo um token de administrador para clientes
    And que existe um cliente cadastrado para consulta
    When solicito a exclusao de todos os clientes
    And recebo a resposta da exclusao de todos os clientes
    Then nenhum cliente deve permanecer cadastrado
