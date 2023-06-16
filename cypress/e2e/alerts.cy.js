describe('Cypress application', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    })
    cy.on('window:confirm', () => true);
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`)
    });
    cy.get('#confirmResult').should('have.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click(); 
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`)
    })
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('have.text', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
      cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Anna');
      });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('have.text', 'You entered Anna');
  });
});
