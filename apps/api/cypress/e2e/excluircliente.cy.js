import { fakerPT_BR as faker } from '@faker-js/faker'

describe('DELETE /api/clients', () => {
  let token

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    document: faker.string.numeric(11),
    phone: faker.string.numeric(11),
    company: faker.company.name(),
    status: 'inactive',
  }

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: user,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })

  it('deve excluir todos os clientes', () => {
    cy.api({
      method: 'DELETE',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('All clients deleted successfully')
    })
  })
})
