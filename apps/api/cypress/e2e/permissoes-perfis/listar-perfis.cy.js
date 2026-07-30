describe('GET /api/permissions/profiles - Listagem de perfis', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar os perfis disponíveis com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/permissions/profiles',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
