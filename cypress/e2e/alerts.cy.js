/// <reference types="cypress" />

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  // eslint-disable-next-line max-len
  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    // перевіряємо чи є потрібний текст в alert
    cy.on('window: alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
    // Перевіряємо, що alert було закрито
    cy.get('.alert').should('not.exist');
  });

  it('should have the ability to assert scheduled alert', () => {
    // Клік на кнопці, що викликає alert і очікування
    cy.get('#timerAlertButton').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.on('window: alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
    cy.get('.alert').should('not.exist');
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
    });
    cy.get('.alert').should('not.exist');
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('.alert').should('not.exist');
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Nataliia');
      cy.get('#promtButton').click();
    });
    cy.get('#promptResult').should('contain', 'You entered Nataliia');
    cy.get('.alert').should('not.exist');
  });
});
