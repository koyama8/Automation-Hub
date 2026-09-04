class UploadPage {
  acessarTelaUpload() {
    cy.visit('/admin/upload')
  }

  enviarPDF() {
    cy.get('#uploadView').within(() => {
      cy.get('[data-field="uploadEvidence"]').selectFile(
        'cypress/fixtures/arvore_automacao_cypress.pdf',
      )

      cy.get('button.upload-action').click()
    })
  }
  enviarPDFSemArquivo() {
    cy.get('#uploadView').within(() => {
      cy.get('button.upload-action').should('be.visible').click()
    })
  }

  visualizarPDF() {
    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('contain.text', 'Evid')
      .and('contain.text', 'anexada com sucesso')
  }

  visualizarMensagemObrigatoria() {
    cy.get('[data-error-for="uploadEvidence"]')
      .should('be.visible')
      .and('have.text', 'Selecione um arquivo')
  }
}

export default new UploadPage()
