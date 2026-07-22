describe('DELETE /api/evidences - Exclusão de todas as evidências', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokenGerado) => {
      token = tokenGerado
    })
  })

  it('deve excluir todas as evidências cadastradas', () => {
    cy.api({
      method: 'DELETE',
      url: 'http://localhost:3030/api/evidences',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
