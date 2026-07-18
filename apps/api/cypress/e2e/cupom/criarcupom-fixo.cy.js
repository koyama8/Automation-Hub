import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/coupons - Cadastro de cupom fixo', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve cadastrar um cupom fixo com limite de uso', () => {
    const timestamp = Date.now()

    const cupomfixo = {
      code: `QA10-${timestamp}`,
      description: 'Cupom fixo com limite de uso',
      type: 'fixed',
      value: faker.number.int({ min: 1, max: 100 }),
      minOrderCents: faker.number.int({ min: 1000, max: 5000 }),
      usageLimit: 1,
      status: 'active',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/coupons',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cupomfixo,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
