@web
@cupons
@regression
Feature: Cupons

  Scenario: CT01 - Cadastrar, validar e excluir um cupom com sucesso
    Given que estou autenticado como administrador
    When acesso a tela de cupons e cadastro um cupom valido
    And visualizo o cupom ativo com os valores cadastrados na tabela
    Then devo conseguir excluir o cupom cadastrado
