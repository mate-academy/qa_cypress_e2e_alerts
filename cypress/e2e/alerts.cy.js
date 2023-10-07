describe('Cypress application', () => {
  beforeEach(() => {
  cy.visit("https://demoqa.com/alerts")
  });
 
  const firstNotification = 'You clicked a button';
  const secondNotification = 'This alert appeared after 5 seconds';
  const thirdNotification = 'Do you confirm action?';

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(firstNotification);
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(secondNotification);
    });
  });

  it('should autimatically resolve alerts', () => {
    cy.get('#confirmButton').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(thirdNotification);
    });
    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should have the ability to Cancel alerts', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(thirdButton);
    });
    cy.on('window:confirm', () => {
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });
  });