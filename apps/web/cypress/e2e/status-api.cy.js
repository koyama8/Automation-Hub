describe('Status da API', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/status-api')
  })

  it('deve informar quando a API estiver indisponivel', () => {
    cy.contains('button', 'Verificar API').click()

    cy.get('.error-toast').should('be.visible')

    cy.contains('p.result-text', 'API indisponível em http://localhost:3030')
      .should('be.visible')
  })
})
