class EstadosVisuaisPage {
  acessarTelaEstadosVisuais() {
    cy.visit('/admin/estados-visuais')
  }

  selecionarEstadoVisual(estado) {
    cy.contains('button.status-btn', estado).click()
  }

  validarEstadoVisual(mensagem, possuiAlertaDeErro) {
    cy.get('[data-role="visualStatus"]').should('be.visible').and('have.text', mensagem)

    const toast = cy.get('[data-cy="toast"]').should('be.visible')

    if (possuiAlertaDeErro) {
      toast.should('have.class', 'error-toast')
      return
    }

    toast.should('not.have.class', 'error-toast')
  }
}

export default new EstadosVisuaisPage()
