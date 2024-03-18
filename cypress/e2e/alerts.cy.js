describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    const alertMessage = 'You clicked a button';

    cy.get('#alertButton').contains('Click me').click();
    cy.on('window:alert', (string) => {
    expect(string).to.equal(alertMessage);   
     });
  });

  it('should have the ability to assert scheduled allert', () => {
    const alertMessage5seconds = 'This alert appeared after 5 seconds';

    cy.get('#timerAlertButton').contains('Click me').click();
    cy.wait(5000);
    cy.on('window:alert', (string) => {
      expect(string).to.equal(alertMessage5seconds);
    });
  });

  it('should autimatically resolve alerts', () => {
    const confirmMessage = 'You selected Ok';
    const confirmQuestion = 'Do you confirm action?';

    cy.get('#confirmButton').contains('Click me').click();
    cy.on('window:confirm', (string) => {
    expect(string).to.equal(confirmQuestion);
    });
    cy.on('window:confirm', () => true);
    cy.get('#confirmResult').should('contain', confirmMessage);
  });

  it('should have the ability to Cancel alerts', () => {
    const confirmQuestion = 'Do you confirm action?';
    const cancelQuestion = 'You selected Cancel';

    cy.get('#confirmButton').contains('Click me').click();
    cy.on('window:confirm', (string) => {
    expect(string).to.equal(confirmQuestion);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult').should('contain', cancelQuestion);
  });

  it('should have the ability to enter text to alert', () => {
    const textEntername = "Please enter your name";
    const textPromptAlert = "Oksana";
    
    cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(textPromptAlert);
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (string) => {
      expect(string).to.equal(textEntername);
    });
    cy.get('#promptResult').should('contain', textPromptAlert);
  
  });
});



