function obterCredenciaisAdministrador() {
  return {
    email: Cypress.env('ADMIN_EMAIL') || 'qa@adminlab.com',
    password: Cypress.env('ADMIN_PASSWORD') || 'pwd123',
  }
}

export { obterCredenciaisAdministrador }
