import {
  users,
  accounts,
  projects,
  positions,
  workspaces,
  taskCategories,
} from "@/prisma/test-utils/data";

describe("edit a new project", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      companies: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
      ],
      customers: [
        {
          id: 1,
          bio: "Customer 1 bio",
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "/man.jpg",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          bio: "Customer 2 bio",
          fullName: "Customer 2",
          email: "customer-2@test.com",
          imageUrl: "/man.jpg",
          companyId: 2,
          workspaceId: 1,
        },
      ],
      workspaces,
      taskCategories,
      projectCategories: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 1 },
      ],
      projects: projects.slice(0, 1),
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
    companyKey: "2",
  };

  describe("projects page", () => {
    it("can edit a project", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/projects");

      cy.getByData("project-item-1-action-menu-trigger").click();
      cy.getMenuItem("edit").click();

      // fill form
      cy.fillProjectForm(projectData);

      // assert
      cy.getByData("project-list-item").within(() => {
        cy.contains("Updated Project Title");
        cy.contains("Category 2");
        cy.contains("Customer 2");
        cy.contains("Company 2");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/projects");

        cy.getByData("project-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("project detail page", () => {
    it("can edit a project", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/projects/1");

      cy.getByData("edit-project-button").filter(":visible").click();

      // fill form
      cy.fillProjectForm(projectData);

      // assert
      cy.getByData("project-card").within(() => {
        cy.contains("Updated Project Title");
        cy.contains("Category 2");
        cy.contains("Customer 2");
        cy.contains("Pending");
      });
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to open the edit modal", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("allows a user with 'user' role to open the edit modal", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("edit-project-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to edit", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/projects/1");

        cy.getByData("edit-project-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
