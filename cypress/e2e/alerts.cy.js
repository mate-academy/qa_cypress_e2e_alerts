/// <reference types='cypress' />

const textSeeAlert = "You clicked a button";
const textAfter5secondsAlert = "This alert appeared after 5 seconds";
const textConfirmAlert = "Do you confirm action?";
const textSelected = "You selected ";
const textOk = "Ok";
const textCancel = "Cancel";
const textEntername = "Please enter your name";
const textPromptAlert = "Tetiana Maksiuk";

describe("Cypress application", () => {
  beforeEach(() => {
    cy.visit("/alerts");
  });

  it("should have the ability to assert automatically resolved alerts", () => {
    cy.findById("alertButton").click();
    cy.on("window:alert", (textOfAlert) => {
      expect(textOfAlert).to.equal(textSeeAlert);
    });
  });

  it("should have the ability to assert scheduled allert", () => {
    cy.clock();
    cy.findById("timerAlertButton").click();
    //cy.wait(5000);
    cy.tick(5000);
    cy.on("window:alert", (textOfAlert) => {
      expect(textOfAlert).to.equal(textAfter5secondsAlert);
    });
  });

  it("should autimatically resolve alerts", () => {
    cy.findById("confirmButton").click();
    cy.on("window:confirm", (textOfConfirm) => {
      expect(textOfConfirm).to.equal(textConfirmAlert);
      return true;
    });
    cy.findById("confirmResult").should(
      "have.text",
      `${textSelected}${textOk}`
    );
  });

  it("should have the ability to Cancel alerts", () => {
    cy.findById("confirmButton").click();
    cy.on("window:confirm", (textOfConfirm) => {
      expect(textOfConfirm).to.equal(textConfirmAlert);
      return false;
    });
    cy.findById("confirmResult").should(
      "have.text",
      `${textSelected}${textCancel}`
    );
  });

  it("should have the ability to enter text to alert", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(textPromptAlert);
    });
    cy.findById("promtButton").click();
    cy.findById("promptResult").should("contain", `${textPromptAlert}`);
  });
});
