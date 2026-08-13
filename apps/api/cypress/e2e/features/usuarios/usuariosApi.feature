Feature: Usuarios da API

  Scenario: CT01 - Listar todos os usuarios cadastrados
    Given que possuo um token de administrador valido
    When solicito a listagem de usuarios
    And recebo a resposta da listagem de usuarios
    Then os usuarios cadastrados devem ser retornados
