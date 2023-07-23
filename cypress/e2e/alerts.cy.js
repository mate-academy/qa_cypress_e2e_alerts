/* eslint-disable */
describe('Cypress application', () => {
  const testMessage = {
    first: 'You clicked a button',
    second: 'This alert appeared after 5 seconds',
    third: 'Do you confirm action?'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.findById('alertButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(testMessage.first);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.findById('timerAlertButton').click();
    cy.wait(5100);
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(testMessage.second);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.stub(window, 'confirm').returns(true);
    cy.findById('confirmButton').click();
    cy.on('window:alert', (alert) => {
      expect(alertText).to.equal(testMessage.third);
      expect(alertText).to.equal('You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.stub(window, 'confirm').returns(false);
    cy.findById('confirmButton').click();
    cy.on('window:alert', (alert) => {
      expect(alertText).to.equal(testMessage.third);
      expect(alertText).to.equal('You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    const textToEnter = 'Yuri';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(textToEnter);
      cy.findById('promtButton').click();
      cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`You entered, ${textToEnter}!`);
    });
  });
});
});
