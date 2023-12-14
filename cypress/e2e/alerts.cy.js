/// <reference types='cypress' />

const faker = require("faker");

describe("DemoQA application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have the ability to assert automatically resolved alerts", () => {
    cy.get("#alertButton").click();
    cy.on("window:allert", (alert) => {
      expect(alert).to.equal("You clicked a button");
    });
  });

  it("should have the ability to assert scheduled allert", () => {
    cy.get("#timerAlertButton").click();
    cy.wait(5000);
    cy.on("window:allert", (alert) => {
      expect(alert).to.equal("This alert appeared after 5 seconds");
    });
  });

  it("should autimatically resolve alerts", () => {
    cy.get("#confirmButton").click();
    cy.on("window:allert", (alert) => {
      expect(alert).to.equal("Do you confirm action?");
    });
    cy.get("#confirmResult").should("contain", "You selected Ok");
  });

  it("should have the ability to Cancel alerts", () => {
    cy.get("#confirmButton").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.equal("Do you confirm action?");
    });
    cy.on("window:confirm", () => false);
    cy.get("#confirmResult").should("contain", "You selected Cancel");
  });

  it("should have the ability to enter text to alert", () => {
    const randomName = faker.name.findName();

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(randomName);
    });
    cy.get("#promtButton").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.equal("Please enter your name");
    });
    cy.on("window:confirm", () => true);
    cy.get("#promptResult").should("contain", randomName);
  });
});
