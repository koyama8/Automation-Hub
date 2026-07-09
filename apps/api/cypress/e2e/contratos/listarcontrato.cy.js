import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/contracts - Listagem de contratos', () => {
  let token
  let contractId
  let contrato

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

        contrato = {
          clientId: response.body.data.id,
          title: faker.commerce.productName(),
          plan: 'Mensal',
          amountCents: faker.number.int({ min: 1000, max: 50000 }),
          startDate: '2026-07-01',
          endDate: '2026-12-31',
          status: 'active',
          notes: faker.lorem.sentence(),
        }

        cy.api({
          method: 'POST',
          url: 'http://localhost:3030/api/contracts',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: contrato,
        }).then((response) => {
          expect(response.status).to.eq(201)
          contractId = response.body.data.id
        })
      })
    })
  })

  it('deve listar o contrato cadastrado para o cliente', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/contracts',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body).to.not.be.empty

      const contratoListado = response.body.find((item) => item.id === contractId)

      expect(contratoListado).to.exist
      expect(contratoListado.clientId).to.eq(contrato.clientId)
      expect(contratoListado.title).to.eq(contrato.title)
      expect(contratoListado.amountCents).to.eq(contrato.amountCents)
      expect(contratoListado.status).to.eq(contrato.status)
      expect(contratoListado.notes).to.eq(contrato.notes)
      expect(contratoListado.client).to.have.property('id', contrato.clientId)
    })
  })
})
