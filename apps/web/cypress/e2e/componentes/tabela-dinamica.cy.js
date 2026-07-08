describe('Tabela dinâmica', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/tabela-dinamica')
  })

  it('deve exibir os dados iniciais da tabela dinâmica', () => {
    cy.get('[data-role="dynamicTable"]').within(() => {
      cy.contains('td', '1').should('be.visible')
      cy.contains('td', 'Login com sucesso').should('be.visible')
      cy.contains('td', 'Automatizado').should('be.visible')

      cy.contains('td', '2').should('be.visible')
      cy.contains('td', 'Formulário obrigatório').should('be.visible')
      cy.contains('td', 'Planejado').should('be.visible')

      cy.contains('td', '3').should('be.visible')
      cy.contains('td', 'Validação de modal').should('be.visible')
      cy.contains('td', 'Revisão').should('be.visible')
    })
  })

  it('deve adicionar uma nova linha na tabela dinâmica', () => {
    cy.get('[data-cy="table-name"]').type('Qa Lab')

    cy.get('[data-cy="table-add"]').click()
  })

  it('deve filtrar a tabela dinâmica por status automatizado', () => {
    cy.get('[data-cy="table-filter"]')
      .select('Automatizado')
      .should('have.value', 'Automatizado')

    cy.get('[data-role="dynamicTable"]').within(() => {
      cy.contains('td', '1').should('be.visible')
      cy.contains('td', 'Login com sucesso').should('be.visible')
      cy.contains('td', 'Automatizado').should('be.visible')
    })
  })

  it('deve remover uma linha da tabela dinâmica', () => {
    cy.get('[data-delete-row="1"]').click()

    cy.get('[data-cy="toast"]').should('be.visible')
  })
})
