import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/users/:id/invitation/resend', () => {
  let adminToken
  let tokenAntigo
  let tokenNovo
  let invitationUserId

  const identificador = `${Date.now()}-${faker.string.alphanumeric(6).toLowerCase()}`

  const administrador = {
    email: 'qa@adminlab.com',
    password: 'pwd123',
  }

  const usuarioConvidado = {
    name: 'Viewer Convidado',
    email: `viewer.convidado.${identificador}@adminlab.com`,
    profile: 'viewer',
    status: 'invited',
    reason: 'Convidar usuario para ativacao segura de credencial',
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
        expect(response.body.data.status).to.eq('invited')
        invitationUserId = response.body.data.id
        tokenAntigo = response.body.invitation.token
      })
    })
  })

  it('deve reenviar o convite e gerar um novo token de ativação', () => {
    cy.api({
      method: 'POST',
      url: `http://localhost:3030/api/permissions/users/${invitationUserId}/invitation/resend`,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: {
        reason: 'Invalidar convite anterior e emitir um novo token',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)

      tokenNovo = response.body.data.invitation.token
      expect(tokenNovo).to.not.eq(tokenAntigo)
    })
  })
})
