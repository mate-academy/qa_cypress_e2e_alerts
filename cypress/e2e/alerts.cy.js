describe('Cypress application', () => {
  it('should assert the text inside the alert after clicking the first button', () => {
    cy.visit('https://demoqa.com/alerts');

 // Click on the first button
    cy.get('button#alertButton').click();

    // Assert the text inside the alert
    cy.on('window:alert', (str) => {
      expect(str).to.eq('You clicked a button');
    });
  });

  it('should assert the text inside the alert after clicking the second button with a delay', () => {
    cy.visit('https://demoqa.com/alerts');

    // Click on the second button
    cy.get('button#timerAlertButton').click();

    // Assert the text inside the alert after a delay of 5 seconds
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.eq('This alert appeared after 5 seconds');
    });
  });

  it('should assert the text inside the alert after clicking the third button', () => {
    cy.visit('https://demoqa.com/alerts');

    // Click on the third button
    cy.get('button#confirmButton').click();

    // Click on the "Click me" button in the alert
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
      return true; // Accept the confirmation
    });

    // Assert "You selected Ok" message
    cy.on('window:alert', (str) => {
      expect(str).to.eq('You selected Ok');
    });
  });

  it('should assert the text inside the alert after clicking the third button', () => {
    cy.visit('https://demoqa.com/alerts');

    // Click on the third button
    cy.get('button#confirmButton').click();

    // Click on the "Click me" button in the alert
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
      return false; // Accept the confirmation
    });

    // Assert "You selected Ok" message
    cy.on('window:alert', (str) => {
      expect(str).to.eq('You selected Cancel');
    });
  });
});
