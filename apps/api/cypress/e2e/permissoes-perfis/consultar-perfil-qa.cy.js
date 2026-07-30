describe('GET /api/permissions/profiles/qa - Consulta do perfil QA', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar o perfil QA com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/permissions/profiles/qa',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
