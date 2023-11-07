const alertMassage = {
  seeAlert: 'You clicked a button',
  waitAlert: 'This alert appeared after 5 seconds',
  confirmAlert: 'Do you confirm action?',
  selectMassage: 'You selected Ok',
  cencelMassage: 'You selected Cancel',
  userName: 'Iryna'
}


describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMassage.seeAlert);
    })  
  });

  it('should assert the text inside the alert after 5 seconds', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000); 
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(alertMassage.waitAlert);
    });
  });
  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton')
    .click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal(alertMassage.confirmAlert);
    }); 
    cy.get('#confirmResult')
      .should('contain', alertMassage.selectMassage);
  });

  it('should click on the third button and handle confirm dialog', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal(alertMassage.confirmAlert); 
      return false;
    });
    cy.get('#confirmResult')
      .should('contain', alertMassage.cencelMassage);
  });


it('should have the ability to enter text to alert', function () {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'prompt').returns(alertMassage.userName)
      cy.stub(win, 'alert').as('windowAlert')
    }
  })
  
  cy.get('#promtButton')
  .click()
  cy.get('#promptResult')
  .should('contain', alertMassage.userName);
})
});
