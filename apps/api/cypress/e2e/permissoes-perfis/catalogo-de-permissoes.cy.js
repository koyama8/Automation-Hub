describe('GET /api/permissions/catalog - Catálogo de permissões', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar o catálogo de permissões com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/permissions/catalog',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
