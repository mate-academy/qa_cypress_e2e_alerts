describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should assert the text inside the alert when the first button is clicked', () => {
    cy.get('#alertButton')
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  it('should assert the text inside the alert after 5 seconds when the second button is clicked', () => {
    cy.get('#timerAlertButton')
      .click();

    cy.wait(5000);

    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically handle resolved alerts when the third button is clicked', () => {
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    cy.get('#confirmButton')
      .click();

    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should be able to cancel alerts when the third button is clicked and Cancel is selected', () => {
    cy.window().then((win) => {
      cy.stub(win, 'confirm')
        .returns(false);
    });

    cy.get('#confirmButton')
      .click();

    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });

  it('should be able to enter text into an alert when the fourth button is clicked', () => {
    const testAlertText = 'Danylo Plutenko'

    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns(testAlertText);
    });

    cy.get('#promtButton')
      .click();

    cy.get('#promptResult')
      .should('contain', `You entered ${testAlertText}`);
  });
});