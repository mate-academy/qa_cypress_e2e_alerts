describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click()
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
    cy.get('#confirmResult').should('contain.text', 'You selected Ok');
    return true;
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
    cy.get('#confirmResult').should('contain.text', 'You selected Cancel');
    return false;
    });
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Sasha');
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain.text', 'You entered Sasha');
  });
  });
});

