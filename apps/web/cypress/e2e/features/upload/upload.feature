@web
@upload
@regression
Feature: Upload de evidencias

  Scenario: CT01 - Enviar evidencia em PDF com sucesso
    Given que estou autenticado como administrador
    And que estou na tela de upload de evidencias
    When envio um arquivo PDF como evidencia
    Then devo visualizar a confirmacao de evidencia anexada com sucesso

  @negative
  Scenario: CT02 - Exibir validacao ao enviar sem arquivo
    Given que estou autenticado como administrador
    And que estou na tela de upload de evidencias
    When tento enviar uma evidencia sem selecionar um arquivo
    Then devo visualizar a mensagem de selecao obrigatoria de arquivo
