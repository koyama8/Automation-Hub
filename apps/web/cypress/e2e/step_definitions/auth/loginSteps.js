import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import LoginPage from '../../../support/page_objects/LoginPage'

let nome
let email

Given('que estou na tela de login', () => {
  LoginPage.acessarTelaLogin()
})

When('realizo o login com credenciais validas', () => {
  LoginPage.submeterLogin('qa@adminlab.com', 'pwd123')
})

Then('devo ser redirecionado para o dashboard', () => {
  LoginPage.validarRedirecionamentoDashboard()
})

Then('devo visualizar todos os elementos da tela de login', () => {
  LoginPage.validarElementosTelaLogin()
})

When('realizo o login com email invalido', () => {
  LoginPage.submeterLogin('qa@adminla.com', 'pwd123')
})

Then('devo visualizar a mensagem de email invalido', () => {
  LoginPage.validarMensagemEmailInvalido()
})

When('realizo o login com senha invalida', () => {
  LoginPage.submeterLogin('qa@adminlab.com', 'pwd12345')
})

Then('devo visualizar a mensagem de credenciais invalidas', () => {
  LoginPage.validarMensagemCredenciaisInvalidas()
})

When('realizo o fluxo do assistente Automation Live', () => {
  LoginPage.realizarFluxoAssistente()
})

Then('o assistente deve ser fechado', () => {
  LoginPage.validarAssistenteFechado()
})

Given('que estou na tela de recuperacao de senha', () => {
  LoginPage.acessarRecuperacaoSenha()
})

When('solicito a recuperacao com um email nao cadastrado', () => {
  LoginPage.solicitarRecuperacaoSenha('qalaboratory@gmail.com')
})

Then('devo visualizar uma mensagem de erro na recuperacao de senha', () => {
  LoginPage.validarErroRecuperacaoSenha()
})

When('solicito a recuperacao com um email valido', () => {
  LoginPage.solicitarRecuperacaoSenha('qa@adminlab.com')
})

Then('devo visualizar os dados da recuperacao de senha', () => {
  LoginPage.validarDadosRecuperacaoSenha()
})

Given('que estou na tela de cadastro', () => {
  LoginPage.acessarTelaLogin()
})

When('tento cadastrar um usuario sem preencher o nome', () => {
  LoginPage.cadastrarUsuario('', 'qa@adminlab.com', 'pwd123')
})

Then('devo visualizar uma mensagem de validacao para o nome', () => {
  LoginPage.validarErroNomeCadastro()
})

When('tento cadastrar um usuario sem preencher o email', () => {
  LoginPage.cadastrarUsuario('Teste', '', 'pwd123')
})

Then('devo visualizar uma mensagem de validacao para o email', () => {
  LoginPage.validarErroEmailCadastro()
})

When('tento cadastrar um usuario sem preencher a senha', () => {
  LoginPage.cadastrarUsuario('Teste', 'qa@adminlab.com', '')
})

Then('devo visualizar uma mensagem de validacao para a senha', () => {
  LoginPage.validarErroSenha()
})

When('cadastro um novo usuario com dados validos', () => {
  const timestamp = Date.now()

  nome = `Teste ${timestamp}`
  email = `qalab.${timestamp}@hotmail.com`

  LoginPage.cadastrarUsuario(nome, email, 'pwd12345')
})

Then('devo visualizar a confirmacao de cadastro realizado com sucesso', () => {
  LoginPage.validarCadastroRealizadoComSucesso(nome)
})
