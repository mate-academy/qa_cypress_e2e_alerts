/* eslint-disable cypress/no-unnecessary-waiting */
describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      cy.alertAssertion(alert, 'You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);

    cy.on('window:alert', (alert) => {
      cy.alertAssertion(alert, 'This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Zakhar';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered ' + name);
  });
});
