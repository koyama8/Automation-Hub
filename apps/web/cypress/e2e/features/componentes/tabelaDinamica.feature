@web
@componentes
@regression
Feature: Tabela dinamica

  Scenario: CT01 - Exibir os dados iniciais da tabela dinamica
    Given que estou autenticado como administrador
    When acesso a tela de tabela dinamica
    Then devo visualizar os dados iniciais da tabela dinamica

  Scenario: CT02 - Adicionar uma nova linha na tabela dinamica
    Given que estou autenticado como administrador
    When acesso a tela de tabela dinamica
    And adiciono uma nova linha na tabela dinamica
    Then devo visualizar a nova linha na tabela dinamica

  Scenario: CT03 - Filtrar a tabela dinamica por status automatizado
    Given que estou autenticado como administrador
    When acesso a tela de tabela dinamica
    And filtro a tabela dinamica pelo status automatizado
    Then devo visualizar somente os registros com status automatizado

  Scenario: CT04 - Remover uma linha da tabela dinamica
    Given que estou autenticado como administrador
    When acesso a tela de tabela dinamica
    And removo uma linha da tabela dinamica
    And recebo a confirmacao da remocao
    Then a linha removida nao deve permanecer na tabela
