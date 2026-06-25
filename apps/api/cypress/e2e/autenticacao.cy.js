describe('POST /api/auth/login - Autenticacao', () => {
  it('deve realizar login com credenciais validas', () => {
    // Credenciais exigidas pelo contrato do endpoint de login.
    const user = {
      email: 'qa@adminlab.com',
      password: 'pwd123',
    }

    // Envia a requisicao POST e exibe os detalhes no painel do plugin de API.
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/auth/login',
      body: user,
    }).then((response) => {
      // O status 200 confirma que a autenticacao foi concluida com sucesso.
      expect(response.status).to.eq(200)

      // Valida a mensagem definida no contrato de resposta da API.
      expect(response.body.message).to.eq('Login successful')

      // O token JWT deve ser uma string preenchida para autenticar outras rotas.
      expect(response.body.data.token).to.be.a('string')
      expect(response.body.data.token).to.not.be.empty

      // Confirma os dados publicos do usuario autenticado.
      expect(response.body.data.user).to.have.property('id')
      expect(response.body.data.user.name).to.eq('QA Admin')
      expect(response.body.data.user.email).to.eq(user.email)
      expect(response.body.data.user.role).to.eq('admin')
      expect(response.body.data.user.active).to.eq(true)

      // A senha nunca deve ser devolvida pela API.
      expect(response.body.data.user).to.not.have.property('password')
    })
  })

  it('deve rejeitar login com credenciais invalidas', () => {
    const userInvalido = {
      email: 'qa@adminlab.com',
      password: 'pwd1234',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/auth/login',
      body: userInvalido,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401)

      expect(response.body.error).to.eq('Invalid email or password!')
    })
  })
})
