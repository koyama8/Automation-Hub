import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/products - Listagem de produtos', () => {
  let token
  let productId
  let produto

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      const timestamp = Date.now()

      produto = {
        name: `${faker.commerce.productName()} ${timestamp}`,
        sku: `LIST-${faker.string.alphanumeric(6).toUpperCase()}-${timestamp}`,
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

  it('deve listar o produto cadastrado', () => {
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

      const produtoListado = response.body.find((item) => item.id === productId)

      expect(produtoListado).to.exist
      expect(produtoListado.name).to.eq(produto.name)
      expect(produtoListado.sku).to.eq(produto.sku)
      expect(produtoListado.priceCents).to.eq(produto.priceCents)
      expect(produtoListado.stock).to.eq(produto.stock)
      expect(produtoListado.status).to.eq(produto.status)
    })
  })
})
