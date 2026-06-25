describe('GET /api/users', () => {
  let token

  const user = {
    name: 'QA Admin',
    email: 'qa@adminlab.com',
    role: 'admin',
    active: true,
  }

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar e validar todos os usuarios cadastrados', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty

      response.body.forEach((usuario, indice) => {
        expect(usuario, `usuario ${indice + 1}`)
          .to.have.property('id')
          .to.be.a('number')

        expect(usuario).to.have.property('name').to.be.a('string')

        expect(usuario).to.have.property('email').to.be.a('string')

        expect(usuario).to.have.property('role').to.be.a('string')

        expect(usuario).to.have.property('active').to.be.a('boolean')

        expect(response.body).to.not.have.property('password')
      })
    })
  })
})
