import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("deletes a task", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

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

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  describe("tasks page", () => {
    it("can delete a task", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");

      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("delete").click();
      cy.getByData("delete-task-modal-confirm-button").click();
      cy.getByData("task-list-item").should("not.exist");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("task detail page", () => {
    it("can delete a task", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks/1");

      cy.getByData("delete-task-button").filter(":visible").click();
      cy.getByData("delete-task-modal-confirm-button").click();
      cy.url().should("include", "/tasks");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
