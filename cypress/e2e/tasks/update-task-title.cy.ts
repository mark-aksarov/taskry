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

describe("Task title updating", () => {
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

  it("updates a task title successfully", () => {
    cy.getByData("update-task-title-edit-button").filter(":visible").click();
    cy.getByData("task-title-field").within(() =>
      cy.get("input").should("have.value", "Task 1"),
    );
    cy.getByData("task-title-field").clear().type("Updated Task Title");
    cy.get('button[type="submit"]').click();
    cy.getByData("task-title-detail-info").contains("Updated Task Title");
  });

  it("shows validation error and prevents submission with empty title", () => {
    cy.getByData("update-task-title-edit-button").filter(":visible").click();
    cy.getByData("task-title-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("task-title-field").contains(/title is required/i);
  });
});
