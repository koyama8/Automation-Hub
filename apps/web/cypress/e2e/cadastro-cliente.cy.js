describe('Cadastro de clientes', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/clientes')
  })

  it('deve cadastrar um cliente', () => {
    cy.get('[data-cy="client-name"]').type('Cliente Matheus')
    cy.get('[data-cy="client-email"]').type('cliente.TI@gmail.com')
    cy.get('[data-cy="client-document"]').type('52998224725')
    cy.get('[data-cy="client-phone"]').type('11999991000')
    cy.get('[data-cy="client-company"]').type('QA Automation Lab')
    cy.get('[data-cy="client-status"]').select('Ativo')
    cy.contains('button', 'Cadastrar cliente').click()
  })

  it.only('deve validar os dados do cliente', () => {
    cy.get('[data-cy="clients-table"]').within(() => {
      cy.contains('[data-cy="clients-table-body"] td', 'Cliente Bruno')
        .find('strong')
        .should('have.text', 'Cliente Bruno')
      cy.contains('small', 'cliente.bruno@gmail.com').should('be.visible')
      cy.contains('small', 'QA Automation Lab').should('be.visible')
      cy.contains('td', '529.982.247-25').should('be.visible')
      cy.contains('td', '(11) 99999-1000').should('be.visible')
      cy.get('.status-badge').should('be.visible')
    })

    cy.contains('tr', 'Cliente Bruno').then(($linha) => {
      const status = $linha
        .find('.status-badge ')
        .text()
        .replace(/\s/g, '')
        .toUpperCase()

      if (status === 'ATIVO') {
        cy.wrap($linha).contains('button', 'Inativar').click()

        cy.get('#toast')
          .should('be.visible')
          .and('contain.text', 'Cliente inativado com sucesso: Cliente Bruno')
      } else {
        cy.wrap($linha).contains('button', 'Ativar').click()

        cy.get('#toast')
          .should('be.visible')
          .and('contain.text', 'Cliente ativado com sucesso: Cliente Bruno')
      }
    })
  })
})
