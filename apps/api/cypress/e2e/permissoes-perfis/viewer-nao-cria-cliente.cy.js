import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/clients - Restrição de escrita do perfil viewer', () => {
  let adminToken
  let qatoken
  let viewerToken
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
    })
  })

  it('não deve permitir que o viewer crie um cliente', () => {
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

          cy.api({
            method: 'POST',
            url: 'http://localhost:3030/api/auth/login',
            body: {
              email: usuarioQA.email,
              password: usuarioQA.password,
            },
          }).then((response) => {
            expect(response.status).to.eq(200)
            viewerToken = response.body.data.token

            cy.api({
              method: 'POST',
              url: 'http://localhost:3030/api/clients',
              failOnStatusCode: false,
              headers: {
                Authorization: `Bearer ${viewerToken}`,
              },
              body: {
                name: 'Tentativa viewer',
                email: `viewer.negado.${Date.now()}@adminlab.com`,
                document: faker.string.numeric(11),
                phone: '11999990000',
                company: 'Nao deve persistir',
                status: 'active',
              },
            }).then((response) => {
              expect(response.status).to.eq(403)
              expect(response.body.error).to.eq('Permission required: clients:write!')
            })
          })
        })
      })
    })
  })
})
