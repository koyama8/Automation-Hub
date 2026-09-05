class PersonagensPage {
  acessarCadastro() {
    cy.visit('/admin/personagens')
  }

  cadastrarPersonagem(personagem) {
    cy.get('[data-cy="character-name"]').type(personagem.nome)
    cy.get('[data-cy="character-story"]').type(personagem.historia)
    cy.get('[data-cy="character-universe"]').select(personagem.universo)
    cy.get('[data-cy="character-year"]').select(personagem.ano)
    cy.get('[data-cy="character-image"]').selectFile(personagem.arquivo)

    if (personagem.destaque) {
      cy.contains('label', 'Personagem destaque?').click()
      cy.get('[data-cy="character-featured"]').should('be.checked')
    }

    cy.get('[data-cy="character-submit"]').click()
  }

  validarConfirmacaoCadastro() {
    cy.contains(
      'Personagem cadastrado com sucesso. Massa pronta para validar cadastro de personagens.',
    ).should('be.visible')
  }

  tentarCadastrarSemDados() {
    cy.get('[data-cy="character-submit"]').click()
  }

  validarCamposObrigatorios() {
    const mensagens = [
      'Por favor, informe o nome do personagem.',
      'Por favor, informe a história do personagem.',
      'Por favor, selecione o universo ou franquia.',
      'Por favor, selecione o ano de estreia.',
    ]

    mensagens.forEach((mensagem) => {
      cy.contains(mensagem).should('be.visible')
    })
  }

  acessarGerenciamento() {
    cy.visit('/journeys/character-management')
  }

  validarPersonagensListados(personagens) {
    personagens.forEach((personagem) => {
      cy.contains('[data-testid="character-row"]', personagem.nome).within(() => {
        cy.contains('td', personagem.nome).should('be.visible')
        cy.contains('td', personagem.universo).should('be.visible')
        cy.contains('td', personagem.ano).should('be.visible')
        cy.contains('[data-testid="character-featured-badge"]', personagem.destaque).should(
          'be.visible',
        )
      })
    })
  }

  visualizarEditarEExcluir(personagem, edicao) {
    cy.contains('[data-testid="character-row"]', personagem.nome).within(() => {
      cy.contains('button', 'Ver').should('be.visible').click()
    })

    cy.get('[data-cy="modal-overlay"]').within(() => {
      cy.get('[data-cy="modal-title"]').should('have.text', 'Detalhes do personagem')
      cy.get('[data-cy="success-message"]').should(
        'contain.text',
        `${personagem.nome} pertence ao universo ${personagem.universo} e estreou em ${personagem.ano}.`,
      )
      cy.contains('button', 'Fechar').click()
    })

    cy.contains('[data-testid="character-row"]', personagem.nome).within(() => {
      cy.contains('button', 'Editar').should('be.visible').click()
    })

    cy.get('[data-form="editCharacter"]').within(() => {
      cy.get('[data-field="editCharacterName"]').clear().type(edicao.nome)
      cy.get('[data-field="editCharacterStory"]').clear().type(edicao.historia)
      cy.get('[data-field="editCharacterYear"]').clear().type(edicao.ano)
      cy.contains('button', 'Salvar edição').click()
    })

    cy.contains('[data-testid="character-row"]', edicao.nome).within(() => {
      cy.contains('td', edicao.nome).should('be.visible')
      cy.contains('td', personagem.universo).should('be.visible')
      cy.contains('td', edicao.ano).should('be.visible')
      cy.contains('button', 'Excluir').click()
    })

    cy.get('[data-testid="delete-modal"]').within(() => {
      cy.get('[data-testid="delete-modal-title"]').should('have.text', 'Confirmar exclusão')
      cy.get('[data-testid="delete-modal-description"]').should(
        'contain.text',
        `Deseja realmente excluir o personagem ${edicao.nome}?`,
      )
      cy.contains('button', 'Confirmar exclusão').click()
    })
  }

  validarConfirmacaoExclusao(nome) {
    cy.contains(`Personagem excluído com sucesso: ${nome}`).should('be.visible')
  }

  filtrarPorUniverso(universo) {
    cy.get('[data-testid="filter-universe"]').select(universo)
  }

  validarFiltroPorUniverso(personagens) {
    personagens.forEach((nome) => {
      cy.contains('[data-testid="character-row"]', nome).should('be.visible')
    })
  }

  buscarPorNome(nome) {
    cy.get('.management-filter-grid').find('input[type="text"]').type(`${nome}{enter}`)
  }

  validarPersonagemEncontrado(personagem) {
    cy.contains('[data-testid="character-row"]', personagem.nome).within(() => {
      cy.contains('td', personagem.nome).should('be.visible')
      cy.contains('td', personagem.universo).should('be.visible')
      cy.contains('td', personagem.ano).should('be.visible')
      cy.get('[data-testid="character-featured-badge"]').should('have.text', personagem.destaque)
    })
  }
}

export default new PersonagensPage()
