class ClientesPage {
  acessarClientes() {
    cy.visit('/admin/clientes')
  }

  cadastrarCliente(cliente) {
    cy.get('[data-cy="client-name"]').type(cliente.nome)
    cy.get('[data-cy="client-email"]').type(cliente.email)
    cy.get('[data-cy="client-document"]').type(cliente.documento)
    cy.get('[data-cy="client-phone"]').type(cliente.telefone)
    cy.get('[data-cy="client-company"]').type(cliente.empresa)
    cy.get('[data-cy="client-status"]').select('Ativo')
    cy.contains('button', 'Cadastrar cliente').click()
  }

  validarConfirmacaoCadastro(nomeCliente) {
    cy.get('[data-cy="client-result"]', { timeout: 10000 }).should(
      'contain.text',
      `Cliente cadastrado com sucesso: ${nomeCliente}`,
    )
  }

  validarDadosCliente(cliente) {
    cy.contains('[data-cy="clients-table-body"] tr', cliente.nome, {
      timeout: 10000,
    }).within(() => {
      cy.get('strong').should('have.text', cliente.nome)
      cy.contains('small', cliente.email).should('be.visible')
      cy.contains('small', cliente.empresa).should('be.visible')
      cy.get('.status-badge').should('contain.text', 'Ativo')
    })
  }

  solicitarInativacao(nomeCliente) {
    cy.contains('[data-cy="clients-table-body"] tr', nomeCliente, {
      timeout: 10000,
    }).within(() => {
      cy.contains('button', 'Inativar').click()
    })
  }

  validarConfirmacaoInativacao(nomeCliente) {
    cy.get('[data-cy="toast"]')
      .should('be.visible')
      .and('contain.text', 'Cliente inativado com sucesso')

    cy.contains('[data-cy="clients-table-body"] tr', nomeCliente, {
      timeout: 10000,
    })
      .find('.status-badge')
      .should('contain.text', 'Inativo')
  }
}

export default new ClientesPage()
