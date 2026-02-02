import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("navigation smoke tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
      ],
      customers: [
        {
          id: 1,
          email: "owner@example.com",
          fullName: "Kevin Doe",
          companyId: 1,
          workspaceId: 1,
        },
      ],
      projectCategories: [
        {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      ],
      projects: [
        {
          id: 1,
          title: "Project 1",
          status: "active",
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
      taskCategories: [
        {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: "active",
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
    cy.signIn("owner@example.com", "12345abc");
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
    cy.getByData("user-card").should("contain", "John Doe");

    cy.visit("/en/profile");
    cy.getByData("user-card").should("contain", "John Doe");

    cy.visit("/en/tasks/1");
    cy.getByData("task-card").should("contain", "Task 1");

    cy.visit("/en/projects/1");
    cy.getByData("project-card").should("contain", "Project 1");

    cy.visit("/en/customers/1");
    cy.getByData("customer-card").should("contain", "Kevin Doe");
  });
});
