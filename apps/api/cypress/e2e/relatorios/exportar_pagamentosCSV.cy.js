describe('GET /api/reports/orders/export - Exportação de pedidos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve exportar os pedidos em CSV com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/orders/export',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
