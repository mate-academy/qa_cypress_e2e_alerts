describe("Cypress application", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/alerts");
  });

  it("should assert automatically resolved alerts", () => {
    cy.get("#alertButton").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("You clicked a button");
    });
  });

  it("should assert scheduled alert", () => {
    cy.get("#timerAlertButton").click();
    cy.wait(5000);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("This alert appeared after 5 seconds");
    });
  });

  it("should automatically resolve confirm alerts with OK", () => {
    cy.get("#confirmButton").click();
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("Do you confirm action?");
      return true;
    });
    cy.get("#confirmResult").should("have.text", "You selected Ok");
  });

  it("should be able to cancel confirm alerts", () => {
    cy.get("#confirmButton").click();
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("Do you confirm action?");
      return false;
    });
    cy.get("#confirmResult").should("have.text", "You selected Cancel");
  });
});
