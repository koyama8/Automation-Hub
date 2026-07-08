describe('Status da API', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/status-api')
  })

  it('deve informar quando a API estiver indisponivel', () => {
    cy.intercept('GET', 'http://localhost:3030/api/health', {
      forceNetworkError: true,
    }).as('healthIndisponivel')

    cy.contains('button', 'Verificar API').click()

    cy.wait('@healthIndisponivel')

    cy.get('[data-role="apiResult"]')
      .should('be.visible')
      .and('contain.text', 'API indispon')

    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('have.class', 'error-toast')
  })
})
