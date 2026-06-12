/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

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

  it('não deve logar com email inválido', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminla.com', 'pwd123')
    cy.contains('Informe um e-mail valido de provedor conhecido').should('be.visible')
  })

  it('não deve logar com senha inválida', () => {
    cy.iniciar()
    cy.submeterLogin('qa@adminlab.com', 'pwd12345')
    cy.contains('Senha incorreta').should('be.visible')
  })

  it('deve abrir o assistente Automation Live', () => {
    cy.iniciar()
    cy.get('[data-cy="assistant-open"]').click()
    cy.contains('button', 'Ver login local').click()
    cy.contains('button', 'Termos de uso').click()
    cy.contains('button', 'Agora não').click()
  })

  it('deve exibir erro ao informar um e-mail não cadastrado para recuperação de senha', () => {
    cy.recuperarsenha()
    cy.get('#forgot-email').type('qalaboratory@gmail.com')

    cy.contains('button', 'Gerar token').click()
    cy.contains('E-mail não cadastrado na base de dados').should('be.visible')
  })

  it('deve concluir a recuperação de senha com sucesso ao informar um e-mail válido', () => {
    cy.recuperarsenha()
    cy.get('#forgot-email').type('qa@adminlab.com')
    cy.contains('button', 'Gerar token').click()

    cy.get('[data-cy="success-modal"]').within(() => {
      cy.contains('[data-cy="modal-list"] li', 'E-mail validado')
        .find('strong')
        .should('have.text', 'qa@adminlab.com')

      cy.contains('[data-cy="modal-list"] li', 'Token local')
        .find('strong')
        .invoke('text')
        .then((token) => {
          const tokenLimpo = token.trim()

          expect(tokenLimpo).to.not.be.empty
          expect(tokenLimpo).to.match(/^QA-[A-Z0-9]{4}-[A-Z0-9]{4}$/)
        })

      cy.contains('[data-cy="modal-list"] li', 'Validade')
        .find('strong')
        .should('have.text', '10 minutos')
    })
  })

  it('deve exibir validação ao tentar cadastrar um usuário sem preencher o nome', () => {
    cy.iniciar()
    cy.cadastro('', 'qa@adminlab.com', 'pwd123')
    cy.contains('Nome é obrigatório').should('be.visible')
  })

  it('deve exibir validação ao tentar cadastrar um usuário sem preencher o email', () => {
    cy.iniciar()
    cy.cadastro('Teste', '', 'pwd123')
    cy.contains('E-mail é obrigatório').should('be.visible')
  })

  it('deve exibir validação ao tentar cadastrar um usuário sem preencher a senha', () => {
    cy.iniciar()
    cy.cadastro('Teste', 'qa@adminlab.com', '')
    cy.contains('Senha é obrigatória').should('be.visible')
  })

  it('deve cadastrar um usuário', () => {
    const nome = 'Teste'

    cy.iniciar()
    cy.cadastro(nome, 'qalab@hotmail.com', 'pwd12345')
    cy.get('[data-cy="success-modal"]')
      .should('be.visible')
      .and('contain.text', 'Cadastro realizado com sucesso')
      .and('contain.text', `O usuário '${nome}' foi salvo na massa local e já está disponível para login.`)
  })
})
