import { obterCredenciaisAdministrador } from '../../data/Credenciais'

class LoginPage {
  acessarTelaLogin() {
    cy.visit('/admin/login')
  }

  validarElementosTelaLogin() {
    cy.contains('Acesse sua conta').should('be.visible')
    cy.get('#login-email').should('be.visible')
    cy.get('#login-password').should('be.visible')
    cy.contains('button', 'Entrar').should('be.visible')
    cy.contains('button', 'Esqueci minha senha').should('be.visible')
    cy.contains('button', 'Criar nova conta').should('be.visible')
  }

  submeterLogin(email, senha) {
    cy.get('#login-email').type(email)
    cy.get('#login-password').type(senha)
    cy.contains('button', 'Entrar').click()
  }

  validarRedirecionamentoDashboard() {
    cy.url().should('include', '/dashboard')
  }

  validarMensagemEmailInvalido() {
    cy.contains('Informe um e-mail valido de provedor conhecido').should('be.visible')
  }

  validarMensagemCredenciaisInvalidas() {
    cy.get('[data-error-for="loginEmail"], [data-error-for="loginPassword"]').should(($errors) => {
      const messages = [...$errors].map((error) => error.textContent.trim()).filter(Boolean)

      expect(messages.join(' ')).to.match(/API|senha|credenciais|credentials|inv/i)
    })
  }

  realizarFluxoAssistente() {
    cy.get('[data-cy="assistant-open"]').click()
    cy.get('[data-assistant-action="credentials"]').click()
    cy.get('[data-assistant-action="terms"]').click()
    cy.get('[data-assistant-action="dismiss"]').click()
  }

  validarAssistenteFechado() {
    cy.get('[data-cy="assistant-window"]').should('have.class', 'hidden')
  }

  acessarRecuperacaoSenha() {
    cy.visit('/admin/recuperar-senha')
  }

  solicitarRecuperacaoSenha(email) {
    cy.get('#forgot-email').type(email)
    cy.contains('button', 'Gerar token').click()
  }

  validarErroRecuperacaoSenha() {
    cy.get('[data-error-for="forgotEmail"]').should(($element) => {
      expect($element.text().trim()).to.match(/.+/)
    })
  }

  validarDadosRecuperacaoSenha() {
    const { email } = obterCredenciaisAdministrador()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'E-mail validado')
        .find('strong')
        .should('have.text', email)

      cy.contains('[data-cy="modal-list"] li', 'Token')
        .find('strong')
        .invoke('text')
        .then((token) => {
          const tokenLimpo = token.trim()

          expect(tokenLimpo).to.not.be.empty
          expect(tokenLimpo).to.match(/^(QA-[A-Z0-9]{4}-[A-Z0-9]{4}|[a-f0-9]{40,64})$/i)
        })

      cy.contains('[data-cy="modal-list"] li', 'Validade')
        .find('strong')
        .should('have.text', '15 minutos')
    })
  }

  cadastrarUsuario(nome, email, senha) {
    cy.contains('button', 'Criar nova conta').click()

    if (nome) {
      cy.get('[data-cy="register-name"]').type(nome)
    }

    if (email) {
      cy.get('[data-cy="register-email"]').type(email)
    }

    if (senha) {
      cy.get('[data-cy="register-password"]').type(senha)
    }

    cy.contains('button', 'Cadastrar usuário').click()
  }

  validarErroNomeCadastro() {
    cy.contains('Nome é obrigatório').should('be.visible')
  }

  validarErroEmailCadastro() {
    cy.get('[data-error-for="registerEmail"]').should(($element) => {
      expect($element.text().trim()).to.match(/.+/)
    })
  }

  validarErroSenha() {
    cy.contains('Senha é obrigatória').should('be.visible')
  }

  validarCadastroRealizadoComSucesso(nome) {
    cy.get('[data-cy="success-modal"]')
      .should('be.visible')
      .and('contain.text', 'Cadastro realizado com sucesso')
      .and('contain.text', nome)
  }
}

export default new LoginPage()
