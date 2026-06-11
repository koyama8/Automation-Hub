/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

Cypress.Commands.add('iniciar', () => {
  cy.visit('/admin/login')
})

Cypress.Commands.add('submeterLogin', (email,senha) => {
  cy.get('#login-email').type(email)
  cy.get('#login-password').type(senha)
  cy.contains('button', 'Entrar').click()
})



