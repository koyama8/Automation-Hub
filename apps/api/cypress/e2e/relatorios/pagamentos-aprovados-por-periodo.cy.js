describe('GET /api/reports/payments - Pagamentos aprovados por período', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar os pagamentos aprovados no período informado', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/payments?status=approved&startDate=2026-01-01&endDate=2026-12-31&page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
