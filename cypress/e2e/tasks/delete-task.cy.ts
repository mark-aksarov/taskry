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

describe("deletes a task", () => {
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
  });

  it("can delete a task", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-task-modal-confirm-button").click();
    cy.getByData("task-list-item", "1").should("not.exist");
  });
});
