import {
  users,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
} from "@/prisma/test-utils/data";

describe("Project editing", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
      companies,
      customers,
      projectCategories: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 1 },
      ],
      projects,
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");
  });

  it("updates a project successfully", () => {
    cy.getByData("project-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillProjectForm({
      title: "Updated Project Title",
      description: "Updated Project Description",
      deadline: { day: "01", month: "02", year: "2026" },
      statusKey: "pending",
      categoryKey: "2",
      customerKey: "2",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item", "1").within(() => {
      cy.contains("Updated Project Title");
      cy.contains("Category 2");
      cy.contains("Pending");
      cy.contains("Customer 2");
      cy.contains("Company 1");
    });
  });

  it("pre-fills project form with default values", () => {
    cy.getByData("project-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("project-title-field").within(() =>
      cy.get("input").should("have.value", "Project 1"),
    );
    cy.getByData("project-description-field").within(() =>
      cy.get("textarea").should("have.value", "Description 1"),
    );
    cy.getByData("project-deadline-date-picker").within(() =>
      cy.get("input").should("have.value", "2025-12-31"),
    );
    cy.getByData("project-status-select").within(() =>
      cy.get("select").should("have.value", "active"),
    );
    cy.getByData("project-category-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
    cy.getByData("project-customer-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
  });

  it("updates a project when optional fields are empty", () => {
    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("project").click();

    cy.fillProjectForm({
      title: "Updated Project Title",
      deadline: { day: "01", month: "02", year: "2026" },
      statusKey: "pending",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("projects-list").within(() => {
      cy.contains("Updated Project Title");
      cy.contains("2026");
      cy.contains(/active/i);
      cy.contains("No category");
      cy.contains("No company");
      cy.contains("No customer");
    });
  });
});
