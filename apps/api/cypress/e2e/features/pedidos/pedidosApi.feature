@api
@pedidos
@regression
Feature: Pedidos da API

  Background:
    Given que possuo acesso de administrador para pedidos

  @smoke
  Scenario: CT01 - Criar pedido com cliente e produto
    Given que existe um cliente e um produto ativo para o pedido
    When solicito a criacao do pedido
    Then o pedido deve ser criado com os itens e total calculados

  Scenario: CT02 - Listar pedidos
    Given que existe um pedido cadastrado
    When solicito a listagem de pedidos
    Then o pedido cadastrado deve estar presente na listagem

  Scenario: CT03 - Buscar pedido pelo ID
    Given que existe um pedido cadastrado
    When solicito a busca do pedido pelo ID
    Then os dados do pedido devem ser retornados

  Scenario: CT04 - Atualizar status do pedido
    Given que existe um pedido cadastrado
    When solicito a atualizacao do pedido para o status "processing"
    Then o pedido deve ser retornado com status "processing"

  Scenario: CT05 - Cancelar pedido
    Given que existe um pedido cadastrado
    When solicito o cancelamento do pedido
    Then o pedido deve ser retornado com status "canceled"

  @negative
  Scenario: CT06 - Rejeitar pedido para cliente inexistente
    Given que existe um produto ativo para o pedido
    When solicito um pedido para um cliente inexistente
    Then a criacao do pedido deve ser rejeitada com status 404
