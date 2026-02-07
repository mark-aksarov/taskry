import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus } from "@/generated/prisma/enums";

describe("edit a new project", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
      ],
      customers: [
        {
          id: 1,
          email: "customer-1@example.com",
          fullName: "Kevin Hamilton",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "customer-2@example.com",
          fullName: "Larry Doe",
          companyId: 2,
          workspaceId: 1,
        },
      ],
      projectCategories: [
        { id: 1, name: "Category 1", workspaceId: 1 },
        { id: 2, name: "Category 2", workspaceId: 1 },
      ],
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
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  const projectData = {
    title: "Updated Project Title",
    description: "Updated Project Description",
    deadline: { day: "01", month: "02", year: "2026" },
    statusKey: "pending",
    categoryKey: "2",
    customerKey: "2",
  };

  describe("projects page", () => {
    it("can edit a project", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/projects");

      cy.getByData("project-item-1-action-menu-trigger").click();
      cy.getMenuItem("edit").click();

      // fill form
      cy.fillProjectForm(projectData);

      // assert
      cy.getByData("project-list-item").within(() => {
        cy.contains("Updated Project Title");
        cy.contains("Category 2");
        cy.contains("Larry Doe");
        cy.contains("Company 2");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe.only("project detail page", () => {
    it("can edit a project", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/projects/1");

      cy.getByData("edit-project-button").filter(":visible").click();

      // fill form
      cy.fillProjectForm(projectData);

      // assert
      cy.getByData("project-card").within(() => {
        cy.contains("Updated Project Title");
        cy.contains("Category 2");
        cy.contains("Larry Doe");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
