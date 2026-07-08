describe('Upload', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/upload')
  })

  it('deve enviar evidencia em PDF com sucesso', () => {
    cy.get('#uploadView').within(() => {
      cy.get('[data-field="uploadEvidence"]')
        .selectFile('cypress/fixtures/arvore_automacao_cypress.pdf')

      cy.get('button.upload-action').click()
    })

    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('contain.text', 'Evid')
      .and('contain.text', 'anexada com sucesso')
  })

  it('deve exibir validacao ao enviar sem arquivo', () => {
    cy.get('#uploadView').within(() => {
      cy.get('button.upload-action')
        .should('be.visible')
        .click()
    })

    cy.get('[data-error-for="uploadEvidence"]')
      .should('be.visible')
      .and('have.text', 'Selecione um arquivo')
  })
})
