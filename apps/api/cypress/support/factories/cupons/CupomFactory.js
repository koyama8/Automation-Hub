import { fakerPT_BR as faker } from '@faker-js/faker'

function identificador() {
  return `${Date.now().toString().slice(-8)}-${faker.string.alphanumeric(4).toUpperCase()}`
}

function gerarCupomFixoValido(sobrescritas = {}) {
  return {
    code: `QA-FIXO-${identificador()}`,
    description: 'Cupom fixo com limite de uso',
    type: 'fixed',
    value: faker.number.int({ min: 1, max: 100 }),
    minOrderCents: faker.number.int({ min: 1000, max: 5000 }),
    usageLimit: 1,
    status: 'active',
    ...sobrescritas,
  }
}

function gerarCupomPercentualValido(sobrescritas = {}) {
  return {
    code: `QA-PCT-${identificador()}`,
    description: 'Cupom percentual ativo',
    type: 'percentage',
    value: faker.number.int({ min: 5, max: 30 }),
    minOrderCents: 100,
    maxDiscountCents: 5000,
    usageLimit: 3,
    status: 'active',
    ...sobrescritas,
  }
}

export { gerarCupomFixoValido, gerarCupomPercentualValido }
