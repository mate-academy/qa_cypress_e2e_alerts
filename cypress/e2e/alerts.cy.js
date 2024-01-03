describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.findById('alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.findById('timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.findById('confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Do you confirm action?');
    });
    cy.findById('confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.findById('confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Do you confirm action?');
      return false;
    });
    cy.findById('confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Yurii');
    });
    cy.findById('promtButton').click();
    cy.findById('promptResult').should('contain', 'You entered Yurii');
  });
});