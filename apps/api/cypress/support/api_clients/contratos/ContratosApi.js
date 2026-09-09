class ContratosApi {
  requisitar(method, token, path = '', body, failOnStatusCode = true) {
    return cy.api({
      method,
      url: `/api/contracts${path}`,
      headers: { Authorization: `Bearer ${token}` },
      body,
      failOnStatusCode,
    })
  }

  cadastrar(token, contrato) {
    return this.requisitar('POST', token, '', contrato)
  }

  listar(token) {
    return this.requisitar('GET', token)
  }

  buscar(token, contractId, failOnStatusCode = true) {
    return this.requisitar('GET', token, `/${contractId}`, undefined, failOnStatusCode)
  }

  atualizar(token, contractId, contrato) {
    return this.requisitar('PUT', token, `/${contractId}`, contrato)
  }

  cancelar(token, contractId) {
    return this.requisitar('PATCH', token, `/${contractId}/cancel`)
  }

  ativar(token, contractId) {
    return this.requisitar('PATCH', token, `/${contractId}/activate`)
  }

  excluir(token, contractId) {
    return this.requisitar('DELETE', token, `/${contractId}`)
  }

  validarContrato(response, contrato, status = 200) {
    expect(response.status).to.eq(status)
    expect(response.body.data).to.include({
      clientId: contrato.clientId,
      title: contrato.title,
      plan: contrato.plan,
      amountCents: contrato.amountCents,
      status: contrato.status,
    })
  }

  validarListagem(response, contrato, contractId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')

    const contratoListado = response.body.find((item) => item.id === contractId)

    expect(contratoListado).to.exist
    expect(contratoListado).to.include({
      clientId: contrato.clientId,
      title: contrato.title,
      amountCents: contrato.amountCents,
      status: contrato.status,
    })
  }
}

export default new ContratosApi()
