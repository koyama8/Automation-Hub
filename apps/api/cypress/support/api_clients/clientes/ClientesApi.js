class ClientesApi {
  cadastrarCliente(token, cliente) {
    return cy.api({
      method: 'POST',
      url: '/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cliente,
    })
  }

  buscarCliente(token, clientId, failOnStatusCode = true) {
    return cy.api({
      method: 'GET',
      url: `/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode,
    })
  }

  atualizarCliente(token, clientId, clienteAtualizado) {
    return cy.api({
      method: 'PUT',
      url: `/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: clienteAtualizado,
    })
  }

  inativarCliente(token, clientId) {
    return cy.api({
      method: 'PATCH',
      url: `/api/clients/${clientId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: 'inactive',
      },
    })
  }

  excluirClientePorId(token, clientId) {
    return cy.api({
      method: 'DELETE',
      url: `/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  excluirTodosClientes(token) {
    return cy.api({
      method: 'DELETE',
      url: '/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  listagemCliente(token) {
    return cy.api({
      method: 'GET',
      url: '/api/clients',
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
    expect(response.body.data).to.have.property('id').and.be.a('number').and.be.greaterThan(0)

    const clienteCadastrado = response.body.data

    expect(clienteCadastrado.name).to.eq(cliente.name)
    expect(clienteCadastrado.email).to.eq(cliente.email)
    expect(clienteCadastrado.document).to.eq(cliente.document)
    expect(clienteCadastrado.phone).to.eq(cliente.phone)
    expect(clienteCadastrado.company).to.eq(cliente.company)
    expect(clienteCadastrado.status).to.eq(cliente.status)
    expect(clienteCadastrado).to.not.have.property('password')
  }

  validarClienteBusca(response, cliente, clientId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body.data).to.be.an('object')

    const clienteBusca = response.body.data

    expect(clienteBusca.id).to.eq(clientId)
    expect(clienteBusca.name).to.eq(cliente.name)
    expect(clienteBusca.email).to.eq(cliente.email)
    expect(clienteBusca.document).to.eq(cliente.document)
    expect(clienteBusca.phone).to.eq(cliente.phone)
    expect(clienteBusca.company).to.eq(cliente.company)
    expect(clienteBusca.status).to.eq(cliente.status)
    expect(clienteBusca).to.not.have.property('password')
  }

  validarClienteInativo(response, cliente, clientId) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Client status updated successfully')
    expect(response.body.data).to.be.an('object')

    const clienteInativo = response.body.data

    expect(clienteInativo.id).to.eq(clientId)
    expect(clienteInativo.name).to.eq(cliente.name)
    expect(clienteInativo.email).to.eq(cliente.email)
    expect(clienteInativo.status).to.eq('inactive')
    expect(clienteInativo).to.not.have.property('password')
  }

  validarClienteAtualizado(response, clienteAtualizado) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Client updated successfully')
    expect(response.body.data.name).to.eq(clienteAtualizado.name)
    expect(response.body.data.email).to.eq(clienteAtualizado.email)
    expect(response.body.data.status).to.eq(clienteAtualizado.status)
  }

  validarClienteExcluidoPorId(response, cliente, clientId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body.message).to.eq('Client deleted successfully')
    expect(response.body.data).to.be.an('object')

    const clienteExcluido = response.body.data

    expect(clienteExcluido.id).to.eq(clientId)
    expect(clienteExcluido.name).to.eq(cliente.name)
    expect(clienteExcluido.email).to.eq(cliente.email)
    expect(clienteExcluido.document).to.eq(cliente.document)
    expect(clienteExcluido.phone).to.eq(cliente.phone)
    expect(clienteExcluido.company).to.eq(cliente.company)
    expect(clienteExcluido.status).to.eq(cliente.status)
    expect(clienteExcluido).to.not.have.property('password')
  }

  validarClienteNaoEncontrado(response) {
    expect(response.status).to.eq(404)
    expect(response.body).to.be.an('object')
    expect(response.body.error).to.eq('Client not found!')
  }

  validarLimpezaClientes(response) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body.message).to.eq('All clients deleted successfully')
    expect(response.body.data).to.be.an('object')

    const resultado = response.body.data

    expect(resultado.deletedClients).to.be.a('number').and.be.greaterThan(0)
    expect(resultado.deletedContracts).to.be.a('number').and.be.at.least(0)
    expect(resultado.deletedCarts).to.be.a('number').and.be.at.least(0)
    expect(resultado.deletedOrders).to.be.a('number').and.be.at.least(0)
    expect(resultado.deletedPayments).to.be.a('number').and.be.at.least(0)
    expect(resultado.deletedCouponUsages).to.be.a('number').and.be.at.least(0)
    expect(resultado.deletedEvidences).to.be.a('number').and.be.at.least(0)
    expect(resultado.nextClientId).to.eq(1)
  }

  validarListagemClientesVazia(response) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array').and.be.empty
  }
}

export default new ClientesApi()
