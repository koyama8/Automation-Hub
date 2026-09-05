import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarCupomFixoValido(sobrescritas = {}) {
  const identificadorUnico = `${Date.now().toString().slice(-8)}-${faker.string.alphanumeric(4).toUpperCase()}`

  return {
    code: `QA-FIXO-${identificadorUnico}`,
    description: 'Cupom fixo com limite de uso',
    type: 'fixed',
    value: faker.number.int({ min: 1, max: 100 }),
    minOrderCents: faker.number.int({ min: 1000, max: 5000 }),
    usageLimit: 1,
    status: 'active',
    ...sobrescritas,
  }
}

export { gerarCupomFixoValido }
