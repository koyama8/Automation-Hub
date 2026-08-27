import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import AuthApi from '../../../support/api_clients/auth/AuthApi'

let credenciais
let response

Given('que possuo credenciais validas', () => {
  credenciais = obterCredenciaisAdministrador()
})

When('envio uma solicitacao de autenticacao', () => {
  AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da autenticacao', () => {
  AuthApi.validarRespostaRecebida(response)
})

Then('o login deve ser realizado com sucesso', () => {
  AuthApi.validarLoginComSucesso(response, credenciais.email)
})

Given('que possuo credenciais invalidas', () => {
  credenciais = {
    email: 'qagm@adminlab.com',
    password: 'pwd12345',
  }
})

Then('o login deve ser rejeitado', () => {
  AuthApi.validarLoginRejeitado(response)
})
