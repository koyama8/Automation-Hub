describe('GET /api/reports/clients - Período inválido', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar 400 ao consultar um período inválido', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?startDate=2026-12-31&endDate=2026-01-01',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq(
        'startDate must be before or equal to endDate!',
      )
    })
  })
})
