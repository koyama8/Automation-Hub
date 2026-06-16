describe('Upload', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/upload')
  })

  it('deve enviar evidência em PDF com sucesso', () => {
    cy.get('[data-field="uploadEvidence"]')
      .selectFile('cypress/fixtures/arvore_automacao_cypress.pdf')

    cy.contains('button', 'Enviar evidência').click()

    const msg = 'Evidência anexada com sucesso'

    cy.get('[data-cy="toast"]').should('have.text', msg)
  })

  it('deve exibir validação ao enviar sem arquivo', () => {
    cy.get('button.primary-btn').should('be.visible')

    cy.contains('button', 'Enviar evidência').click()

    cy.contains('Selecione um arquivo').should('be.visible')
  })
})
