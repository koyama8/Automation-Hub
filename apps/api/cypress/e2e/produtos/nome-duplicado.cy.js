describe('POST /api/products - Validacao de nome duplicado', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('nao deve permitir cadastro com nome de produto duplicado', () => {
    const timestamp = Date.now()

    const produto = {
      name: `Produto Bruno ${timestamp}`,
      sku: `BRU-${timestamp}`,
      description: 'Produto criado pelo Cypress',
      priceCents: 19990,
      stock: 25,
      status: 'active',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: produto,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
      body: produto,
    }).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('Product name already exists!')
    })
  })
})
