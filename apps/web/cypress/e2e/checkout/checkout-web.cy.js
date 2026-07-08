describe('Checkout Web', () => {
  it('deve finalizar pedido com Pix e cupom aplicado', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/checkout')

    cy.get('[data-checkout-add="curso-cypress"]').click()

    cy.get('#checkout-coupon').type('QA10')
    cy.contains('button', 'Aplicar').click()
    cy.contains('Cupom QA10 aplicado com sucesso.').should('be.visible')

    cy.get('#checkout-payment')
      .should('be.visible')
      .select('Pix')

    cy.get('.terms-line')
      .find('#checkout-terms')
      .click()

    cy.contains('button', 'Finalizar pedido').click()

    cy.contains('Confirmar Pix').should('be.visible')
    cy.contains('button', 'Confirmar Pix').click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'Pedido')
        .find('strong')
        .invoke('text')
        .then((pedido) => {
          expect(pedido.trim()).to.match(/^QA-\d{4}-\d+$/)
        })

      cy.contains('[data-cy="modal-list"] li', 'Pagamento')
        .find('strong')
        .should('have.text', 'Pix')

      cy.contains('[data-cy="modal-list"] li', 'Produtos')
        .find('strong')
        .should('have.text', '1')

      cy.contains('[data-cy="modal-list"] li', 'Total')
        .find('strong')
        .should('contain.text', '116,91')
    })
  })

  it('deve finalizar pedido com cartão de crédito', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/checkout')

    cy.get('[data-checkout-add="curso-playwright"]').click()

    cy.get('[data-checkout-add="template-api"]').click()

    cy.get('[data-checkout-increase="curso-playwright"]').click()
    cy.get('[data-checkout-increase="template-api"]').click()

    cy.get('#checkout-payment').select('Cartao de credito')

    cy.get('.terms-line')
      .find('#checkout-terms')
      .click()

    cy.contains('button', 'Finalizar pedido').click()
    cy.contains('button', 'Confirmar cartao').click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'Pedido')
        .find('strong')
        .invoke('text')
        .then((pedido) => {
          expect(pedido.trim()).to.match(/^QA-\d{4}-\d+$/)
        })

      cy.contains('[data-cy="modal-list"] li', 'Pagamento')
        .find('strong')
        .should('have.text', 'Cartao de credito')

      cy.contains('[data-cy="modal-list"] li', 'Produtos')
        .find('strong')
        .should('have.text', '2')

      cy.contains('[data-cy="modal-list"] li', 'Total')
        .find('strong')
        .should('contain.text', '379,60')
    })
  })

  it('deve finalizar pedido com boleto', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/checkout')

    cy.get('[data-checkout-add="template-api"]').click()

    cy.get('#checkout-payment').select('Boleto')

    cy.get('.terms-line')
      .find('#checkout-terms')
      .click()

    cy.contains('button', 'Finalizar pedido').click()
    cy.contains('button', 'Pagar boleto').click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'Pagamento')
        .find('strong')
        .should('have.text', 'Boleto')

      cy.contains('[data-cy="modal-list"] li', 'Produtos')
        .find('strong')
        .should('have.text', '1')

      cy.contains('[data-cy="modal-list"] li', 'Total')
        .find('strong')
        .should('contain.text', '39,90')
    })
  })
})
