@web
@carrinho
@regression
Feature: Carrinho

  Scenario: CT01 - Exibir os elementos da tela do carrinho
    Given que estou autenticado como administrador
    When acesso a tela do carrinho
    And visualizo o formulario inicial do carrinho
    Then devo visualizar a tabela do carrinho
