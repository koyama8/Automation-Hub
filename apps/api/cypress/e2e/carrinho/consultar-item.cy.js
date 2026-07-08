import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/cart/{{clientId}}', () => {

  let token
  let clientId

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
      stock: faker.number.int({ min: 1, max: 100 }),
      status: 'active',
    }

    cy.api({
      method:'POST',
      url:'http://localhost:3030/api/clients',
      headers:{
         Authorization: `Bearer ${token}`,
      },
      body:cliente
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
      })
    })
  })
})

  it('deve consultar um item do carrinho', () => {
    cy.api({
      method:'GET',
      url:`http://localhost:3030/api/cart/${clientId}`,
      headers:{
       Authorization: `Bearer ${token}`,
    },
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body.data.id).to.eq(clientId)
      expect(response.body.data.status).to.eq('active')
    })
  })
})