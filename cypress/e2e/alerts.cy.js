describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.be.eql('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();

    // cy.wait(5000);

    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.be.eql('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (confirm) => {
      expect(confirm)
        .to.be.eql('Do you confirm action?');

      return true;
    });

    cy.assertConfirmMessage('confirmResult', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (confirm) => {
      expect(confirm)
        .to.be.eql('Do you confirm action?');

      return false;
    });

    cy.assertConfirmMessage('confirmResult', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Tykhon';

    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns(name);
    });

    cy.get('#promtButton')
      .click();

    cy.assertConfirmMessage('promptResult', `You entered ${name}`);
  });
});
