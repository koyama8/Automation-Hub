class CuponsPage {
  cadastrarCupom(cupom) {
    cy.visit('/admin/cupons')
    cy.get('[data-cy="coupon-code"]').type(cupom.codigoCupom)

    cy.get('[data-cy="coupon-type"]').select(cupom.tipoCupom)

    cy.get('#couponValue').type(cupom.valorCupom)

    cy.get('#couponMaxDiscountCents').type(cupom.descontoMaximo)

    cy.get('[data-cy="coupon-description"]').type(cupom.descricaoCupom)
    cy.contains('button', 'Cadastrar cupom').should('be.visible')

    cy.get('[data-cy="coupon-submit"]').click()
    cy.get('[data-cy="coupon-result"]', { timeout: 10000 }).should(
      'contain.text',
      `Cupom cadastrado: ${cupom.codigoCupom}`,
    )
  }

  validarCupom(cupom) {
    cy.contains('[data-cy="coupons-table-body"] tr', cupom.codigoCupom).within(() => {
      cy.contains('strong', cupom.codigoCupom).should('be.visible')
      cy.contains('td', 'R$ 5,00').should('be.visible')
      cy.contains('small', 'Min R$ 0,00 | Max R$ 30,00').scrollIntoView().should('be.visible')
      cy.contains('span', 'Ativo').should('be.visible')
    })
  }

  excluirCupomcadastrado(cupom) {
    cy.contains('[data-cy="coupons-table-body"] tr', cupom.codigoCupom).within(() => {
      cy.contains('button', 'Excluir').click()
    })
  }
}

export default new CuponsPage()
