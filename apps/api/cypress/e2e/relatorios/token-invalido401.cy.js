describe('GET /api/reports/summary - Token inválido', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then(() => {})
  })

  it('deve retornar 401 ao informar um token inválido', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/summary',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq(
        'Invalid or expired authentication token!',
      )
    })
  })
})
