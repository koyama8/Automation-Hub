import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/clients - Cadastro de cliente', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve cadastrar um cliente com dados validos', () => {
    const cliente = {
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

      expect(response.body.data.name).to.eq(cliente.name)
      expect(response.body.data.email).to.eq(cliente.email)
      expect(response.body.data.document).to.eq(cliente.document)
      expect(response.body.data.phone).to.eq(cliente.phone)
      expect(response.body.data.company).to.eq(cliente.company)
      expect(response.body.data.status).to.eq(cliente.status)
    })
  })
})
