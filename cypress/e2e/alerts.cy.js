/// <reference types="cypress" />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('button[id="alertButton"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.get('button[id="timerAlertButton"]').click();
    cy.tick(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should have the ability to "Ok" alerts', () => {
    cy.get('button[id="confirmButton"]').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return true;
    });
    cy.contains('You selected Ok').should('be.visible');
  });

  it('should have the ability to "Cancel" alerts', () => {
    cy.get('button[id="confirmButton"]').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return false;
    });
    cy.contains('You selected Cancel').should('be.visible');
  });

  it('should have the ability to enter text to alert', () => {
    cy.get('button[id="promtButton"]').click();
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('YourName');
      cy.get('#promtButton').click();
    });
    cy.get('#promptResult').should('have.text', 'You entered YourName');
  });
});
