/// <reference types='cypress' />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.get('#timerAlertButton')
      .wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return true;
    });
    cy.get('#alertButton')
      .click();
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window()
      .then((win) => {
        cy.stub(win, 'prompt').returns('Anastasiia');
      });
    cy.get('#promtButton')
      .click();
    cy.get('#promptResult')
      .should('contain', 'You entered Anastasiia');
  });
});
