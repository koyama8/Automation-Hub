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

  })
})
