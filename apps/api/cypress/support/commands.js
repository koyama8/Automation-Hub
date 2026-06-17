Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: '/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('putUser', (userId, updatedUser) => {
  return cy.api({
    method: 'PUT',
    url: `/api/users/${userId}`,
    body: updatedUser,
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  })
})
