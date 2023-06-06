describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.contains('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();

    cy.wait(5000);

    cy.on('window:alert', (str) => {
      expect(str).to.contains('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.contains('Do you confirm action?');
    });

    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', cy.stub().returns(false));

    cy.get('#confirmResult')
    .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
      cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Test')
      cy.get('#promtButton')
        .click()
      cy.get('#promptResult')
        .should('contain', 'You entered Test');
    });
  });
});
