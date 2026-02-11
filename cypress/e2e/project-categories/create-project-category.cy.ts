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
    cy.visit("/en/projects");
  });

  it("creates a new project category with valid data", () => {
    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("category").click();

    cy.getByData("project-category-name-field").type("Created Category Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("customers-list").within(() => {
      cy.contains("Created Category Name");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("customer").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i);
  });
});
