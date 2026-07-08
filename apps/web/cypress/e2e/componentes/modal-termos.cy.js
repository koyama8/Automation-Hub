describe('Modal e Termos', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/termos')
  })

  it('deve aceitar os termos com sucesso', () => {
    cy.contains('button', 'Ler e aceitar termos')
      .should('be.visible')
    cy.contains('button', 'Ler e aceitar termos')
      .click()

    cy.contains('Deseja iniciar o aceite?')
      .should('be.visible')
    cy.contains('button', 'Sim, continuar')
      .click()

    cy.get('.modal-check-line')
      .find('input[type="checkbox"]')
      .click()
    cy.contains('button', 'Finalizar aceite')
      .click()

    cy.get('[data-cy="success-modal"]').within(() => {
      const termos = 'Termos aceitos com sucesso.'
      cy.contains('Sucesso!')
        .should('be.visible')
      cy.contains('Termos aceitos com sucesso.')
        .should('be.visible')
    })
  })

  it('deve exibir mensagem ao finalizar sem marcar aceite', () => {
    cy.contains('button', 'Ler e aceitar termos')
      .click()
    cy.contains('button', 'Sim, continuar')
      .click()
    cy.contains('button', 'Finalizar aceite')
      .click()
    cy.contains('p', 'Marque o aceite para finalizar')
      .should('be.visible')
  })
})
