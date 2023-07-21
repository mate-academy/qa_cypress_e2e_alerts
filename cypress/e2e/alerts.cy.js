describe('Cypress application', () => {
  const testMessage = {
    alert1: 'You clicked a button',
    alert2: 'This alert appeared after 5 seconds',
    alert3: 'Do you confirm action?'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(testMessage.alert1);
    });
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(testMessage.alert2);
    });
  });

  it('should automatically resolve alerts', () => {
    cy.stub(window, 'confirm').returns(true);
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(testMessage.alert3);
    });
    cy.contains('#confirmResult', 'You selected Ok').should('be.visible');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.stub(window, 'confirm').returns(false);
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(testMessage.alert3);
      expect(alertText).to.equal('You selected Cancel');
    });
  });

  it('should fill the prompt and display the message on the page', () => {
    const textToEnter = 'im, Korbin Dalas';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(textToEnter);
    });

    cy.get('#promtButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(`You entered, ${textToEnter}!`);
    });
  });
});
