@api @sistema @regression
Feature: Health Check da API

  @smoke
  Scenario: CT01 - Verificar disponibilidade da API e do banco de dados
    Given que a API esta configurada para consulta
    When consulto o endpoint de saude da API
    And recebo a resposta da requisicao
    Then a API e o banco de dados devem estar disponiveis
