import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PUT /api/clients/:id - Atualizacao de cliente', () => {
  let token
  let clientId

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      const cliente = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        document: faker.string.numeric(11),
        phone: faker.string.numeric(11),
        company: faker.company.name(),
        status: 'active',
      }

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: cliente,
      }).then((response) => {
        expect(response.status).to.eq(201)
        clientId = response.body.data.id
      })
    })
  })

  it('deve atualizar os dados de um cliente existente', () => {
    const clienteAtualizado = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      document: faker.string.numeric(11),
      phone: faker.string.numeric(11),
      company: faker.company.name(),
      status: 'inactive',
    }

    cy.api({
      method: 'PUT',
      url: `http://localhost:3030/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: clienteAtualizado,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Client updated successfully')
      expect(response.body.data.name).to.eq(clienteAtualizado.name)
      expect(response.body.data.email).to.eq(clienteAtualizado.email)
      expect(response.body.data.status).to.eq(clienteAtualizado.status)
    })
  })
})
