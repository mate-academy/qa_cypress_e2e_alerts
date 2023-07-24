Cypress.Commands.add('pickId', (id) => {
  cy.get(`[id="${id}"]`);
})
