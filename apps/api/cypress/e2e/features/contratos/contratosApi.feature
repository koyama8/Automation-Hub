@api
@contratos
@regression
Feature: Contratos da API

  Background:
    Given que possuo acesso de administrador para contratos

  @smoke
  Scenario: CT01 - Cadastrar contrato para cliente existente
    Given que existe um cliente para o contrato
    When solicito o cadastro de um contrato valido
    Then o contrato deve ser cadastrado com sucesso

  Scenario: CT02 - Listar contrato cadastrado
    Given que existe um contrato cadastrado
    When solicito a listagem de contratos
    Then o contrato deve estar presente na listagem

  Scenario: CT03 - Buscar contrato cadastrado pelo ID
    Given que existe um contrato cadastrado
    When solicito a busca do contrato pelo ID
    Then os dados do contrato devem ser retornados

  Scenario: CT04 - Atualizar contrato cadastrado
    Given que existe um contrato cadastrado
    When solicito a atualizacao do contrato
    Then os novos dados do contrato devem ser retornados

  Scenario: CT05 - Cancelar contrato ativo
    Given que existe um contrato cadastrado
    When solicito o cancelamento do contrato
    Then o contrato deve ser retornado com status cancelado

  Scenario: CT06 - Ativar contrato cancelado
    Given que existe um contrato cancelado
    When solicito a ativacao do contrato
    Then o contrato deve ser retornado com status ativo

  Scenario: CT07 - Excluir contrato cadastrado
    Given que existe um contrato cadastrado
    When solicito a exclusao do contrato
    Then o contrato deve ser excluido com sucesso

  @negative
  Scenario: CT08 - Buscar contrato inexistente
    When solicito a busca de um contrato inexistente
    Then a busca do contrato deve retornar status 404 e mensagem "Contract not found!"
