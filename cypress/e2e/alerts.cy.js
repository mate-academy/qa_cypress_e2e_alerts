describe('Cypress application', () => {
  const alertMessages = {
    clickedAlert: 'You clicked a button',
    appearedAfter5s: 'This alert appeared after 5 seconds',
    corfirmAlert: 'Do you confirm action?',
    enterNameAlert: 'Please enter your name'
  };

  beforeEach(() => {
    cy.visit('alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessages.clickedAlert);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    // cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessages.appearedAfter5s);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessages.corfirmAlert);
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alert.confirmAlert);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.get('#promtButton')
        .click();
      cy.stub(win, 'prompt')
        .returns('Sasha');
      cy.get('#promptResult')
        .should('contain', 'You entered Sasha');
    });
  });
});
