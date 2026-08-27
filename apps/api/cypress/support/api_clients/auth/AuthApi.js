import { obterCredenciaisAdministrador } from '../../data/Credenciais'

class AuthApi {
  autenticar(credenciais) {
    return cy.api({
      method: 'POST',
      url: '/api/auth/login',
      body: credenciais,
      failOnStatusCode: false,
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarLoginComSucesso(response, email) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Login successful')

    expect(response.body.data.token).to.be.a('string')
    expect(response.body.data.token).to.not.be.empty

    expect(response.body.data.user).to.have.property('id')
    expect(response.body.data.user.name).to.eq('QA Admin')
    expect(response.body.data.user.email).to.eq(email)
    expect(response.body.data.user.role).to.eq('admin')
    expect(response.body.data.user.active).to.eq(true)
    expect(response.body.data.user).to.not.have.property('password')
  }

  validarLoginRejeitado(response) {
    expect(response.status).to.eq(401)
    expect(response.body.error).to.eq('Invalid email or password!')
  }

  consultarSessaoAtual(token) {
    return cy.api({
      method: 'GET',
      url: '/api/auth/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  validarDadosSessaoAtual(response) {
    const { email } = obterCredenciaisAdministrador()

    expect(response.status).to.eq(200)
    expect(response.body.data).to.have.property('id')
    expect(response.body.data.name).to.eq('QA Admin')
    expect(response.body.data.email).to.eq(email)
    expect(response.body.data.role).to.eq('admin')
    expect(response.body.data.active).to.eq(true)

    expect(response.body.data).to.not.have.property('password')
  }
}

export default new AuthApi()
