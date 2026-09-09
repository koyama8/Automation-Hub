import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import ContratosApi from '../../../support/api_clients/contratos/ContratosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import { gerarContratoValido } from '../../../support/factories/contratos/ContratoFactory'

let token
let clientId
let contractId
let contrato
let response

Before(() => {
  token = undefined
  clientId = undefined
  contractId = undefined
  contrato = undefined
  response = undefined
})

Given('que possuo acesso de administrador para contratos', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que existe um cliente para o contrato', () => {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
    clientId = respostaRecebida.body.data.id
  })
})

Given('que existe um contrato cadastrado', () => {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaCliente) => {
    clientId = respostaCliente.body.data.id
    contrato = gerarContratoValido(clientId)

    return ContratosApi.cadastrar(token, contrato).then((respostaContrato) => {
      expect(respostaContrato.status).to.eq(201)
      contractId = respostaContrato.body.data.id
    })
  })
})

Given('que existe um contrato cancelado', () => {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then((respostaCliente) => {
    clientId = respostaCliente.body.data.id
    contrato = gerarContratoValido(clientId)

    return ContratosApi.cadastrar(token, contrato)
      .then((respostaContrato) => {
        contractId = respostaContrato.body.data.id
        return ContratosApi.cancelar(token, contractId)
      })
      .then((respostaCancelamento) => {
        expect(respostaCancelamento.status).to.eq(200)
      })
  })
})

When('solicito o cadastro de um contrato valido', () => {
  contrato = gerarContratoValido(clientId)

  return ContratosApi.cadastrar(token, contrato).then((respostaRecebida) => {
    response = respostaRecebida
    contractId = response.body.data.id
  })
})

When('solicito a listagem de contratos', () => {
  return ContratosApi.listar(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a busca do contrato pelo ID', () => {
  return ContratosApi.buscar(token, contractId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a atualizacao do contrato', () => {
  contrato = gerarContratoValido(clientId)

  return ContratosApi.atualizar(token, contractId, contrato).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito o cancelamento do contrato', () => {
  return ContratosApi.cancelar(token, contractId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a ativacao do contrato', () => {
  return ContratosApi.ativar(token, contractId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a exclusao do contrato', () => {
  return ContratosApi.excluir(token, contractId).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito a busca de um contrato inexistente', () => {
  return ContratosApi.buscar(token, 999999, false).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o contrato deve ser cadastrado com sucesso', () => {
  ContratosApi.validarContrato(response, contrato, 201)
})

Then('o contrato deve estar presente na listagem', () => {
  ContratosApi.validarListagem(response, contrato, contractId)
})

Then('os dados do contrato devem ser retornados', () => {
  ContratosApi.validarContrato(response, contrato)
})

Then('os novos dados do contrato devem ser retornados', () => {
  ContratosApi.validarContrato(response, contrato)
})

Then('o contrato deve ser retornado com status cancelado', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.status).to.eq('canceled')
})

Then('o contrato deve ser retornado com status ativo', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.status).to.eq('active')
})

Then('o contrato deve ser excluido com sucesso', () => {
  expect(response.status).to.eq(200)
  expect(response.body.message).to.eq('Contract deleted successfully')
})

Then('a busca do contrato deve retornar status {int} e mensagem {string}', (status, mensagem) => {
  expect(response.status).to.eq(status)
  expect(response.body.error).to.eq(mensagem)
})
