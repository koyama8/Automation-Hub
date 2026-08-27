import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import LoginPage from '../../../support/page_objects/auth/LoginPage'
import UsuariosPage from '../../../support/page_objects/usuarios/UsuariosPage'

Given('que estou autenticado como administrador', () => {
  const credenciais = obterCredenciaisAdministrador()

  LoginPage.acessarTelaLogin()
  LoginPage.submeterLogin(credenciais.email, credenciais.password)
  LoginPage.validarRedirecionamentoDashboard()
})

When('acesso a tela de usuarios', () => {
  UsuariosPage.acessarUsuarios()
})

When('visualizo a tabela de usuarios', () => {
  UsuariosPage.validarTabelaUsuariosVisivel()
})

Then('o usuario administrador deve ser exibido', () => {
  UsuariosPage.validarUsuarioAdministrador()
})
