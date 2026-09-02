import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarProdutoValido(sobrescritas = {}) {
  const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(6).toUpperCase()}`

  return {
    name: `${faker.commerce.productName()} ${identificadorUnico}`,
    sku: `QA-${identificadorUnico}`,
    description: faker.commerce.productDescription(),
    priceCents: faker.number.int({ min: 1000, max: 99900 }),
    stock: faker.number.int({ min: 1, max: 100 }),
    status: 'active',
    ...sobrescritas,
  }
}

function gerarProdutoDuplicado(sobrescritas = {}) {
  const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(6).toUpperCase()}`

  return {
    name: `Produto duplicado ${identificadorUnico}`,
    sku: `DUP-${identificadorUnico}`,
    description: 'Produto sintetico para validar regra de duplicidade',
    priceCents: 19990,
    stock: 25,
    status: 'active',
    ...sobrescritas,
  }
}

export { gerarProdutoValido, gerarProdutoDuplicado }
