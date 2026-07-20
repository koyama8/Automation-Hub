import { fakerPT_BR as faker } from '@faker-js/faker'

describe('template spec', () => {

  let token
  let couponId
  

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })


  it('deve atualizar o cumpom', () => {
  
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
      method:'POST',
      url:'http://localhost:3030/api/coupons',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:cupom,
    }).then((response) => {
      expect(response.status).to.eq(201)
      couponId = response.body.data.id


    
    const cupomatualizado = {
      code:`QA10-${timestamp}`,
      description: "Cupom atualizado pelo Bruno",
      type: "percentage",
      value: 15,
      minOrderCents: 1000,
      maxDiscountCents: 6000,
      usageLimit: 3,
      status: "active"
    }
   
   cy.api({
     method:'PUT',
     url:`http://localhost:3030/api/coupons/${couponId}`,
     headers: {
        Authorization: `Bearer ${token}`,
      },
     body:cupomatualizado
     }).then((response) => {
      expect(response.status).to.eq(200)
     })
    })
  })
})