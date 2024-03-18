describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (string) => {
      expect(string).to.equal('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (string) => {
      expect(string).to.equal('This alert appeared after 5 seconds')
    })
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
      return true;
    })
    cy.contains('#confirmResult', 'You selected Ok').should('be.visible');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (string) => {
      expect(string).to.equal('Do you confirm action?');
      return false;
    })
    cy.contains('#confirmResult', 'You selected Cancel').should('be.visible');
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'testqa';
    
    cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(name);
  });
     
    cy.get('#promtButton').click();
    cy.contains('#promptResult', 'You entered testqa').should('be.visible');
  });
});
