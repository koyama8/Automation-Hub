describe('GET /api/reports/payments/export - Exportação de pagamentos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve exportar os pagamentos em CSV com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/payments/export',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
