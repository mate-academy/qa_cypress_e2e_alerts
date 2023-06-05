/// <reference types='cypress' />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  const name = 'Oleksandr';

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('You clicked a button')
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.window().then((win) => {
    cy.stub(win, 'alert').as('alertStub'); 
    });
    cy.wait(5000); 
    cy.get('@alertStub').should('be.called');
  });

  it('should autimatically resolve alerts', () => {
    cy.on("window:confirm", (s) => {
      return true;
   });
    cy.get('#confirmButton')
      .click();
    cy.get('#confirmResult')
      .should('contain','You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.on("window:confirm", (s) => {
      return false;
   });
    cy.get('#confirmButton')
      .click();
    cy.get('#confirmResult')
      .should('contain','You selected Cancel');  
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns(name);
    });
    cy.get('#promtButton')
      .click();
    cy.get('#promptResult')
      .should('contain',`You entered ${name}`);
  });
});

