import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import {
  gerarProdutoDuplicado,
  gerarProdutoValido,
} from '../../../support/factories/produtos/ProdutoFactory'
import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'

let token
let produto
let produtoId
let response
let produtoAtualizado

Before(() => {
  produto = undefined
  produtoAtualizado = undefined
  produtoId = undefined
  response = undefined
})

Given('que possuo um token de administrador para produtos', () => {
  const credenciais = obterCredenciaisAdministrador()

  return AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que possuo dados validos para cadastro de produto', () => {
  produto = gerarProdutoValido()
})

When('solicito o cadastro do produto', () => {
  ProdutosApi.cadastrarProduto(token, produto).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    response = respostaRecebida
  })
})

When('recebo a resposta do cadastro do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o produto deve ser cadastrado com sucesso', () => {
  ProdutosApi.validarProdutoCadastrado(response, produto)
})

Given('que existe um produto cadastrado e ativo', () => {
  produtoAtualizado = {
    ...gerarProdutoValido(),
    status: 'active',
  }

  return ProdutosApi.cadastrarProduto(token, produtoAtualizado).then(
    (respostaRecebida) => {
      response = respostaRecebida
      produtoId = respostaRecebida.body.data.id
    },
  )
})

When('solicito a inativacao do produto cadastrado', () => {
  ProdutosApi.inativarProduto(token, produtoId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da inativacao do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o produto deve ser retornado com status inativo', () => {
  ProdutosApi.validarProdutoInativo(response)
})

Given('que existe um produto cadastrado para consulta', () => {
  produto = gerarProdutoValido()

  return ProdutosApi.cadastrarProduto(token, produto).then(
    (respostaRecebida) => {
      expect(respostaRecebida.status).to.eq(201)
      produtoId = respostaRecebida.body.data.id
    },
  )
})

When('solicito a listagem de produtos', () => {
  response = undefined

  return ProdutosApi.listarProdutos(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da listagem de produtos', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o produto cadastrado deve ser retornado', () => {
  ProdutosApi.validarProdutoNaListagem(response, produto, produtoId)
})

When('solicito a busca do produto cadastrado pelo ID', () => {
  ProdutosApi.buscarProduto(token, produtoId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da busca do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('os dados do produto cadastrado devem ser retornados', () => {
  ProdutosApi.validarProdutoBuscado(response, produto, produtoId)
})

Given('que possuo novos dados validos para o produto', () => {
  produtoAtualizado = gerarProdutoValido()
})

When('solicito a atualizacao do produto cadastrado', () => {
  ProdutosApi.atualizarProduto(token, produtoId, produtoAtualizado).then(
    (respostaRecebida) => {
      response = respostaRecebida
    },
  )
})

When('recebo a resposta da atualizacao do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('os dados do produto devem ser atualizados com sucesso', () => {
  ProdutosApi.validarProdutoAtualizado(response, produtoAtualizado, produtoId)
})

Given('que existe um produto cadastrado e inativo', () => {
  produtoAtualizado = {
    ...gerarProdutoValido(),
    status: 'inactive',
  }

  return ProdutosApi.cadastrarProduto(token, produtoAtualizado).then(
    (respostaRecebida) => {
      produtoId = respostaRecebida.body.data.id
    },
  )
})

When('solicito a ativacao do produto cadastrado', () => {
  ProdutosApi.ativarProduto(token, produtoId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da ativacao do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o produto deve ser retornado com status ativo', () => {
  ProdutosApi.validarProdutoAtivo(response)
})

Given('que existe um produto cadastrado para exclusao', () => {
  produto = gerarProdutoValido()

  ProdutosApi.cadastrarProduto(token, produto).then((respostaRecebida) => {
    response = respostaRecebida
    produtoId = respostaRecebida.body.data.id
  })
})

When('solicito a exclusao do produto cadastrado pelo ID', () => {
  ProdutosApi.excluirProdutoPorId(token, produtoId).then(
    (respostaRecebida) => {
      response = respostaRecebida
    },
  )
})

When('recebo a resposta da exclusao do produto', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o produto deve ser excluido com sucesso', () => {
  ProdutosApi.validarProdutoExcluido(response)
})

Given('que existe um produto cadastrado para validacao de duplicidade', () => {
  produto = gerarProdutoDuplicado()

  return ProdutosApi.cadastrarProduto(token, produto).then(
    (respostaRecebida) => {
      expect(respostaRecebida.status).to.eq(201)
    },
  )
})

When('solicito um novo cadastro com o mesmo nome de produto', () => {
  response = undefined

  return ProdutosApi.cadastrarProdutoComNomeDuplicado(token, produto).then(
    (respostaRecebida) => {
      response = respostaRecebida
    },
  )
})

When('recebo a resposta do cadastro com nome duplicado', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('o cadastro do produto deve ser rejeitado por nome duplicado', () => {
  ProdutosApi.validarRejeicaoPorNomeDuplicado(response)
})

When('solicito a exclusao de todos os produtos', () => {
  ProdutosApi.excluirTodosOsProdutos(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da exclusao de todos os produtos', () => {
  ProdutosApi.validarRespostaRecebida(response)
})

Then('nenhum produto deve permanecer cadastrado', () => {
  ProdutosApi.validarTodosOsProdutosExcluidos(response)
})
