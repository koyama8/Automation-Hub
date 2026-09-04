@web
@checkout
@regression
Feature: Checkout Web

  Scenario: CT01 - Finalizar pedido com Pix e cupom aplicado
    Given que estou autenticado como administrador
    And que possuo o curso Cypress no checkout com o cupom QA10 aplicado
    When finalizo o pedido aceitando os termos e confirmando o pagamento com Pix
    Then devo visualizar a confirmacao do pedido com pagamento Pix, um produto e total de R$ 116,91

  Scenario: CT02 - Finalizar pedido com cartao de credito
    Given que estou autenticado como administrador
    And que possuo os produtos Playwright e Template API com duas unidades de cada no checkout
    When finalizo o pedido aceitando os termos e confirmando o pagamento com cartao de credito
    Then devo visualizar a confirmacao do pedido com pagamento em cartao, dois produtos e total de R$ 379,60

  Scenario: CT03 - Finalizar pedido com boleto
    Given que estou autenticado como administrador
    And que possuo o produto Template API no checkout
    When finalizo o pedido aceitando os termos e confirmando o pagamento com boleto
    Then devo visualizar a confirmacao do pedido com pagamento em boleto, um produto e total de R$ 39,90
