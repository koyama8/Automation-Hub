describe('GET /api/products - Listagem de produtos', () => {
  let token

  beforeEach((tokenGerado) => {
    token = tokenGerado
  })

  it('deve listar os produtos cadastrados', () => {
    cy.visit('https://example.cypress.io')
  })
})
