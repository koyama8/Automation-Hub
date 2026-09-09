class EvidenciasApi {
  criar(token, evidencia, failOnStatusCode = true) {
    return this.requisitar(token, 'POST', '/api/evidences', { body: evidencia, failOnStatusCode })
  }

  listar(token, query = {}) {
    return this.requisitar(token, 'GET', '/api/evidences', { qs: query })
  }

  baixar(token, evidenceId) {
    return this.requisitar(token, 'GET', `/api/evidences/${evidenceId}/download`)
  }

  excluir(token, evidenceId) {
    return this.requisitar(token, 'DELETE', `/api/evidences/${evidenceId}`)
  }

  excluirTodas(token) {
    return this.requisitar(token, 'DELETE', '/api/evidences')
  }

  requisitar(token, method, url, opcoes = {}) {
    return cy.api({ method, url, headers: { Authorization: `Bearer ${token}` }, ...opcoes })
  }
}

export default new EvidenciasApi()
