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

describe("delete multiple tasks", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

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

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");
  });

  it("can delete tasks", () => {
    cy.getByData("task-1-checkbox").click();
    cy.getByData("task-2-checkbox").click();

    cy.getByData("task-toolbar-actions-button-desktop")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-tasks-modal").should("be.visible").contains("2 tasks");
    cy.getByData("delete-tasks-modal-confirm-button").click();
    cy.getByData("task-list-item").should("not.exist");
  });
});
