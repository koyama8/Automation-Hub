import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/products/:id - Busca de produto', () => {
  let token
  let productId

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      const timestamp = Date.now()

      const produto = {
        name: `${faker.commerce.productName()} ${timestamp}`,
        sku: `BRU-${faker.string.alphanumeric(6).toUpperCase()}-${timestamp}`,
        description: faker.commerce.productDescription(),
        priceCents: faker.number.int({ min: 1000, max: 99900 }),
        stock: faker.number.int({ min: 1, max: 100 }),
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

  it('deve buscar um produto cadastrado por ID', () => {
    cy.api({
      method: 'GET',
      url: `http://localhost:3030/api/products/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
