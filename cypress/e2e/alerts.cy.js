describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`This alert appeared after 5 seconds`);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
      cy.get('#confirmResult')
        .should('contain', 'You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
      expect(str).to.eq('second confirm');
      cy.get('#confirmResult')
        .should('contain', 'You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    cy.on('window:prompt', (str) => {
      cy.window().then((win) => {
        win.promptInput = 'Illia';
      });
    });
    cy.get('#promtButton')
      .click();
    cy.on('window:alert', (str) => {
      cy.window().then((win) => {
        expect(str).to.equal('You entered Illia');
      });
    });
  });
});
