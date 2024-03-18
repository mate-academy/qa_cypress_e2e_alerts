
describe('Cypress application', () => {
  before(() => {
    const alerts = {
      alert: 'You clicked a button',
      timerAlert: 'This alert appeared after 5 seconds',
      confirmAlert: 'Do you confirm action?',
      inputAlert: 'Please enter your name'
    };
  });
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:allert', (alert) => {
      expect(alert).to.equal(alerts.alert);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000);
    cy.on('window:allert', (alert) => {
      expect(alert).to.equal(alerts.timerAlert);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:allert', (alert) => {
      expect(alert).to.equal(alerts.confirmAlert);
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alerts.confirmAlert);
    });
    cy.on('window:confirm', () => false);
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
  });
});
