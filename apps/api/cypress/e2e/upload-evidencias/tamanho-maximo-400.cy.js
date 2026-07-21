import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/evidences - Validação do tamanho máximo', () => {
  let token
  let clientId

  beforeEach(() => {
    cy.loginApi().then((tokengeraddo) => {
      token = tokengeraddo
    })
  })

  it('deve retornar 400 ao tentar enviar um arquivo acima do tamanho máximo', () => {
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

      const arquivoAcimaDe1MB = Cypress.Buffer.alloc(1024 * 1024 + 1, 'A').toString('base64')

      const evidencia_tamanhomaximo400 = {
        entityType: 'client',
        clientId,
        title: 'Arquivo acima de 1MB',
        fileName: 'arquivo-grande.txt',
        mimeType: 'text/plain',
        fileBase64: arquivoAcimaDe1MB,
        notes: 'Deve falhar porque o arquivo decodificado passa de 1MB',
      }

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/evidences',
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: evidencia_tamanhomaximo400,
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Evidence file exceeds maximum size of 1MB!')
      })
    })
  })
})
