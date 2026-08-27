import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import AuthApi from '../../../support/api_clients/auth/AuthApi'

let token
let response

Given('que possuo um token de autenticacao valido', () => {
  const credenciais = obterCredenciaisAdministrador()

  AuthApi.autenticar(credenciais).then((respostaLogin) => {
    token = respostaLogin.body.data.token
  })
})

When('consulto os dados da sessao atual', () => {
  AuthApi.consultarSessaoAtual(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da consulta', () => {
  AuthApi.validarRespostaRecebida(response)
})

Then('os dados do usuario autenticado devem ser retornados', () => {
  AuthApi.validarDadosSessaoAtual(response)
})
