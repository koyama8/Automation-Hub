describe('GET /api/reports/clients - Paginação inválida', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar 400 ao informar uma página inválida', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?page=0&limit=101',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq(
        'page must be an integer between 1 and 1000000!',
      )
    })
  })
})
