import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import LoginPage from '../../support/page_objects/LoginPage'
import UsuariosPage from '../../support/page_objects/UsuariosPage'

Given('que estou autenticado como administrador', () => {
  LoginPage.acessarTelaLogin()
  LoginPage.submeterLogin('qa@adminlab.com', 'pwd123')
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
