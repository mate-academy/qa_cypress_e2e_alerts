/// <reference types="cypress" />
describe('Cypress application', () => {
  before(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('[id="alertButton"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You clicked a button`);
    });
  });
  it('should have the ability to assert scheduled allert', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('[id="timerAlertButton"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contain('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('[id="confirmButton"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contains('Do you confirm action?');
    });
    cy.get('[id="confirmResult"]').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('[id="confirmButton"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contains('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('[id="confirmResult"]').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {

  });
});
