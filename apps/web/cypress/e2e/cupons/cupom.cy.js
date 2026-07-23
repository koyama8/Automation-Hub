
import consultancyData from '../../fixtures/cupom.json'

describe('Cupons - Cadastro e exclusão de cupom', () => {
  it('deve cadastrar, validar e excluir um cupom com sucesso', () => {
    const consultancyCupom = consultancyData.cdcupom

    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')
    cy.visit('/admin/cupons')

    cy.get('[data-cy="coupon-code"]').should('be.visible')
    cy.get('[data-cy="coupon-code"]').type(consultancyCupom.codigoCupom)

    cy.get('[data-cy="coupon-type"]').select(consultancyCupom.tipoCupom)

    cy.get('#couponValue').type(consultancyCupom.valorCupom)

    cy.get('#couponMaxDiscountCents').type(consultancyCupom.descontoMaximo)

    cy.get('[data-cy="coupon-description"]').type(
      consultancyCupom.descricaoCupom,
    )
    cy.contains('button', 'Cadastrar cupom').should('be.visible')

    cy.get('[data-cy="coupon-submit"]').click()

    cy.get('[data-cy="coupons-table-body"]').within(() => {
      cy.contains('tr', '1').within(() => {
        cy.contains('strong', 'QA-CUPOM-FIXO-001').should('be.visible')
        cy.contains('td', 'R$ 5,00').should('be.visible')
        cy.contains('small', 'Min R$ 0,00 | Max R$ 30,00')
          .scrollIntoView()
          .should('be.visible')
        cy.contains('span', 'Ativo').should('be.visible')

        cy.contains(
          '[data-cy="coupons-table-body"] tr',
          consultancyCupom.codigoCupom,
        ).within(() => {
          cy.contains('button', 'Excluir').click()
        })
      })
    })
  })
})
