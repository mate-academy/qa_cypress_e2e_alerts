describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
     cy.get('#alertButton').contains('Click me').click();
     cy.on('window:alert', (string) => {
      expect(string).to.equal('You clicked a button');   
     });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').contains('Click me').click();
    cy.wait(5000);
    cy.on('window:alert', (string) => {
      expect(string).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').contains('Click me').click();
    cy.on('window:confirm', (string) => {
    expect(string).to.equal(`Do you confirm action?`);
    });
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').contains('Click me').click();
    cy.on('window:confirm', (string) => {
    expect(string).to.equal(`Do you confirm action?`);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Oksana');
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (string) => {
      expect(string).to.equal('Please enter your name');
    });
    cy.get('#promptResult').should('contain', 'Oksana');
  
  });
});



