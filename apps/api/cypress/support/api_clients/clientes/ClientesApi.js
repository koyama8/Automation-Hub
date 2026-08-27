class ClientesApi {
  cadastrarCliente(token, cliente) {
    return cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cliente,
    })
  }

  listagemCliente(token, cliente) {
    return cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarClienteNaListagem(response, cliente, clientId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
    expect(response.body).to.not.be.empty

    const clienteListado = response.body.find((item) => item.id === clientId)

    expect(clienteListado).to.exist
    expect(clienteListado.name).to.eq(cliente.name)
    expect(clienteListado.email).to.eq(cliente.email)
    expect(clienteListado.document).to.eq(cliente.document)
    expect(clienteListado.phone).to.eq(cliente.phone)
    expect(clienteListado.company).to.eq(cliente.company)
    expect(clienteListado.status).to.eq(cliente.status)
  }

  validarClienteCadastrado(response, cliente) {
    expect(response.status).to.eq(201)
    expect(response.body.message).to.eq('Client created successfully')
    expect(response.body.data)
      .to.have.property('id')
      .and.be.a('number')
      .and.be.greaterThan(0)

    const clienteCadastrado = response.body.data

    expect(clienteCadastrado.name).to.eq(cliente.name)
    expect(clienteCadastrado.email).to.eq(cliente.email)
    expect(clienteCadastrado.document).to.eq(cliente.document)
    expect(clienteCadastrado.phone).to.eq(cliente.phone)
    expect(clienteCadastrado.company).to.eq(cliente.company)
    expect(clienteCadastrado.status).to.eq(cliente.status)
    expect(clienteCadastrado).to.not.have.property('password')
  }
}

export default new ClientesApi()
