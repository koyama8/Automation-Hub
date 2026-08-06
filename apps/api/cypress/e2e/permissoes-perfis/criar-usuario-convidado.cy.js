import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/users - Usuário convidado', () => {
  let adminToken

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
    })
  })

  it('deve criar um usuário convidado e gerar o token de ativação', () => {
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
      expect(response.body.message).to.eq('Managed user created successfully')
      expect(response.body.data.status).to.eq('invited')
      expect(response.body.data.email).to.eq(usuarioConvidado.email)
    })
  })
})
