import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  const usuario = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }

  it('deve cadastrar um novo usuario com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/users/register',
      body: usuario,
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User created successfully')

      expect(response.body.data.name).to.eq(usuario.name)
      expect(response.body.data.email).to.eq(usuario.email)
      expect(response.body.data.role).to.eq('user')
      expect(response.body.data.active).to.eq(true)

      expect(response.body.data).to.not.have.property('password')
    })
  })
})
