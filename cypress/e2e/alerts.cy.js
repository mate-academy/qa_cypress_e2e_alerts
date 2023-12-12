describe('Cypress application', () => {
  beforeEach(() => {
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.clock();
    cy.get('#timerAlertButton').click();
    cy.tick(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Do you confirm action?`);
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.visit('https://demoqa.com/alerts');
    cy.get('#confirmButton').click();
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.visit('https://demoqa.com/alerts', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('That is my name');
        cy.get('#promtButton').click();
        cy.get('#promptResult')
          .should('contain', 'You entered That is my name');
      }
    });
  });
});
