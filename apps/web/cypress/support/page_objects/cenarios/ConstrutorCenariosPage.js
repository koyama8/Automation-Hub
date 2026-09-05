class ConstrutorCenariosPage {
  acessar() {
    cy.visit('/journeys/scenario-builder')
  }

  construirCenario(cenario) {
    cy.get('[data-field="scenarioName"]').type(cenario.name).should('have.value', cenario.name)
    cy.get('[data-field="scenarioModule"]').select(cenario.module)
    cy.get('[data-field="scenarioPriority"]').select(cenario.priority)

    cy.contains('.choice-group', 'Tipo de teste').within(() => {
      cy.contains('label', cenario.type).click()
    })

    cy.contains('.choice-group', 'Cobertura desejada').within(() => {
      cenario.tipos.forEach((tipo) => {
        cy.contains('label', tipo).find('input[type="checkbox"]').check().should('be.checked')
      })
    })

    cy.get('[data-field="scenarioPreconditions"]')
      .type(cenario.conditions)
      .should('have.value', cenario.conditions)

    cy.get('[data-field="scenarioStepInput"]').type(`${cenario.step}{enter}`)
    cy.contains('span', cenario.step).parent().should('be.visible')

    cy.contains('.character-toggle', 'Cenário pronto para regressão?').click()
    cy.contains('.scenario-actions', 'Salvar cenário').click()
    cy.contains('.row-actions', 'Ver').find('[data-scenario-action="view"]').click()
  }

  validarCenario(cenario) {
    const dadosEsperados = {
      Cenário: cenario.name,
      Módulo: cenario.module,
      Tipo: cenario.type,
      Prioridade: cenario.priority,
      Risco: cenario.risk,
      Cobertura: cenario.tipos.join(', '),
      Etapas: '1',
      Regressão: 'Pronto',
    }

    cy.get('[data-cy="success-modal"]').within(() => {
      Object.entries(dadosEsperados).forEach(([rotulo, valor]) => {
        cy.contains('[data-cy="modal-list"] li', rotulo).find('strong').should('have.text', valor)
      })
    })
  }

  tentarSalvarSemDados() {
    cy.contains('.scenario-actions', 'Salvar cenário').click()
  }

  validarCamposObrigatorios() {
    cy.get('[data-error-for="scenarioName"]').should('have.text', 'Informe o nome do cenário')
    cy.get('[data-error-for="scenarioStepInput"]').should(
      'have.text',
      'Adicione pelo menos uma etapa do fluxo',
    )
  }
}

export default new ConstrutorCenariosPage()
