import consultancyData from '../fixtures/preferencias.json'

describe('Preferencias', () => {

  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/preferencias')
  })

  it('deve cadastrar uma preferencias', () => {
    cy.get('[data-field="browserSelect"]')
      .should('be.visible')
    cy.get('[data-field="browserSelect"]')
      .select('Edge')
    
    cy.get('[data-field="settingsEnvironment"]')
      .should('be.visible')
    cy.get('[data-field="settingsEnvironment"]')
      .select('Producao controlada')

    cy.get('[data-field="executionMode"]')
      .select('Pipeline CI')
    cy.get('[data-field="viewportSelect"]')
      .select('Notebook 1366x768')
    
    cy.contains('label',' Selenium')
      .find('input[type="radio"]')
      .check()
      .should('be.checked')
    
    cy.get('[data-field="timeoutSeconds"]')
      .select('20 segundos')
    
    cy.contains('label','Tentativas por falha')
      .parent()
      .find('input[type="number"]')
      .clear()
      .type('5')
      .should('have.value','5')      

    cy.get('[data-field="timeoutSeconds"]')
      .select('20 segundos')
    
    cy.get('[data-field="reporterSelect"]')
      .select('Allure')
    
    cy.get('[data-field="dataStrategy"]')
      .select('Banco de homologacao')
       
    const evidencias = consultancyData.evidencias
 
   evidencias.forEach((dados) => {
    cy.contains('label', dados)
      .find('input[type="checkbox"]')
      .click()
   })


  })
})