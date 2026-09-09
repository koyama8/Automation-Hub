class PedidosApi {
  requisitar(method, token, path = '', body, failOnStatusCode = true) {
    return cy.api({
      method,
      url: `/api/orders${path}`,
      headers: { Authorization: `Bearer ${token}` },
      body,
      failOnStatusCode,
    })
  }

  cadastrar(token, pedido, failOnStatusCode = true) {
    return this.requisitar('POST', token, '', pedido, failOnStatusCode)
  }

  listar(token) {
    return this.requisitar('GET', token)
  }

  buscar(token, orderId) {
    return this.requisitar('GET', token, `/${orderId}`)
  }

  atualizarStatus(token, orderId, status) {
    return this.requisitar('PATCH', token, `/${orderId}/status`, { status })
  }

  cancelar(token, orderId) {
    return this.requisitar('PATCH', token, `/${orderId}/cancel`)
  }
}

export default new PedidosApi()
