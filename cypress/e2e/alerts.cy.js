/* eslint-disable cypress/no-unnecessary-waiting */

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    const alertMessage = 'You clicked a button';

    cy.get('#alertButton').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(alertMessage);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    const alertMessage = 'This alert appeared after 5 seconds';

    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(alertMessage);
    });
  });

  it('should autimatically resolve alerts', () => {
    const confirmMessage = 'You selected Ok';

    cy.get('#confirmButton').click();
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain.text', confirmMessage);
  });

  it('should have the ability to Cancel alerts', () => {
    const confirmMessage = 'You selected Cancel';

    cy.get('#confirmButton').click();
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain.text', confirmMessage);
  });
});
