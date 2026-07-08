describe('Cadastro de hobbies', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/journeys/hobby-registration')
  })

  it('deve cadastrar um hobby com sucesso', () => {
    cy.get('#hobbyTitle').type('Futebol')

    cy.get('.hobby-description-field').type(
      'Futebol aos domingos com os amigos',
    )

    cy.get('#hobbyType').select('Futebol')

    cy.get('.frequency-field').within(() => {
      cy.get('[name="practice-frequency"]').select('Mensal')
    })

    cy.get('.season-field').within(() => {
      cy.get('[name="practice-season"]')
        .select('Verão')
    })

    cy.get('.hobby-hours-field').within(() => {
      cy.get('[name="weekly-hours"]')
        .clear()
        .type('4')
    })

    cy.contains('.character-toggle', 'Hobby principal da semana?').click()

    cy.contains('.hobby-actions', 'Cadastrar').click()

    cy.get('[data-cy="modal-overlay"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'Tipo')
        .find('strong')
        .should('have.text', 'Futebol')

      cy.contains('[data-cy="modal-list"] li', 'Frequência')
        .find('strong')
        .should('have.text', 'Mensal')

      cy.contains('[data-cy="modal-list"] li', 'Frequência')
        .find('strong')
        .should('have.text', 'Mensal')

      cy.contains('[data-cy="modal-list"] li', 'Temporada')
        .find('strong')
        .should('have.text', 'Verão')

      cy.contains('[data-cy="modal-list"] li', 'Horas semanais')
        .find('strong')
        .should('have.text', '4h')

      cy.contains('[data-cy="modal-list"] li', 'Arquivo')
        .find('strong')
        .should('have.text', 'Sem arquivo')

      cy.contains('[data-cy="modal-list"] li', 'Destaque semanal')
        .find('strong')
        .should('have.text', 'Sim')

      cy.contains('button', 'Ok').click()
    })

    cy.contains('Hobby cadastrado: Futebol (Futebol)')
      .should('be.visible')
  })

  it('deve exibir validacoes ao cadastrar um hobby sem preencher os campos', () => {
    cy.contains('.hobby-actions', 'Cadastrar').click()

    cy.get('[data-error-for="hobbyTitle"]')
      .should('be.visible')

    cy.contains('Descreva como o hobby funciona')
      .should('be.visible')

    cy.contains('Selecione o tipo de hobby')
      .should('be.visible')

    cy.contains('Selecione a frequência')
      .should('be.visible')
  })
})
