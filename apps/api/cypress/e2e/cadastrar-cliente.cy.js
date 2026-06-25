describe('POST /api/clients - Cadastro de cliente', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve cadastrar um cliente com sucesso', () => {
    const user = {
      name: 'Cliente Bruno',
      email: 'cliente.bruno@gmail.com',
      document: '52998224725',
      phone: '11999991000',
      company: 'QA Automation Lab',
      status: 'active',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.data.name).to.eq('Cliente Bruno')
      expect(response.body.data.email).to.eq('cliente.bruno@gmail.com')
      expect(response.body.data.document).to.eq('52998224725')
      expect(response.body.data.phone).to.eq('11999991000')
      expect(response.body.data.company).to.eq('QA Automation Lab')
      expect(response.body.data.status).to.eq('active')
    })
  })
})
