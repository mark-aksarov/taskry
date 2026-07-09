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
} from "@/prisma/seed/test-data";

describe("delete tasks", () => {
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

  it("can delete multiple tasks", () => {
    cy.getByData("task-checkbox", "1").click();
    cy.getByData("task-checkbox", "2").click();

    cy.getByData("task-actions-menu-trigger").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-tasks-modal").should("be.visible").contains("2 tasks");
    cy.getByData("delete-tasks-modal-confirm-button").click();
    cy.getByData("task-list-item").should("not.exist");
  });
});
