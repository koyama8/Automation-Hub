/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    iniciar(): Chainable<void>
    loginLocal(email?: string, senha?: string): Chainable<void>
  }
}
