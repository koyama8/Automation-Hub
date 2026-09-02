@api
@carrinho
@regression
Feature: Carrinho da API

  Scenario: CT01 - Adicionar produto ativo ao carrinho de um cliente
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    When solicito a adicao de duas unidades do produto ao carrinho
    And recebo a resposta da adicao do item ao carrinho
    Then o item deve ser adicionado ao carrinho com a quantidade e os valores corretos

  Scenario: CT02 - Consultar o carrinho ativo com item cadastrado
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    And solicito a adicao de duas unidades do produto ao carrinho
    When solicito a consulta do carrinho do cliente
    Then o carrinho deve retornar ativo com o produto, a quantidade e o subtotal corretos

  Scenario: CT03 - Atualizar a quantidade de um item do carrinho
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    And adiciono duas unidades do produto ao carrinho e guardo o ID do item
    When solicito a atualizacao da quantidade do item para cinco unidades
    Then o item do carrinho deve apresentar cinco unidades e o subtotal atualizado

  Scenario: CT04 - Limpar todos os itens do carrinho de um cliente
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    And solicito a adicao de duas unidades do produto ao carrinho
    When solicito a limpeza do carrinho do cliente
    Then o carrinho deve ficar sem itens e com quantidade e subtotal zerados

  @negative
  Scenario: CT05 - Rejeitar a adicao de um produto inexistente ao carrinho
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    When solicito a adicao de um produto inexistente ao carrinho do cliente
    And recebo a resposta da tentativa de adicao do produto inexistente
    Then a adicao deve ser rejeitada com status 404 e mensagem de produto nao encontrado

  @negative
  Scenario: CT06 - Rejeitar a adicao de um item com quantidade zero
    Given que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho
    When solicito a adicao do produto ao carrinho com quantidade zero
    And recebo a resposta da tentativa de adicao com quantidade zero
    Then a adicao deve ser rejeitada com mensagem de quantidade obrigatoriamente inteira e positiva
