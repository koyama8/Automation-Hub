import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'

let token
let cliente
let clienteAtualizado
let clientId
let clientePreservado
let clientIdPreservado
let response

Before(() => {
  token = undefined
  cliente = undefined
  clienteAtualizado = undefined
  clientId = undefined
  clientePreservado = undefined
  clientIdPreservado = undefined
  response = undefined
})

Given('que possuo um token de administrador para clientes', () => {
  const credenciais = obterCredenciaisAdministrador()

  return AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que possuo dados validos para cadastro de cliente', () => {
  cliente = gerarClienteValido()
})

When('solicito o cadastro do cliente', () => {
  ClientesApi.cadastrarCliente(token, cliente).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    response = respostaRecebida
  })
})

When('recebo a resposta do cadastro do cliente', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('o cliente deve ser cadastrado com sucesso', () => {
  ClientesApi.validarClienteCadastrado(response, cliente)
})

Given('que existe um cliente cadastrado para consulta', () => {
  cliente = gerarClienteValido()

  return ClientesApi.cadastrarCliente(token, cliente).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    clientId = respostaRecebida.body.data.id
  })
})

When('solicito a listagem de clientes', () => {
  ClientesApi.listagemCliente(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da listagem de clientes', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('o cliente cadastrado deve ser retornado', () => {
  ClientesApi.validarClienteNaListagem(response, cliente, clientId)
})

When('solicito a busca do cliente cadastrado pelo ID', () => {
  response = undefined

  ClientesApi.buscarCliente(token, clientId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da busca do cliente', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('os dados do cliente cadastrado devem ser retornados', () => {
  ClientesApi.validarClienteBusca(response, cliente, clientId)
})

Given('que possuo novos dados validos para o cliente', () => {
  clienteAtualizado = {
    ...gerarClienteValido(),
    status: 'inactive',
  }
})

When('solicito a atualizacao do cliente cadastrado', () => {
  response = undefined

  ClientesApi.atualizarCliente(token, clientId, clienteAtualizado).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200)
    response = respostaRecebida
  })
})

When('recebo a resposta da atualizacao do cliente', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('os dados do cliente devem ser atualizados com sucesso', () => {
  ClientesApi.validarClienteAtualizado(response, clienteAtualizado)
})

When('solicito a inativacao do cliente cadastrado', () => {
  response = undefined

  ClientesApi.inativarCliente(token, clientId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da inativacao do cliente', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('o cliente deve ser retornado com status inativo', () => {
  ClientesApi.validarClienteInativo(response, cliente, clientId)
})

Given('que existe outro cliente cadastrado para preservacao', () => {
  clientePreservado = gerarClienteValido()

  return ClientesApi.cadastrarCliente(token, clientePreservado).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    clientIdPreservado = respostaRecebida.body.data.id
  })
})

When('solicito a exclusao do cliente cadastrado pelo ID', () => {
  response = undefined

  return ClientesApi.excluirClientePorId(token, clientId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da exclusao do cliente', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('somente o cliente solicitado deve ser excluido', () => {
  ClientesApi.validarClienteExcluidoPorId(response, cliente, clientId)

  return ClientesApi.buscarCliente(token, clientId, false).then((respostaClienteExcluido) => {
    ClientesApi.validarClienteNaoEncontrado(respostaClienteExcluido)

    return ClientesApi.buscarCliente(token, clientIdPreservado).then(
      (respostaClientePreservado) => {
        ClientesApi.validarClienteBusca(
          respostaClientePreservado,
          clientePreservado,
          clientIdPreservado,
        )
      },
    )
  })
})

When('solicito a exclusao de todos os clientes', () => {
  response = undefined

  return ClientesApi.excluirTodosClientes(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da exclusao de todos os clientes', () => {
  ClientesApi.validarRespostaRecebida(response)
})

Then('nenhum cliente deve permanecer cadastrado', () => {
  ClientesApi.validarLimpezaClientes(response)

  return ClientesApi.listagemCliente(token).then((respostaListagem) => {
    ClientesApi.validarListagemClientesVazia(respostaListagem)
  })
})
