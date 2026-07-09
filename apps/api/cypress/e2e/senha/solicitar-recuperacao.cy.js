import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/password/forgot - Recuperacao de senha', () => {
  it('deve gerar um token de recuperacao para um email cadastrado', () => {
    const usuario = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'Bruno@789',
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/users/register',
      body: usuario,
    }).then((response) => {
      expect(response.status).to.eq(201)

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/password/forgot',
        body: {
          email: usuario.email,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Password reset token generated')
        expect(response.body.data.email).to.eq(usuario.email)
        expect(response.body.data.token).to.be.a('string')
        expect(response.body.data.token).to.not.be.empty
      })
    })
  })
})
