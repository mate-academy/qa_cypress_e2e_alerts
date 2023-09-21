describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return true;
    });
    cy.get('#confirmResult').should('have.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('have.text', 'You selected Cancel');
  });

  it.only('should have the ability to enter text to alert', () => {
    let enteredName;

    cy.get('#promtButton').click();

    cy.window().then((win) => {
      cy.stub(win, 'prompt').callsFake((promptText) => {
        expect(promptText).to.equal('Please enter your name');
        enteredName = promptText;
        return enteredName;
      });
    });

    cy.on('window:confirm', () => true);

    cy.get('#promptResult').should('have.text', 'You entered: ' + enteredName);
  });
});
