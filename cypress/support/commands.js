Cypress.Commands.add('getElementById', (id) => {
  cy.get(`#${id}`);
});
