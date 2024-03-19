describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    const alertMessage = 'You clicked a button';

    cy.get('#alertButton').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(alertMessage);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    const alertMessage = 'This alert appeared after 5 seconds';

    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(alertMessage);
    });
  });

  it('should autimatically resolve alerts', () => {
    const confirmMessage = 'You selected Ok';

    cy.get('#confirmButton').click();
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain.text', confirmMessage);
  });

  it('should have the ability to Cancel alerts', () => {
    const confirmMessage = 'Do you confirm action?';
    const resultMessage = 'You selected Cancel';

    cy.contains('#confirmButton', 'Click me').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(confirmMessage);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', resultMessage);
  });

  it('should have the ability to enter text to alert', () => {
    const enteredText = 'Anatolii';
    const expectedResult = `You entered ${enteredText}`;

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(enteredText);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', expectedResult);
  });
});
