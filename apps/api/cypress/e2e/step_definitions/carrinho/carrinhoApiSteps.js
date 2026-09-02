import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import CarrinhoApi from '../../../support/api_clients/carrinho/CarrinhoApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'
import { gerarProdutoValido } from '../../../support/factories/produtos/ProdutoFactory'
import {
  gerarItemCarrinhoQuantidadeInvalida,
  gerarItemCarrinhoValido,
} from '../../../support/factories/carrinho/CarrinhoFactory'
import { gerarItemCarrinhoAtualizado } from '../../../support/factories/carrinho/CarrinhoFactory'
import { gerarItemCarrinhoInexistente } from '../../../support/factories/carrinho/CarrinhoFactory'

let token
let clientId
let productId
let produto
let cartItemId
let clienteAtualizado
let response

Before(() => {
  token = undefined
  clientId = undefined
  clienteAtualizado = undefined
  produto = undefined
  cartItemId = undefined
  productId = undefined
  response = undefined
})

Given(
  'que possuo acesso de administrador, um cliente inativo e um produto ativo para o carrinho',
  () => {
    const credenciais = obterCredenciaisAdministrador()

    clienteAtualizado = {
      ...gerarClienteValido(),
      status: 'inactive',
    }

    produto = gerarProdutoValido({
      status: 'active',
      stock: 10,
    })

    return AuthApi.autenticar(credenciais).then((respostaLogin) => {
      expect(respostaLogin.status).to.eq(200)

      token = respostaLogin.body.data.token
      expect(token).to.be.a('string').and.not.be.empty

      return ClientesApi.cadastrarCliente(token, clienteAtualizado).then((respostaCliente) => {
        expect(respostaCliente.status).to.eq(201)
        clientId = respostaCliente.body.data.id

        return ProdutosApi.cadastrarProduto(token, produto).then((respostaProduto) => {
          expect(respostaProduto.status).to.eq(201)
          productId = respostaProduto.body.data.id
        })
      })
    })
  },
)

When('solicito a adicao de duas unidades do produto ao carrinho', () => {
  const itemCarrinho = gerarItemCarrinhoValido(clientId, productId)

  CarrinhoApi.adicionarCarrinho(token, itemCarrinho).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da adicao do item ao carrinho', () => {
  CarrinhoApi.validarRespostaRecebida(response)
})

Then('o item deve ser adicionado ao carrinho com a quantidade e os valores corretos', () => {
  CarrinhoApi.validarItemAdicionado(response)
})

When('solicito a consulta do carrinho do cliente', () => {
  CarrinhoApi.consultarItem(token, clientId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o carrinho deve retornar ativo com o produto, a quantidade e o subtotal corretos', () => {
  CarrinhoApi.validarDadosConsulta(response, clientId, productId)
})

Given('adiciono duas unidades do produto ao carrinho e guardo o ID do item', () => {
  const itemCarrinho = gerarItemCarrinhoValido(clientId, productId)

  return CarrinhoApi.adicionarCarrinho(token, itemCarrinho).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    response = respostaRecebida

    cartItemId = response.body.data.items[0].id
  })
})

When('solicito a atualizacao da quantidade do item para cinco unidades', () => {
  const atualizacao = gerarItemCarrinhoAtualizado(clientId, productId)

  CarrinhoApi.atualizarCarrinho(token, cartItemId, atualizacao).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o item do carrinho deve apresentar cinco unidades e o subtotal atualizado', () => {
  CarrinhoApi.validarItemAtualizado(response)
})

When('solicito a limpeza do carrinho do cliente', () => {
  CarrinhoApi.limparCarrinhoPorID(token, clientId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o carrinho deve ficar sem itens e com quantidade e subtotal zerados', () => {
  CarrinhoApi.validarCarrinhoDeletado(response)
})

When('solicito a adicao de um produto inexistente ao carrinho do cliente', () => {
  const prodInexistente = gerarItemCarrinhoInexistente(clientId, productId)

  CarrinhoApi.adicionarProdutoInexistente(token, prodInexistente).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da tentativa de adicao do produto inexistente', () => {
  CarrinhoApi.validarRespostaRecebida(response)
})

Then('a adicao deve ser rejeitada com status 404 e mensagem de produto nao encontrado', () => {
  CarrinhoApi.validarProdutoInexistente(response)
})

When('solicito a adicao do produto ao carrinho com quantidade zero', () => {
  const prodInexistente = gerarItemCarrinhoQuantidadeInvalida(clientId, productId)

  CarrinhoApi.adicionarProdutoQtdInexistente(token, prodInexistente).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da tentativa de adicao com quantidade zero', () => {
  CarrinhoApi.validarRespostaRecebida(response)
})
Then(
  'a adicao deve ser rejeitada com mensagem de quantidade obrigatoriamente inteira e positiva',
  () => {
    CarrinhoApi.validarProdutoQtdInexistente(response)
  },
)
