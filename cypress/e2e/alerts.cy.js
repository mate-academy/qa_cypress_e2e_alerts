describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').contains('Click me').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.contains('#confirmButton', 'Click me').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(`Do you confirm action?`);
    });
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.contains('#confirmButton', 'Click me').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(`Do you confirm action?`);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Anastasiia');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered Anastasiia');
  });
});
