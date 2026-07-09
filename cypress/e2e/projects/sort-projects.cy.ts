import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
  projectCategories,
} from "@/prisma/seed/test-data";

import { TestSeedPayload } from "@/prisma/test-seed";
import { ProjectStatus } from "@/generated/prisma/enums";

const createPayload = (payload: TestSeedPayload): TestSeedPayload => {
  const basePayload: TestSeedPayload = {
    workspaces,
    users,
    accounts,
    positions,
    companies,
    customers,
    projectCategories,
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: TestSeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("user-1@test.com", "12345abc");
  cy.visit("/en/projects");
};

describe("sort projects", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("sort by creation date", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project C",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            createdAt: new Date("2030-01-01"),
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            createdAt: new Date("2030-01-02"),
          },
          {
            id: 3,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            createdAt: new Date("2030-01-03"),
          },
        ],
      }),
    );

    cy.getByData("project-sorting-menu-trigger-large").click();
    cy.getMenuItem("createdAt").click();

    cy.getByData("project-list-item").eq(0).should("contain", "Project A");
    cy.getByData("project-list-item").eq(1).should("contain", "Project B");
    cy.getByData("project-list-item").eq(2).should("contain", "Project C");
  });

  it("sort by title", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project C",
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
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-sorting-menu-trigger-large").click();
    cy.getMenuItem("title").click();

    cy.getByData("project-list-item").eq(0).should("contain", "Project A");
    cy.getByData("project-list-item").eq(1).should("contain", "Project B");
    cy.getByData("project-list-item").eq(2).should("contain", "Project C");
  });

  it("sort by deadline", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project A",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-03"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project B",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project C",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-sorting-menu-trigger-large").click();
    cy.getMenuItem("deadline").click();

    cy.getByData("project-list-item").eq(0).should("contain", "Project C");
    cy.getByData("project-list-item").eq(1).should("contain", "Project B");
    cy.getByData("project-list-item").eq(2).should("contain", "Project A");
  });

  it("sort by status", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project Pending",
            status: ProjectStatus.pending,
            deadline: new Date("2030-01-03"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project Active",
            status: ProjectStatus.active,
            deadline: new Date("2030-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project Completed",
            status: ProjectStatus.completed,
            deadline: new Date("2030-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-sorting-menu-trigger-large").click();
    cy.getMenuItem("status").click();

    cy.getByData("project-list-item").eq(0).should("contain", "Project Active");
    cy.getByData("project-list-item")
      .eq(1)
      .should("contain", "Project Pending");
    cy.getByData("project-list-item")
      .eq(2)
      .should("contain", "Project Completed");
  });
});
