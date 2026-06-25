describe('GET /api/clients - Listagem de clientes', () => {
  let token

  const user = {
    name: 'Cliente Bruno',
    email: 'cliente.bruno@gmail.com',
    document: '52998224725',
    phone: '11999991000',
    company: 'QA Automation Lab',
    status: 'active',
  }

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve listar os clientes cadastrados', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty

      expect(response.body[0]).to.have.property('id')
      expect(response.body[0].name).to.eq('Cliente Bruno')
      expect(response.body[0].email).to.eq('cliente.bruno@gmail.com')
      expect(response.body[0].document).to.eq('52998224725')
      expect(response.body[0].phone).to.eq('11999991000')
      expect(response.body[0].company).to.eq('QA Automation Lab')
      expect(response.body[0].status).to.eq('active')
    })
  })
})
