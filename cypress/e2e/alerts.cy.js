describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').contains('Click me').should('exist').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.wait(5000);

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.be.eql('Do you confirm action?');
      return true;
    });

    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.be.eql('Do you confirm action?');
      return false;

    cy.get('#confirmResult').should('contain', 'You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'David';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });

    cy.get('#promtButton').click();

    cy.get('#promptResult').contains('David').should('be.visible');
  });
});
