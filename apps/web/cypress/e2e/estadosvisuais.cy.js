import cenarios from '../fixtures/cenarios.json'

describe('Estados visuais', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/estados-visuais')
  })

  cenarios.forEach(({ botao, mensagem, toastErro }) => {
    it(`deve validar o estado visual de ${botao.toLowerCase()}`, () => {
    
      cy.contains('button.status-btn', botao)
        .click()

      cy.get('[data-role="visualStatus"]')
        .should('be.visible')
        .and('have.text', mensagem)
      
      if(toastErro){
        cy.get('[data-cy="toast"]').should('have.class', 'error-toast')
      }else{
        cy.get('[data-cy="toast"]').should('not.have.class', 'error-toast')

      }
    })
  })
})
