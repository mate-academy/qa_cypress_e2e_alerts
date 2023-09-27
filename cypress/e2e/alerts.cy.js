describe('Cypress Alerts', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should automatically resolve alerts and assert the message', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
  });

  it('should assert a scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve confirms and assert the result', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return true;
    });

    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should automatically reject confirms and assert the result', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false; 
    });

    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should enter text into a prompt alert and assert the result', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Dario'); 
      cy.get('#promtButton').click();
      cy.get('#promptResult').should('contain', 'You entered Dario');
    });
  });
});
