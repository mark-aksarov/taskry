import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("Position creation", () => {
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
    cy.visit("/en/positions");
  });

  it("creates a new position with valid data", () => {
    cy.getByData("create-position-modal-trigger-large")
      .filter(":visible")
      .click();

    cy.getByData("position-name-field").type("Created Position Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Created Position Name");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("create-position-modal-trigger-large")
      .filter(":visible")
      .click();

    cy.get('button[type="submit"]').click();

    cy.contains(/name is required/i);
  });
});
