import { gerarClienteValido } from '../../factories/ClienteFactory'

class ContratosPage {
  prepararClienteParaContrato() {
    const massaCliente = gerarClienteValido()
    const cliente = {
      name: massaCliente.nome,
      email: massaCliente.email,
      document: massaCliente.documento,
      phone: massaCliente.telefone,
      company: massaCliente.empresa,
      status: 'active',
    }

    return cy
      .window()
      .then((win) => {
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
      })
      .then((response) => {
        expect(response.status).to.eq(201)

        const clienteCriado = response.body.data
        cy.visit('/admin/contratos')
        cy.get(`[data-cy="contract-client"] option[value="${clienteCriado.id}"]`, {
          timeout: 10000,
        }).should('exist')

        return cy.wrap(clienteCriado)
      })
  }

  cadastrarContrato(clienteId, titulo) {
    cy.get('[data-cy="contract-client"]').select(String(clienteId))
    cy.get('[data-cy="contract-title"]').type(titulo)
    cy.get('[data-cy="contract-plan"]').type('Pro mensal')
    cy.get('[data-cy="contract-amount-cents"]').type('2000')
    cy.get('[data-cy="contract-status"]').select('Ativo')
    cy.get('[data-cy="contract-notes"]').type('Contrato criado pela automacao web')
    cy.contains('button', 'Cadastrar contrato').click()
  }

  validarConfirmacaoCadastro(titulo) {
    cy.get('[data-cy="contract-result"]', { timeout: 10000 }).should(
      'contain.text',
      `Contrato cadastrado com sucesso: ${titulo}`,
    )
  }

  validarContratoNaTabela(cliente, titulo) {
    cy.contains('[data-cy="contracts-table-body"] tr', titulo, { timeout: 10000 }).within(() => {
      cy.contains('strong', cliente.name).should('be.visible')
      cy.contains('small', cliente.email).should('be.visible')
      cy.contains('strong', titulo).should('be.visible')
      cy.contains('td', 'R$ 20,00').should('be.visible')
      cy.get('.status-badge').should('contain.text', 'Ativo')
      cy.contains('button', 'Editar').should('be.visible')
      cy.contains('button', 'Cancelar').should('be.visible')
      cy.contains('button', 'Excluir').should('be.visible')
    })
  }
}

export default new ContratosPage()
