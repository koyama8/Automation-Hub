import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/clients - Listagem de clientes', () => {
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

  it('deve listar o cliente cadastrado', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/clients',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty

      const clienteListado = response.body.find((item) => item.id === clientId)

      expect(clienteListado).to.exist
      expect(clienteListado.name).to.eq(cliente.name)
      expect(clienteListado.email).to.eq(cliente.email)
      expect(clienteListado.document).to.eq(cliente.document)
      expect(clienteListado.phone).to.eq(cliente.phone)
      expect(clienteListado.company).to.eq(cliente.company)
      expect(clienteListado.status).to.eq(cliente.status)
    })
  })
})
