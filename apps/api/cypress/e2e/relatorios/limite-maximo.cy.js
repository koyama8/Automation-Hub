describe('GET /api/reports/clients - Limite máximo de registros', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar o relatório utilizando o limite máximo', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?page=1&limit=100',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
