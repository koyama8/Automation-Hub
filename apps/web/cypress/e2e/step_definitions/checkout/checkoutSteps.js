import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import CheckoutWeb from '../../../support/page_objects/checkout/CheckoutPage'

Given('que possuo o curso Cypress no checkout com o cupom QA10 aplicado', () => {
  CheckoutWeb.prepararCheckoutComCursoECupom()
})

When('finalizo o pedido aceitando os termos e confirmando o pagamento com Pix', () => {
  CheckoutWeb.pagamentoPix()
})

Then(
  'devo visualizar a confirmacao do pedido com pagamento Pix, um produto e total de R$ 116,91',
  () => {
    CheckoutWeb.visualizarPedido()
  },
)

Given(
  'que possuo os produtos Playwright e Template API com duas unidades de cada no checkout',
  () => {
    CheckoutWeb.adicinaProduto()
  },
)

When(
  'finalizo o pedido aceitando os termos e confirmando o pagamento com cartao de credito',
  () => {
    CheckoutWeb.finalizarpedidoCartao()
  },
)

Then(
  'devo visualizar a confirmacao do pedido com pagamento em cartao, dois produtos e total de R$ 379,60',
  () => {
    CheckoutWeb.visualizarpedidoCartao()
  },
)

Given('que possuo o produto Template API no checkout', () => {
  CheckoutWeb.adicionarProdutoTemplate()
})

When('finalizo o pedido aceitando os termos e confirmando o pagamento com boleto', () => {
  CheckoutWeb.confirmarPagamentoBoleto()
})

Then(
  'devo visualizar a confirmacao do pedido com pagamento em boleto, um produto e total de R$ 39,90',
  () => {
    CheckoutWeb.visualizarPedidoBoleto()
  },
)
