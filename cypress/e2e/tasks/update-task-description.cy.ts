import {
  users,
  tasks,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Task description updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
      companies,
      customers,
      projectCategories,
      taskCategories,
      projects,
      tasks,
    };

    cy.viewport(414, 896);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks/1");
  });

  it("updates a task description successfully", () => {
    cy.getByData("update-task-description-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("task-description-field").within(() =>
      cy.get("textarea").should("have.value", "Description 1"),
    );
    cy.getByData("task-description-field")
      .clear()
      .type("Updated Task Description");
    cy.get('button[type="submit"]').click();
    cy.getByData("task-description-detail-info").contains(
      "Updated Task Description",
    );
  });

  it("shows empty description message when description is cleared", () => {
    cy.getByData("update-task-description-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("task-description-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("task-description-detail-info").contains("No description");
  });
});
