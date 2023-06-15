describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('This alert appeared after 5 seconds');
    })
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.eq('Do you confirm action?');
      cy.get('#confirmResult').should('contain', 'You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.contains('Cancel').click();
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.get('#promtButton').click();
      cy.stub(win, 'prompt').returns('My Name');
      cy.get('#promptResult').should('contain', 'You entered My Name');
    })
  })
});
