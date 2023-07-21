describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // eslint-disable-next-line max-len
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.findById('alertButton').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You clicked a button`);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.findById('timerAlertButton').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`This alert appeared after 5 seconds`);
    });
  });
  it('should autimatically resolve alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
    });

    cy.findById('confirmResult').should('contain.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
      return false;
    });

    cy.findById('confirmResult').should('contain.text', 'You selected Cancel');
  });
});
