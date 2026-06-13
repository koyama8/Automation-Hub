import consultancyData from '../fixtures/consultancy.json'

describe('Formularios', () => {
  it('deve preencher o formulario completo de consultoria', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('admin/formulario')

    const consultancyForm = consultancyData.personal

    cy.get('#contact-name')
      .type(consultancyForm.name)
      .should('have.value', consultancyForm.name)

    cy.get('#contact-email')
      .type(consultancyForm.email)
      .should('have.value', consultancyForm.email)

    cy.get('#contact-phone')
      .type(consultancyForm.phone)
      .should('have.value', '(11) 99999-1000')

    cy.get('#contact-company').type(consultancyForm.company)

    cy.get('#contact-document')
      .type(consultancyForm.cpf)
      .should('have.value', '123.456.789-10')

    cy.get('[data-field="contactDate"]')
      .should('be.visible')
      .type(consultancyForm.data)
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

    cy.get('[data-field="contactApiPath"]')
      .should('be.visible')
      .type('/api/user/consuty')

    cy.contains('fieldset.choice-group', 'Prioridade').within(() => {
      cy.contains('label', 'Media').click()
    })

    consultancyForm.tipos.forEach((dados) => {
      cy.contains('label', dados)
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
    })

    const mensagem = 'Solicito a validação deste cenário de teste, considerando os canais selecionados e as tecnologias utilizadas no fluxo de automação.'

    cy.get('[data-field="contactMessage"]')
      .type(mensagem)
      .should('have.value', mensagem)

    cy.get('[data-field="technologyInput"]').type('Cypress{enter}')

    cy.contains('span', 'Cypress')
      .parent()
      .should('have.attr', 'data-role', 'technologyTags')

    cy.contains('label', 'Li e aceito os termos de uso').click()

    cy.contains('button', 'Enviar formulário').click()

    cy.get('[data-cy="success-modal"]')
      .should('be.visible')
      .find('[data-cy="success-message"]')
      .and('contain.text', 'Formulário enviado com sucesso. Fluxo pronto para validar modal, campos e mensagem.')
  })

  it('deve verificar os campos obrigatorios', () =>{
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('admin/formulario')
    cy.contains('button', 'Enviar formulário').click()
    
    const mensagensObrigatorias = [
     "Nome é obrigatório",
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
     'Voce precisa aceitar os termos'
    ]

    mensagensObrigatorias.forEach((msg) => {
      cy.contains(msg).should('be.visible')
    })
  })
})
