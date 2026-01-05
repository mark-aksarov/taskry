import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus } from "@/generated/prisma/enums";

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
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
  cy.signIn("owner@example.com", "12345abc");
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

    cy.getMenuItem("toolbar-sorting-menu-trigger", "title").click();

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

    cy.getMenuItem("toolbar-sorting-menu-trigger", "deadline").click();

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

    cy.getMenuItem("toolbar-sorting-menu-trigger", "status").click();

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

    cy.getMenuItem("toolbar-sorting-menu-trigger", "category").click();

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
