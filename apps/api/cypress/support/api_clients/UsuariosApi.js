class UsuariosApi {
  listarUsuarios(token) {
    return cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarListagemUsuarios(response) {
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

      expect(usuario).to.not.have.property('password')
    })
  }
}

export default new UsuariosApi()
