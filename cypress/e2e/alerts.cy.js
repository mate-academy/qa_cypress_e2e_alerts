describe('Cypress application', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Do you confirm action?');
      cy.on('window:confirm', () => true);
    });
  });

  it('should have the ability to cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it.only('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Yurii');
      cy.get('#promtButton').click();
    });
    cy.get('#promptResult').should('contain', 'You entered Yurii');
  });
});
