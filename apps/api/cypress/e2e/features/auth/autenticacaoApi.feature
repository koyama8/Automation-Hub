Feature: Autenticacao da API

  Scenario: CT01 - Realizar login com credenciais validas
    Given que possuo credenciais validas
    When envio uma solicitacao de autenticacao
    And recebo a resposta da autenticacao
    Then o login deve ser realizado com sucesso

  Scenario: CT02 - Rejeitar login com credenciais invalidas
    Given que possuo credenciais invalidas
    When envio uma solicitacao de autenticacao
    And recebo a resposta da autenticacao
    Then o login deve ser rejeitado
