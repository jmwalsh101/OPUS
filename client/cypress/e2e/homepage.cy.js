/* eslint-disable no-undef */
/// <reference types="Cypress"/>

describe("Home page", () => {
  it("home page renders correctly", () => {
    cy.visit("http://54.234.44.9:3000/");
    cy.get(".home-header").contains("OPUS");
    cy.get(".home-header2").contains("Write, Convert, Publish");
    cy.get(".home-header3").contains("Modularise and Customise");
    cy.get(".home-header4").contains("Powerfully Simple");
  });
  it("Navbar loads pages correctly", () => {
    cy.get(".navbar-container").contains("Pricing").click();
    cy.get(".pricing-title").contains("Start Writing for Free");
    cy.get(".pricing-container").should("exist");

    cy.get(".navbar-container").contains("Login").click();
    cy.get(".form-login").should("exist");

    cy.get(".navbar-container").contains("Sign Up").click();
    cy.get(".form-register").should("exist");

    cy.get(".navbar-container").contains("OPUS").click();
    cy.get(".home-header").should("exist");
  });
});
