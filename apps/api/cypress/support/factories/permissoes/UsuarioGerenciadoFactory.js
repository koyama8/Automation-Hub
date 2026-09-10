import { fakerPT_BR as faker } from '@faker-js/faker'

function gerarUsuarioGerenciado(perfil = 'qa', sobrescritas = {}) {
  const identificador = `${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`
  return {
    name: faker.person.fullName(),
    email: `${perfil}.${identificador}@adminlab.com`,
    password: 'QaPleno@123',
    profile: perfil,
    status: 'active',
    reason: 'Preparar massa automatizada para validar o controle de acesso',
    ...sobrescritas,
  }
}

function gerarUsuarioConvidado(sobrescritas = {}) {
  return gerarUsuarioGerenciado('viewer', {
    password: undefined,
    status: 'invited',
    reason: 'Convidar usuário para ativação segura da credencial',
    ...sobrescritas,
  })
}

function gerarChaveIdempotencia() {
  return `managed-user-${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`
}

export { gerarChaveIdempotencia, gerarUsuarioConvidado, gerarUsuarioGerenciado }
