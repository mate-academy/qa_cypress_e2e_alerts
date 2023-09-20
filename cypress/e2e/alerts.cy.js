/// <reference types='cypress' />

const {
  vars, assertAlertText, click, confirmAlert, alertText, assertText
} = require('../support/functions');

const { alertsUrl, ok, okText, cancel, cancelText } = vars();
const {
  firstAlertText, secondAlertText, thirdAlertText
} = alertText();
const myName = 'Serhii';

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit(alertsUrl);
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    click('#alertButton');
    assertAlertText(firstAlertText);
    confirmAlert(ok);
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').then(() => {
      const t0 = performance.now();
      click('#timerAlertButton');
      cy.on('window:alert', (str) => {
        expect(str).to.equal(secondAlertText);
        const t1 = performance.now();
        const alertTime = ((t1 - t0) / 1000);
        cy.expect(alertTime).to.be.greaterThan(5);
      });
      confirmAlert(ok);
    });
  });

  it('should autimatically resolve alerts', () => {
    click('#confirmButton');
    assertAlertText(thirdAlertText);
    confirmAlert(ok);
    assertText('#confirmResult', okText);
  });

  it('should have the ability to Cancel alerts', () => {
    click('#confirmButton');
    assertAlertText(thirdAlertText);
    confirmAlert(cancel);
    assertText('#confirmResult', cancelText);
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(myName);
      cy.get('#promtButton').click();
      cy.get('#promptResult').contains(myName);
    });
  });
});
