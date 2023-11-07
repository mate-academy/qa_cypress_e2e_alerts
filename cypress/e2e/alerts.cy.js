describe('Cypress application', () => {
  const alertMessage = {
    clickOnButton: 'You clicked a button',
    allertAppearedAfterTime: 'This alert appeared after 5 seconds',
    confirmAction: 'Do you confirm action?',
    enterYourName: 'Please enter your name'
  };

  beforeEach(() => {
    cy.visit('/')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
    .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.clickOnButton);
  });
});

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.allertAppearedAfterTime);
    cy.intercept('allertAppearedAfterTime')
    cy.wait('@allertAppearedAfterTime');
  });
});
    
  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
    .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.confirmAction);
    cy.get('button', 'Ok')
      .click()
  });
});

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
    .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.confirmAction);
    cy.get('button', 'Cancel')
      .click();
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });
});

  it('should have the ability to enter text to alert', () => {
    cy.get('#confirmButton')
    .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.enterYourName);
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });
    cy.window().then((win) => {
    cy.stub(win, 'prompt')
      .returns('Zlata');
    cy.get('#promtButton')
      .click();
    cy.get('#promptResult')
      .should('contain', 'You entered Zlata');
    });
  });
});
