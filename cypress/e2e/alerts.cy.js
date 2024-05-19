/// <reference types = 'cypress'/>

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should have the ability to assert automatically resolved alerts',
    () => {
      cy.get('#alertButton').click();
      cy.on('window:alert', (alert) => {
        expect(alert).to.equal('You clicked a button');
      });
    });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmS) => {
      expect(confirmS).to.equal('Do you confirm action?');
      cy.contains('Ok').click();
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmS) => {
      expect(confirmS).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const myName = 'Maksym';

    cy.window().then((addedName) => {
      cy.stub(addedName, 'prompt').returns(myName);
    });

    cy.get('#promtButton').click();

    cy.get('#promptResult')
      .should('contain', 'You entered ' + myName);
  });
});
