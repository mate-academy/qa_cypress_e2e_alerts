describe('Cypress application', () => {
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    // Click on the first button and assert the alert text
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.visit('https://demoqa.com/alerts');
    // Click on the second button and assert the alert text is shown after 5 seconds
    cy.get('#timerAlertButton').click();
    cy.wait(5000); // Wait for 5 seconds
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    // Click on the third button and assert the alert text and confirmation message
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Are you sure you want to proceed?');
      return true; // Automatically accept the confirmation
    });
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    // Click on the third button and assert
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.visit('https://demoqa.com/alerts');
    // Click on the third button and assert
    const name = 'Olga';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered ' + name);
  });
});
