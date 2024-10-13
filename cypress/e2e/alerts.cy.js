describe('Cypress Alerts Handling', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should handle standard alerts automatically', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should handle scheduled alert after 5 seconds', () => {
    cy.get('#timerAlertButton', { timeout: 10000 }).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should handle confirm dialog with OK', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      return true;
    });

    cy.contains('You selected Ok').should('be.visible');
  });

  it('should handle confirm dialog with Cancel', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      return false;
    });

    cy.contains('You selected Cancel').should('be.visible');
  });
});
