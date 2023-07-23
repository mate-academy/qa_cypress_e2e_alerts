describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('You clicked a button');
    });

  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('This alert appeared after 5 seconds');
    });
  });

 it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
    expect(str).to.equal(`Do you confirm action?`);
  });
    cy.get('#confirmResult').should('contain.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you confirm action?`);
    return false;
  });
    cy.get('#confirmResult').should('contain.text', 'You selected Cancel');
  });
  
  it.only('should fill the prompt and display the message on the page', () => {
    const username = 'Skikaka';
    cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(username);
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(`You entered, ${username}!`);
    });
    cy.get('#promptResult').should('contain.text', `You entered ${username}`);
  });
});
