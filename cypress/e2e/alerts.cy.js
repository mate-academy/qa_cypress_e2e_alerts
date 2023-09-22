describe('Cypress application', () => {
  const firstAlert = 'You clicked a button';
  const secondAlert = 'This alert appeared after 5 seconds';
  const thirdAlert = 'Do you confirm action?';

  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(firstAlert);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(secondAlert);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(thirdAlert);
    });
    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(thirdAlert);
    });
    cy.on('window:confirm', () => {
      return false;
    });

    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Myroslava');
      cy.get('#promtButton').click();
      cy.get('#promptResult').contains('Myroslava');
    });
  });
});
