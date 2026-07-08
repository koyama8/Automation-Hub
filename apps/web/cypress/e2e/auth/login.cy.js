/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

function expectFormError(selector, pattern = /.+/) {
  cy.get(selector)
    .should(($element) => {
      expect($element.text().trim()).to.match(pattern)
    })
}

describe('Login', () => {
  it('deve exibir os elementos da tela de login', () => {
    cy.iniciar()
    cy.contains('Acesse sua conta').should('be.visible')
    cy.get('#login-email').should('be.visible')
    cy.get('#login-password').should('be.visible')

    cy.contains('button', 'Entrar').should('be.visible')
    cy.contains('button', 'Esqueci minha senha').should('be.visible')
    cy.contains('button', 'Criar nova conta').should('be.visible')
  })

  it('deve fazer login com sucesso', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd123')
    cy.url().should('include', '/dashboard')
  })

  it('nao deve logar com email invalido', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminla.com', 'pwd123')
    cy.contains('Informe um e-mail valido de provedor conhecido').should('be.visible')
  })

  it('nao deve logar com senha invalida', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd12345')

    cy.get('[data-error-for="loginEmail"], [data-error-for="loginPassword"]')
      .should(($errors) => {
        const messages = [...$errors]
          .map((error) => error.textContent.trim())
          .filter(Boolean)

        expect(messages.join(' ')).to.match(/API|senha|credenciais|credentials|inv/i)
      })
  })

  it('deve abrir o assistente Automation Live', () => {
    cy.iniciar()
    cy.get('[data-cy="assistant-open"]').click()
    cy.get('[data-assistant-action="credentials"]').click()
    cy.get('[data-assistant-action="terms"]').click()
    cy.get('[data-assistant-action="dismiss"]').click()
    cy.get('[data-cy="assistant-window"]').should('have.class', 'hidden')
  })

  it('deve exibir erro ao informar um e-mail nao cadastrado para recuperacao de senha', () => {
    cy.recuperarsenha()
    cy.get('#forgot-email').type('qalaboratory@gmail.com')

    cy.contains('button', 'Gerar token').click()

    expectFormError('[data-error-for="forgotEmail"]')
  })

  it('deve concluir a recuperacao de senha com sucesso ao informar um e-mail valido', () => {
    cy.recuperarsenha()
    cy.get('#forgot-email').type('qa@adminlab.com')
    cy.contains('button', 'Gerar token').click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'E-mail validado')
        .find('strong')
        .should('have.text', 'qa@adminlab.com')

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
  })

  it('deve exibir validacao ao tentar cadastrar um usuario sem preencher o nome', () => {
    cy.iniciar()
    cy.cadastro('', 'qa@adminlab.com', 'pwd123')
    expectFormError('[data-error-for="registerName"]')
  })

  it('deve exibir validacao ao tentar cadastrar um usuario sem preencher o email', () => {
    cy.iniciar()
    cy.cadastro('Teste', '', 'pwd123')
    expectFormError('[data-error-for="registerEmail"]')
  })

  it('deve exibir validacao ao tentar cadastrar um usuario sem preencher a senha', () => {
    cy.iniciar()
    cy.cadastro('Teste', 'qa@adminlab.com', '')
    expectFormError('[data-error-for="registerPassword"]')
  })

  it('deve cadastrar um usuario', () => {
    const nome = `Teste ${Date.now()}`
    const email = `qalab.${Date.now()}@hotmail.com`

    cy.iniciar()
    cy.cadastro(nome, email, 'pwd12345')
    cy.get('[data-cy="success-modal"]')
      .should('be.visible')
      .and('contain.text', 'Cadastro realizado com sucesso')
      .and('contain.text', nome)
  })
})
