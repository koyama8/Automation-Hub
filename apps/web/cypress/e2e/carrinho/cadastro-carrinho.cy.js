describe('Carrinho - Estado inicial do cadastro', () => {
  it('deve exibir formulario e tabela do carrinho sem massa cadastrada', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/carrinho')

    cy.get('[data-cy="cart-client"]').should('be.visible')

    cy.get('[data-cy="cart-form"]').within(() => {
      cy.contains('Cliente *').should('be.visible')

      cy.get('[data-cy="cart-client"]')
        .should('be.visible')
        .and('have.text', 'Cadastre um cliente antes')

      cy.contains('Produto *').should('be.visible')

      cy.get('[data-cy="cart-product"]')
        .should('be.visible')
        .and('have.text', 'Cadastre produto ativo antes')

      cy.contains('Quantidade *').should('be.visible')

      cy.get('[data-cy="cart-quantity"]').should('have.value', '1')

      cy.contains('button', 'Limpar carrinho').should('be.visible')

      cy.contains('button', 'Adicionar produto').should('be.visible')
    })

    cy.get('.result-text')
      .should('be.visible')
      .and('contain.text', 'Selecione cliente e produto.')

    cy.get('[data-cy="cart-table"]').within(() => {
      cy.contains('th', 'ID').should('be.visible')
      cy.contains('th', 'Produto').should('be.visible')
      cy.contains('th', 'Qtd').should('be.visible')
      cy.contains('th', 'Unitario').should('be.visible')
      cy.contains('th', 'Subtotal').should('be.visible')
      cy.contains('th', 'Acoes').should('be.visible')
    })
  })
})
