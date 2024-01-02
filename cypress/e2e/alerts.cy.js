describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('1should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alerts) => {
      expect(alerts).to.equal('You clicked a button');
    });
  });

  it('2should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window:alert', (alerts) => {
      expect(alerts).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('3should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alerts) => {
      expect(alerts).to.equal('Do you confirm action?');
    });

    cy.get('#confirmResult').contains('You selected Ok');
  });

  it('4should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    // cy.on('window:confirm', () => false);
    cy.on('window:confirm', (alerts) => {
      expect(alerts).to.equal('Do you confirm action?');
      return false;
    });

    cy.get('#confirmResult').contains('You selected Cancel');
  });

  it('5should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Ivanna');
      cy.get('#promtButton').click();
      cy.get('#promptResult').contains('You entered Ivanna');
    });
  });
});
