/// <reference types='cypress' />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.getById('#alertButton');
    cy.checkAlert('You clicked a button');
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.getById('#timerAlertButton');
    cy.tick(5000);

    cy.checkAlert('This alert appeared after 5 seconds');
  });

  it('should automatically resolve alerts', () => {
    cy.getById('#confirmButton');
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
    });
    cy.getById('#confirmResult').should('contain.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.getById('#confirmButton');
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
      return false;
    });
    cy.getById('#confirmResult').should('contain.text', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Alina';
    cy.window().then(function(win) {
      cy.stub(win, 'prompt').returns(name);
    });

    cy.getById('#promtButton');
    cy.getById('#promptResult').should('contain.text', name);
  });
});
