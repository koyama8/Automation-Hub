describe('GET /api/clients/{{clientId}}', () => {
  let token
  let clientId

  const user = {
    name: 'Test',
    email: 'teste.TI@hotmail.com',
    document: '12345678910',
    phone: '11999991000',
    company: 'QA Automation Lab',
    status: 'active',
  }

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: user,
      }).then((response) => {
        expect(response.status).to.eq(201)
        clientId = response.body.data.id
      })
    })
  })

  it('deve buscar um cliente pelo id', () => {
    cy.api({
      method: 'GET',
      url: `http://localhost:3030/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(clientId)
    })
  })
})
