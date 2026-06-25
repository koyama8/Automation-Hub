import { fakerPT_BR as faker } from '@faker-js/faker'

describe('DELETE /api/clients/:id - Exclusao de cliente por ID', () => {
  let token
  let clienteID

  const clientes = Array.from({ length: 2 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    document: faker.string.numeric(11),
    phone: faker.string.numeric(11),
    company: faker.company.name(),
    status: 'inactive',
  }))

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado

      clientes.forEach((cliente) => {
        cy.api({
          method: 'POST',
          url: 'http://localhost:3030/api/clients',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: cliente,
        }).then((response) => {
          expect(response.status).to.eq(201)
          clienteID = response.body.data.id
        })
      })
    })
  })

  it('deve excluir um cliente pelo id', () => {
    cy.api({
      method: 'DELETE',
      url: `http://localhost:3030/api/clients/${clienteID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
