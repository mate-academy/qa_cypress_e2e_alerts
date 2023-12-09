describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });


  it('should have the ability to assert automatically resolved alerts', () => {


    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
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
    cy.get('#confirmResult').should('have.text', 'You selected Ok');
    cy.get('#confirmButton').click();

  });
});

it('should have the ability to Cancel alerts', () => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal('have.text', 'You selected Cancel');
  });
});
