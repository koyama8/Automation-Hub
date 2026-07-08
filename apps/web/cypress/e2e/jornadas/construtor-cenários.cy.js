import consultancyData from '../../fixtures/construtor-cenários.json'

describe('Construtor de cenarios', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/journeys/scenario-builder')
  })

  it('deve construir e visualizar um novo cenario', () => {
    const consultancyForm = consultancyData.personal

    cy.get('[data-field="scenarioName"]')
      .type(consultancyForm.name)
      .should('have.value', consultancyForm.name)

    cy.get('[data-field="scenarioModule"]').select('Checkout fictício')

    cy.get('[data-field="scenarioPriority"]').select('P0 - Crítico')

    cy.contains('.choice-group', 'Tipo de teste').within(() => {
      cy.contains('label', 'E2E').click()
    })

    cy.contains('.choice-group', 'Cobertura desejada').within(() => {
      consultancyForm.tipos.forEach((dados) => {
        cy.contains('label', dados)
          .find('input[type="checkbox"]')
          .check()
          .should('be.checked')
      })
    })

    cy.get('[data-field="scenarioPreconditions"]')
      .type(consultancyForm.conditions)
      .should('be.visible')

    cy.get('[data-field="scenarioStepInput"]')
      .type('Criação e validação do cenário automatizado{enter}')

    cy.contains('span', 'Criação e validação do cenário automatizado')
      .parent()
      .should('be.visible')

    cy.contains('.character-toggle', 'Cenário pronto para regressão?').click()

    cy.contains('.scenario-actions', 'Salvar cenário').click()

    cy.contains('.row-actions', 'Ver')
      .find('[data-scenario-action="view"]')
      .click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'Cenário')
        .find('strong')
        .should('have.text', 'Validar cartão invalido')

      cy.contains('[data-cy="modal-list"] li', 'Módulo')
        .find('strong')
        .should('have.text', 'Checkout fictício')

      cy.contains('[data-cy="modal-list"] li', 'Tipo')
        .find('strong')
        .should('have.text', 'E2E')

      cy.contains('[data-cy="modal-list"] li', 'Prioridade')
        .find('strong')
        .should('have.text', 'P0 - Crítico')

      cy.contains('[data-cy="modal-list"] li', 'Risco')
        .find('strong')
        .should('have.text', '3')

      cy.contains('[data-cy="modal-list"] li', 'Cobertura')
        .find('strong')
        .should('have.text', 'Cypress, Playwright, API mock, Banco local')

      cy.contains('[data-cy="modal-list"] li', 'Etapas')
        .find('strong')
        .should('have.text', '1')

      cy.contains('[data-cy="modal-list"] li', 'Etapas')
        .find('strong')
        .should('have.text', '1')

      cy.contains('[data-cy="modal-list"] li', 'Regressão')
        .find('strong')
        .should('have.text', 'Pronto')
    })
  })

  it('deve exibir mensagens para os campos obrigatorios', () => {
    cy.contains('.scenario-actions', 'Salvar cenário').click()

    cy.get('[data-error-for="scenarioName"]')
      .should('have.text', 'Informe o nome do cenário')

    cy.get('[data-error-for="scenarioStepInput"]')
      .should('have.text', 'Adicione pelo menos uma etapa do fluxo')
  })
})
