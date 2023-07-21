describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:confirm', () => true);
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
    cy.on('window:confirm', () => true);
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const myName = 'Oleksandr';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(myName);
    });

    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', myName);
  });
});
