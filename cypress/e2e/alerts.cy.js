describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    
    cy.get('#alertButton').click();
    
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled alerts', () => {
   
    cy.get('#timerAlertButton').click();
    
    
    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should automatically resolve alerts', () => {
    
    cy.get('#confirmButton').click();
    
    
    cy.on('window:confirm', () => true);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You selected Ok');
    });
  });

  it('should have the ability to Cancel alerts', () => {
    
    cy.get('#confirmButton').click();
    
    
    cy.on('window:confirm', () => false);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You selected Cancel');
    });
  });

  it('should have the ability to enter text to alert', () => {
    
    cy.get('#promtButton').click();
    cy.wait(1000);
    
    const promptText = 'Mykhailo';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(promptText);
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You entered: ${promptText}`);
    });
  });
});