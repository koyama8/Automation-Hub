describe('Cadastro do personagem', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/personagens')
  })

  it('deve cadastrar um personagem', () => {
    cy.get('[data-cy="character-name"]')
      .type('Goku')

    cy.get('[data-cy="character-story"]')
      .type('Goku, um guerreiro Saiyajin criado na Terra, treinou sem parar, protegeu seus amigos e enfrentou inimigos poderosos, sempre superando seus limites com coragem e determinação.')

    cy.get('[data-cy="character-universe"]')
      .select('Dragon Ball')

    cy.get('[data-cy="character-year"]')
      .select('1984')

    cy.get('[data-cy="character-image"]')
      .selectFile('cypress/fixtures/historia_goku.pdf')

    cy.contains('label', 'Personagem destaque?')
      .click()

    cy.get('[data-cy="character-featured"]')
      .should('be.checked')

    cy.get('[data-cy="character-submit"]')
      .click()
    cy.contains('Personagem cadastrado com sucesso. Massa pronta para validar cadastro de personagens.')
      .should('be.visible')
  })

  it('deve exibir validações ao tentar cadastrar sem preencher os dados', () => {
    cy.get('[data-cy="character-submit"]')
      .click()

    cy.contains('Por favor, informe o nome do personagem.')
      .should('be.visible')

    cy.contains('Por favor, informe a história do personagem.')
      .should('be.visible')

    cy.contains('Por favor, selecione o universo ou franquia.')
      .should('be.visible')

    cy.contains('Por favor, selecione o ano de estreia.')
      .should('be.visible')
  })
})
