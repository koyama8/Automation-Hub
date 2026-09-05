@api
@senha
@regression
Feature: Recuperacao de senha da API

  Background:
    Given que possuo um token de administrador para o fluxo de senha

  @smoke
  Scenario: CT01 - Solicitar recuperacao de senha
    Given que existe um usuario cadastrado para recuperacao de senha
    When solicito a recuperacao de senha
    And recebo a resposta da solicitacao de recuperacao de senha
    Then o token de recuperacao de senha deve ser retornado

  Scenario: CT02 - Redefinir senha com token valido
    Given que existe um usuario cadastrado para redefinicao de senha
    And que solicitei a recuperacao de senha e obtive um token valido
    When solicito a redefinicao da senha
    And recebo a resposta da redefinicao de senha
    Then a senha deve ser redefinida com sucesso
