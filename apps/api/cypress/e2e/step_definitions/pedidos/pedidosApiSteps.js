import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import PedidosApi from '../../../support/api_clients/pedidos/PedidosApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import { gerarPedidoValido } from '../../../support/factories/pedidos/PedidoFactory'
import { gerarProdutoValido } from '../../../support/factories/produtos/ProdutoFactory'

let token
let clientId
let productId
let orderId
let pedido
let produto
let response

Before(() => {
  token = undefined
  clientId = undefined
  productId = undefined
  orderId = undefined
  pedido = undefined
  produto = undefined
  response = undefined
})

function cadastrarProduto() {
  produto = gerarProdutoValido({ priceCents: 2590, stock: 10 })

  return ProdutosApi.cadastrarProduto(token, produto).then((respostaProduto) => {
    expect(respostaProduto.status).to.eq(201)
    productId = respostaProduto.body.data.id
  })
}

function cadastrarPedidoCompleto() {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaCliente) => {
    clientId = respostaCliente.body.data.id

    return cadastrarProduto().then(() => {
      pedido = gerarPedidoValido(clientId, productId)

      return PedidosApi.cadastrar(token, pedido).then((respostaPedido) => {
        expect(respostaPedido.status).to.eq(201)
        orderId = respostaPedido.body.data.id
      })
    })
  })
}

Given('que possuo acesso de administrador para pedidos', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que existe um cliente e um produto ativo para o pedido', () => {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaCliente) => {
    clientId = respostaCliente.body.data.id
    return cadastrarProduto()
  })
})

Given('que existe um produto ativo para o pedido', () => cadastrarProduto())

Given('que existe um pedido cadastrado', () => cadastrarPedidoCompleto())

When('solicito a criacao do pedido', () => {
  pedido = gerarPedidoValido(clientId, productId)

  return PedidosApi.cadastrar(token, pedido).then((respostaRecebida) => {
    response = respostaRecebida
    orderId = response.body.data.id
  })
})

When('solicito a listagem de pedidos', () => {
  return PedidosApi.listar(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a busca do pedido pelo ID', () => {
  return PedidosApi.buscar(token, orderId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a atualizacao do pedido para o status {string}', (status) => {
  return PedidosApi.atualizarStatus(token, orderId, status).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito o cancelamento do pedido', () => {
  return PedidosApi.cancelar(token, orderId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito um pedido para um cliente inexistente', () => {
  pedido = gerarPedidoValido(999999, productId)

  return PedidosApi.cadastrar(token, pedido, false).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o pedido deve ser criado com os itens e total calculados', () => {
  expect(response.status).to.eq(201)
  expect(response.body.data.clientId).to.eq(clientId)
  expect(response.body.data.totalCents).to.eq(produto.priceCents * pedido.items[0].quantity)
  expect(response.body.data.items[0]).to.include({
    productId,
    quantity: pedido.items[0].quantity,
  })
})

Then('o pedido cadastrado deve estar presente na listagem', () => {
  expect(response.status).to.eq(200)
  expect(response.body).to.be.an('array')
  expect(response.body.find((item) => item.id === orderId)).to.exist
})

Then('os dados do pedido devem ser retornados', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.id).to.eq(orderId)
  expect(response.body.data.clientId).to.eq(clientId)
  expect(response.body.data.items).to.be.an('array').and.not.be.empty
})

Then('o pedido deve ser retornado com status {string}', (status) => {
  expect(response.status).to.eq(200)
  expect(response.body.data.id).to.eq(orderId)
  expect(response.body.data.status).to.eq(status)
})

Then('a criacao do pedido deve ser rejeitada com status {int}', (status) => {
  expect(response.status).to.eq(status)
  expect(response.body.error).to.exist
})
