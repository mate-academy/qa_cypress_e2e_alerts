/// <reference types="cypress" />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('assert the text inside the alert after clickin on the first button', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
  });
  
  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should have the ability to confirm action in the allert window', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return true;
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('You selected Ok');
    });
  });

  it('should have the ability to cancel action in the allert window', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false; 
    });
  
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Anton';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });
  
    cy.get('#promtButton').click(); 

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please enter your name');
      return true;
    });
  
    cy.get('#promptResult').should('contain', name);
  });
});
