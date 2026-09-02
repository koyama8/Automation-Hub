class CarrinhoPage {
  acessarTelaCarrinho() {
    cy.visit('/admin/carrinho')
  }

  validarFormularioInicial() {
    cy.get('[data-cy="cart-form"]').within(() => {
      cy.contains('Cliente *').should('be.visible')

      cy.get('[data-cy="cart-client"]').should('be.visible')

      cy.contains('Produto *').should('be.visible')

      cy.get('[data-cy="cart-product"]').should('be.visible')

      cy.contains('Quantidade *').should('be.visible')

      cy.get('[data-cy="cart-quantity"]').should('have.value', '1')

      cy.contains('button', 'Limpar carrinho').should('be.visible')

      cy.contains('button', 'Adicionar produto').should('be.visible')
    })

    cy.get('[data-cy="cart-result"]').should('be.visible')
  }

  validarTabelaCarrinho() {
    cy.get('[data-cy="cart-table"]').within(() => {
      cy.contains('th', 'ID').should('be.visible')
      cy.contains('th', 'Produto').should('be.visible')
      cy.contains('th', 'Qtd').should('be.visible')
      cy.contains('th', 'Unitario').should('be.visible')
      cy.contains('th', 'Subtotal').should('be.visible')
      cy.contains('th', 'Acoes').should('be.visible')
    })
  }
}

export default new CarrinhoPage()
