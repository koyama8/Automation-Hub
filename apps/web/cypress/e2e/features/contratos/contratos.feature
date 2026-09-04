@web
@contratos
@regression
Feature: Contratos e assinaturas

  Scenario: CT01 - Cadastrar um contrato para um cliente existente
    Given que estou autenticado como administrador
    And que possuo um cliente existente disponivel na tela de contratos
    When cadastro um contrato ativo para o cliente
    Then devo visualizar a confirmacao de contrato cadastrado com sucesso

  Scenario: CT02 - Validar os dados do contrato cadastrado
    Given que estou autenticado como administrador
    And que possuo um cliente existente disponivel na tela de contratos
    When cadastro um contrato ativo para validacao
    Then devo visualizar os dados e as acoes do contrato na tabela
