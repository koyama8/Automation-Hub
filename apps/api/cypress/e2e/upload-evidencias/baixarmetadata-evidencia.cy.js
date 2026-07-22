import { fakerPT_BR as faker } from '@faker-js/faker'

describe('GET /api/evidences/:id/download - Download de metadata da evidência', () => {
  let token
  let clientId
  let evidenceId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve baixar os metadados da evidência', () => {
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
      clientId = response.body.data.id

      const timestamp = Date.now()
      const conteudoArquivo = faker.lorem.paragraph()

      const evidencia = {
        entityType: 'client',
        clientId,
        title: faker.lorem.sentence(),
        fileName: `cliente-evidencia-${timestamp}.txt`,
        mimeType: 'text/plain',
        fileBase64: Cypress.Buffer.from(conteudoArquivo).toString('base64'),
        notes: faker.lorem.sentence(),
        status: 'active',
      }

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/evidences',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: evidencia,
      }).then((response) => {
        expect(response.status).to.eq(201)
        evidenceId = response.body.data.id

        cy.api({
          method: 'GET',
          url: `http://localhost:3030/api/evidences/${evidenceId}/download`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)

          expect(response.body.message).to.eq(
            'Evidence metadata downloaded successfully',
          )
        })
      })
    })
  })
})
