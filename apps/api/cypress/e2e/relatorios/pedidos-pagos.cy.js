describe('GET /api/reports/orders - Relatório de pedidos pagos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar somente os pedidos pagos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/orders?status=paid&page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
