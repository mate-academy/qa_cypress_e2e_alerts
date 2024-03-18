/* eslint-disable cypress/no-unnecessary-waiting */

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (string) => {
      expect(string).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (string) => {
      expect(string).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm ', (string) => {
      expect(string).to.equal('Do you confirm action?');
      return true;
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
      return false;
    });
  });

  it.only('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Olena');
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (string) => {
      expect(string).to.equal('Olena');
    });
  });
});
