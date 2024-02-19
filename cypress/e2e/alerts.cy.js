describe('Cypress application', () => {
  before(() => {

  });
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });
  });

  it.only('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });
});
