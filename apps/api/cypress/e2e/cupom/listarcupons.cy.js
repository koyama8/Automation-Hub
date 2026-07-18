import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/coupons - Listagem de cupons', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve listar os cupons cadastrados', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/coupons',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
