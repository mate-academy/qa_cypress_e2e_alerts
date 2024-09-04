// <reference types="cypress"/>
describe('Cypress Alerts', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should assert resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should assert scheduled alerts', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should resolve confirm alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return true;
    });
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You selected Ok');
    });
  });

  it('should cancel confirm alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return false;
    });
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You selected Cancel');
    });
  });

  it('should handle prompt alerts', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Alya');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('have.text', 'You entered Alya');
  });
});
