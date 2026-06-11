/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

Cypress.Commands.add('iniciar', () => {
  cy.visit('/admin/login')
})

Cypress.Commands.add('loginLocal', (email = 'qa@adminlab.com', senha = 'pwd123') => {
  cy.get('[data-cy="login-email"]').clear().type(email)
  cy.get('[data-cy="login-password"]').clear().type(senha, { log: false })
  cy.get('[data-cy="login-submit"]').click()
})



