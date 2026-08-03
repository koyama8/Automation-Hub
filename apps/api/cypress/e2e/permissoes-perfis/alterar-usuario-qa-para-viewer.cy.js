import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PATCH /api/permissions/users/:id/profile - Alteração para viewer', () => {
  let adminToken
  let qatoken
  let managedUserId
  let managedUserVersion

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
        managedUserVersion = response.body.data.version

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

  it('deve alterar o usuário QA para viewer e revogar o token anterior', () => {
    cy.api({
      method: 'PATCH',
      url: `http://localhost:3030/api/permissions/users/${managedUserId}/profile`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: {
        profile: 'viewer',
        version: managedUserVersion,
        reason: 'Validar restricoes de escrita do perfil viewer',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.profile).to.eq('viewer')
      expect(response.body.message).to.eq('User profile updated successfully')

      cy.api({
        method: 'GET',
        url: 'http://localhost:3030/api/clients',
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${qatoken}`,
        },
      }).then((response) => {
        expect(response.body.error).to.eq('Authentication session is no longer valid!')
      })
    })
  })
})
