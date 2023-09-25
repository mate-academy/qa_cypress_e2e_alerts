describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });
  it('Click on the first button and assert the text inside the alert.', () => {
    cy.contains('button', 'Click me').click();
    cy.on('window:confirm', () => true);
  });

  it('Click on the second button assert the' +
   'text inside the alert is shown in 5 secons.', () => {
    cy.get('button[id = "timerAlertButton"]').click();
    cy.wait(5000); // Wait for 5 seconds (adjust as needed)
    // Use cy.on() to listen for the window:alert event
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('This alert appeared after 5 seconds');
    });
  });
  it('Click on the third button' +
   'assert the text inside the allert' +
   'assert You selected Ok is shown.', () => {
    cy.get('button[id = "confirmButton"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Do you confirm action?');
    });
    cy.on('window:confirm', () => {
      // Confirm the dialog by accepting it (pressing OK)
      return true;
    });
    cy.get('span[id = "confirmResult"]')
      .should('contain.text', 'You selected Ok');
  });
  it('Click on the third button ' + 'assert the text inside the allert' +
   'assert You selected Cancel is shown.', () => {
    cy.get('button[id = "confirmButton"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Do you confirm action?');
    });
    cy.on('window:confirm', () => {
      // Reject the dialog by refusing it (pressing cancel)
      return false;
    });
    cy.get('span[id = "confirmResult"]')
      .should('contain.text', 'You selected Cancel');
  });
  it.only('Click on the fourth button and enter your name:' +
  'assert your name is shown on the page.', () => {
    // Define the username variable with the name you want to enter
    const username = 'JohnDoe';

    cy.get('button[id="promtButton"]').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please enter your name');
    });

    cy.window().then((win) => {
      win.prompt = () => username;
    });

    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('span[id="promptResult"]').should('contain.text', username);
  });
});
