describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should click on the first button', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button').click({ enter: true });
    });
  });

  it('should click on the second button', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds')
        .click({ enter: true });
    });
  });

  it('should click on the third button', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Do you confirm action?').click({ enter: true });
    });

    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should click on the third button and choose cancel', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should click on the fourth button and check the name', () => {
    const name = 'Maxim';
    cy.window().then((win) => {
      cy.get('#promtButton').click();
      cy.stub(win, 'prompt').returns(name);
      cy.get('#promptResult').should('have.text', `You entered ${name}`);
    });
  });
});
