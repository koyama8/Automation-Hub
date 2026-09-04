class FormulariosPage {
  cadastrarFormulario(form) {
    cy.visit('admin/formulario')

    cy.get('#contact-name').type(form.name).should('have.value', form.name)

    cy.get('#contact-email').type(form.email).should('have.value', form.email)

    cy.get('#contact-phone').type(form.phone).should('have.value', '(11) 99999-1000')

    cy.get('#contact-company').type(form.company)

    cy.get('#contact-document').type(form.cpf).should('have.value', '123.456.789-10')

    cy.get('[data-field="contactDate"]')
      .should('be.visible')
      .type(form.data)
      .should('have.value', '2026-05-12')

    cy.get('[data-cy="contact-subject"]')
      .should('be.visible')
      .select('Cypress Web')
      .should('have.value', 'Cypress Web')

    cy.get('[data-field="contactLevel"]')
      .should('be.visible')
      .select('Regressão')
      .should('have.value', 'regressao')

    cy.get('[data-field="contactBrowser"]')
      .should('be.visible')
      .select('Chrome')
      .should('have.value', 'chrome')

    cy.get('[data-field="contactExecution"]')
      .should('be.visible')
      .select('Pipeline')
      .should('have.value', 'pipeline')

    cy.get('[data-field="contactEnvironment"]')
      .should('be.visible')
      .select('Local')
      .should('have.value', 'local')

    cy.get('[data-field="contactApiPath"]').should('be.visible').type('/api/user/consuty')

    cy.contains('fieldset.choice-group', 'Prioridade').within(() => {
      cy.contains('label', 'Media').click()
    })

    form.tipos.forEach((dados) => {
      cy.contains('label', dados).find('input[type="checkbox"]').check().should('be.checked')
    })

    const mensagem =
      'Solicito a validação deste cenário de teste, considerando os canais selecionados e as tecnologias utilizadas no fluxo de automação.'

    cy.get('[data-field="contactMessage"]').type(mensagem).should('have.value', mensagem)

    cy.get('[data-field="technologyInput"]').type('Cypress{enter}')

    cy.contains('span', 'Cypress').parent().should('have.attr', 'data-role', 'technologyTags')

    cy.contains('label', 'Li e aceito os termos de uso').click()
  }

  acessarformularioSemPreenchercampos() {
    cy.visit('admin/formulario')
  }

  enviarformularioSemPreenchercampos() {
    cy.contains('button', 'Enviar formulário').click()
  }

  enviarformulario() {
    cy.contains('button', 'Enviar formulário').click()
  }

  acessarTelaPreferencias() {
    cy.visit('/admin/preferencias')

    cy.get('[data-field="browserSelect"]').should('be.visible')
    cy.get('[data-field="browserSelect"]').select('Edge')

    cy.get('[data-field="settingsEnvironment"]').should('be.visible')
    cy.get('[data-field="settingsEnvironment"]').select('Producao controlada')

    cy.get('[data-field="executionMode"]').select('Pipeline CI')
    cy.get('[data-field="viewportSelect"]').select('Notebook 1366x768')
  }

  selecionarEvidencias(evidencias) {
    cy.contains('label', ' Selenium').find('input[type="radio"]').check().should('be.checked')

    cy.get('[data-field="timeoutSeconds"]').select('20 segundos')

    cy.contains('label', 'Tentativas por falha')
      .parent()
      .find('input[type="number"]')
      .clear()
      .type('5')
      .should('have.value', '5')

    cy.get('[data-field="timeoutSeconds"]').select('20 segundos')

    cy.get('[data-field="reporterSelect"]').select('Allure')

    cy.get('[data-field="dataStrategy"]').select('Banco de homologacao')

    evidencias.forEach((evidencia) => {
      cy.contains('label', evidencia).find('input[type="checkbox"]').check()
    })
  }

  validarEvidenciasSelecionadas(evidencias) {
    evidencias.forEach((evidencia) => {
      cy.contains('label', evidencia).find('input[type="checkbox"]').should('be.checked')
    })
  }
  visualizarFormulario() {
    cy.get('[data-cy="success-modal"]')
      .should('be.visible')
      .find('[data-cy="success-message"]')
      .and(
        'contain.text',
        'Formulário enviado com sucesso. Fluxo pronto para validar modal, campos e mensagem.',
      )
  }

  visualizarMensagensObrigatorias() {
    const mensagensObrigatorias = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Telefone é obrigatório',
      'Empresa ou time é obrigatório',
      'Documento é obrigatório',
      'Data desejada é obrigatória',
      'Tipo de automação é obrigatório',
      'Nível do cenário é obrigatório',
      'Navegador alvo é obrigatório',
      'Modo de execução é obrigatório',
      'Ambiente é obrigatório',
      'Selecione uma prioridade',
      'Selecione pelo menos um canal de validação',
      'Mensagem é obrigatória',
      'Voce precisa aceitar os termos',
    ]

    mensagensObrigatorias.forEach((msg) => {
      cy.contains(msg).should('be.visible')
    })
  }
}

export default new FormulariosPage()
