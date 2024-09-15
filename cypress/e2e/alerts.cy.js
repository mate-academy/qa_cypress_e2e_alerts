describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();

    cy.wait(5000);

    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
      return false;
    });
  });

  it('should have the ability to enter text to alert', () => {
    const alertText = 'Hello';

    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns(alertText);
    });

    cy.get('#promtButton')
      .click();

    cy.get('#promptResult')
      .should('contain', `You entered ${alertText}`);
  });
});
