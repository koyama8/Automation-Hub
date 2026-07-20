import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/coupons - Cadastro de cupom percentual', () => {
  let token
  let couponId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve cadastrar um cupom percentual', () => {
    const timestamp = Date.now()

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
      url: 'http://localhost:3030/api/coupons',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cupom,
    }).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.data.code).to.eq(cupom.code)
      expect(response.body.data.description).to.eq(cupom.description)
      expect(response.body.data.type).to.eq(cupom.type)
      expect(response.body.data.value).to.eq(cupom.value)
      expect(response.body.data.minOrderCents).to.eq(cupom.minOrderCents)
      expect(response.body.data.maxDiscountCents).to.eq(cupom.maxDiscountCents)
      expect(response.body.data.usageLimit).to.eq(cupom.usageLimit)
      expect(response.body.data.status).to.eq(cupom.status)

      couponId = response.body.data.id;
    })
  })

  it('deve buscar um cupom por id',() => {
    cy.api({
      method:'GET',
      url:`http://localhost:3030/api/coupons/${couponId}`,
      headers:{
         Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  
  it('deve listar os cupons ativos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/coupons?status=active',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)


    })
  })
})
