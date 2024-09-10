/* eslint-disable cypress/no-unnecessary-waiting */
describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts',
    () => {
      cy.get('#alertButton')
        .click();

      cy.on('window:alert', (str) => {
        expect(str).to.be.equal('You clicked a button');
      });
    });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.be.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.be.equal('Do you confirm action?');
    });

    cy.contains('#confirmResult', 'Ok')
      .should('exist');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.be.equal('Do you confirm action?');

      return false;
    });

    cy.contains('#confirmResult', 'Cancel')
      .should('exist');
  });

  it.only('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Denys');
    });

    cy.get('#promtButton')
      .click();

    cy.get('#promptResult')
      .should('include.text', 'Denys');
  });
});
