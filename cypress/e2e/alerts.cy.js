describe('Cypress application', () => {
  before(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This alert appeared after 5 seconds');
    })
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
    cy.get('#confirmResult').contains('You selected Ok');
    })
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton'). click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
    cy.get('#confirmResult').contains('You selected Cancel');
    })
  });

  it('should have the ability to enter text to alert', () => {
    cy.get('#promtButton'). click();
    cy.on('window:promt', (text) => {
      expect(text).to.contains('Please enter your name');
    cy.window().then((win) => {
      cy.stub(win, 'promt').returns('Olesia');
      cy.get('#promptResult').contains('You entered Olesia');
    })
  })
  });
});
