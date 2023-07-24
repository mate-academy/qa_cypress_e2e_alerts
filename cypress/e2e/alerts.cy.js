describe('Cypress application', () => {
  const alertMeassages = {
    message1: 'You clicked a button',
    message2: 'This alert appeared after 5 seconds',
    message3: 'Do you confirm action?'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMeassages.message1);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.wait(5000);

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMeassages.message2);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal(alertMeassages.message3);
    });

    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal(alertMeassages.message3);
      return false;
    });

    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((window) => {
      cy.stub(window, 'prompt').returns('Sofiia');
    });

    cy.get('#promtButton').click();

    cy.get('#promptResult').should('contain', 'You entered Sofiia');
  });
});
