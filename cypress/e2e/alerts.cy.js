import 'cypress-network-idle';

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
    // cy.waitForNetworkIdle(2000);
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.waitForNetworkIdle(2000);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.contains('Do you confirm action?');
    });
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.contains('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Dominik';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', `You entered ${name}`);
  });
});
