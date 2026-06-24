describe('POST /api/password/reset', () => {
  it('deve redefinir a senha usando um token valido', () => {
    let email = 'usuario.bruno@gmail.com'
    let tokengerado
    let password = 'Bruno@789'

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/password/forgot',
      body: {
        email,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Password reset token generated')

      tokengerado = response.body.data.token

      cy.api({
        method: 'POST',
        url: 'http://localhost:3030/api/password/reset',
        body: {
          token: tokengerado,
          newPassword: password,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Password reset successfully')
        expect(response.body.data.email).to.eq(email)
      })
    })
  })
})
