class HealthApi {
  consultarSaude() {
    return cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/health',
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarDisponibilidade(response) {
    expect(response.status).to.eq(200)
    expect(response.body.status).to.eq('ok')
    expect(response.body.service).to.eq('qa-automation-lab-api')
    expect(response.body.api).to.eq('online')
    expect(response.body.database).to.eq('connected')
  }
}

export default new HealthApi()
