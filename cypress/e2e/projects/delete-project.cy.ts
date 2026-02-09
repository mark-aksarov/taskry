import {
  users,
  tasks,
  accounts,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("deletes a project", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      companies,
      customers,
      workspaces,
      taskCategories,
      projectCategories,
      projects: projects.slice(0, 1),
      tasks: tasks.slice(0, 2),
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  describe("projects page ", () => {
    it("can delete a project", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/projects");

      cy.getByData("project-item-1-action-menu-trigger").click();
      cy.getMenuItem("delete").click();
      cy.getByData("delete-project-modal-confirm-button").click();
      cy.getByData("project-list-item").should("not.exist");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
        cy.getByData("delete-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("project detail page", () => {
    it("can delete a project", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/projects/1");

      cy.getByData("delete-project-button").filter(":visible").click();
      cy.getByData("delete-project-modal-confirm-button").click();
      cy.url().should("include", "/projects");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("delete-project-button").filter(":visible").click();
        cy.getByData("delete-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("delete-project-button").filter(":visible").click();
        cy.getByData("delete-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to delete", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("delete-project-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
