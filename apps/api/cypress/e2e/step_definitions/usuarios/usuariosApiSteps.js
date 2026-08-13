import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/AuthApi'
import UsuariosApi from '../../../support/api_clients/UsuariosApi'

let token
let response

Given('que possuo um token de administrador valido', () => {
  const credenciais = {
    email: 'qa@adminlab.com',
    password: 'pwd123',
  }

  AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

When('solicito a listagem de usuarios', () => {
  UsuariosApi.listarUsuarios(token).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('recebo a resposta da listagem de usuarios', () => {
  UsuariosApi.validarRespostaRecebida(response)
})

Then('os usuarios cadastrados devem ser retornados', () => {
  UsuariosApi.validarListagemUsuarios(response)
})
