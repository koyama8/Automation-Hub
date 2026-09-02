@web
@componentes
@regression
Feature: Entrada de teclado

  Scenario: CT01 - Salvar um cenario ao pressionar Enter
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And informo um cenario e pressiono Enter
    Then o cenario informado deve ser salvo com sucesso

  Scenario: CT02 - Salvar um cenario pelo botao
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And informo um cenario para salvar
    And solicito o salvamento pelo botao
    Then o cenario informado deve ser salvo com sucesso

  Scenario: CT03 - Exibir os cenarios salvos na lista
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And cadastro tres cenarios por teclado
    Then os cenarios salvos devem ser exibidos na lista com a data atual

  Scenario: CT04 - Remover cenarios salvos da lista
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And cadastro tres cenarios por teclado
    And removo dois cenarios salvos da lista
    Then os cenarios removidos nao devem ser exibidos na lista

  @negative
  Scenario: CT05 - Exibir validacao ao tentar salvar um cenario vazio
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And solicito o salvamento sem informar um cenario
    Then devo visualizar a mensagem de validacao do cenario

  Scenario: CT06 - Atualizar o contador de cenarios salvos
    Given que estou autenticado como administrador
    When acesso a tela de entrada por teclado
    And informo e salvo um cenario pelo botao
    Then o contador deve indicar um cenario salvo
