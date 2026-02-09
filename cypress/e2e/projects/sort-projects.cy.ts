import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
  projectCategories,
} from "@/prisma/test-utils/data";

import { ProjectStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/test-utils/types";

const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
  const basePayload: E2ESeedPayload = {
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

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("user-1@test.com", "12345abc");
  cy.visit("/en/projects");
};

describe("sort projects", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("sort by title", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "C",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("title").click();

    cy.getByData("project-list-item-title").eq(0).should("contain", "A");
    cy.getByData("project-list-item-title").eq(1).should("contain", "B");
    cy.getByData("project-list-item-title").eq(2).should("contain", "C");
  });

  it("sort by deadline", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "A",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-03"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "B",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "C",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("deadline").click();

    cy.getByData("project-list-item-title").eq(0).should("contain", "C");
    cy.getByData("project-list-item-title").eq(1).should("contain", "B");
    cy.getByData("project-list-item-title").eq(2).should("contain", "A");
  });

  it("sort by status", () => {
    setup(
      createPayload({
        projects: [
          {
            id: 1,
            title: "Project Pending",
            status: ProjectStatus.pending,
            deadline: new Date("2022-01-03"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project Active",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project Completed",
            status: ProjectStatus.completed,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("status").click();

    cy.getByData("project-list-item-title")
      .eq(0)
      .should("contain", "Project Active");
    cy.getByData("project-list-item-title")
      .eq(1)
      .should("contain", "Project Pending");
    cy.getByData("project-list-item-title")
      .eq(2)
      .should("contain", "Project Completed");
  });

  it("sort by category", () => {
    setup(
      createPayload({
        projectCategories: [
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
        projects: [
          {
            id: 1,
            title: "Project Category B",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-03"),
            categoryId: 2,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 2,
            title: "Project Category A",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-02"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
          {
            id: 3,
            title: "Project Category C",
            status: ProjectStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 3,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      }),
    );

    cy.getByData("project-toolbar-sorting-button-desktop")
      .filter(":visible")
      .click();

    cy.getMenuItem("category").click();

    cy.getByData("project-list-item-title")
      .eq(0)
      .should("contain", "Project Category A");

    cy.getByData("project-list-item-title")
      .eq(1)
      .should("contain", "Project Category B");

    cy.getByData("project-list-item-title")
      .eq(2)
      .should("contain", "Project Category C");
  });
});
