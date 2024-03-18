/// <reference types='cypress' />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('#alertButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('You clicked a button');
      });
  });

  it('should have the ability to assert scheduled allert', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('#timerAlertButton').click();
    cy.wait(5000)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('This alert appeared after 5 seconds');
      });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
      return true;
    });
    cy.get('#confirmResult').should('contain.text', 'Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain.text', 'Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Viacheslav');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain.text', 'Viacheslav');
  });
});
