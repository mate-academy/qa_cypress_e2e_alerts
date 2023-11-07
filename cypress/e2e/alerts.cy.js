/// <reference types="cypress" />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.clock();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
      cy.get('#timerAlertButton').click();
      cy.tick(5000).then(() => {
        cy.get('@windowAlert').should('be.calledWith',
          'This alert appeared after 5 seconds');
      });
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.get('#confirmResult')
      .should('contain', 'Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult')
      .should('contain', 'Cancel');
  });

  it.only('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('SERHII');
      cy.get('#promtButton').click();
      cy.get('#promptResult').should('contain', 'SERHII');
    });
  });
});
