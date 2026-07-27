describe('GET /api/reports/clients - Status inválido', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar 400 ao informar um status inválido', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?status=blocked',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq(
        'status must be one of: active, inactive!',
      )
    })
  })
})
