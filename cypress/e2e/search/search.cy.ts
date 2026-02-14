import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  projectCategories,
  projects,
  taskCategories,
} from "@/prisma/test-utils/data";

import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("search", () => {
  before(() => {
    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      companies,
      projectCategories,
      projects,
      taskCategories,

      customers: [
        {
          id: 1,
          email: "customer-1@example.com",
          fullName: "Customer 1",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "customer-2@example.com",
          fullName: "Customer 2",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 3,
          email: "customer-3@example.com",
          fullName: "Customer 3",
          companyId: 1,
          workspaceId: 1,
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,
          deadline: new Date(),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.active,
          deadline: new Date(),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-2",
        },
        {
          id: 3,
          title: "Task 3",
          status: TaskStatus.active,
          deadline: new Date(),
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
  });

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en");
  });

  it("search all tasks when no query is provided", () => {
    cy.getByData("search-modal-trigger").click();

    cy.getByData("search-list").contains("Task 1");
    cy.getByData("search-list").contains("Task 2");
    cy.getByData("search-list").contains("Task 3");
  });

  it("search users when they match the query '1'", () => {
    cy.getByData("search-modal-trigger").click();
    cy.get("input[name=search]").type("1");

    cy.getByData("search-list").contains("Task 1");
  });

  it("navigate to projects tab", () => {
    cy.getByData("search-modal-trigger").click();
    cy.getByData("projects-button").click();

    cy.getByData("search-list").contains("Project 1");
    cy.getByData("search-list").contains("Project 2");
  });

  it("navigate through links", () => {
    cy.getByData("search-modal-trigger").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/tasks/1");

    cy.getByData("search-modal-trigger").click();
    cy.getByData("projects-button").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/projects/1");
  });
});
