import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/invitations/:token/accept', () => {
  let adminToken
  let invitationToken
  const senhaConvidado = 'Viewer@123'

  const identificador = `${Date.now()}-${faker.string.alphanumeric(6).toLowerCase()}`

  const administrador = {
    email: 'qa@adminlab.com',
    password: 'Viewer@123',
  }

  const usuarioConvidado = {
    name: 'Viewer Convidado',
    email: `viewer.convidado.${identificador}@adminlab.com`,
    profile: 'viewer',
    status: 'invited',
    reason: 'Convidar usuario para ativacao segura de credencial',
  }

  const usuarioConvidadoLogin = {
    email: `viewer.convidado.${identificador}@adminlab.com`,
    password: '',
  }

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      adminToken = tokengerado

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/permissions/users',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Idempotency-Key': `invitation-${identificador}`,
        },
        body: usuarioConvidado,
      }).then((response) => {
        expect(response.status).to.eq(201)
        invitationToken = response.body.invitation.token
      })
    })
  })

  it('deve aceitar o convite e ativar o usuário convidado', () => {
    cy.api({
      method: 'POST',
      url: `http://localhost:3030/api/permissions/invitations/${invitationToken}/accept`,
      body: {
        password: 'Viewer@123',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/auth/login',
      body: {
        email: usuarioConvidado.email,
        password: senhaConvidado,
      },
    }).then((response) => {
      expect(response.body.message).to.eq('Login successful')
    })
  })
})
