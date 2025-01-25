/// <reference types='cypress' />

Cypress.Commands.add('getButtonById', (id) => {
  cy.get(`#${id}`).should('be.visible').click();
});

Cypress.Commands.add('confirmResult', (selector, expectedText) => {
  cy.get(selector).should('be.visible').and('contain.text', expectedText);
});

Cypress.Commands.add('handleAlert', (expectedText) => {
  cy.on('window:alert', (text) => {
    expect(text).to.eq(expectedText);
    return true;
  });
});

Cypress.Commands.add('handleConfirm', (expectedText) => {
  cy.on('window:confirm', (text) => {
    expect(text).to.eq(expectedText);
  });
});
