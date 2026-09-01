@api
@usuarios
@regression
Feature: Usuarios da API

  @smoke
  Scenario: CT01 - Listar todos os usuarios cadastrados
    Given que possuo um token de administrador valido
    When solicito a listagem de usuarios
    And recebo a resposta da listagem de usuarios
    Then os usuarios cadastrados devem ser retornados

  Scenario: CT02 - Buscar usuario pelo ID
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado
    When solicito a busca do usuario pelo ID
    And recebo a resposta da busca do usuario
    Then o usuario solicitado deve ser retornado

  Scenario: CT03 - Cadastrar novo usuario com sucesso
    Given que possuo dados validos para cadastro de usuario
    When solicito o cadastro do usuario
    And recebo a resposta do cadastro do usuario
    Then o usuario deve ser cadastrado com sucesso

  Scenario: CT04 - Atualizar usuario com sucesso
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado
    And que possuo novos dados validos para o usuario
    When solicito a atualizacao do usuario pelo ID
    And recebo a resposta da atualizacao do usuario
    Then o usuario deve ser atualizado com sucesso

  Scenario: CT05 - Inativar usuario com sucesso
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado
    When solicito a inativacao do usuario pelo ID
    And recebo a resposta da inativacao do usuario
    Then o usuario deve ser inativado com sucesso

  Scenario: CT06 - Ativar usuario com sucesso
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado e inativo
    When solicito a ativacao do usuario pelo ID
    And recebo a resposta da ativacao do usuario
    Then o usuario deve ser ativado com sucesso

  Scenario: CT07 - Excluir usuario pelo ID com sucesso
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado
    When solicito a exclusao do usuario pelo ID
    And recebo a resposta da exclusao do usuario
    Then o usuario deve ser excluido com sucesso

  Scenario: CT08 - Limpar usuarios de teste com sucesso
    Given que possuo um token de administrador valido
    And que existe um usuario cadastrado
    When solicito a limpeza dos usuarios de teste
    And recebo a resposta da limpeza dos usuarios
    Then os usuarios de teste devem ser removidos e o administrador preservado
