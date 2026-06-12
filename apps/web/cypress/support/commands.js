/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

Cypress.Commands.add('iniciar', () => {
  cy.visit('/admin/login')
})

Cypress.Commands.add('submeterLogin', (email, senha) => {
  cy.get('#login-email').type(email)
  cy.get('#login-password').type(senha)
  cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('recuperarsenha', () => {
  cy.visit('/admin/recuperar-senha')
})

Cypress.Commands.add('cadastro', (nome, email, senha) => {
  cy.contains('button', 'Criar nova conta').click()

  if (nome) {
    cy.get('[data-cy="register-name"]').type(nome)
  }

  if (email) {
    cy.get('[data-cy="register-email"]').type(email)
  }

  if (senha) {
    cy.get('[data-cy="register-password"]').type(senha)
  }

  cy.contains('button', 'Cadastrar usuário').click()
})
