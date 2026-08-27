import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarClienteValido() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    document: faker.string.numeric(11),
    phone: '11999991000',
    company: 'QA Automation Lab',
    status: 'active',
  }
}

export { gerarClienteValido }
