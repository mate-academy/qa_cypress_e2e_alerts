/// <reference types='cypress' />

function vars() {
  return {
    alertsUrl: '/alerts',
    ok: true,
    cancel: false,
    okText: 'You selected Ok',
    cancelText: 'You selected Cancel'
  };
};

function alertText() {
  return {
    firstAlertText: 'You clicked a button',
    secondAlertText: 'This alert appeared after 5 seconds',
    thirdAlertText: 'Do you confirm action?',
    fourthAlertText: 'Please enter your name'
  };
}

function assertAlertText(text) {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(text);
  });
};

function confirmAlert(input) {
  cy.on('window:confirm', () => {
    return input;
  });
};

function assertText(element, text) {
  cy.get(element).should('contain', text);
}

function click(element) {
  cy.get(element).click();
}
module.exports = {
  vars, assertAlertText, click, confirmAlert, alertText, assertText
};
