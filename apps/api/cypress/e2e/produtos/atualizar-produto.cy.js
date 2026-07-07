describe('PUT /api/products/:id - Atualizacao de produto', () => {
  let token
  let productId

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

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
        productId = response.body.data.id
      })
    })
  })

  it('deve atualizar um produto cadastrado com sucesso', () => {
    const timestamp = Date.now()

    const produto = {
      name: `Produto Bruno Atualizado ${timestamp}`,
      sku: `BRU-UPD- ${timestamp}`,
      description: 'Produto atualizado pelo Bruno',
      priceCents: 29990,
      stock: 30,
      status: 'active',
    }

    cy.api({
      method: 'PUT',
      url: `http://localhost:3030/api/products/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: produto,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
