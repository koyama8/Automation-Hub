import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/permissions/users - Payload divergente', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve impedir a reutilização da chave de idempotência com outro payload', () => {
    const identificador = `${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`

    const idempotencyKey = `managed-user-${identificador}`

    const usuarioOriginal = {
      name: faker.person.fullName(),
      email: `qa.original.${identificador}@adminlab.com`,
      password: 'QaPleno@123',
      profile: 'qa',
      status: 'active',
      reason: faker.lorem.sentence(),
    }

    const payloadDivergente = {
      name: faker.person.fullName(),
      email: `viewer.divergente.${identificador}@adminlab.com`,
      password: 'QaPleno@123',
      profile: 'viewer',
      status: 'active',
      reason: faker.lorem.sentence(),
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/permissions/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: usuarioOriginal,
    }).then((response) => {
      expect(response.status).to.eq(201)

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/permissions/users',
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payloadDivergente,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })
})
