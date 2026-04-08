import { TaskStatus } from "@/generated/prisma/enums";
import {
  users,
  tasks,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
  taskCategories,
} from "@/prisma/test-utils/data";

describe("update task status", () => {
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
        {
          id: 2,
          title: "Task 2",
          deadline: new Date("2030-12-30"),
          status: TaskStatus.pending,
          workspaceId: 1,
        },
      ],
      projects,
      accounts,
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
    cy.visit("/en/tasks");
  });

  describe("can update task status", () => {
    it("should update 'active' task status to 'pending'", () => {
      cy.getByData("task-item-action-menu-trigger", "1").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item", "1").contains(/pending/i);
    });

    it("should update 'active' task status to 'completed'", () => {
      cy.getByData("task-item-action-menu-trigger", "1").click();
      cy.getMenuItem("completed").click();
      cy.getByData("task-list-item", "1").contains(/completed/i);
    });

    it("should update 'pending' task status to 'active'", () => {
      cy.getByData("task-item-action-menu-trigger", "2").click();
      cy.getMenuItem("active").click();
      cy.getByData("task-list-item", "2").contains(/active/i);
    });
  });
});
