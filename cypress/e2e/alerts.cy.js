describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.contains('.mr-3', 'Click Button to see alert ');
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.contains('.mr-3', 'On button click, alert will appear after 5 seconds ');
    cy.get('#timerAlertButton')
      .click();
    cy.tick(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`This alert appeared after 5 seconds`);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.contains('.mr-3', 'On button click, confirm box will appear');
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
    });
    cy.contains('#confirmResult', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.contains('.mr-3', 'On button click, confirm box will appear');
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
      return false;
    });
    cy.contains('#confirmResult', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Dmytro');
    });
    cy.get('#promtButton')
      .click();
    cy.get('#promptResult')
      .should('have.text', 'You entered Dmytro');
  });
});
