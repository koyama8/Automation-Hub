import { fakerPT_BR as faker } from '@faker-js/faker'

describe('Fluxos de pagamento via cartão e boleto - /api/payments', () => {
  let token
  let clientId
  let productId
  let quantity = 2
  let orderId
  let paymentId

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
      stock: faker.number.int({ min: quantity, max: 100 }),
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

          cy.api({
            method: 'POST',
            url: 'http://localhost:3030/api/orders',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              clientId,
              items: [
                {
                  productId,
                  quantity,
                },
              ],
            },
          }).then((response) => {
            expect(response.status).to.eq(201)
            orderId = response.body.data.id
          })
        })
      })
    })
  })

  it('deve criar um pagamento via cartão com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/payments',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        orderId,
        method: 'card',
        cardNumber: '4111111111111111',
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('deve criar e confirmar um pagamento via boleto com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/payments',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        orderId,
        method: 'boleto',
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
      paymentId = response.body.data.id

      cy.api({
        method: 'PATCH',
        url: `http://localhost:3030/api/payments/${paymentId}/confirm`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Payment confirmed successfully')
        expect(response.body.data.method).to.eq('boleto')
        expect(response.body.data.status).to.eq('approved')
      })
    })
  })

  it('deve listar os pagamentos cadastrados', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/payments',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
