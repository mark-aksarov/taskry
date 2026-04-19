import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("Project category creation", () => {
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
    cy.visit("/en/project-categories");
  });

  it("creates a new project category with valid data", () => {
    cy.getByData("project-categories-empty-section-create-button")
      .filter(":visible")
      .click();

    cy.getByData("project-category-name-field").type("Created Category Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Created Category Name");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("project-categories-empty-section-create-button")
      .filter(":visible")
      .click();

    cy.get('button[type="submit"]').click();

    cy.contains(/Name is required/i);
  });
});
