const alertMessage = {
  firstButton: 'You clicked a button',
  secondButton: 'This alert appeared after 5 seconds',
  thirdButton: 'Do you confirm action?'
};

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.findById('alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.firstButton);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.findById('timerAlertButton').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.secondButton);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(alertMessage.thirdButton);
      return true;
    });

    cy.findById('confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.findById('confirmButton').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(alertMessage.thirdButton);
      return false;
    });

    cy.findById('confirmResult').should('contain', 'You selected Cancel');
  });
});
