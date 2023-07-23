describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    /* eslint-disable */
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', () => true);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', () => false);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      cy.get('#confirmResult')
        .should('contain', 'You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    cy.window()
        .then((win) => {
        cy.stub(win, 'prompt')
          .returns('Mariana');
        cy.get('#promtButton')
          .click();
        cy.get('#promptResult')
          .should('contain', 'You entered Mariana');
      });
  });
});
