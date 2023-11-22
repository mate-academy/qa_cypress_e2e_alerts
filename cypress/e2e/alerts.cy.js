describe('Cypress application', () => {
  let stub;

  before(() => {
    stub = cy.stub();
    cy.visit('https://demoqa.com/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.on('window:alert', stub)
    cy.get('#alertButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('I am an alert box!')
    })
  });

  it('should have the ability to assert scheduled alert', () => {
    cy.on('window:alert', stub)
    cy.get('#timerAlertButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('This alert appeared after 5 seconds')
    })
  });

  it('should automatically resolve alerts', () => {
    cy.on('window:confirm', stub)
    cy.get('#confirmButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
    })
  });

  it('should have the ability to Cancel alerts', () => {
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you confirm action?')
      if (stub.callCount === 1) {
        return false
      }
    })
    cy.get('#confirmButton').click()
    cy.get('#confirmResult').should('contain', 'You selected Cancel')
  });

  it('should have the ability to enter text to alert', () => {
    cy.on('window:prompt', stub.withArgs('Please enter your name').returns('Your Name'))
    cy.get('#promptButton').click()
    cy.get('#promptResult').should('contain', 'You entered Your Name')
  });
});
