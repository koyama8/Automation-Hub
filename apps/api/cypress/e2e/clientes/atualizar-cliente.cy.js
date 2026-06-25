import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PUT /api/clients/:id', () => {
  let token
  let clientID

  const user = {
    name: 'Cliente Bruno',
    email: 'cliente.bruno@gmail.com',
    document: '52998224725',
    phone: '11977771000',
    company: 'QA Lab',
    status: 'active',
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
        clientID = response.body.data.id
      })
    })
  })

  it('deve atualizar os dados de um cliente', () => {
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
      url: `http://localhost:3030/api/clients/${clientID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: clienteAtualizado,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Client updated successfully')
    })
  })
})
