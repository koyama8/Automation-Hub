describe('GET /api/permissions/users - Listagem de usuários com filtros', () => {
  let token

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve listar usuários QA ativos com filtros e ordenação', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/permissions/users?page=1&limit=10&profile=qa&status=active&sortBy=createdAt&sortOrder=desc',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
