describe('Cypress application', () => {
  const alertMessage = {
    click: 'You clicked a button',
    clickTimer: 'This alert appeared after 5 seconds',
    clickConfirm: 'Do you confirm action?'
  };
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();

    cy.removeAllListeners('window:alert');
    cy.on('window:alert', (confirm) => {
      expect(confirm).to.equal(alertMessage.click);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();

    cy.wait(5000);

    cy.removeAllListeners('window:alert');
    cy.on('window:alert', (confirm) => {
      expect(confirm).to.equal(alertMessage.clickTimer);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.removeAllListeners('window:alert');
    cy.on('window:alert', (confirm) => {
      expect(confirm).to.equal(alertMessage.clickConfirm);
    });

    cy.get('#confirmResult')
      .should('have.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.removeAllListeners('window:confirm');
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(alertMessage.clickConfirm);
      return false;
    });

    cy.get('#confirmResult')
      .should('have.text', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const text = 'Just text';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(text);
    });

    cy.get('#promtButton')
      .click();

    cy.get('#promptResult')
      .should('contain', text);
  });
});
