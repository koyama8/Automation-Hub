import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import PagamentosApi from '../../../support/api_clients/pagamentos/PagamentosApi'
import PedidosApi from '../../../support/api_clients/pedidos/PedidosApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import { gerarPagamento } from '../../../support/factories/pagamentos/PagamentoFactory'
import { gerarPedidoValido } from '../../../support/factories/pedidos/PedidoFactory'
import { gerarProdutoValido } from '../../../support/factories/produtos/ProdutoFactory'

let token
let orderId
let paymentId
let metodo
let response

Before(() => {
  token = undefined
  orderId = undefined
  paymentId = undefined
  metodo = undefined
  response = undefined
})

Given('que possuo acesso de administrador e um pedido para pagamento', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then((respostaLogin) => {
    token = respostaLogin.body.data.token

    return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaCliente) => {
      const clientId = respostaCliente.body.data.id

      return ProdutosApi.cadastrarProduto(token, gerarProdutoValido({ stock: 10 })).then(
        (respostaProduto) => {
          const productId = respostaProduto.body.data.id

          return PedidosApi.cadastrar(token, gerarPedidoValido(clientId, productId)).then(
            (respostaPedido) => {
              expect(respostaPedido.status).to.eq(201)
              orderId = respostaPedido.body.data.id
            },
          )
        },
      )
    })
  })
})

When('crio um pagamento pelo metodo {string}', (method) => {
  metodo = method

  return PagamentosApi.cadastrar(token, gerarPagamento(orderId, method)).then(
    (respostaRecebida) => {
      response = respostaRecebida
      paymentId = response.body.data.id
    },
  )
})

When('solicito a confirmacao do pagamento', () => {
  return PagamentosApi.confirmar(token, paymentId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a listagem de pagamentos', () => {
  return PagamentosApi.listar(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('crio um pagamento Pix expirado', () => {
  metodo = 'pix'
  const pagamento = gerarPagamento(orderId, metodo, {
    expiresAt: '2020-01-01T00:00:00.000Z',
  })

  return PagamentosApi.cadastrar(token, pagamento).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    paymentId = respostaRecebida.body.data.id
  })
})

When('solicito a confirmacao do pagamento expirado', () => {
  return PagamentosApi.confirmar(token, paymentId, false).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o pagamento deve ser criado pelo metodo {string}', (method) => {
  expect(response.status).to.eq(201)
  expect(response.body.data.orderId).to.eq(orderId)
  expect(response.body.data.method).to.eq(method)
})

Then('o pagamento deve ser aprovado pelo metodo {string}', (method) => {
  expect(response.status).to.eq(200)
  expect(response.body.message).to.eq('Payment confirmed successfully')
  expect(response.body.data.method).to.eq(method)
  expect(response.body.data.status).to.eq('approved')
})

Then('o pagamento criado deve estar presente na listagem', () => {
  expect(response.status).to.eq(200)
  expect(response.body).to.be.an('array')
  expect(response.body.find((item) => item.id === paymentId)).to.exist
})

Then(
  'a confirmacao deve ser rejeitada com status {int} e mensagem {string}',
  (status, mensagem) => {
    expect(response.status).to.eq(status)
    expect(response.body.error).to.eq(mensagem)
  },
)
