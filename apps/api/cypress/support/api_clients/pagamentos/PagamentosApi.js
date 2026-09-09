class PagamentosApi {
  requisitar(method, token, path = '', body, failOnStatusCode = true) {
    return cy.api({
      method,
      url: `/api/payments${path}`,
      headers: { Authorization: `Bearer ${token}` },
      body,
      failOnStatusCode,
    })
  }

  cadastrar(token, pagamento) {
    return this.requisitar('POST', token, '', pagamento)
  }

  listar(token) {
    return this.requisitar('GET', token)
  }

  confirmar(token, paymentId, failOnStatusCode = true) {
    return this.requisitar('PATCH', token, `/${paymentId}/confirm`, undefined, failOnStatusCode)
  }
}

export default new PagamentosApi()
