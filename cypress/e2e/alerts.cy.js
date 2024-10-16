/// <reference types='cypress' />
const faker = require('faker');

describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to assert alerts that are resolved automatically', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should be able to assert alerts that are scheduled', () => {
    cy.get('#timerAlertButton').click();
    cy.clock();
    cy.tick(5000);

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should randomly resolve or cancel alerts', () => {
    const randomChoice = Math.random() < 0.5;

    cy.get('#confirmButton').click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return randomChoice;
    });

    cy.wrap(randomChoice).then((choice) => {
      if (choice) {
        cy.contains('#confirmResult', 'You selected Ok').then(() => {
          cy.log('User chose: Ok');
        });
      } else {
        cy.contains('#confirmResult', 'You selected Cancel').then(() => {
          cy.log('User chose: Cancel');
        });
      }
    });
  });

  it('should be able to enter text in alerts', () => {
    const inputText = faker.lorem.word();

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(inputText);
    });

    cy.get('#promtButton').click();
    cy.contains('#promptResult', `You entered ${inputText}`);
  });
});
