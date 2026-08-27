@web @componentes @regression
Feature: Modal de termos

  Scenario: CT01 - Aceitar os termos com sucesso
    Given que estou autenticado como administrador
    When acesso a tela de termos
    And concluo o aceite dos termos
    Then devo visualizar a confirmacao de termos aceitos com sucesso

  @negative
  Scenario: CT02 - Exibir mensagem ao finalizar sem marcar o aceite
    Given que estou autenticado como administrador
    When acesso a tela de termos
    And tento finalizar o aceite sem marcar os termos
    Then devo visualizar a mensagem para marcar o aceite
