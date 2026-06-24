describe('POST /api/password/forgot', () => {
  it('deve gerar um token de recuperacao para um email cadastrado', () => {
    const email = 'usuario.bruno@gmail.com'

    cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/password/forgot',
      body: {
        email,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Password reset token generated')
      expect(response.body.data.email).to.eq(email)

      expect(response.body.data.token).to.be.a('string')
      expect(response.body.data.token).to.not.be.empty
    })
  })
})
