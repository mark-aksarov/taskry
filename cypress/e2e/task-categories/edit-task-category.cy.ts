import {
  users,
  accounts,
  positions,
  workspaces,
  taskCategories,
} from "@/prisma/test-utils/data";

describe("Task category editing", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      taskCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/task-categories");
  });

  it("updates a task category successfully", () => {
    cy.getByData("task-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("task-category-name-field")
      .clear()
      .type("Updated Task Category Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("task-category-list").within(() => {
      cy.contains("Updated Task Category Name");
    });
  });

  it("pre-fills edit task category form with default values", () => {
    cy.getByData("task-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("task-category-name-field").within(() =>
      cy.get("input").should("have.value", "Task Category 1"),
    );
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("task-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("task-category-name-field").clear();

    cy.get('button[type="submit"]').click();

    cy.contains(/name is required/i);
  });
});
