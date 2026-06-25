describe('GET /api/auth/me - Sessao atual', () => {
  it('deve realizar login com credenciais validas', () => {
    const user = {
      email: 'qa@adminlab.com',
      password: 'pwd123',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/auth/login',
      body: user,
    }).then((tokenResponse) => {
      expect(tokenResponse.status).to.eq(200)

      const token = tokenResponse.body.data.token
      expect(token).to.be.a('string')
      expect(token).to.not.be.empty

      cy.api({
        method: 'GET',
        url: 'http://localhost:3030/api/auth/me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data).to.have.property('id')
        expect(response.body.data.name).to.eq('QA Admin')
        expect(response.body.data.email).to.eq('qa@adminlab.com')
        expect(response.body.data.role).to.eq('admin')
        expect(response.body.data.active).to.eq(true)

        expect(response.body.data).to.not.have.property('password')
      })
    })
  })

})
