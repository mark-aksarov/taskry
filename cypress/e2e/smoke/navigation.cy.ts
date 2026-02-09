import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
  projectCategories,
  projects,
  taskCategories,
  tasks,
} from "@/prisma/test-utils/data";

describe("navigation smoke tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      companies,
      customers,
      projectCategories,
      projects,
      taskCategories,
      tasks,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
  });

  it("should verify all main modules are reachable and display seeded data", () => {
    const sections = [
      { url: "/en", data: "dashboard-cards" },
      { url: "/en/projects", data: "projects-list" },
      { url: "/en/tasks", data: "tasks-list" },
      { url: "/en/team", data: "users-list" },
      { url: "/en/customers", data: "customers-list" },
    ];

    sections.forEach((section) => {
      cy.visit(section.url);
      cy.getByData(section.data).should("be.visible");
    });
  });

  it("should verify detail pages content", () => {
    cy.visit("/en/team/user-1");
    cy.getByData("user-card").should("contain", "User 1");

    cy.visit("/en/profile");
    cy.getByData("user-card").should("contain", "User 1");

    cy.visit("/en/tasks/1");
    cy.getByData("task-card").should("contain", "Task 1");

    cy.visit("/en/projects/1");
    cy.getByData("project-card").should("contain", "Project 1");

    cy.visit("/en/customers/1");
    cy.getByData("customer-card").should("contain", "Customer 1");
  });
});
