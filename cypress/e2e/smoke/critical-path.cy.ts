import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("Critical Path Smoke Tests", () => {
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
          fullName: "John Doe",
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
    cy.visit("/en");
  });

  it("should verify main pages are accessible", () => {
    cy.visit("/en");
    cy.getByData("dashboard-cards").should("exist");
    cy.getByData("tasks-list").should("be.visible");

    cy.visit("/en/projects");
    cy.getByData("projects-list").should("be.visible");

    cy.visit("/en/projects/1");
    cy.getByData("project-detail-card").should("be.visible");

    cy.visit("/en/tasks");
    cy.getByData("tasks-list").should("be.visible");

    cy.visit("/en/tasks/1");
    cy.getByData("task-detail-card").should("be.visible");

    cy.visit("/en/team");
    cy.getByData("users-list").should("be.visible");

    cy.visit("/en/team/user-1");
    cy.getByData("user-card").should("be.visible");

    cy.visit("/en/team/user-1/tasks");
    cy.getByData("user-card").should("be.visible");
    cy.getByData("user-task-list").should("be.visible");

    cy.visit("/en/customers");
    cy.getByData("customers-list").should("be.visible");

    cy.visit("/en/profile");
    cy.getByData("user-card").should("be.visible");

    cy.visit("/en/profile/tasks");
    cy.getByData("user-card").should("be.visible");
    cy.getByData("user-task-list").should("be.visible");
  });
});
