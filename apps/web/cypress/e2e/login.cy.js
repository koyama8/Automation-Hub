/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Login', () => {

  before(() => {
    cy.log('Iniciando suite de login')
  })

  beforeEach(() => {
    cy.iniciar()
  })

  afterEach(() => {
    cy.log('Teste finalizado')
  })

  it('deve exibir os elementos da tela de login', () => {
    cy.contains('Acesse sua conta').should('be.visible')
    cy.get('#login-email').should('be.visible')
    cy.get('#login-password').should('be.visible')

    cy.contains('button', 'Entrar').should('be.visible')
    cy.contains('button', 'Esqueci minha senha').should('be.visible')
    cy.contains('button', 'Criar nova conta').should('be.visible') 
  })


  it('deve fazer login com sucesso', () => {
    cy.submeterLogin('qa@adminlab.com', 'pwd123')
    cy.url().should('include', '/dashboard')
 })

  it('não deve logar com email inválido', () => {
    cy.submeterLogin('qa@adminla.com', 'pwd123')
    cy.contains('Informe um e-mail valido de provedor conhecido').should('be.visible')
 })

 it('não deve logar com senha inválida', () =>{
   cy.submeterLogin('qa@adminlab.com','pwd12345')
   cy.contains('Senha incorreta').should('be.visible')
 })

 it('deve abrir o assistente Automation Live', () => {
   cy.get('[data-cy="assistant-open"]').click()
 })

})
