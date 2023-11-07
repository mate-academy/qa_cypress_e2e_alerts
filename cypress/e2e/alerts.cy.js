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
});
