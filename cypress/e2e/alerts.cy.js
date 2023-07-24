describe('Cypress application', () => {
  beforeEach(() => { 
    cy.visit('/');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.pickId('alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    })
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.pickId('timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    })
  });

  it('should autimatically resolve alerts', () => {
    cy.pickId('confirmButton').click();
    cy.wait(10000);
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return true;
    });
    cy.get('[class="text-success"]').should('have.text', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.pickId('confirmButton').click();
    cy.wait(10000);
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('[class="text-success"]').should('have.text', 'You selected Cancel');
  });

  it('should have the ability to enter text to alert', () => {
    
    cy.window().then((window) => {
      cy.stub(window, 'prompt').returns('my final message');
    });

    cy.pickId('promtButton').click();

    cy.get('#promptResult').should('contain', 'You entered my final message');
  });
  });
