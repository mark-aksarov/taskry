import { E2ESeedPayload } from "../../../prisma/e2e/types";

describe("Dashboard cards", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Company 2",
          workspaceId: 1,
        },
      ],
      customers: [
        {
          id: 1,
          email: "owner@example.com",
          fullName: "John Doe",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "jane@example.com",
          fullName: "Jane Doe",
          companyId: 2,
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
        {
          id: 2,
          title: "Project 2",
          status: "active",
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 2,
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
        {
          id: 2,
          title: "Task 2",
          status: "active",
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 2,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en");
  });

  it("Displays correct dashboard cards", () => {
    cy.getByData("dashboard-card-text")
      .eq(0)
      .should("contain", "Total Projects");
    cy.getByData("dashboard-card-value").eq(0).should("contain", "2");

    cy.getByData("dashboard-card-text").eq(1).should("contain", "Total Tasks");
    cy.getByData("dashboard-card-value").eq(1).should("contain", "2");

    cy.getByData("dashboard-card-text").eq(2).should("contain", "Total Users");
    cy.getByData("dashboard-card-value").eq(2).should("contain", "5");

    cy.getByData("dashboard-card-text")
      .eq(3)
      .should("contain", "Total Customers");
    cy.getByData("dashboard-card-value").eq(3).should("contain", "2");
  });
});
