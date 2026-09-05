class SenhaApi {
  solicitarRecuperacaoSenha(email) {
    return cy.api({
      method: 'POST',
      url: '/api/password/forgot',
      body: {
        email,
      },
    })
  }

  redefinirSenha(tokenRecuperacao, novaSenha) {
    return cy.api({
      method: 'POST',
      url: '/api/password/reset',
      body: {
        token: tokenRecuperacao,
        newPassword: novaSenha,
      },
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarTokenRecuperacao(response, emailEsperado) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Password reset token generated')
    expect(response.body.data.email).to.eq(emailEsperado)
    expect(response.body.data.token).to.be.a('string')
    expect(response.body.data.token).to.not.be.empty
  }

  validarRespostaSolicitarSenha(response, emailEsperado) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Password reset successfully')
    expect(response.body.data.email).to.eq(emailEsperado)
  }
}

export default new SenhaApi()
