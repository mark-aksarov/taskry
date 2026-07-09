import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
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
    projectCategories: [
      { id: 1, name: "Category A", workspaceId: 1 },
      { id: 2, name: "Category B", workspaceId: 1 },
    ],
    taskCategories: [{ id: 1, name: "Category A", workspaceId: 1 }],
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: TestSeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("user-1@test.com", "12345abc");
  cy.visit("/en/projects");
};

describe("filter projects", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("filter projects with no active tasks", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: dates.today,
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.active,
            deadline: dates.tomorrow,
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project C",
            status: ProjectStatus.pending,
            deadline: dates.tomorrow,
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
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
            status: TaskStatus.completed,
            deadline: dates.tomorrow,
            categoryId: 1,
            projectId: 2,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
          {
            id: 3,
            title: "Task C",
            status: TaskStatus.pending,
            deadline: dates.tomorrow,
            categoryId: 1,
            projectId: 3,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-filters-modal-trigger-large").click();

    cy.getByData("has-no-active-tasks-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item").should("have.length", 2);
    cy.getByData("project-list-item", "2").should("contain", "Project B");
    cy.getByData("project-list-item", "3").should("contain", "Project C");

    cy.location("search").should("include", "noActiveTasks=true");
  });

  it("filter by range deadline", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.active,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project C",
            status: ProjectStatus.active,
            deadline: new Date("2026-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-filters-modal-trigger-large").click();

    cy.setDatePickerDate("deadline-from-date-picker", "12", "31", "2025");
    cy.setDatePickerDate("deadline-to-date-picker", "01", "01", "2026");
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item").should("have.length", 2);
    cy.getByData("project-list-item", "1").should("contain", "Project A");
    cy.getByData("project-list-item", "2").should("contain", "Project B");

    cy.location("search")
      .should("include", "deadlineFrom=2025-12-31")
      .should("include", "deadlineTo=2026-01-01");
  });

  describe("filter by status", () => {
    beforeEach(() => {
      setup(
        createPayload({
          projects: [
            {
              id: 1,
              title: "Project A",
              status: ProjectStatus.active,
              deadline: new Date("2025-12-31"),
              categoryId: 1,
              customerId: 1,
              workspaceId: 1,
              creatorId: "user-1",
            },
            {
              id: 2,
              title: "Project B",
              status: ProjectStatus.pending,
              deadline: new Date("2026-01-01"),
              categoryId: 1,
              customerId: 1,
              workspaceId: 1,
              creatorId: "user-1",
            },
            {
              id: 3,
              title: "Project C",
              status: ProjectStatus.completed,
              deadline: new Date("2026-01-02"),
              categoryId: 1,
              customerId: 1,
              workspaceId: 1,
              creatorId: "user-1",
            },
          ],
        }),
      );
    });

    it("filter by 'active' status", () => {
      cy.getByData("project-filters-modal-trigger-large").click();

      cy.getByData("active-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item").and("contain", "Project A");

      cy.location("search").should("include", "statuses=active");
    });

    it("filter by 'pending' status", () => {
      cy.getByData("project-filters-modal-trigger-large").click();

      cy.getByData("pending-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item").and("contain", "Project B");

      cy.location("search").should("include", "statuses=pending");
    });

    it("filter by 'completed' status", () => {
      cy.getByData("project-filters-modal-trigger-large").click();

      cy.getByData("completed-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item").and("contain", "Project C");

      cy.location("search").should("include", "statuses=completed");
    });
  });

  it("filter by project category", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 2,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-filters-modal-trigger-large").click();

    cy.getByData("category-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item").and("contain", "A");

    cy.location("search").should("include", "categoryIds=1");
  });

  it("filter by customer", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            customerId: 2,
            workspaceId: 1,
            creatorId: "user-2",
          },
        ],
      }),
    );

    cy.getByData("project-filters-modal-trigger-large").click();

    cy.getByData("customer-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item")
      .should("have.length", 1)
      .and("contain", "Project A");

    cy.location("search").should("include", "customerIds=1");
  });

  it("filter by project creator", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.pending,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-2",
          },
        ],
      }),
    );

    cy.getByData("project-filters-modal-trigger-large").click();

    cy.getByData("user-checkbox", "user-1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item")
      .should("have.length", 1)
      .and("contain", "Project A");

    cy.location("search").should("include", "creatorIds=user-1");
  });
});
