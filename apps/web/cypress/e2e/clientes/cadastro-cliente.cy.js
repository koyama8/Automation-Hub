function gerarCliente() {
  const sufixo = Date.now()

  return {
    nome: `Cliente Web ${sufixo}`,
    email: `cliente.web.${sufixo}@gmail.com`,
    documento: `529982${String(sufixo).slice(-5)}`,
    telefone: '11999991000',
    empresa: 'QA Automation Lab',
  }
}

function cadastrarCliente(cliente) {
  cy.get('[data-cy="client-name"]').type(cliente.nome)
  cy.get('[data-cy="client-email"]').type(cliente.email)
  cy.get('[data-cy="client-document"]').type(cliente.documento)
  cy.get('[data-cy="client-phone"]').type(cliente.telefone)
  cy.get('[data-cy="client-company"]').type(cliente.empresa)
  cy.get('[data-cy="client-status"]').select('Ativo')
  cy.contains('button', 'Cadastrar cliente').click()

  cy.get('[data-cy="client-result"]', { timeout: 10000 })
    .should('contain.text', `Cliente cadastrado com sucesso: ${cliente.nome}`)
}

describe('Cadastro de clientes', () => {
  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    cy.visit('/admin/clientes')
  })

  it('deve cadastrar um cliente com sucesso', () => {
    const cliente = gerarCliente()

    cadastrarCliente(cliente)
  })

  it('deve validar os dados do cliente cadastrado', () => {
    const cliente = gerarCliente()

    cadastrarCliente(cliente)

    cy.contains('[data-cy="clients-table-body"] tr', cliente.nome, { timeout: 10000 })
      .within(() => {
        cy.get('strong').should('have.text', cliente.nome)
        cy.contains('small', cliente.email).should('be.visible')
        cy.contains('small', cliente.empresa).should('be.visible')
        cy.get('.status-badge').should('contain.text', 'Ativo')
        cy.contains('button', 'Inativar').click()
      })

    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('contain.text', 'Cliente inativado com sucesso')
  })
})
