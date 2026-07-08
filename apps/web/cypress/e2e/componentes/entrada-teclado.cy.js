describe('Entrada de teclado', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/teclado')
  })

  it('deve salvar um cenário ao pressionar Enter', () => {
    cy.get('[data-field="keyboardName"]')
      .type('Validar senha do login{enter}')
  })

  it('deve salvar um cenário ao clicar no botão salvar', () => {
    cy.get('[data-field="keyboardName"]')
      .type('Validar nome do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()
  })

  it('deve exibir o cenário salvo na lista', () => {
    const dataAtual = new Date().toLocaleDateString('pt-BR')

    cy.get('[data-field="keyboardName"]')
      .type('Validar nome do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-field="keyboardName"]')
      .type('Validar o email do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-field="keyboardName"]')
      .type('Validar a senha do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-role="keyboardHistory"]').within(() => {
      cy.get('[data-keyboard-row="1"]').within(() => {
        cy.get('strong')
          .should('have.text', '01 - Validar nome do usuario')
        cy.get('small')
          .should('have.text', `Entrada salva em ${dataAtual}`)
      })

      cy.get('[data-keyboard-row="2"]').within(() => {
        cy.get('strong')
          .should('have.text', '02 - Validar o email do usuario')
        cy.get('small')
          .should('have.text', `Entrada salva em ${dataAtual}`)
      })

      cy.get('[data-keyboard-row="3"]').within(() => {
        cy.get('strong')
          .should('have.text', '03 - Validar a senha do usuario')
        cy.get('small')
          .should('have.text', `Entrada salva em ${dataAtual}`)
      })
    })
  })

  it('deve remover um cenário salvo da lista', () => {
    cy.get('[data-field="keyboardName"]')
      .type('Validar nome do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-field="keyboardName"]')
      .type('Validar o email do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-field="keyboardName"]')
      .type('Validar a senha do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-role="keyboardHistory"]').within(() => {
      cy.get('[data-keyboard-row="1"]').within(() => {
        cy.contains('button', 'Excluir')
          .should('be.visible')
        cy.contains('button', 'Excluir')
          .click()
      })

      cy.get('[data-keyboard-row="2"]').within(() => {
        cy.contains('button', 'Excluir')
          .should('be.visible')
        cy.contains('button', 'Excluir')
          .click()
      })
    })
  })

  it('deve exibir mensagem de validação ao tentar salvar cenário vazio', () => {
    cy.contains('button', 'Salvar cenário')
      .click()
    cy.contains('Informe o cenário')
      .should('be.visible')
  })

  it('deve atualizar o contador de cenários salvos', () => {
    cy.get('[data-role="keyboardHistory"]')
      .find('[data-role="keyboardCount"]')
      .should('have.length', 0)

    cy.get('[data-field="keyboardName"]')
      .type('Validar nome do usuario')
    cy.contains('button', 'Salvar cenário')
      .click()

    cy.get('[data-role="keyboardCount"]')
      .should('have.length', 1)
  })
})
