/// <reference types="cypress" />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.getById('alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.getById('timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`This alert appeared after 5 seconds`);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.getById('confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
    });
    cy.getById('confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.getById('confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
      return false;
    });
    cy.getById('confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((str) => {
      cy.stub(str, 'prompt').returns('Danylo');
    });
    cy.getById('promtButton').click();
    cy.getById('promptResult').should('contain', 'You entered Danylo');
  });
});
