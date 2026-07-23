import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/reports/clients - Relatório de clientes ativos', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar somente os clientes ativos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?status=active&page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
