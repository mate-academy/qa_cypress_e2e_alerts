describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eql('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.get('#timerAlertButton').click();
    cy.tick(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.eql('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.eql('Do you confirm action?');
    });
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (cancel) => {
      expect(cancel).to.eql('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const alertText = 'Text inserted into alert';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(alertText);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', `You entered ${alertText}`);
  });
});
