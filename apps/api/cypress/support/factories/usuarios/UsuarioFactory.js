import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarUsuarioValido(sobrescritas = {}) {
  const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(6)}`.toLowerCase()

  return {
    name: faker.person.fullName(),
    email: `usuario.${identificadorUnico}@example.test`,
    password: faker.internet.password({ length: 12 }),
    ...sobrescritas,
  }
}

export { gerarUsuarioValido }
