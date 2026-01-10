import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
  const basePayload: E2ESeedPayload = {
    companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
    customers: [
      {
        id: 1,
        email: "customer@example.com",
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
};

describe("deletes a task", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("can delete a task", () => {
    setup(
      createPayload({
        tasks: [
          {
            id: 1,
            title: "Task 1",
            status: TaskStatus.active,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId: "user-3",
          },
        ],
      }),
    );
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getMenuItem("task-item-1-action-menu-trigger", "delete").click();
    cy.getByData("confirm-button").click();
    cy.getByData("task-list-item").should("not.exist");

    // check notifications
    cy.checkNotifications(0);

    // sign in as user-2
    cy.signIn("manager@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(1, [
      {
        target: "Task 1",
        actor: "John Doe",
        action: "deleted the task",
      },
    ]);

    // sign in as user-2
    cy.signIn("user@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(1, [
      {
        target: "Task 1",
        actor: "John Doe",
        action: "deleted the task",
      },
    ]);
  });

  describe("access control (RBAC)", () => {
    beforeEach(() => {
      setup(
        createPayload({
          tasks: [
            {
              id: 1,
              title: "Task 1",
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
    });

    it("allows a user with 'owner' role to open the edit modal", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "delete").click();
      cy.getByData("delete-entity-modal").should("be.visible");
    });

    it("allows a user with 'manager' role to open the edit modal", () => {
      cy.signIn("manager@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "delete").click();
      cy.getByData("delete-entity-modal").should("be.visible");
    });

    it("prevents 'user' from editing by disabling the menu option", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "delete").should(
        "have.attr",
        "aria-disabled",
        "true",
      );
    });

    it("shows a restriction modal when a 'guest' attempts to delete", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "edit").click();
      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
