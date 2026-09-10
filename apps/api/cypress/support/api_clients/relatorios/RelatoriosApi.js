class RelatoriosApi {
  consultar(token, recurso, parametros = {}, failOnStatusCode = true) {
    return cy.api({
      method: 'GET',
      url: `/api/reports/${recurso}`,
      qs: parametros,
      failOnStatusCode,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  validarConsulta(response) {
    expect(response.status).to.eq(200)
    expect(response.body).to.exist
  }

  validarExportacao(response) {
    expect(response.status).to.eq(200)
    expect(response.headers['content-type']).to.include('text/csv')
    expect(response.body).to.be.a('string')
  }

  validarErro(response, status, mensagem) {
    expect(response.status).to.eq(status)
    expect(response.body.error).to.eq(mensagem)
  }
}

export default new RelatoriosApi()
