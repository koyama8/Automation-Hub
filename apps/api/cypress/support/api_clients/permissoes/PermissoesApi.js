class PermissoesApi {
  catalogo(token) {
    return this.requisitar(token, 'GET', '/api/permissions/catalog')
  }
  listarPerfis(token) {
    return this.requisitar(token, 'GET', '/api/permissions/profiles')
  }
  buscarPerfil(token, perfil) {
    return this.requisitar(token, 'GET', `/api/permissions/profiles/${perfil}`)
  }
  atualizarPerfil(token, perfil, dados) {
    return this.requisitar(token, 'PUT', `/api/permissions/profiles/${perfil}`, { body: dados })
  }
  listarUsuarios(token, query = {}) {
    return this.requisitar(token, 'GET', '/api/permissions/users', { qs: query })
  }
  buscarUsuario(token, userId) {
    return this.requisitar(token, 'GET', `/api/permissions/users/${userId}`)
  }

  criarUsuario(token, usuario, idempotencyKey, failOnStatusCode = true) {
    const headers = { Authorization: `Bearer ${token}` }
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey
    return cy.api({
      method: 'POST',
      url: '/api/permissions/users',
      headers,
      body: usuario,
      failOnStatusCode,
    })
  }

  atualizarPerfilUsuario(token, userId, dados, failOnStatusCode = true) {
    return this.requisitar(token, 'PATCH', `/api/permissions/users/${userId}/profile`, {
      body: dados,
      failOnStatusCode,
    })
  }

  atualizarAcesso(token, userId, dados) {
    return this.requisitar(token, 'PATCH', `/api/permissions/users/${userId}/access`, {
      body: dados,
    })
  }

  permissoesEfetivas(token, userId) {
    return this.requisitar(token, 'GET', `/api/permissions/users/${userId}/effective-permissions`)
  }

  revogarSessoes(token, userId, reason) {
    return this.requisitar(token, 'POST', `/api/permissions/users/${userId}/revoke-sessions`, {
      body: { reason },
    })
  }

  reenviarConvite(token, userId, reason) {
    return this.requisitar(token, 'POST', `/api/permissions/users/${userId}/invitation/resend`, {
      body: { reason },
    })
  }

  aceitarConvite(invitationToken, password) {
    return cy.api({
      method: 'POST',
      url: `/api/permissions/invitations/${invitationToken}/accept`,
      body: { password },
    })
  }

  auditoria(token, query = {}) {
    return this.requisitar(token, 'GET', '/api/permissions/audit', { qs: query })
  }

  requisitar(token, method, url, opcoes = {}) {
    return cy.api({ method, url, headers: { Authorization: `Bearer ${token}` }, ...opcoes })
  }
}

export default new PermissoesApi()
