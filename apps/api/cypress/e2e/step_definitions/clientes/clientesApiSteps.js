import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'

let token
let cliente
let clientId
let response

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
