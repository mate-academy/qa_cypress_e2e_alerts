describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.contains('button', 'Click me').click();
    cy.on('window:confirm', () => true);
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000); // Wait for 5 seconds (adjust as needed)
    // Use cy.on() to listen for the window:alert event
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('This alert appeared after 5 seconds');
    });
  });
  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Do you confirm action?');
    });
    cy.on('window:confirm', () => {
      // Confirm the dialog by accepting it (pressing OK)
      return true;
    });
    cy.get('#confirmResult')
      .should('contain.text', 'You selected Ok');
  });
  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Do you confirm action?');
    });
    cy.on('window:confirm', () => {
      // Reject the dialog by refusing it (pressing cancel)
      return false;
    });
    cy.get('#confirmResult')
      .should('contain.text', 'You selected Cancel');
  });
  it('should have the ability to enter text to alert', () => {
    // Define the username variable with the name you want to enter
    const username = 'JohnDoe';

    cy.get('#promtButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please enter your name');
    });

    cy.window().then((win) => {
      win.prompt = () => username;
    });

    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('#promptResult').should('contain.text', username);
  });
});
