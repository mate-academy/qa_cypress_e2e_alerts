describe('Cypress application', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should have the ability to assert automatically resolved alerts', () => {
    cy.getElementById('alertButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button');
    });
  });

  it('should have the ability to assert scheduled allert', () => {
    cy.getElementById('timerAlertButton').click();
    setTimeout(() => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal('This alert appeared after 5 seconds');
      });
    }, 5000);
  });

  it('should autimatically resolve alerts', () => {
    cy.getElementById('confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return true;
    });

    cy.getElementById('confirmResult').should(
      'contain.text',
      'You selected Ok'
    );
  });

  it('should have the ability to Cancel alerts', () => {
    cy.getElementById('confirmButton').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you confirm action?');
      return false;
    });

    cy.getElementById('confirmResult').should(
      'contain.text',
      'You selected Cancel'
    );
  });

  it('should have the ability to enter text to alert', () => {
    const name = 'TestName';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });

    cy.getElementById('promtButton').click();

    cy.getElementById('promptResult').should(
      'contain.text',
      `You entered ${name}`
    );
  });
});
