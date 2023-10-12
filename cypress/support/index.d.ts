/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getElementById(id: string): Chainable<any>;
    assertAlert(alertText: string): Chainable<any>;
  }
}
