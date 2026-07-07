import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/products - Cadastro de produtos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve cadastrar um produto ativo com sucesso', () => {
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
    })
  })
})
