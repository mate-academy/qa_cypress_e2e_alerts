
describe('Cypress application', () => {
  it('should assert the text inside the alert after clicking the first button', () => {
    cy.visit('https://demoqa.com/alerts');

  
    cy.get('button#alertButton').click();

  
    cy.on('window:alert', (str) => {
      expect(str).to.eq('You clicked a button');
    });
  });

  it('should assert the text inside the alert after clicking the second button with a delay', () => {
    cy.visit('https://demoqa.com/alerts');


    cy.get('button#timerAlertButton').click();


    cy.wait(5000);
    cy.on('window:alert', (str) => {
      expect(str).to.eq('This alert appeared after 5 seconds');
    });
  });

  it('should assert the text inside the alert after clicking the third button', () => {
    cy.visit('https://demoqa.com/alerts');

   
    cy.get('button#confirmButton').click();

    
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?');
      return true; 
    });


    cy.on('window:alert', (str) => {
      expect(str).to.eq('You selected Ok');
    });
  });

});

