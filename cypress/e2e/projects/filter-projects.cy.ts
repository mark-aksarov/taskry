import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
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
    projectCategories: [
      { id: 1, name: "Category A", workspaceId: 1 },
      { id: 2, name: "Category B", workspaceId: 1 },
    ],
    taskCategories: [{ id: 1, name: "Category A", workspaceId: 1 }],
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: E2ESeedPayload) => {
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
            title: "A",
            status: ProjectStatus.active,
            deadline: dates.today,
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: ProjectStatus.active,
            deadline: dates.tomorrow,
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "C",
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
            title: "C",
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

    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("no-active-tasks-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item-title")
      .should("have.length", 1)
      .should("contain", "B");

    cy.location("search").should("include", "noActiveTasks=true");
  });

  it("filter by range deadline", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: ProjectStatus.active,
            deadline: new Date("2026-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "C",
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

    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.setDatePickerDate("deadline-from-date-picker", "12", "31", "2025");
    cy.setDatePickerDate("deadline-to-date-picker", "01", "01", "2026");
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item-title").should("have.length", 2);
    cy.getByData("project-list-item-title").eq(0).should("contain", "A");
    cy.getByData("project-list-item-title").eq(1).should("contain", "B");

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
              title: "A",
              status: ProjectStatus.active,
              deadline: new Date("2025-12-31"),
              categoryId: 1,
              customerId: 1,
              workspaceId: 1,
              creatorId: "user-1",
            },
            {
              id: 2,
              title: "B",
              status: ProjectStatus.pending,
              deadline: new Date("2026-01-01"),
              categoryId: 1,
              customerId: 1,
              workspaceId: 1,
              creatorId: "user-1",
            },
            {
              id: 3,
              title: "C",
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
      cy.getByData("project-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("active-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item-title")
        .should("have.length", 1)
        .and("contain", "A");

      cy.location("search").should("include", "status=active");
    });

    it("filter by 'pending' status", () => {
      cy.getByData("project-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("pending-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item-title")
        .should("have.length", 1)
        .and("contain", "B");

      cy.location("search").should("include", "status=pending");
    });

    it("filter by 'completed' status", () => {
      cy.getByData("project-toolbar-filters-button-desktop")
        .filter(":visible")
        .click();

      cy.getByData("completed-checkbox").click();
      cy.get('button[type="submit"]').click();

      cy.getByData("project-list-item-title")
        .should("have.length", 1)
        .and("contain", "C");

      cy.location("search").should("include", "status=completed");
    });
  });

  it("filter by project category", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
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

    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("category-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "category=1");
  });

  it("filter by customer", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
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

    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("customer-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "customer=1");
  });

  it("filter by project creator", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2025-12-31"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
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

    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();

    cy.getByData("user-user-1-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("project-list-item-title")
      .should("have.length", 1)
      .and("contain", "A");

    cy.location("search").should("include", "user=user-1");
  });
});
