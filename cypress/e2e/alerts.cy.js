describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`You clicked a button`);
    });
  });
  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.get('#timerAlertButton').click();
    cy.tick(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.contains('#confirmResult', 'Ok').should('exist');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
      return false;
    });
    cy.contains('#confirmResult', 'Cancel').should('exist');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Diana');
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Please enter your name');
    });
    cy.get('#promptResult').should('contain', 'Diana');
  });
});
