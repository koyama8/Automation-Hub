describe('Listar personagens', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/journeys/character-management')
  })

  it('deve validar dados dos personagens listados', () => {
    cy.contains('[data-testid="character-row"]', 'Mulher-Maravilha').within(() => {
      cy.contains('td', 'Mulher-Maravilha')
      cy.contains('td', 'Liga da Justica')
      cy.contains('td', '1941')
      cy.contains('[data-testid="character-featured-badge"]', 'Destaque')
    })

    cy.contains('[data-testid="character-row"]', 'Flash').within(() => {
      cy.contains('td', 'Flash')
      cy.contains('td', 'Liga da Justica')
      cy.contains('td', '1940')
      cy.contains('[data-testid="character-featured-badge"]', 'Padrao')
    })

    cy.contains('[data-testid="character-row"]', 'Naruto Uzumaki').within(() => {
      cy.contains('td', 'Naruto Uzumaki')
      cy.contains('td', 'Naruto')
      cy.contains('1999')
      cy.contains('[data-testid="character-featured-badge"]', 'Destaque')
    })
  })

  it('deve validar ações de visualizar, editar e excluir personagem', () => {
    cy.contains('[data-testid="character-row"]', 'Mulher-Maravilha').within(() => {
      cy.contains('td', 'M')
      cy.contains('td', 'Mulher-Maravilha')
      cy.contains('td', 'Liga da Justica')
      cy.contains('td', '1941')

      cy.contains('button', 'Ver')
        .should('be.visible')
      cy.contains('button', 'Editar')
        .should('be.visible')
      cy.contains('button', 'Excluir')
        .should('be.visible')

      cy.contains('button', 'Ver')
        .click()
    })

    cy.get('[data-cy="modal-overlay"]').within(() => {
      cy.get('[data-cy="modal-title"]')
        .should('have.text', 'Detalhes do personagem')

      cy.get('[data-cy="success-message"]')
        .should('contain.text', 'Mulher-Maravilha pertence ao universo Liga da Justica e estreou em 1941.')

      cy.contains('button', 'Fechar')
        .click()
    })

    cy.contains('[data-testid="character-row"]', 'Mulher-Maravilha').within(() => {
      cy.contains('button', 'Editar')
        .click()
    })

    cy.get('[data-form="editCharacter"]').within(() => {
      cy.get('[data-field="editCharacterName"]')
        .clear()
        .type('Super Man')

      cy.get('[data-field="editCharacterStory"]')
        .clear()
        .type('Superman é um herói vindo do planeta Krypton. Criado na Terra como Clark Kent, usa seus poderes para proteger a humanidade e lutar pela justiça.')

      cy.get('[data-field="editCharacterYear"]')
        .clear()
        .type('1938')

      cy.contains('button', 'Salvar edição')
        .click()
    })

    cy.contains('[data-testid="character-row"]', 'Super Man').within(() => {
      cy.contains('td', 'Super Man')
        .should('be.visible')
      cy.contains('td', 'Liga da Justica')
        .should('be.visible')
      cy.contains('td', '1938')
    })

    cy.contains('[data-testid="character-row"]', 'Super Man').within(() => {
      cy.contains('button', 'Excluir')
        .click()
    })

    cy.get('[data-testid="delete-modal"]').within(() => {
      cy.get('[data-testid="delete-modal-title"]')
        .should('have.text', 'Confirmar exclusão')
      cy.get('[data-testid="delete-modal-description"]')
        .should('contain.text', 'Deseja realmente excluir o personagem Super Man?')
      cy.contains('button', 'Confirmar exclusão')
        .click()
    })

    cy.contains('Personagem excluído com sucesso: Super Man')
      .should('be.visible')
  })

  it('deve filtrar personagens por universo', () => {
    cy.get('[data-testid="filter-universe"]')
      .select('Dragon Ball')

    cy.contains('[data-testid="character-row"]', 'Goku')
      .should('be.visible')

    cy.contains('[data-testid="character-row"]', 'Vegeta')
      .should('be.visible')

    cy.contains('[data-testid="character-row"]', 'Gohan')
      .should('be.visible')
  })

  it('deve buscar personagem pelo nome', () => {
    cy.get('.management-filter-grid')
      .find('input[type="text"]')
      .type('Naruto{enter}')

    cy.contains('[data-testid="character-row"]', 'NU').within(() => {
      cy.contains('td', 'Naruto Uzumaki')
      cy.contains('td', 'Naruto')
      cy.contains('td', '1999')
      cy.get('[data-testid="character-featured-badge"]')
        .should('have.text', 'Destaque')
    })
  })
})
