@web
@componentes
@regression
Feature: Estados visuais

  Scenario: CT01 - Validar o estado visual de sucesso
    Given que estou autenticado como administrador
    When acesso a tela de estados visuais
    And seleciono o estado visual "Sucesso"
    Then devo visualizar a mensagem "Cenario aprovado" sem alerta de erro

  Scenario: CT02 - Validar o estado visual de alerta
    Given que estou autenticado como administrador
    When acesso a tela de estados visuais
    And seleciono o estado visual "Alerta"
    Then devo visualizar a mensagem "Cenario em atencao" sem alerta de erro

  @negative
  Scenario: CT03 - Validar o estado visual de erro
    Given que estou autenticado como administrador
    When acesso a tela de estados visuais
    And seleciono o estado visual "Erro"
    Then devo visualizar a mensagem "Cenário com falha" com alerta de erro
