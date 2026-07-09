import {
  users,
  accounts,
  positions,
  workspaces,
  projectCategories,
} from "@/prisma/seed/test-data";

describe("Project category updating", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/project-categories");
  });

  it("updates a project category successfully", () => {
    cy.getByData("project-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("project-category-name-field")
      .clear()
      .type("Updated Project Category Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Updated Project Category Name");
    });
  });

  it("pre-fills edit project category form with default values", () => {
    cy.getByData("project-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("project-category-name-field").within(() =>
      cy.get("input").should("have.value", "Project Category 1"),
    );
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("project-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("project-category-name-field").clear();

    cy.get('button[type="submit"]').click();

    cy.contains(/Name is required/i);
  });
});
