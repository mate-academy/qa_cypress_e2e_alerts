import PageObject from '../PageObject';

class AlertPageObject extends PageObject {
  assertAllert(alertMessage) {
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq(alertMessage);
    });
  }
}

export default AlertPageObject;
