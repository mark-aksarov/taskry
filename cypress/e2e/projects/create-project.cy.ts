import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Project creation", () => {
  const projectData = {
    title: "Created Project Title",
    description: "Created Project Description",
    deadline: { day: "01", month: "02", year: "2026" },
    statusKey: "active",
    categoryKey: "1",
    customerKey: "1",
  };

  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      companies,
      customers,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");
  });

  it("creates a new project with valid data", () => {
    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("project").click();

    cy.fillProjectForm(projectData);

    // Submit
    cy.get('button[type="submit"]').click();

    cy.getByData("projects-list").within(() => {
      cy.contains(projectData.title);
      cy.contains(projectData.deadline.year);
      cy.contains(/active/i);
      cy.contains("Customer 1");
      cy.contains("Project Category 1");
      cy.contains("Company 1");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("project").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/title is required/i);
    cy.contains(/deadline is required/i);
    cy.contains(/status is required/i);
  });

  it("creates a project when optional fields are empty", () => {
    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("project").click();

    cy.fillProjectForm({
      title: projectData.title,
      deadline: projectData.deadline,
      statusKey: projectData.statusKey,
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("projects-list").within(() => {
      cy.contains(projectData.title);
      cy.contains(projectData.deadline.year);
      cy.contains(/active/i);
      cy.contains("No category");
      cy.contains("No company");
      cy.contains("No customer");
    });
  });
});
