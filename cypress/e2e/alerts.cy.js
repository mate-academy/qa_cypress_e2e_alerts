/// <reference types='cypress' />
import * as data from './alertsUtils';

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    data.clickInstantAlert();

    data.validateAlertText();
  });

  it('should have the ability to assert scheduled allert', () => {
    data.clickLongAlert();

    data.validateLongAlertText();
  });

  it('should autimatically resolve alerts', () => {
    data.clickConfirmAlert();

    data.validateOkConfirm();
  });

  it('should have the ability to Cancel alerts', () => {
    data.clickConfirmAlert();

    data.validateCancelConfirm();
  });

  it('should have the ability to enter text to alert', () => {
    data.validateNameAlert(data.name);
  });
});
