@web
@cenarios
@regression
Feature: Construtor de cenarios

  Scenario: CT01 - Construir e visualizar um novo cenario
    Given que estou autenticado como administrador
    When acesso o construtor de cenarios
    And preencho e salvo um novo cenario automatizado
    Then devo visualizar todos os dados do cenario construido

  @negative
  Scenario: CT02 - Validar os campos obrigatorios do construtor de cenarios
    Given que estou autenticado como administrador
    When acesso o construtor de cenarios
    And tento salvar um cenario sem preencher os dados
    Then devo visualizar as validacoes obrigatorias do cenario
