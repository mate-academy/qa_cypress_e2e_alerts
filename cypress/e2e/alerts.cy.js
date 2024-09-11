describe('Cypress application', () => {
  let user;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });

  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.window().then((win) => {
      cy.clock();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('This alert appeared after 5 seconds');
        cy.tick(5000);
      });
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      cy.contains('button', 'OK').click();
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');

  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');

      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should enter text into the prompt and click OK', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Piotr');
      cy.get('#promtButton').click();
    });
    cy.get('#promptResult').should('contain', 'You entered Piotr');
  });
});
