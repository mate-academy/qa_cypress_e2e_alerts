/* eslint-disable cypress/no-unnecessary-waiting */
describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatic resolved alerts', () => {
    cy.contains('#alertButton', 'Click me').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.contains('#timerAlertButton', 'Click me').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.contains('#confirmButton', 'Click me').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => true);
    cy.contains('You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.contains('#confirmButton', 'Click me').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.contains('You selected Cancel');
  });

  // it('should have the ability to enter text to alert', () => {

  // });
});
