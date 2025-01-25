/// <reference types='cypress' />

describe('Cypress application', () => {
  const name = 'DENCHIK';

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns(name);
      }
    });
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.getButtonById('alertButton');
    cy.handleAlert('You clicked a button');
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.getButtonById('timerAlertButton');
    cy.handleAlert('This alert appeared after 5 seconds');
  });

  it('should autimatically resolve alerts', () => {
    cy.getButtonById('confirmButton');
    cy.handleConfirm('Do you confirm action?');
    cy.confirmResult('#confirmResult', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.getButtonById('confirmButton');
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('Do you confirm action?');
      return false;
    });
    cy.confirmResult('#confirmResult', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.getButtonById('promtButton');
    cy.window().its('prompt').should('be.called');
    cy.confirmResult('#promptResult', `You entered ${name}`);
  });
});
