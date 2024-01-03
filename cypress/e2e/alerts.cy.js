describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    const stub = cy.stub();

    cy.on('window:alert', stub);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#alertButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('You clicked a button');
      });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.clock();
    cy.get('#timerAlertButton').click();
    cy.tick(5000);
    cy.on('window:alert', (alertText) => {
      // eslint-disable-next-line max-len
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
    });
    cy.on('window:confirm', () => true);
    cy.get('.text-success').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', () => false);
    cy.get('.text-success').should('contain', 'You selected Cancel');
  });
});
