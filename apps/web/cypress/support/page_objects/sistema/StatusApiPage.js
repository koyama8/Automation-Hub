class StatusApiPage {
  acessarTelaStatusApi() {
    cy.visit('/admin/status-api')
  }

  verificarStatusComApiIndisponivel() {
    cy.intercept('GET', 'http://localhost:3030/api/health', {
      forceNetworkError: true,
    }).as('healthIndisponivel')

    cy.contains('button', 'Verificar API').click()

    cy.wait('@healthIndisponivel')
  }

  validarMensagemApiIndisponivel() {
    cy.get('[data-role="apiResult"]')
      .should('be.visible')
      .and('contain.text', 'API indispon')
  }

  validarNotificacaoErro() {
    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('have.class', 'error-toast')
  }
}

export default new StatusApiPage()
