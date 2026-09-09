@api
@pagamentos
@regression
Feature: Pagamentos da API

  Background:
    Given que possuo acesso de administrador e um pedido para pagamento

  @smoke
  Scenario: CT01 - Criar e confirmar pagamento Pix
    When crio um pagamento pelo metodo "pix"
    And solicito a confirmacao do pagamento
    Then o pagamento deve ser aprovado pelo metodo "pix"

  Scenario: CT02 - Criar pagamento por cartao
    When crio um pagamento pelo metodo "card"
    Then o pagamento deve ser criado pelo metodo "card"

  Scenario: CT03 - Criar e confirmar pagamento por boleto
    When crio um pagamento pelo metodo "boleto"
    And solicito a confirmacao do pagamento
    Then o pagamento deve ser aprovado pelo metodo "boleto"

  Scenario: CT04 - Listar pagamentos
    When crio um pagamento pelo metodo "pix"
    And solicito a listagem de pagamentos
    Then o pagamento criado deve estar presente na listagem

  @negative
  Scenario: CT05 - Rejeitar confirmacao de Pix expirado
    When crio um pagamento Pix expirado
    And solicito a confirmacao do pagamento expirado
    Then a confirmacao deve ser rejeitada com status 400 e mensagem "Pix expired!"
