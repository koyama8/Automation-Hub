import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PATCH /api/clients/:id/status', () => {
  let token
  let clienteID

  const cliente = {
    name: 'Cliente Bruno',
    email: 'cliente.bruno@gmail.com',
    document: '52998224725',
    phone: '11999991000',
    company: 'QA Automation Lab',
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
        body: cliente,
      }).then((response) => {
        expect(response.status).to.eq(201)
        clienteID = response.body.data.id
      })
    })
  })

  it('deve inativar um cliente', () => {
    cy.api({
      method: 'PATCH',
      url: `http://localhost:3030/api/clients/${clienteID}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
