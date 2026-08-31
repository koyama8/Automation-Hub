import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarProdutoValido() {
  const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(6).toUpperCase()}`

  return {
    name: `${faker.commerce.productName()} ${identificadorUnico}`,
    sku: `QA-${identificadorUnico}`,
    description: faker.commerce.productDescription(),
    priceCents: faker.number.int({ min: 1000, max: 99900 }),
    stock: faker.number.int({ min: 1, max: 100 }),
    status: 'active',
  }
}

function gerarProdutoDuplicado() {
  const timestamp = Date.now()

  return {
    name: `Produto duplicado Bruno ${timestamp}`,
    sku: `BRU-${timestamp}`,
    description: 'Produto criado pelo Cypress',
    priceCents: 19990,
    stock: 25,
    status: 'active',
  }
}

export { gerarProdutoValido, gerarProdutoDuplicado }
