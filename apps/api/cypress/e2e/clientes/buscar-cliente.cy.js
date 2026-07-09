import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/clients/:id - Busca de cliente', () => {
  let token
  let clientId
  let cliente

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado

      cliente = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        document: faker.string.numeric(11),
        phone: '11999991000',
        company: 'QA Automation Lab',
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

  it('deve buscar um cliente pelo id', () => {
    cy.api({
      method: 'GET',
      url: `http://localhost:3030/api/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(clientId)
      expect(response.body.data.name).to.eq(cliente.name)
      expect(response.body.data.email).to.eq(cliente.email)
      expect(response.body.data.document).to.eq(cliente.document)
      expect(response.body.data.status).to.eq(cliente.status)
    })
  })
})
