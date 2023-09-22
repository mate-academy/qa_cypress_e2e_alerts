describe('Cypress application', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
    });

    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
      return false;
    });

    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Dima!');
      cy.get('#promtButton').click();
      cy.get('#promptResult').should('contain', 'Dima!');
    });
  });
});
