import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarClienteValido(sobrescritas = {}) {
  const instante = Date.now().toString()
  const sufixoUnico = `${instante}-${faker.string.alphanumeric(6)}`.toLowerCase()

  return {
    name: faker.person.fullName(),
    email: `cliente.${sufixoUnico}@example.test`,
    document: `${instante.slice(-8)}${faker.string.numeric(3)}`,
    phone: `119${faker.string.numeric(8)}`,
    company: `${faker.company.name()} - QA`,
    status: 'active',
    ...sobrescritas,
  }
}

export { gerarClienteValido }
