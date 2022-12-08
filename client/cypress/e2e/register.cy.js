/* eslint-disable no-undef */
/// <reference types="Cypress"/>
import "@testing-library/cypress/add-commands";

describe("Register and Login", () => {
  it("should register", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("#username").should("exist").type("Cypress Test");
    cy.get("#email").should("exist").type("1@1.com");
    cy.get("#password").should("exist").type("1");
    cy.get("#confirm-password").should("exist").type("1");

    cy.get("button").click();

    cy.get(".form-login").should("exist");
  });

  it("should log in", () => {
    cy.get("#username").should("exist").type("Cypress Test");
    cy.get("#password").should("exist").type("1");

    cy.get("button").click();

    cy.findByText("OPUS").should("exist");
    cy.findByText("Cypress Test").should("exist");
  });

  it("should create a text", () => {
    cy.get(".navbar-container").contains("Editor").click();

    cy.get("#name").should("exist").type("Cypress Text");
    cy.get("#category").should("exist").select("Intro");

    cy.get("#submit").click();
    cy.findByText("You must enter a name and a text.").should("exist");
    cy.findByText("OK").click();

    cy.get(".public-DraftEditor-content").type("This is sample text");
    cy.get("#submit").click();
    cy.findByText("Component created!");
    cy.get("#name").should("have.value", "");
  });

  it("should create a document", () => {
    cy.get(".navbar-container").contains("Manager").click();

    cy.get("#title").should("exist").type("Cypress Document");
    cy.get("#category").should("exist").select("Intro");

    cy.get("#save").click();
    cy.findByText("You must enter a title and select components.").should(
      "exist"
    );
    cy.findByText("OK").click();

    cy.get("#cy-component-select").click();
    cy.findByText("Cypress Text").siblings("button").click();

    cy.findByText("Order Components").click();

    cy.get("#save").click();
    cy.findByText("Document created!");
    cy.get("#title").should("have.value", "");
  });

  it("should select and delete a document", () => {
    cy.get("#cy-select").click();

    cy.findByText("Cypress Document").siblings("button").click();

    cy.get("#delete").click();
  });

  it("should select and delete a component", () => {
    cy.findByText("Editor").click();

    cy.get("#cy-select").click();
    cy.findByText("Cypress Text").siblings("button").click();

    //cy.get("#name").contains("Cypress Text");

    cy.get("#delete").click();

    cy.findByText(
      "Deleting a text will also delete it from any documents using it."
    ).should("exist");
    cy.get("#modal-confirm").click();
  });
});
