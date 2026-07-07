describe('GET /api/products - Listagem de produtos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve listar os produtos cadastrados', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty
    })
  })
})
