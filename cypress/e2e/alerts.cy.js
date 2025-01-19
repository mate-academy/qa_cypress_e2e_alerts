/// <reference types='cypress' />

describe('Cypress application', () => {
  before(() => {
    // Visit the DemoQA alerts page
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    // Click on the first button to trigger the alert
    cy.get('#alertButton').click();

    // Assert the text inside the alert
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    // Click on the second button to trigger the scheduled alert
    cy.get('#timerAlertButton').click();

    // Assert the alert appears after 5 seconds
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000); // Wait for the scheduled alert to appear
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    // Click on the third button to trigger the confirm alert
    cy.get('#confirmButton').click();

    // Assert the text inside the alert
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
    });

    // Click Ok to automatically resolve the alert
    cy.on('window:confirm', () => true); // Automatically click 'Ok'

    // Assert the confirmation message is shown after clicking Ok
    cy.get('#result').should('have.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    // Click on the third button to trigger the confirm alert again
    cy.get('#confirmButton').click();

    // Assert the text inside the alert
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
    });

    // Click Cancel to close the alert without confirming
    cy.on('window:confirm', () => false); // Automatically click 'Cancel'

    // Assert the confirmation message shows "You selected Cancel"
    cy.get('#result').should('have.text', 'You selected Cancel');
  });

  it('should have the ability to enter text into alert', () => {
    // Click on the prompt button to trigger the prompt alert
    cy.get('#promtButton').click();

    // Assert the prompt text
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Hello, Cypress!'); // Simulate entering text
    });

    // Trigger the prompt alert
    cy.on('window:prompt', (promptText) => {
      expect(promptText).to.include('Please enter your name');
    });

    // Assert that the entered text appears in the result
    cy.get('#result').should('have.text', 'You entered: Hello, Cypress!');
  });
});
