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

    cy.wait(5000).then(() => {
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('This alert appeared after 5 seconds');
      });
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      cy.get('button', 'OK').click();
    });

    cy.contains('#confirmResult', 'You selected Ok')
      .should.exist;
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();

    cy.on('window:confirm', () => {
      return false;
    });
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      cy.get('button', 'Cancel').click();
    });

    cy.contains('#confirmResult', 'You selected Cancel')
      .should.exist;
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Vitalia');
    });
    cy.get('#promtButton').click();
    cy.contains('Vitalia').should.exist;
  });
});
