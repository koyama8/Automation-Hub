import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/clients - Permissão do perfil QA', () => {
  let adminToken
  let qaToken

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

        cy.api({
          method: 'POST',
          url: 'http://localhost:3030/api/auth/login',
          body: {
            email: usuarioQA.email,
            password: usuarioQA.password,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          qaToken = response.body.data.token
        })
      })
    })
  })

  it('deve permitir que o QA crie um cliente', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${qaToken}`,
      },
      body: cliente,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
