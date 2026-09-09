import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarContratoValido(clientId, sobrescritas = {}) {
  return {
    clientId,
    title: `${faker.commerce.productName()} ${Date.now()}`,
    plan: faker.helpers.arrayElement(['Mensal', 'Trimestral', 'Semestral', 'Anual']),
    amountCents: faker.number.int({ min: 1000, max: 50000 }),
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    status: 'active',
    notes: faker.lorem.sentence(),
    ...sobrescritas,
  }
}

export { gerarContratoValido }
