describe('PUT /api/permissions/profiles/qa', () => {
  let adminToken
  let profileVersion

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      adminToken = tokengerado
    })
  })

  it('deve atualizar a matriz de permissões do perfil QA', () => {
    cy.api({
      method: 'GET',
      url: 'http://localhost:3030/api/permissions/profiles/qa',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      profileVersion = response.body.data.version

      cy.api({
        method: 'PUT',
        url: 'http://localhost:3030/api/permissions/profiles/qa',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: {
          version: profileVersion,
          reason: 'Revisao controlada da matriz padrao do perfil QA',
          permissions: [
            'clients:read',
            'clients:write',
            'contracts:read',
            'contracts:write',
            'products:read',
            'products:write',
            'cart:read',
            'cart:write',
            'orders:read',
            'orders:write',
            'payments:read',
            'payments:write',
            'coupons:read',
            'coupons:write',
            'evidences:read',
            'evidences:write',
            'reports:read',
            'reports:export',
          ],
        },
      }).then((response) => {})
    })
  })
})
