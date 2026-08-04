import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/users/:id/revoke-sessions', () => {
  let adminToken
  let qatoken
  let managedUserId

  const identificador = `${Date.now()}-${faker.string.alphanumeric(6).toLowerCase()}`

  const administrador = {
    email: 'qa@adminlab.com',
    password: 'pwd123',
  }

  const usuarioQA = {
    name: 'QA Aluno',
    email: `qa.aluno.${identificador}@adminlab.com`,
    password: 'QaPleno@123',
    profile: 'qa',
    status: 'active',
    reason: 'Criacao de massa para validar o perfil QA',
  }

  const cliente = {
    name: 'Cliente criado por QA',
    email: `cliente.qa.${identificador}@adminlab.com`,
    document: faker.string.numeric(11),
    phone: '11999990000',
    company: 'QA Automation Lab',
    status: 'active',
  }

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      adminToken = tokengerado

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/permissions/users',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: usuarioQA,
      }).then((response) => {
        expect(response.status).to.eq(201)
        managedUserId = response.body.data.id

        cy.api({
          method: 'POST',
          url: 'http://localhost:3030/api/auth/login',
          body: {
            email: usuarioQA.email,
            password: usuarioQA.password,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          qatoken = response.body.data.token
        })
      })
    })
  })

  it('deve revogar as sessões do usuário QA e invalidar o token anterior', () => {
    cy.api({
      method: 'POST',
      url: `http://localhost:3030/api/permissions/users/${managedUserId}/revoke-sessions`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: {
        reason: 'Encerrar sessoes para validar resposta a incidente',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('User sessions revoked successfully')
      
      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/clients',
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${qatoken}`,
        },
        body: {
          email: usuarioQA.email,
          password: usuarioQA.password,
        },
      }).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.error).to.eq(
          'Authentication session is no longer valid!',
        )
      })
    })
  })
})
