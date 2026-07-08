function gerarClienteContrato() {
  const sufixo = Date.now()

  return {
    name: `Cliente Contrato ${sufixo}`,
    email: `cliente.contrato.${sufixo}@gmail.com`,
    document: `719882${String(sufixo).slice(-5)}`,
    phone: '11999991000',
    company: 'QA Automation Lab',
    status: 'active',
  }
}

function criarClientePelaApi() {
  const cliente = gerarClienteContrato()

  return cy.window().then((win) => {
    const token = win.localStorage.getItem('token')

    expect(token).to.not.be.empty

    return cy.request({
      method: 'POST',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cliente,
    })
  }).then((response) => response.body.data)
}

describe('Contratos / Assinaturas', () => {
  let cliente

  beforeEach(() => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')

    cy.url().should('include', '/dashboard')

    criarClientePelaApi().then((clienteCriado) => {
      cliente = clienteCriado
      cy.visit('/admin/contratos')
      cy.get(`[data-cy="contract-client"] option[value="${cliente.id}"]`, { timeout: 10000 })
        .should('exist')
    })
  })

  it('deve cadastrar um contrato para um cliente existente', () => {
    const titulo = `Assinatura QA Pro ${Date.now()}`

    cy.get('[data-cy="contract-client"]').select(String(cliente.id))
    cy.get('[data-cy="contract-title"]').type(titulo)
    cy.get('[data-cy="contract-plan"]').type('Pro mensal')
    cy.get('[data-cy="contract-amount-cents"]').type('2000')
    cy.get('[data-cy="contract-status"]').select('Ativo')
    cy.get('[data-cy="contract-notes"]').type('Contrato criado pela automacao web')

    cy.contains('button', 'Cadastrar contrato').click()

    cy.get('[data-cy="contract-result"]', { timeout: 10000 })
      .should('contain.text', `Contrato cadastrado com sucesso: ${titulo}`)
  })

  it('deve validar os dados do contrato cadastrado', () => {
    const titulo = `Assinatura QA Validacao ${Date.now()}`

    cy.get('[data-cy="contract-client"]').select(String(cliente.id))
    cy.get('[data-cy="contract-title"]').type(titulo)
    cy.get('[data-cy="contract-plan"]').type('Pro mensal')
    cy.get('[data-cy="contract-amount-cents"]').type('2000')
    cy.get('[data-cy="contract-status"]').select('Ativo')
    cy.get('[data-cy="contract-notes"]').type('Contrato criado pela automacao web')

    cy.contains('button', 'Cadastrar contrato').click()

    cy.contains('[data-cy="contracts-table-body"] tr', titulo, { timeout: 10000 })
      .within(() => {
        cy.contains('strong', cliente.name).should('be.visible')
        cy.contains('small', cliente.email).should('be.visible')
        cy.contains('strong', titulo).should('be.visible')
        cy.contains('td', 'R$ 20,00').should('be.visible')
        cy.get('.status-badge').should('contain.text', 'Ativo')
        cy.contains('button', 'Editar').should('be.visible')
        cy.contains('button', 'Cancelar').should('be.visible')
        cy.contains('button', 'Excluir').should('be.visible')
      })
  })
})
