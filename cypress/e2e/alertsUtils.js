export const name = 'Valeriia';

export function clickInstantAlert() {
  cy.get('#alertButton').click();
}

export function validateAlertText() {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('You clicked a button');
  });
}

export function clickLongAlert() {
  cy.get('#timerAlertButton').click();
}

export function validateLongAlertText() {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('This alert appeared after 5 seconds');
  });
}

export function clickConfirmAlert() {
  cy.get('#confirmButton').click();
}

export function validateOkConfirm() {
  cy.on('window:confirm', (alertText) => {
    expect(alertText).to.equal('Do you confirm action?');
    return true;
  });
  cy.get('#confirmResult').should('have.text', 'You selected Ok');
}

export function validateCancelConfirm() {
  cy.on('window:confirm', (alertText) => {
    expect(alertText).to.equal('Do you confirm action?');
    return false;
  });
  cy.get('#confirmResult').should('have.text', 'You selected Cancel');
}

export function validateNameAlert(name) {
  cy.on('window:promt', (text) => {
    cy.window().then((win) => {
      cy.stub(win, 'promt').returns(name);

      cy.get('#promtButton').click();
      expect(text).to.contains('Please enter your name');
      cy.get('#promptResult').contains(`You entered ${name}`);
    });
  });
}
