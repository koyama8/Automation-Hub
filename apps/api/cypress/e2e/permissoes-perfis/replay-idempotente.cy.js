import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/users - Replay idempotente', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar o mesmo resultado ao repetir uma requisição idempotente', () => {
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
    })
  })
})
