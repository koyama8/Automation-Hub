import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST e GET /api/permissions/users - Busca de usuário gerenciado', () => {
  let token
  let managedUserId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve criar e buscar um usuário gerenciado pelo ID', () => {
    const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`

    const idempotencyKey = `managed-user-${identificadorUnico}`

    const usuarioQA = {
      name: faker.person.fullName(),
      email: `qa.pleno.${identificadorUnico}@adminlab.com`,
      password: 'QaPleno@123',
      profile: 'qa',
      status: 'active',
      reason: faker.lorem.sentence(),
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/permissions/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: usuarioQA,
    }).then((response) => {
      expect(response.status).to.eq(201)
      managedUserId = response.body.data.id

      cy.api({
        method: 'GET',
        url: `http://localhost:3030/api/permissions/users/${managedUserId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body.data.id).to.eq(managedUserId)
        expect(response.body.data.email).to.eq(usuarioQA.email)
        expect(response.body.data.name).to.eq(usuarioQA.name)
        expect(response.body.data.profile).to.eq('qa')
        expect(response.body.data.status).to.eq('active')
      })
    })
  })
})
