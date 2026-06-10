Cypress.Commands.add('postUser', (user, failOnStatusCode = true) => {
  cy.api({
    method: 'POST',
    url: '/api/users/register',
    body: user,
    failOnStatusCode,
  })
})

Cypress.Commands.add('deleteAllUsers', () => {
  cy.api({
    method: 'DELETE',
    url: '/api/users',
  })
})
