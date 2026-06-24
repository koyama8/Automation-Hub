describe('GET /api/health', () => {
  it('deve confirmar que a API e o banco de dados estao disponiveis', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/health',
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.status).to.eq('ok')
      expect(response.body.service).to.eq('qa-automation-lab-api')
      expect(response.body.api).to.eq('online')
      expect(response.body.database).to.eq('connected')
    })
  })
})
