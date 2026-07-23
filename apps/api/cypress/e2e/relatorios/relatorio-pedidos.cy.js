import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/reports/orders - Relatório de pedidos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar o relatório de pedidos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/orders?page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
