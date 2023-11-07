/// <reference types='cypress' />

describe('Cypress application', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    })
    cy.get('#timerAlertButton')
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    })
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
    })
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?')
    
      return false;
    })
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.get('#promtButton')
      .click();
      cy.stub(win, 'prompt').returns('Nataliya')
    });
    cy.get('#promptResult')
      .should('contain', 'You entered Nataliya')  
  });
});
