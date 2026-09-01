@api
@auth
@regression
Feature: Sessao atual da API

  @smoke
  Scenario: CT01 - Consultar os dados do usuario autenticado
    Given que possuo um token de autenticacao valido
    When consulto os dados da sessao atual
    And recebo a resposta da consulta
    Then os dados do usuario autenticado devem ser retornados
