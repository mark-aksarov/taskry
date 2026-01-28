import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
  const basePayload: E2ESeedPayload = {
    companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
    customers: [
      {
        id: 1,
        email: "owner@example.com",
        fullName: "John Doe",
        companyId: 1,
        workspaceId: 1,
      },
    ],
    projectCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
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

  return { ...basePayload, ...payload };
};

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("owner@example.com", "12345abc");
  cy.visit("/en/tasks");
};

describe("sort tasks", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("sort by title", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "C",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "A",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("title").click();

    cy.getByData("task-list-item-title").eq(0).should("contain", "A");
    cy.getByData("task-list-item-title").eq(1).should("contain", "B");
    cy.getByData("task-list-item-title").eq(2).should("contain", "C");
  });

  it("sort by deadline", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task 1",
            status: TaskStatus.active,
            deadline: new Date("2022-01-03"),
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
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task 3",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("deadline").click();

    cy.getByData("task-list-item-title").eq(0).should("contain", "Task 3");
    cy.getByData("task-list-item-title").eq(1).should("contain", "Task 2");
    cy.getByData("task-list-item-title").eq(2).should("contain", "Task 1");
  });

  it("sort by status", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task Pending",
            status: TaskStatus.pending,
            deadline: new Date("2022-01-03"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task Active",
            status: TaskStatus.active,
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task Completed",
            status: TaskStatus.completed,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();
    cy.getMenuItem("status").click();

    cy.getByData("task-list-item-title").eq(0).should("contain", "Task Active");
    cy.getByData("task-list-item-title")
      .eq(1)
      .should("contain", "Task Pending");
    cy.getByData("task-list-item-title")
      .eq(2)
      .should("contain", "Task Completed");
  });

  it("sort by category", () => {
    setup(
      createPayload({
        taskCategories: [
          {
            id: 1,
            name: "A",
            workspaceId: 1,
          },
          {
            id: 2,
            name: "B",
            workspaceId: 1,
          },
          {
            id: 3,
            name: "C",
            workspaceId: 1,
          },
        ],
        tasks: [
          {
            id: 1,
            title: "Task Category B",
            status: TaskStatus.active,
            deadline: new Date("2022-01-03"),
            categoryId: 2,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task Category A",
            status: TaskStatus.active,
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task Category C",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 3,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();
    cy.getMenuItem("category").click();

    cy.getByData("task-list-item-title")
      .eq(0)
      .should("contain", "Task Category A");

    cy.getByData("task-list-item-title")
      .eq(1)
      .should("contain", "Task Category B");

    cy.getByData("task-list-item-title")
      .eq(2)
      .should("contain", "Task Category C");
  });
});
