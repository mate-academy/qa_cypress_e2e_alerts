describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();

    cy.get('#timerAlertButton').click();

    cy.tick(5000).then(() => {
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    })
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'Vlad';

    cy.get('#promtButton').click();

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    })
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', `You entered ${name}`);
  });
});
