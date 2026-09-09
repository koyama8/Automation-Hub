class CuponsApi {
  criar(token, cupom) {
    return this.requisitar(token, 'POST', '/api/coupons', { body: cupom })
  }

  listar(token, query = {}) {
    return this.requisitar(token, 'GET', '/api/coupons', { qs: query })
  }

  buscarPorId(token, couponId) {
    return this.requisitar(token, 'GET', `/api/coupons/${couponId}`)
  }

  atualizar(token, couponId, cupom) {
    return this.requisitar(token, 'PUT', `/api/coupons/${couponId}`, { body: cupom })
  }

  validar(token, dados, failOnStatusCode = true) {
    return this.requisitar(token, 'POST', '/api/coupons/validate', {
      body: dados,
      failOnStatusCode,
    })
  }

  excluirTodos(token) {
    return this.requisitar(token, 'DELETE', '/api/coupons')
  }

  requisitar(token, method, url, opcoes = {}) {
    return cy.api({ method, url, headers: { Authorization: `Bearer ${token}` }, ...opcoes })
  }

  validarCadastro(response, cupom) {
    expect(response.status).to.eq(201)
    expect(response.body.data).to.include({ code: cupom.code, type: cupom.type })
  }
}

export default new CuponsApi()
