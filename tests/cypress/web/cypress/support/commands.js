Cypress.Commands.add('loginWeb', (email = 'alab@hotmail.com', password = '123') => {
  cy.visit('/')
  cy.get('[data-cy="login-email"]').type(email)
  cy.get('[data-cy="login-password"]').type(password)
  cy.get('[data-cy="login-submit"]').click()
  cy.get('[data-cy="user-name"]').should('be.visible')
})
