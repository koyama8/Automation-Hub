class CuponsApi {
  cupomAtivo(token, cupomfixo) {
    return cy.api({
      method: 'POST',
      url: 'http://localhost:3030/api/coupons',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cupomfixo,
    })
  }

  validarCupomCadastrado(response) {
    expect(response.status).to.eq(201)
  }
}

export default new CuponsApi()
