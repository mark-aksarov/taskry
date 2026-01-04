import { E2ESeedPayload } from "../../../prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "../../../generated/prisma/enums";

describe("Menu Actions", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
  });

  describe("deletes a task", () => {
    beforeEach(() => {
      const payload: E2ESeedPayload = {
        companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
        customers: [
          {
            id: 1,
            email: "customer@example.com",
            fullName: "John Doe",
            companyId: 1,
            workspaceId: 1,
          },
        ],
        projectCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
        taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
        projects: [
          {
            id: 1,
            title: "Project 1",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
        tasks: [
          {
            id: 1,
            title: "Task 1",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      };

      cy.task("db:seed", payload);
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");
    });

    it("can delete a task", () => {
      cy.getMenuItem("task-item-action-menu-trigger", "delete").click();
      cy.getByData("confirm-button").click();
      cy.getByData("task-list-item").should("not.exist");
    });
  });
});
