@web @sistema @regression
Feature: Status da API

  @negative
  Scenario: CT01 - Informar quando a API estiver indisponivel
    Given que estou autenticado como administrador
    When acesso a tela de status da API
    And verifico o status com a API indisponivel
    Then devo visualizar a mensagem de API indisponivel e uma notificacao de erro
