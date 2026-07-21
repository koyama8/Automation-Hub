describe('GET /api/evidences - Listagem de evidências', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar as evidências cadastradas', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/evidences',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
