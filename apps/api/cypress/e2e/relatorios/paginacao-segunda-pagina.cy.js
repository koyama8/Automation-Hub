describe('GET /api/reports/clients - Paginação da segunda página', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar a segunda página do relatório', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?page=2&limit=5&sortBy=id&sortOrder=asc',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
