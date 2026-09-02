class EntradaTecladoPage {
  acessarTelaEntradaTeclado() {
    cy.visit('/admin/teclado')
  }

  salvarCenarioComEnter(cenario) {
    cy.get('[data-field="keyboardName"]').type(`${cenario}{enter}`)
  }

  validarCenarioSalvo(cenario) {
    cy.get('[data-role="keyboardResult"]')
      .should('be.visible')
      .and('have.text', `Cenário salvo: ${cenario}`)
  }

  informarCenario(cenario) {
    cy.get('[data-field="keyboardName"]').type(cenario)
  }

  salvarCenarioPeloBotao() {
    cy.contains('button', 'Salvar cenário').click()
  }

  cadastrarCenariosPeloBotao(cenarios) {
    for (const cenario of cenarios) {
      cy.get('[data-field="keyboardName"]').type(cenario)
      cy.contains('button', 'Salvar cenário').click()
    }
  }

  removerDoisCenarios() {
    cy.get('[data-role="keyboardHistory"]').within(() => {
      cy.get('[data-keyboard-row="1"]').within(() => {
        cy.contains('button', 'Excluir').should('be.visible')
        cy.contains('button', 'Excluir').click()
      })

      cy.get('[data-keyboard-row="2"]').within(() => {
        cy.contains('button', 'Excluir').should('be.visible')
        cy.contains('button', 'Excluir').click()
      })
    })
  }

  tentarSalvarCenarioVazio() {
    cy.contains('button', 'Salvar cenário').click()
  }

  salvarCenarioParaAtualizarContador(cenario) {
    cy.get('[data-role="keyboardCount"]').should('have.text', '0')
    cy.get('[data-field="keyboardName"]').type(cenario)
    cy.contains('button', 'Salvar cenário').click()
  }

  validarContadorDeCenariosSalvos(quantidade) {
    cy.get('[data-role="keyboardCount"]').should('have.text', String(quantidade))
  }

  validarMensagemCenarioObrigatorio() {
    cy.contains('Informe o cenário').should('be.visible')
  }

  validarCenariosRemovidos() {
    cy.get('[data-role="keyboardHistory"]').within(() => {
      cy.get('[data-keyboard-row="1"]').should('not.exist')
      cy.get('[data-keyboard-row="2"]').should('not.exist')
      cy.get('[data-keyboard-row="3"]')
        .should('be.visible')
        .and('contain.text', '01 - Validar a senha do usuario')
    })
  }

  validarCenariosSalvosNaLista() {
    const dataAtual = new Date().toLocaleDateString('pt-BR')

    cy.get('[data-role="keyboardHistory"]').within(() => {
      cy.get('[data-keyboard-row="1"]').within(() => {
        cy.get('strong').should('have.text', '01 - Validar nome do usuario')
        cy.get('small').should('have.text', `Entrada salva em ${dataAtual}`)
      })

      cy.get('[data-keyboard-row="2"]').within(() => {
        cy.get('strong').should('have.text', '02 - Validar o email do usuario')
        cy.get('small').should('have.text', `Entrada salva em ${dataAtual}`)
      })

      cy.get('[data-keyboard-row="3"]').within(() => {
        cy.get('strong').should('have.text', '03 - Validar a senha do usuario')
        cy.get('small').should('have.text', `Entrada salva em ${dataAtual}`)
      })
    })
  }
}

export default new EntradaTecladoPage()
