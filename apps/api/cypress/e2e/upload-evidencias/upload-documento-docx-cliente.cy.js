import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/evidences - Upload de evidência do cliente', () => {
  let token
  let clientId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve fazer upload de uma evidência vinculada ao cliente', () => {
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
      entityType: "client",
      clientId,
      title: "Documento DOCX do cliente",
      fileName: "contrato-cliente.docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileBase64: "RG9jdW1lbnRvIERPQ1ggcGFyYSB2YWxpZGFjYW8=",
      notes: "Cenario positivo para documento anexado pelo payload",
      status: "active"
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
        expect(response.body.message).to.eq('Evidence uploaded successfully')
      })
    })
  })
})
