describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  // eslint-disable-next-line max-len
  it('should have the ability to assert automatically resolved alerts after clicking on 1 button', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`This alert appeared after 5 seconds`);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal(`Do you confirm action?`);
      return true;
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal(`Do you confirm action?`);
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Dmytro');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered Dmytro');
  });
});
