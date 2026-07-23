import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/reports/clients - Relatório de clientes por período', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve consultar os clientes cadastrados no período informado', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/reports/clients?startDate=2026-01-01&endDate=2026-12-31&page=1&limit=10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
