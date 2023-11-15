import AlertPageObject from '../support/pages/alert.PageObject';

const alert = new AlertPageObject();

describe('Cypress application', () => {
  beforeEach(() => {
    alert.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();

    alert.assertAllert('You clicked a button');
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000);

    alert.assertAllert('This alert appeared after 5 seconds');
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    alert.assertAllert('Do you confirm action?');

    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false;
    });

    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((text) => {
      cy.stub(text, 'prompt').returns('Mikhail');
      cy.get('#promtButton').click();
      cy.get('#promptResult').should('contain', 'Mikhail');
    });
  });
});
