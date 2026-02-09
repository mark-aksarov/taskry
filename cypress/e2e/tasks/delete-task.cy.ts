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
      tasks: tasks.slice(0, 1),
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  describe("tasks page", () => {
    it("can delete a task", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/tasks");

      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("delete").click();
      cy.getByData("delete-task-modal-confirm-button").click();
      cy.getByData("task-list-item").should("not.exist");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/tasks");

        cy.getByData("task-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("task detail page", () => {
    it("can delete a task", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/tasks/1");

      cy.getByData("delete-task-button").filter(":visible").click();
      cy.getByData("delete-task-modal-confirm-button").click();
      cy.url().should("include", "/tasks");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("delete-task-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/tasks/1");

        cy.getByData("delete-task-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
