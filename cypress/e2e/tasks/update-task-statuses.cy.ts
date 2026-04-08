import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
  taskCategories,
  projects,
} from "@/prisma/test-utils/data";

import { TaskStatus } from "@/generated/prisma/enums";

describe("update task statuses", () => {
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
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.pending,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 3,
          title: "Task 3",
          status: TaskStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 4,
          title: "Task 4",
          status: TaskStatus.pending,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 5,
          title: "Task 5",
          status: TaskStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 6,
          title: "Task 6",
          status: TaskStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");
  });

  describe("should change status for all tasks", () => {
    it("should change status for active task to pending", () => {
      cy.getByData("task-checkbox", "1").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item", "1").contains(/pending/i);
    });

    it("should change status for completed task to pending", () => {
      cy.getByData("task-checkbox", "3").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item", "3").contains(/pending/i);
    });

    it("should change status for active task to completed", () => {
      cy.getByData("task-checkbox", "1").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();
      cy.getByData("task-list-item", "1").contains(/completed/i);
    });

    it("should change status for active task + pending task to completed", () => {
      cy.getByData("task-checkbox", "1").click();
      cy.getByData("task-checkbox", "4").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();

      cy.getByData("task-list-item", "1").contains(/completed/i);
      cy.getByData("task-list-item", "4").contains(/completed/i);
    });

    it("should change status for pending + completed tasks to active", () => {
      cy.getByData("task-checkbox", "2").click();
      cy.getByData("task-checkbox", "3").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("active").click();

      cy.getByData("task-list-item", "2").contains(/active/i);
      cy.getByData("task-list-item", "3").contains(/active/i);
    });

    it("should change status for active + completed tasks + pending task to pending", () => {
      cy.getByData("task-checkbox", "1").click();
      cy.getByData("task-checkbox", "3").click();
      cy.getByData("task-checkbox", "4").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();

      cy.getByData("task-list-item", "1").contains(/pending/i);
      cy.getByData("task-list-item", "3").contains(/pending/i);
      cy.getByData("task-list-item", "4").contains(/pending/i);
    });

    it("should change status for active + completed tasks + completed task to completed", () => {
      cy.getByData("task-checkbox", "1").click();
      cy.getByData("task-checkbox", "3").click();
      cy.getByData("task-checkbox", "5").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();

      cy.getByData("task-list-item", "1").contains(/completed/i);
      cy.getByData("task-list-item", "3").contains(/completed/i);
      cy.getByData("task-list-item", "5").contains(/completed/i);
    });

    it("should disable 'active' item when all selected tasks are active", () => {
      cy.getByData("task-checkbox", "1").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("active").should("have.attr", "aria-disabled", "true");
    });

    it("should disable 'pending' item when all selected tasks are pending", () => {
      cy.getByData("task-checkbox", "2").click();
      cy.getByData("task-checkbox", "4").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("pending").should("have.attr", "aria-disabled", "true");
    });

    it("should disable 'completed' item when all selected tasks are pending", () => {
      cy.getByData("task-checkbox", "3").click();
      cy.getByData("task-checkbox", "5").click();
      cy.getByData("task-checkbox", "6").click();

      cy.getByData("task-actions-menu-trigger").click();
      cy.getMenuItem("completed").should("have.attr", "aria-disabled", "true");
    });
  });
});
