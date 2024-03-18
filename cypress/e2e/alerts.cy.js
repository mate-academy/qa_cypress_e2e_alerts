/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */
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

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (string) => {
      expect(string).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
    },
    cy.on('window:confirm', () => true));
    cy.get('#confirmResult').should('contain.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
    },
    cy.on('window:confirm', () => false));
    cy.get('#confirmResult').should('contain.text', 'You selected Cancel');
  });
});
