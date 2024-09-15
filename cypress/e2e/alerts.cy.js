describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return true;
    });

    cy.contains('#confirmResult', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return false;
    });

    cy.contains('#confirmResult', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    const inputText = 'mytext123';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(inputText);
    });

    cy.get('#promtButton').click();
    cy.contains('#promptResult', `You entered ${inputText}`);
  });
});
