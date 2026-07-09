import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("delete task categories", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      taskCategories: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 1 },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/task-categories");
  });

  it("can delete task categories", () => {
    cy.getByData("task-category-checkbox", "1").click();
    cy.getByData("task-category-checkbox", "2").click();

    cy.getByData("task-category-actions-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-task-categories-modal")
      .should("be.visible")
      .contains("2 task categories");

    cy.getByData("delete-task-categories-modal-confirm-button").click();
    cy.getByData("task-category-list-item").should("not.exist");
  });
});
