import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
} from "@/prisma/seed/test-data";

import { dates } from "@/lib/data/utils/test-utils";
import { TestSeedPayload } from "@/prisma/test-seed";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const createPayload = (payload: TestSeedPayload): TestSeedPayload => {
  const basePayload: TestSeedPayload = {
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
        deadline: new Date("2030-01-01"),
        categoryId: 1,
        customerId: 1,
        workspaceId: 1,
        creatorId: "user-1",
      },
      {
        id: 2,
        title: "Project B",
        status: ProjectStatus.active,
        deadline: new Date("2031-01-01"),
        categoryId: 1,
        customerId: 1,
        workspaceId: 1,
        creatorId: "user-1",
      },
    ],
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: TestSeedPayload) => {
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
            title: "Task A",
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
            title: "Task B",
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
            title: "Task C",
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

    cy.getByData("task-filters-modal-trigger-large").click();

    cy.getByData("only-my-tasks").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item").should("have.length", 2);
    cy.getByData("task-list-item", "1").should("contain", "Task A");
    cy.getByData("task-list-item", "3").should("contain", "Task C");

    cy.location("search").should("include", "onlyMyTasks=true");
  });

  it("filter by range deadline", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task A",
            status: TaskStatus.active,
            deadline: new Date("2030-12-31"),
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
            deadline: new Date("2031-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task С",
            status: TaskStatus.active,
            deadline: new Date("2031-01-02"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-filters-modal-trigger-large").click();

    cy.setDatePickerDate("deadline-from-date-picker", "12", "31", "2030");
    cy.setDatePickerDate("deadline-to-date-picker", "01", "01", "2031");
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item").should("have.length", 2);
    cy.getByData("task-list-item", "1").should("contain", "Task A");
    cy.getByData("task-list-item", "2").should("contain", "Task B");

    cy.location("search")
      .should("include", "deadlineFrom=2030-12-31")
      .should("include", "deadlineTo=2031-01-01");
  });

  describe("filter by status", () => {
    beforeEach(() => {
      setup(
        createPayload({
          tasks: [
            {
              id: 1,
              title: "Task A",
              status: TaskStatus.active,
              deadline: new Date("2030-12-31"),
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
            {
              id: 2,
              title: "Task B",
              status: TaskStatus.pending,
              deadline: new Date("2031-01-01"),
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
            {
              id: 3,
              title: "Task C",
              status: TaskStatus.completed,
              deadline: new Date("2031-01-02"),
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
      cy.getByData("task-filters-modal-trigger-large").click();

      cy.getByData("active-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item")
        .should("have.length", 1)
        .and("contain", "Task A");

      cy.location("search").should("include", "statuses=active");
    });

    it("filter by 'pending' status", () => {
      cy.getByData("task-filters-modal-trigger-large").click();

      cy.getByData("pending-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item")
        .should("have.length", 1)
        .and("contain", "Task B");

      cy.location("search").should("include", "statuses=pending");
    });

    it("filter by 'completed' status", () => {
      cy.getByData("task-filters-modal-trigger-large").click();

      cy.getByData("completed-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item")
        .should("have.length", 1)
        .and("contain", "Task C");

      cy.location("search").should("include", "statuses=completed");
    });
  });

  it("filter by task category", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task A",
            status: TaskStatus.active,
            deadline: new Date("2030-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            status: TaskStatus.pending,
            deadline: new Date("2031-01-01"),
            categoryId: 2,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-filters-modal-trigger-large").click();

    cy.getByData("task-category-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item").should("have.length", 1).and("contain", "A");

    cy.location("search").should("include", "categoryIds=1");
  });

  it("filter by task project", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task A",
            status: TaskStatus.active,
            deadline: new Date("2030-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            status: TaskStatus.pending,
            deadline: new Date("2031-01-01"),
            categoryId: 1,
            projectId: 2,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("task-filters-modal-trigger-large").click();

    cy.getByData("project-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item")
      .should("have.length", 1)
      .and("contain", "Task A");

    cy.location("search").should("include", "projectIds=1");
  });

  it("filter by task assignee", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task A",
            status: TaskStatus.active,
            deadline: new Date("2030-12-31"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            status: TaskStatus.pending,
            deadline: new Date("2031-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-2",
          },
        ],
      }),
    );

    cy.getByData("task-filters-modal-trigger-large").click();

    cy.getByData("user-checkbox", "user-1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item")
      .should("have.length", 1)
      .and("contain", "Task A");

    cy.location("search").should("include", "assigneeIds=user-1");
  });
});
