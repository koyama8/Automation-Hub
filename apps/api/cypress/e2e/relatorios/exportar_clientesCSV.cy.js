describe('GET /api/reports/clients/export - Exportação de clientes', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve exportar os clientes ativos em CSV com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients/export?status=active',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
