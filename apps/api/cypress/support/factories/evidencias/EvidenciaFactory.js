import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarEvidenciaCliente(clientId, sobrescritas = {}) {
  return gerarEvidencia({ entityType: 'client', clientId, ...sobrescritas })
}

function gerarEvidenciaPedido(orderId, sobrescritas = {}) {
  return gerarEvidencia({ entityType: 'order', orderId, ...sobrescritas })
}

function gerarEvidencia(sobrescritas) {
  const conteudo = `Evidencia automatizada ${faker.string.uuid()}`
  return {
    title: faker.lorem.sentence(),
    fileName: `evidencia-${Date.now()}.txt`,
    mimeType: 'text/plain',
    fileBase64: Cypress.Buffer.from(conteudo).toString('base64'),
    notes: 'Massa sintética para automação',
    status: 'active',
    ...sobrescritas,
  }
}

export { gerarEvidenciaCliente, gerarEvidenciaPedido }
