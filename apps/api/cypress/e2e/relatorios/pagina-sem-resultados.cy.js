describe('GET /api/reports/clients - Página sem resultados', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar uma página sem registros', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?page=999&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
