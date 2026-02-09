import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
} from "@/prisma/test-utils/data";

import { dates } from "@/lib/data/utils/test-utils";
import { E2ESeedPayload } from "@/prisma/test-utils/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
  const basePayload: E2ESeedPayload = {
    workspaces,
    users,
    accounts,
    positions,
    companies,
    customers,
    projectCategories: [{ id: 1, name: "Category A", workspaceId: 1 }],
    taskCategories: [
      { id: 1, name: "Category A", workspaceId: 1 },
      { id: 2, name: "Category B", workspaceId: 1 },
    ],
    projects: [
      {
        id: 1,
        title: "Project A",
        status: ProjectStatus.active,
        deadline: new Date("2022-01-01"),
        categoryId: 1,
        customerId: 1,
        workspaceId: 1,
        creatorId: "user-1",
      },
      {
        id: 2,
        title: "Project B",
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
  cy.signIn("user-1@test.com", "12345abc");
  cy.visit("/en/tasks");
};

describe("filter tasks", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("filter only my tasks", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "A",
            status: TaskStatus.active,
            deadline: dates.today,
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
            deadline: dates.today,
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-2",
          },
          {
            id: 3,
            title: "C",
            status: TaskStatus.active,
            deadline: dates.today,
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("show-only-my-tasks").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title").should("have.length", 2);
    cy.getByData("task-list-item-title").eq(0).should("contain", "A");
    cy.getByData("task-list-item-title").eq(1).should("contain", "C");

    cy.location("search").should("include", "onlyMyTasks=true");
  });

  it("filter by range deadline", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "A",
            status: TaskStatus.active,
            deadline: new Date("2025-12-31"),
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
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "С",
            status: TaskStatus.active,
            deadline: new Date("2026-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.setDatePickerDate("deadline-from-date-picker", "12", "31", "2025");
    cy.setDatePickerDate("deadline-to-date-picker", "01", "01", "2026");
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title").should("have.length", 2);
    cy.getByData("task-list-item-title").eq(0).should("contain", "A");
    cy.getByData("task-list-item-title").eq(1).should("contain", "B");

    cy.location("search")
      .should("include", "deadlineFrom=2025-12-31")
      .should("include", "deadlineTo=2026-01-01");
  });

  describe("filter by status", () => {
    beforeEach(() => {
      setup(
        createPayload({
          tasks: [
            {
              id: 1,
              title: "A",
              status: TaskStatus.active,
              deadline: new Date("2025-12-31"),
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
            {
              id: 2,
              title: "B",
              status: TaskStatus.pending,
              deadline: new Date("2026-01-01"),
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
            {
              id: 3,
              title: "C",
              status: TaskStatus.completed,
              deadline: new Date("2026-01-02"),
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
          ],
        }),
      );
    });

    it("filter by 'active' status", () => {
      cy.getByData("task-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("active-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "status=active");
    });

    it("filter by 'pending' status", () => {
      cy.getByData("task-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("pending-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "B");

      cy.location("search").should("include", "status=pending");
    });

    it("filter by 'completed' status", () => {
      cy.getByData("task-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("completed-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "C");

      cy.location("search").should("include", "status=completed");
    });
  });

  it("filter by task category", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "A",
            status: TaskStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: TaskStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 2,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("category-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "category=1");
  });

  it("filter by task project", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "A",
            status: TaskStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: TaskStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            projectId: 2,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("project-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "project=1");
  });

  it("filter by task assignee", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "A",
            status: TaskStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: TaskStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-2",
          },
        ],
      }),
    );

    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("assignee-user-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "assignee=user-1");
  });
});
