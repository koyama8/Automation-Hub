import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/coupons - Listagem de cupons ativos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
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

      expect(response.body).to.be.an('array')

      expect(response.body[0].description).to.eq('Cupom fixo com limite de uso')
      expect(response.body[0].type).to.eq('fixed')
      expect(response.body[0].status).to.eq('active')
    })
  })
})
