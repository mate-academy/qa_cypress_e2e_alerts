describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (message) => {
      expect(message).to.equal('You clicked a button');
    }); 
  });
  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (message) => {
      expect(message).to.equal('This alert appeared after 5 seconds');
    });
  });
  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('')
      .click('{enter');
    });
    cy.contains('#confirmResult', 'You selected Ok').should('exist');
  });
  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('testdata');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered testdata');
  });
});
