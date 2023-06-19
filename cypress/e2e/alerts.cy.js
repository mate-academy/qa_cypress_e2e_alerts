describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click()
      .wait(5000)

    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click()
      .wait(5000)

    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return true;
    });

    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false; 
    });

    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
    });

  it('should have the ability to enter text to alert', () => {
    const name = 'Name';

    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns(name);
    });

    cy.get('#promtButton')
      .click(); 

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please enter your name');
      return true;
    });

    cy.get('#promptResult')
      .should('contain', name);
  });
});
