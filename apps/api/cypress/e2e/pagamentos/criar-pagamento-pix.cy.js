import { fakerPT_BR as faker } from '@faker-js/faker'

describe('Cadastro de pagamento via Pix - POST /api/payments', () => {
  let token
  let clientId
  let productId
  let quantity = 2
  let orderId

  beforeEach(() => {
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
      stock: faker.number.int({ min: 1, max: 100 }),
      status: 'active',
    }

    cy.loginApi().then((tokengerado) => {
      token = tokengerado

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

          const pedido = {
            clientId,
            items: [
              {
                productId,
                quantity,
              },
            ],
          }

          cy.api({
            method: 'POST',
            url: 'http://localhost:3030/api/orders',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: pedido,
          }).then((response) => {
            expect(response.status).to.eq(201)
            orderId = response.body.data.id
          })
        })
      })
    })
  })

  it('deve cadastrar um pagamento via Pix com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/payments',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        orderId,
        method: 'pix',
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
