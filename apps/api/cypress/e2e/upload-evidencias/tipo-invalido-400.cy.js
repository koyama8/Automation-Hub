import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/evidences - Validação de tipo de arquivo', () => {
  let token
  let clientId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve retornar 400 arquivlo invalido', () => {
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

      const evidencia_obrigatoria404 = {
        entityType: 'client',
        clientId,
        title: 'Arquivo executavel invalido',
        fileName: 'virus.exe',
        mimeType: 'application/x-msdownload',
        fileBase64: 'TVqQAAMAAAAEAAAA',
        notes: 'Deve falhar por MIME type nao permitido',
      }

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/evidences',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
        body: evidencia_obrigatoria404,
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Evidence file type is not allowed!')
      })
    })
  })
})
