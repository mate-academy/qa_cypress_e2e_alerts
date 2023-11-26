describe('Cypress application', () => {
  const user = {
    username: 'Vlad'
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
    cy.viewport(1920, 1080);
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('button[id="alertButton"]')
      .click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.get('button[id="timerAlertButton"]')
      .click();
    cy.tick(5000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(`This alert appeared after 5 seconds`);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('button[id="confirmButton"]')
      .click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal(`Do you confirm action?`);
      return true;
    });
    cy.contains('You selected Ok')
      .should('be.visible');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('button[id="confirmButton"]')
      .click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal(`Do you confirm action?`);
      return false;
    });
    cy.contains('You selected Cancel')
      .should('be.visible');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(user.username);
    });
    cy.get('button[id="promtButton"]')
      .click();
    cy.contains('You entered ' + user.username)
      .should('be.visible');
  });
});
