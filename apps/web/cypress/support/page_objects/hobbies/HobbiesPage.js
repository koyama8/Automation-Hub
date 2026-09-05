class HobbiesPage {
  acessarCadastro() {
    cy.visit('/journeys/hobby-registration')
  }

  cadastrarHobby(hobby) {
    cy.get('#hobbyTitle').type(hobby.titulo)
    cy.get('.hobby-description-field').type(hobby.descricao)
    cy.get('#hobbyType').select(hobby.tipo)

    cy.get('.frequency-field').within(() => {
      cy.get('[name="practice-frequency"]').select(hobby.frequencia)
    })

    cy.get('.season-field').within(() => {
      cy.get('[name="practice-season"]').select(hobby.temporada)
    })

    cy.get('.hobby-hours-field').within(() => {
      cy.get('[name="weekly-hours"]').clear().type(hobby.horasSemanais)
    })

    if (hobby.destaqueSemanal) {
      cy.contains('.character-toggle', 'Hobby principal da semana?').click()
    }

    cy.contains('.hobby-actions', 'Cadastrar').click()
  }

  validarCadastro(hobby) {
    const dadosEsperados = {
      Tipo: hobby.tipo,
      Frequência: hobby.frequencia,
      Temporada: hobby.temporada,
      'Horas semanais': `${hobby.horasSemanais}h`,
      Arquivo: 'Sem arquivo',
      'Destaque semanal': hobby.destaqueSemanal ? 'Sim' : 'Não',
    }

    cy.get('[data-cy="modal-overlay"]').within(() => {
      Object.entries(dadosEsperados).forEach(([rotulo, valor]) => {
        cy.contains('[data-cy="modal-list"] li', rotulo).find('strong').should('have.text', valor)
      })

      cy.contains('button', 'Ok').click()
    })

    cy.contains(`Hobby cadastrado: ${hobby.titulo} (${hobby.tipo})`).should('be.visible')
  }

  tentarCadastrarSemDados() {
    cy.contains('.hobby-actions', 'Cadastrar').click()
  }

  validarCamposObrigatorios() {
    cy.get('[data-error-for="hobbyTitle"]').should('be.visible')
    cy.contains('Descreva como o hobby funciona').should('be.visible')
    cy.contains('Selecione o tipo de hobby').should('be.visible')
    cy.contains('Selecione a frequência').should('be.visible')
  }
}

export default new HobbiesPage()
