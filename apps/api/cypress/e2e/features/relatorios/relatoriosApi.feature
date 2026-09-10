@api
@relatorios
@regression
Feature: Relatorios da API

  Background:
    Given que possuo um token de administrador para relatorios

  @smoke
  Scenario: CT01 - Consultar resumo geral dos relatorios
    When solicito o resumo geral dos relatorios
    Then o relatorio deve ser retornado com sucesso

  Scenario Outline: CT02 - Consultar relatorio paginado
    When solicito o relatorio de "<recurso>" com pagina <pagina> e limite <limite>
    Then o relatorio deve ser retornado com sucesso

    Examples:
      | recurso  | pagina | limite |
      | clients  | 1      | 10     |
      | orders   | 1      | 10     |
      | payments | 1      | 10     |
      | clients  | 1      | 5      |
      | clients  | 2      | 5      |
      | clients  | 999    | 10     |
      | clients  | 1      | 100    |

  Scenario Outline: CT03 - Consultar relatorio filtrado
    When solicito o relatorio de "<recurso>" com o filtro "<filtro>" igual a "<valor>"
    Then o relatorio deve ser retornado com sucesso

    Examples:
      | recurso  | filtro | valor    |
      | clients  | status | active   |
      | orders   | status | paid     |
      | payments | status | approved |

  Scenario Outline: CT04 - Consultar relatorio por periodo
    When solicito o relatorio de "<recurso>" entre "2026-01-01" e "2026-12-31" com status "<status>"
    Then o relatorio deve ser retornado com sucesso

    Examples:
      | recurso  | status   |
      | clients  |          |
      | payments | approved |

  Scenario Outline: CT05 - Exportar relatorio em CSV
    When solicito a exportacao do relatorio de "<recurso>"
    Then o arquivo CSV deve ser retornado com sucesso

    Examples:
      | recurso  |
      | clients  |
      | orders   |
      | payments |

  @negative
  Scenario: CT06 - Rejeitar paginacao invalida
    When solicito o relatorio com uma pagina invalida
    Then a consulta do relatorio deve ser rejeitada com status 400 e mensagem "page must be an integer between 1 and 1000000!"

  @negative
  Scenario: CT07 - Rejeitar periodo invalido
    When solicito o relatorio com um periodo invalido
    Then a consulta do relatorio deve ser rejeitada com status 400 e mensagem "startDate must be before or equal to endDate!"

  @negative
  Scenario: CT08 - Rejeitar status invalido
    When solicito o relatorio com um status invalido
    Then a consulta do relatorio deve ser rejeitada com status 400 e mensagem "status must be one of: active, inactive!"

  @negative
  Scenario: CT09 - Rejeitar token invalido
    Given que utilizo um token invalido nos relatorios
    When solicito o resumo geral dos relatorios
    Then a consulta do relatorio deve ser rejeitada com status 401 e mensagem "Invalid or expired authentication token!"
