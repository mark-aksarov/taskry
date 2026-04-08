import {
  users,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";
import { TaskStatus } from "@/generated/prisma/enums";

describe("Subtask deletion", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      tasks: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date("2030-12-31"),
          status: TaskStatus.active,
          workspaceId: 1,
        },
      ],
      subtasks: [
        {
          id: 1,
          text: "Subtask 1",
          taskId: 1,
          isDone: false,
        },
      ],
      accounts,
      projects,
      positions,
      companies,
      customers,
      workspaces,
      taskCategories,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks/1");
  });

  it("can delete a subtask", () => {
    cy.getByData("subtask-item-action-menu-trigger", "1")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-subtask-modal-confirm-button").click();
    cy.getByData("subtask-list-item", "1").should("not.exist");
  });
});
