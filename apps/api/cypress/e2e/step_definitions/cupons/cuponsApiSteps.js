import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import CuponsApi from '../../../support/api_clients/cupons/CuponsApi'
import PedidosApi from '../../../support/api_clients/pedidos/PedidosApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import {
  gerarCupomFixoValido,
  gerarCupomPercentualValido,
} from '../../../support/factories/cupons/CupomFactory'
import { gerarPedidoValido } from '../../../support/factories/pedidos/PedidoFactory'
import { gerarProdutoValido } from '../../../support/factories/produtos/ProdutoFactory'

let token
let cupom
let couponId
let orderId
let response

Before(() => {
  token = cupom = couponId = orderId = response = undefined
})

Given('que possuo acesso de administrador para gerenciar cupons', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then(({ body }) => {
    token = body.data.token
  })
})

Given('que existe um cupom percentual cadastrado', () =>
  cadastrarCupom(gerarCupomPercentualValido(), true),
)
Given('que existe um pedido elegivel', () => criarPedidoElegivel())

Given('que existe um pedido elegivel e um cupom percentual cadastrado', () => {
  return criarPedidoElegivel().then(() => cadastrarCupom(gerarCupomPercentualValido(), true))
})

When('solicito o cadastro de um cupom fixo ativo com limite de uso', () =>
  cadastrarCupom(gerarCupomFixoValido()),
)
When('solicito o cadastro de um cupom percentual ativo', () =>
  cadastrarCupom(gerarCupomPercentualValido()),
)
When('consulto o cupom pelo identificador', () =>
  CuponsApi.buscarPorId(token, couponId).then(guardarResposta),
)
When('listo os cupons com status ativo', () =>
  CuponsApi.listar(token, { status: 'active' }).then(guardarResposta),
)

When('atualizo os dados do cupom', () => {
  cupom = { ...cupom, description: 'Cupom percentual atualizado', value: 25 }
  return CuponsApi.atualizar(token, couponId, cupom).then(guardarResposta)
})

When('solicito a exclusao de todos os cupons', () =>
  CuponsApi.excluirTodos(token).then(guardarResposta),
)
When('valido o cupom para o pedido', () => validarCupom(cupom.code))
When('valido um codigo de cupom inexistente', () => validarCupom('QA-CUPOM-INEXISTENTE', false))

Then('o cupom deve ser cadastrado com sucesso', () => CuponsApi.validarCadastro(response, cupom))

Then('devo receber os dados do cupom cadastrado', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.include({ id: couponId, code: cupom.code })
})

Then('a listagem deve conter o cupom cadastrado', () => {
  expect(response.status).to.eq(200)
  expect(response.body.some(({ id }) => id === couponId)).to.eq(true)
})

Then('o cupom deve apresentar os dados atualizados', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.include({ description: cupom.description, value: cupom.value })
})

Then('a exclusao em massa deve ser concluida com sucesso', () => {
  expect(response.status).to.eq(200)
  expect(response.body.message).to.eq('All coupons deleted successfully')
})

Then('o cupom deve ser considerado valido', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.valid).to.eq(true)
})

Then('a API deve rejeitar a validacao com status 404', () => expect(response.status).to.eq(404))

function cadastrarCupom(massa, guardarId = false) {
  cupom = massa
  return CuponsApi.criar(token, cupom).then((resposta) => {
    response = resposta
    if (guardarId) couponId = resposta.body.data.id
  })
}

function guardarResposta(resposta) {
  response = resposta
}

function criarPedidoElegivel() {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then(({ body }) => {
    const clientId = body.data.id
    return ProdutosApi.cadastrarProduto(token, gerarProdutoValido({ priceCents: 10000 })).then(
      ({ body: produtoBody }) => {
        return PedidosApi.cadastrar(token, gerarPedidoValido(clientId, produtoBody.data.id)).then(
          ({ body: pedidoBody }) => {
            orderId = pedidoBody.data.id
          },
        )
      },
    )
  })
}

function validarCupom(code, failOnStatusCode = true) {
  return CuponsApi.validar(token, { code, orderId }, failOnStatusCode).then(guardarResposta)
}
