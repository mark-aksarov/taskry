import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("edit a new task", () => {
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
      taskCategories: [
        { id: 1, name: "Category 1", workspaceId: 1 },
        { id: 2, name: "Category 2", workspaceId: 1 },
      ],
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
        {
          id: 2,
          title: "Project 2",
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
          assigneeId: "user-3",
        },
      ],
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  const taskData = {
    title: "Updated Task Title",
    description: "Updated Task Description",
    deadline: { day: "01", month: "02", year: "2026" },
    statusKey: "pending",
    categoryKey: "2",
    projectKey: "2",
    assigneeKey: "user-2",
  };

  describe("tasks page", () => {
    it("can edit a task", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");

      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("edit").click();

      // fill form
      cy.fillEditTaskForm(taskData);

      // assert
      cy.getByData("task-list-item").within(() => {
        cy.contains("Updated Task Title");
        cy.contains("Category 2");
        cy.contains("Project 2");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("task detail page", () => {
    it("can edit a task", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks/1");

      cy.getByData("edit-task-button").filter(":visible").click();

      // fill form
      cy.fillEditTaskForm(taskData);

      // assert
      cy.getByData("task-card").within(() => {
        cy.contains("Updated Task Title");
        cy.contains("Category 2");
        cy.contains("Project 2");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("edit-task-button").filter(":visible").click();
        cy.getByData("edit-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("edit-task-button").filter(":visible").click();
        cy.getByData("edit-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("edit-task-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
