describe('Cypress application', () => {
  before(() => {
    cy.visit('https://demoqa.com/alerts')
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('#alertButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('I am an alert box!')
    })
  });

  it('should have the ability to assert scheduled alert', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('#timerAlertButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('This alert appeared after 5 seconds')
    })
  });

  it('should automatically resolve alerts', () => {
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('#confirmButton').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
    })
  });

  it('should have the ability to Cancel alerts', () => {
    let count = 0
    cy.on('window:confirm', (str) => {
      count += 1
      if (count === 1) {
        expect(str).to.eq('Do you confirm action?')
        return false
      }
    })
    cy.get('#confirmButton').click()
    cy.get('#confirmResult').should('contain', 'You selected Cancel')
  });

  it('should have the ability to enter text to alert', () => {
    const stub = cy.stub()
    cy.on('window:prompt', stub.withArgs('Please enter your name').returns('Your Name'))
    cy.get('#promtButton').click()
    cy.get('#promptResult').should('contain', 'You entered Your Name')
  });
});
