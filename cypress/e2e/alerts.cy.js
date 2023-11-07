describe('Cypress application', () => {
  const alerts = {
    clickButton: 'You clicked a button',
    fiveSecAlert: 'This alert appeared after 5 seconds',
    confirmAlert: 'Do you confirm action?',
    enterName: 'Please enter your name'
  }
  const confirmMessage = {
    okMessage: 'You selected Ok',
    cancelMessage: 'You selected Cancel',
  }
  const user = {
    name: 'Oksana'
  }
  beforeEach(() => {
    cy.visit('/alerts');

  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
     .click();
    cy.on('window:alert', (str) => {
     expect(str).to.equal(alerts.clickButton);
  });
});

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
     .click();
    cy.on('window:alert', (str) => {
     expect(str).to.equal(alerts.fiveSecAlert);
    
  });
});

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
     .click();
    cy.on('window:alert', (str) => {
     expect(str).to.equal(alerts.confirmAlert);
    cy.get('button', 'Ok')
     .click();
    cy.get('#confirmResult')
     should('contain', confirmMessage.okMessage);
  });
});

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
     .click();
    cy.on('window:alert', (str) => {
     expect(str).to.equal(alerts.confirmAlert);
    cy.get('button', 'Cancel')
     .click();
    cy.get('#confirmResult')
     should('contain', confirmMessage.cancelMessage);


  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt')
      .type(user.name);
    });
    cy.get('#promtButton')
     .click();
    cy.on('window:alert', (str) => {
     expect(str).to.equal(alerts.enterName);
  });
    cy.get('#promptResult')
     should('contain', user.name);
});

});
});