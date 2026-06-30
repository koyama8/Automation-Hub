describe('GET /api/contracts', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar os contratos', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/contracts',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty

      expect(response.body[0]).to.have.property('id')
      expect(response.body[0]).to.have.property('clientId')
      expect(response.body[0].title).to.eq('Salada Refinado de Congelado')
      expect(response.body[0].amountCents).to.eq(5370)
      expect(response.body[0].status).to.eq('active')
      expect(response.body[0].notes).to.eq('Reiciendis enim et perspiciatis voluptatem quo sequi unde.')
      expect(response.body[0].client).to.have.property('id')
      expect(response.body[0].client.name).to.eq('Théo Oliveira')
      expect(response.body[0].client.email).to.eq('margarida_albuquerque46@gmail.com')
      expect(response.body[0].client.document).to.eq('96276180789')
      expect(response.body[0].client.company).to.eq('Reis-Macedo')
      expect(response.body[0].client.status).to.eq('inactive')
    })
  })
})
