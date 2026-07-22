import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PATCH /api/cart/items/:itemId - Atualizacao de quantidade', () => {
  let token
  let clientId
  let productId
  let cartItemId

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      const cliente = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        document: faker.string.numeric(11),
        phone: faker.string.numeric(11),
        company: faker.company.name(),
        status: 'inactive',
      }

      const timestamp = Date.now()

      const produto = {
        name: `${faker.commerce.productName()} ${timestamp}`,
        sku: `BRU-${faker.string.alphanumeric(6).toUpperCase()}-${timestamp}`,
        description: faker.commerce.productDescription(),
        priceCents: faker.number.int({ min: 1000, max: 99900 }),
        stock: faker.number.int({ min: 5, max: 100 }),
        status: 'active',
      }

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: cliente,
      }).then((response) => {
        expect(response.status).to.eq(201)
        clientId = response.body.data.id
      })

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

  it('deve atualizar a quantidade de um item do carrinho', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/cart/items',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        clientId,
        productId,
        quantity: 2,
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
      cartItemId = response.body.data.items[0].id

      cy.api({
        method: 'PATCH',
        url: `http://localhost:3030/api/cart/items/${cartItemId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          quantity: 5,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })
})
