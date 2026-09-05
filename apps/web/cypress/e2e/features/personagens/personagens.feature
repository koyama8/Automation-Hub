@web
@personagens
@regression
Feature: Personagens

  Scenario: CT01 - Cadastrar um personagem com sucesso
    Given que estou autenticado como administrador
    When acesso a tela de cadastro de personagens
    And cadastro um personagem com todos os dados obrigatorios
    Then devo visualizar a confirmacao de personagem cadastrado com sucesso

  @negative
  Scenario: CT02 - Validar os campos obrigatorios do cadastro de personagem
    Given que estou autenticado como administrador
    When acesso a tela de cadastro de personagens
    And tento cadastrar um personagem sem preencher os dados
    Then devo visualizar as validacoes obrigatorias do personagem

  Scenario: CT03 - Validar os dados dos personagens listados
    Given que estou autenticado como administrador
    When acesso a tela de gerenciamento de personagens
    Then devo visualizar os dados dos personagens cadastrados

  Scenario: CT04 - Visualizar, editar e excluir um personagem
    Given que estou autenticado como administrador
    When acesso a tela de gerenciamento de personagens
    And visualizo, edito e excluo um personagem
    Then devo visualizar a confirmacao de personagem excluido com sucesso

  Scenario: CT05 - Filtrar personagens por universo
    Given que estou autenticado como administrador
    When acesso a tela de gerenciamento de personagens
    And filtro os personagens pelo universo Dragon Ball
    Then devo visualizar somente os personagens do universo selecionado

  Scenario: CT06 - Buscar personagem pelo nome
    Given que estou autenticado como administrador
    When acesso a tela de gerenciamento de personagens
    And busco o personagem Naruto pelo nome
    Then devo visualizar os dados do personagem encontrado
