Cypress.Commands.add('loginApi', () => {
  const user = {
    email: 'qa@adminlab.com',
    password: 'pwd123',
  }

  cy.api({
    method: 'POST',
    url: 'http://localhost:3030/api/auth/login',
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(200)

    return response.body.data.token
  })
})
