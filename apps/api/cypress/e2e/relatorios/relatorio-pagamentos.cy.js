describe('GET /api/reports/payments - Relatório de pagamentos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar o relatório de pagamentos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/payments?page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
