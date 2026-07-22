import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/evidences - Listagem de evidências do pedido', () => {
  let token
  let clientId
  let productId
  let orderId

  let priceCents = 2000
  let quantity = 2

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar as evidências vinculadas ao pedido', () => {
    const cliente = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      document: faker.string.numeric(11),
      phone: '11999991000',
      company: 'QA Automation Lab',
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

      const produto = {
        name: faker.commerce.productName(),
        sku: `SKU-${Date.now()}-${faker.string.alphanumeric(4)}`.toUpperCase(),
        description: faker.commerce.productDescription(),
        priceCents,
        stock: 10,
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

          const timestamp = Date.now()
          const conteudoArquivo = faker.lorem.paragraph()

          const evidencia = {
            entityType: 'order',
            orderId,
            title: faker.lorem.sentence(),
            fileName: `pedido-evidencia-${timestamp}.txt`,
            mimeType: 'text/plain',
            fileBase64: Cypress.Buffer.from(conteudoArquivo).toString('base64'),
            notes: faker.lorem.sentence(),
            status: 'active',
          }

          cy.api({
            method: 'POST',
            url: 'http://localhost:3030/api/evidences',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: evidencia,
          }).then((response) => {
            expect(response.status).to.eq(201)

            cy.api({
              method: 'GET',
              url: `http://localhost:3030/api/evidences?entityType=order&orderId=${orderId}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })
      })
    })
  })
})
