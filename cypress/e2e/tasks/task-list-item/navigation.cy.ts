import { E2ESeedPayload } from "../../../../prisma/e2e/types";

describe("Navigation & Modals", () => {
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
    cy.signIn("owner@example.com", "12345abc", "/tasks");
  });

  it("goes to the full task page", () => {
    cy.getByData("task-list-item-title").eq(0).click();
    cy.getByData("open-full-page-button")
      .should("have.attr", "href")
      .then((href) => {
        cy.getByData("open-full-page-button").click();
        cy.location("pathname").should("include", href);
      });
  });

  it("goes to the full project page", () => {
    cy.getByData("task-list-item-project-title").eq(0).click();
    cy.getByData("open-full-page-button")
      .should("have.attr", "href")
      .then((href) => {
        cy.getByData("open-full-page-button").click();
        cy.location("pathname").should("include", href);
      });
  });

  it("goes to the user's profile page", () => {
    cy.getByData("task-list-item-user-title").eq(0).click();
    cy.getByData("open-full-page-button")
      .should("have.attr", "href")
      .then((href) => {
        cy.getByData("open-full-page-button").click();
        cy.location("pathname").should("include", href);
      });
  });
});
