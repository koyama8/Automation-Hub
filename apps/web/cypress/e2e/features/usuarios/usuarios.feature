Feature: Usuarios

  Scenario: CT01 - Listar o usuario administrador
    Given que estou autenticado como administrador
    When acesso a tela de usuarios
    And visualizo a tabela de usuarios
    Then o usuario administrador deve ser exibido