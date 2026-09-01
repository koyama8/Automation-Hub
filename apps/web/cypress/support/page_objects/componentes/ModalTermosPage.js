class ModalTermosPage {
  acessarTelaTermos() {
    cy.visit('/admin/termos')
  }

  concluirAceiteTermos() {
    cy.contains('button', 'Ler e aceitar termos').should('be.visible')

    cy.contains('button', 'Ler e aceitar termos').click()

    cy.contains('Deseja iniciar o aceite?').should('be.visible')

    cy.contains('button', 'Sim, continuar').click()

    cy.get('.modal-check-line').find('input[type="checkbox"]').click()

    cy.contains('button', 'Finalizar aceite').click()
  }

  validarConfirmacaoTermosAceitos() {
    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('Sucesso!').should('be.visible')

      cy.contains('Termos aceitos com sucesso.').should('be.visible')
    })
  }
  tentarFinalizarAceiteSemMarcarTermos() {
    cy.contains('button', 'Ler e aceitar termos').should('be.visible')

    cy.contains('button', 'Ler e aceitar termos').click()

    cy.contains('Deseja iniciar o aceite?').should('be.visible')

    cy.contains('button', 'Sim, continuar').click()

    cy.contains('button', 'Finalizar aceite').click()
  }

  validarMensagemAceiteObrigatorio() {
    cy.contains('p', 'Marque o aceite para finalizar').should('be.visible')
  }
}

export default new ModalTermosPage()
