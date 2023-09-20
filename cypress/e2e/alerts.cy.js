describe('Cypress application', () => {
  
  
  const alertMessage = {
    automaticallyAlert: 'You clicked a button',
    scheduledAlert: 'This alert appeared after 5 seconds',
    questionAlert: 'Do you confirm action?',
    enterTextAlert: 'Please enter your name'
  }
  before(() => {
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.contains('[id="alertButton"]', 'Click me').click();
    cy.on('window:alert', (alert) => {
       expect(alert).to.equal(alertMessage.automaticallyAlert);
});
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.visit('/');
    cy.get('[id="timerAlertButton"]').click();
    cy.wait(5000);
    cy.on('window:alert', (alert) => {
       expect(alert).to.equal(alertMessage.scheduledAlert);
    });
  });

  it('should automatically resolve alerts', () => {
    cy.visit('/');
    cy.contains('[id="confirmButton"]', 'Click me').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal(alertMessage.questionAlert), {enter};
    cy.contains('[id="confirmResult"]', 'You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    cy.visit('/');
    cy.contains('[id="confirmButton"]', 'Click me').click();
    cy.on('window:confirm', (alert) => {
       expect(alert).to.equal(alertMessage.questionAlert)
        return false
      });
    cy.contains('[id="confirmResult"]', 'You selected Cancel')

  });

  it('should have the ability to enter text to alert', () => {
    cy.visit('/');
    cy.window().then(function ($win){
    cy.stub($win, 'prompt').returns('Lera'),
    cy.contains('[id="promtButton"]', 'Click me').click();
    cy.contains('[id="promptResult"]', 'Lera');
    });
  });
});
