import { fakerPT_BR as faker } from '@faker-js/faker'

describe('DELETE /api/evidences/:id - Exclusão de evidência', () => {
  let token
  let clientId
  let evidenceId

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve excluir uma evidência pelo identificador', () => {
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
          method: 'DELETE',
          url: `http://localhost:3030/api/evidences/${evidenceId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })
})
