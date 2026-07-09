import { fakerPT_BR as faker } from '@faker-js/faker'

describe('POST /api/password/reset - Redefinicao de senha', () => {
  it('deve redefinir a senha usando um token valido', () => {
    const usuario = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'Bruno@123',
    }

    const novaSenha = 'Bruno@789'

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

        cy.api({
          method: 'POST',
          url: 'http://localhost:3030/api/password/reset',
          body: {
            token: response.body.data.token,
            newPassword: novaSenha,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Password reset successfully')
          expect(response.body.data.email).to.eq(usuario.email)
        })
      })
    })
  })
})
