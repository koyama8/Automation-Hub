import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarClienteValido() {
  const sufixo = Date.now()

  return {
    nome: faker.person.fullName(),
    email: `cliente.${sufixo}.${faker.string.alphanumeric(5)}@gmail.com`.toLowerCase(),
    documento: faker.string.numeric(11),
    telefone: `119${faker.string.numeric(8)}`,
    empresa: faker.company.name(),
  }
}

export { gerarClienteValido }
