import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
  taskCategories,
  projects,
} from "@/prisma/seed/test-data";

import { TaskStatus } from "@/generated/prisma/enums";
import { TestSeedPayload } from "@/prisma/test-seed";

const createPayload = (payload: TestSeedPayload): TestSeedPayload => {
  const basePayload: TestSeedPayload = {
    workspaces,
    users,
    accounts,
    positions,
    companies,
    customers,
    projectCategories,
    taskCategories,
    projects,
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: TestSeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("user-1@test.com", "12345abc");
  cy.visit("/en/tasks");
};

describe("sort tasks", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("sort by creation date", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task 1",
            status: TaskStatus.active,
            deadline: new Date("2030-01-03"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
            createdAt: new Date("2030-01-01"),
          },
          {
            id: 2,
            title: "Task 2",
            status: TaskStatus.active,
            deadline: new Date("2030-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
            createdAt: new Date("2030-01-02"),
          },
          {
            id: 3,
            title: "Task 3",
            status: TaskStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
            createdAt: new Date("2030-01-03"),
          },
        ],
      }),
    );

    cy.getByData("task-sorting-menu-trigger-large").click();
    cy.getMenuItem("createdAt").click();

    cy.getByData("task-list-item").eq(0).should("contain", "Task 3");
    cy.getByData("task-list-item").eq(1).should("contain", "Task 2");
    cy.getByData("task-list-item").eq(2).should("contain", "Task 1");
  });

  it("sort by title", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task C",
            status: TaskStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            status: TaskStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task A",
            status: TaskStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-sorting-menu-trigger-large").click();
    cy.getMenuItem("title").click();

    cy.getByData("task-list-item").eq(0).should("contain", "Task A");
    cy.getByData("task-list-item").eq(1).should("contain", "Task B");
    cy.getByData("task-list-item").eq(2).should("contain", "Task C");
  });

  it("sort by deadline", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task 1",
            status: TaskStatus.active,
            deadline: new Date("2030-01-03"),
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
            deadline: new Date("2030-01-02"),
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
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-sorting-menu-trigger-large").click();
    cy.getMenuItem("deadline").click();

    cy.getByData("task-list-item").eq(0).should("contain", "Task 3");
    cy.getByData("task-list-item").eq(1).should("contain", "Task 2");
    cy.getByData("task-list-item").eq(2).should("contain", "Task 1");
  });

  it("sort by status", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task Pending",
            status: TaskStatus.pending,
            deadline: new Date("2030-01-03"),
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
            deadline: new Date("2030-01-02"),
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
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-sorting-menu-trigger-large").click();
    cy.getMenuItem("status").click();

    cy.getByData("task-list-item").eq(0).should("contain", "Task Active");
    cy.getByData("task-list-item").eq(1).should("contain", "Task Pending");
    cy.getByData("task-list-item").eq(2).should("contain", "Task Completed");
  });
});
