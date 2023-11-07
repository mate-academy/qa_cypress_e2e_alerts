describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton')
      .click();
    cy.on('window:alert', (alert) => {
    expect().to.equal(`You clicked a button`)
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton')
      .click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
    expect(str).to.equal(`This alert appeared after 5 seconds`)
    })
  });

  it('should automatically resolve alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', () => true);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You selected Ok');
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton')
      .click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(`Do you confirm action?`)
      return false;
    });
    cy.get('#confirmResult')
      .should('contain', 'You selected Cancel');
    });
  
  it('should have the ability to enter text to alert', () => {
    cy.window().then((win) => {
    win.prompt = () => 'Kristina';
     });
    cy.get('#promtButton')
      .click();
    cy.get('#promptResult')
      .should('contain', 'Kristina');
  });
});

