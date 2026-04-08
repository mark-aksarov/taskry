import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("Company creation", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);

    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/companies");
  });

  it("creates a new company with valid data", () => {
    cy.getByData("companies-empty-section-create-button").click();

    cy.getByData("company-name-field").type("Created Company Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("company-list").within(() => {
      cy.contains("Created Company Name");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("companies-empty-section-create-button").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/name is required/i);
  });
});
