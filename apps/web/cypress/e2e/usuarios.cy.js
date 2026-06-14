describe('Usuários', () => {
  it('deve listar o usuário administrador na tela de usuários', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('admin/usuarios')

    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('td', 'QA Admin Lab').should('be.visible')
      cy.contains('td', 'qa@adminlab.com').should('be.visible')
      cy.contains('td', 'Ativo').should('be.visible')
    })
  })
})
