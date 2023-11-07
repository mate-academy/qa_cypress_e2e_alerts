describe('Cypress application', () => {
  beforeEach(() => {
   cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
   cy.get('#alertButton')
    .click();
   cy.on('window:alert', (str) => {
    expect(str).to.equal('You clicked a button');
   });
  });

  it('should have the ability to assert scheduled allert', () => {
   cy.get('#timerAlertButton')
    .click();
   cy.on('window:alert', (str) => {
    expect(str).to.equal('This alert appeared after 5 seconds');
   });
  });

  it('should autimatically resolve alerts', () => {
   cy.get('#confirmButton')
    .click();
   cy.on('window:confirm', () => true);
   cy.on('window:alert', (str) => {
    expect(str).to.equal('You selected Ok');
   });
   cy.get('#confirmResult')
    .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
   cy.get('#confirmButton')
    .click();
   cy.on('window:confirm', () => false);
   cy.on('window:alert', (str) => {
    expect(str).to.equal('You selected Cancel');
   });
   cy.get('#confirmResult')
    .should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
   cy.window().then((win) => {
    win.prompt = () => 'Vasyl';
    });
   cy.get('#promtButton')
    .click();
   cy.get('#promptResult')
    .should('contain', 'Vasyl');
  });
});
