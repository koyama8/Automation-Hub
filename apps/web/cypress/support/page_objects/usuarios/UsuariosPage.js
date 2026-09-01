import { obterCredenciaisAdministrador } from '../../data/Credenciais'

class UsuariosPage {
  acessarUsuarios() {
    cy.visit('/admin/usuarios')
  }

  validarTabelaUsuariosVisivel() {
    cy.get('[data-cy="users-table"]', { timeout: 10000 }).should('be.visible')
  }

  validarUsuarioAdministrador() {
    const { email } = obterCredenciaisAdministrador()

    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('td', /QA Admin( Lab)?/).should('be.visible')
      cy.contains('td', email).should('be.visible')
      cy.contains('td', 'Ativo').should('be.visible')
    })
  }
}

export default new UsuariosPage()
