describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();

    cy.on('window:alert', (alertText) => {
     expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
  cy.get('#timerAlertButton').click();

  cy.on('window:alert', (alertText) => {
  cy.wait(5000); 
  expect(alertText).to.equal('This alert appeared after 5 seconds'); 
  });
});

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
   cy.get('#confirmResult').should('contain', 'You selected Ok');
  });
});

  it('should have the ability to Cancel alerts', () => {
   cy.get('#confirmButton').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you confirm action?');
      return false;
      cy.get('window:alert').should('contain', 'You selected Cancel');
    })
});

  it.only('should have the ability to enter text to alert', () => {
    cy.get('#promtButton').click();
    cy.window().then((win) => {  
  cy.stub(win, 'prompt').returns('Olga') 
    });
    cy.on('window:confirm', () => true);
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'Olga');
})

  });
});
