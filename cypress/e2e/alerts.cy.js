/* eslint-disable cypress/no-unnecessary-waiting */

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.clickButton('#alertButton');

    cy.on('window:alert', (message) => {
      expect(message).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clickButton('#timerAlertButton');

    cy.wait(5000);

    cy.on('window:alert', (message) => {
      expect(message).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.clickButton('#confirmButton');

    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Do you confirm action?');
    });

    cy.confirmText('#confirmResult', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.clickButton('#confirmButton');

    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Do you confirm action?');
      return false;
    });

    cy.confirmText('#confirmResult', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const message = 'Maksym Akhtamov';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(message);
    });

    cy.clickButton('#promtButton');

    cy.confirmText('#promptResult', `You entered ${message}`);
  });
});
