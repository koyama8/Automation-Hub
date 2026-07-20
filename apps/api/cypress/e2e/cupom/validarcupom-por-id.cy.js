import { fakerPT_BR as faker } from '@faker-js/faker'

describe('template spec', () => {
  let token
  let clientId
  let productId
  let quantity = 2
  let orderId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve validar o cumpom do pedido', () => {
    const cliente = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      document: faker.string.numeric(11),
      phone: '11999991000',
      company: 'QA Automation Lab',
      status: 'active',
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

    const cupom = {
      code: `QA10-${timestamp}`,
      description: faker.lorem.sentence(),
      type: 'percentage',
      value: faker.number.int({ min: 1, max: 100 }),
      minOrderCents: faker.number.int({ min: 1000, max: 5000 }),
      maxDiscountCents: faker.number.int({ min: 5000, max: 10000 }),
      usageLimit: faker.number.int({ min: 1, max: 10 }),
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
          notes: faker.internet.notes,
        }

        let code = `QA10-${timestamp}`

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

          cy.api({
            method: 'POST',
            url: 'http://localhost:3030/api/coupons',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: cupom,
          }).then((response) => {
            expect(response.status).to.eq(201)

            cy.api({
              method: 'POST',
              url: 'http://localhost:3030/api/coupons/validate',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                code,
                orderId,
              },
            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })
      })
    })
  })

  it('deve validar cupom inexistente 404', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/coupons/validate',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        code: `INEXISTENTE-${Date.now()}`,
        orderId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
})
