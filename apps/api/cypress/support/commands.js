import { obterCredenciaisAdministrador } from './data/Credenciais'

Cypress.Commands.add('loginApi', () => {
  const user = obterCredenciaisAdministrador()

  cy.api({
    method: 'POST',
    url: '/api/auth/login',
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(200)

    return response.body.data.token
  })
})
