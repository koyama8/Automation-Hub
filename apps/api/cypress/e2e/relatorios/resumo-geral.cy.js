import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/reports/summary - Resumo geral', () => {

  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })
  
  it('deve consultar o resumo geral dos relatórios', () => {
    cy.api({
      method:'GET',
      url:'http://localhost:3030/api/reports/summary',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
