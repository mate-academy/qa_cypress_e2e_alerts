describe('Cypress application', () => {
  const alertMessage = {
    clickedAButton: 'You clicked a button',
    alertAppearedAfter5Sec: 'This alert appeared after 5 seconds',
    doYouConfirmAction: 'Do you confirm action?',
    enterYourName: 'Please enter your name'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  // eslint-disable-next-line max-len
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.clickedAButton);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.alertAppearedAfter5Sec);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.doYouConfirmAction);
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.enterYourName);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns('Katrin');
      cy.get('#promtButton')
        .click();
      cy.get('#promptResult')
        .should('contain', 'You entered Katrin');
    });
  });
});
