import {
  addDays,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
} from "date-fns";

import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const now = new Date();

export const dates = {
  overdue: addDays(startOfDay(now), -5),
  today: endOfDay(now),
  tomorrow: endOfDay(addDays(now, 1)),
  thisWeek: endOfWeek(now, { weekStartsOn: 1 }),
  nextWeek: endOfWeek(addDays(now, 7), { weekStartsOn: 1 }),
  prevWeek: startOfWeek(addDays(now, -7), { weekStartsOn: 1 }),
};

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
  cy.signIn("owner@example.com", "12345abc");
  cy.visit("/en/tasks");
};

describe("filter tasks", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  describe("filter by deadline", () => {
    it("filter tasks by 'today'", () => {
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
              deadline: dates.tomorrow,
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
              deadline: dates.overdue,
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
          ],
        }),
      );

      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("today-deadline-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "deadline=today");
    });

    it("filter tasks by 'tomorrow'", () => {
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
              deadline: dates.tomorrow,
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
              deadline: dates.overdue,
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
          ],
        }),
      );

      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("tomorrow-deadline-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "B");

      cy.location("search").should("include", "deadline=tomorrow");
    });

    it("filter tasks by 'thisWeek'", () => {
      setup(
        createPayload({
          tasks: [
            {
              id: 1,
              title: "A",
              status: TaskStatus.active,
              deadline: dates.thisWeek,
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
              deadline: dates.prevWeek,
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
              deadline: dates.nextWeek,
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
          ],
        }),
      );

      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("this-week-deadline-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "deadline=thisWeek");
    });

    it("filter tasks by 'overdue'", () => {
      setup(
        createPayload({
          tasks: [
            {
              id: 1,
              title: "A",
              status: TaskStatus.active,
              deadline: dates.overdue,
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
              assigneeId: "user-1",
            },
            {
              id: 3,
              title: "С",
              status: TaskStatus.active,
              deadline: dates.tomorrow,
              categoryId: 1,
              projectId: 1,
              workspaceId: 1,
              creatorId: "user-1",
              assigneeId: "user-1",
            },
          ],
        }),
      );

      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("overdue-deadline-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "deadline=overdue");
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

      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.setDatePickerDate("date-start", "12", "31", "2025");
      cy.setDatePickerDate("date-end", "01", "01", "2026");
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title").should("have.length", 2);
      cy.getByData("task-list-item-title").eq(0).should("contain", "A");
      cy.getByData("task-list-item-title").eq(1).should("contain", "B");

      cy.location("search")
        .should("include", "dateStart=2025-12-31")
        .should("include", "dateEnd=2026-01-01");
    });
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
      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("active-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "status=active");
    });

    it("filter by 'pending' status", () => {
      cy.getByData("toolbar-filters-modal-trigger").first().click();
      cy.getByData("pending-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("task-list-item-title")
        .should("have.length", 1)
        .and("contain", "B");

      cy.location("search").should("include", "status=pending");
    });

    it("filter by 'completed' status", () => {
      cy.getByData("toolbar-filters-modal-trigger").first().click();
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

    cy.getByData("toolbar-filters-modal-trigger").first().click();
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

    cy.getByData("toolbar-filters-modal-trigger").first().click();
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

    cy.getByData("toolbar-filters-modal-trigger").first().click();
    cy.getByData("assignee-user-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "assignee=user-1");
  });
});
