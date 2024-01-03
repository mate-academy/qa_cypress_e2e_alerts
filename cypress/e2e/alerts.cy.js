describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');

  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').contains('Click me').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');   
     });

  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').contains('Click me').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');   
     });
 
  });


  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').contains('Click me').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Do you confirm action?');   
    });
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
      return true;
    });
    cy.contains('#confirmResult', 'You selected Ok').should('contain', 'You selected Ok');

});


  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').contains('Click me').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you confirm action?');
      return false;
   });
    cy.contains('#confirmResult', 'You selected Cancel').should('contain', 'You selected Cancel');

  });

  it('should have the ability to enter text to alert', () => {
    

    cy.window().then(win => {
   
    cy.stub(win, 'prompt').returns('Sara Conor');
    cy.get('#promtButton').contains('Click me').click();     
    

  });
  cy.contains('#promptResult', 'You entered Sara Conor').should('contain', 'You entered Sara Conor');

});
});

