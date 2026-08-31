@api @produtos @regression
Feature: Produtos da API

  @smoke
  Scenario: CT01 - Cadastrar produto ativo com sucesso
    Given que possuo um token de administrador para produtos
    And que possuo dados validos para cadastro de produto
    When solicito o cadastro do produto
    And recebo a resposta do cadastro do produto
    Then o produto deve ser cadastrado com sucesso

  Scenario: CT02 - Listar o produto cadastrado
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para consulta
    When solicito a listagem de produtos
    And recebo a resposta da listagem de produtos
    Then o produto cadastrado deve ser retornado

  Scenario: CT03 - Buscar produto cadastrado pelo ID
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para consulta
    When solicito a busca do produto cadastrado pelo ID
    And recebo a resposta da busca do produto
    Then os dados do produto cadastrado devem ser retornados
  Scenario: CT04 - Atualizar os dados de um produto cadastrado
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para consulta
    And que possuo novos dados validos para o produto
    When solicito a atualizacao do produto cadastrado
    And recebo a resposta da atualizacao do produto
    Then os dados do produto devem ser atualizados com sucesso

  Scenario: CT05 - Ativar produto cadastrado
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado e inativo
    When solicito a ativacao do produto cadastrado
    And recebo a resposta da ativacao do produto
    Then o produto deve ser retornado com status ativo

  Scenario: CT06 - Excluir produto cadastrado pelo ID
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para exclusao
    When solicito a exclusao do produto cadastrado pelo ID
    And recebo a resposta da exclusao do produto
    Then o produto deve ser excluido com sucesso

  @negative
  Scenario: CT07 - Rejeitar cadastro com nome de produto duplicado
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para validacao de duplicidade
    When solicito um novo cadastro com o mesmo nome de produto
    And recebo a resposta do cadastro com nome duplicado
    Then o cadastro do produto deve ser rejeitado por nome duplicado

  Scenario: CT08 - Inativar produto cadastrado
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado e ativo
    When solicito a inativacao do produto cadastrado
    And recebo a resposta da inativacao do produto
    Then o produto deve ser retornado com status inativo

  Scenario: CT09 - Excluir todos os produtos cadastrados
    Given que possuo um token de administrador para produtos
    And que existe um produto cadastrado para consulta
    When solicito a exclusao de todos os produtos
    And recebo a resposta da exclusao de todos os produtos
    Then nenhum produto deve permanecer cadastrado
