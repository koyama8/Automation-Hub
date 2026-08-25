class TabelaDinamicaPage {
  acessarTabelaDinamica() {
    cy.visit('/admin/tabela-dinamica')
  }

  validarTabelaDinamica() {
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
  }

  adicionarNovaLinha() {
    cy.get('[data-cy="table-name"]').type('Qa Lab')
    cy.get('[data-cy="table-add"]').click()
  }

  validarDadosTabela() {
    cy.contains('[data-role="dynamicTable"] tr', 'Qa Lab').within(() => {
      cy.contains('td', 'Qa Lab').should('be.visible')
      cy.contains('td', 'Planejado').should('be.visible')
    })
  }

  filtrarDadosTabela() {
    cy.get('[data-cy="table-filter"]')
      .select('Automatizado')
      .should('have.value', 'Automatizado')
  }

  validarFiltroTabela() {
    cy.get('[data-role="dynamicTable"] tr')
      .should('have.length.greaterThan', 0)
      .each(($linha) => {
        cy.wrap($linha).find('td').eq(2).should('have.text', 'Automatizado')
      })
  }

  removerLinha() {
    cy.get('[data-delete-row="1"]').click()
  }

  validarConfirmacaoRemocao() {
    cy.contains('[data-cy="toast"]', 'Linha removida').should('be.visible')
  }

  validarLinhaRemovidaTabela() {
    cy.get('[data-role="dynamicTable"]')
      .contains('tr', 'Login com sucesso')
      .should('not.exist')
  }
}

export default new TabelaDinamicaPage()
