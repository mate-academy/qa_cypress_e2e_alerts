describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.findById('alertButton').click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();

    cy.findById('timerAlertButton').click();

    cy.tick(5000).then(() => {
      cy.on('window:alert', (text) => {
        expect(text).to.equal('This alert appeared after 5 seconds');
      });
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Do you confirm action?');
    });

    cy.findById('confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false;
    });

    cy.findById('confirmResult').should('contain', 'You selected Cancel');
  });
});
