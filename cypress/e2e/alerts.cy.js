describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts',
    () => {
      cy.get('#alertButton').click();
      cy.on('window:alert', (text) => {
        expect(text).to.eq('You clicked a button');
      });
    });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.eq('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('Do you confirm action?');
      return true;
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const myName = 'Anna';
    cy.window().then((yourName) => {
      cy.stub(yourName, 'prompt').returns(myName);
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', `You entered ${myName}`);
  });
});
