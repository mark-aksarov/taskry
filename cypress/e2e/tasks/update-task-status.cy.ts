import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("update task status", () => {
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
      taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
    };

    return { ...basePayload, ...payload };
  };

  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = createPayload({
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
        {
          id: 2,
          title: "Project 2",
          status: ProjectStatus.pending,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
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
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.pending,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 3,
          title: "Task 3",
          status: TaskStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 4,
          title: "Task 4",
          status: TaskStatus.pending,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 2,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 5,
          title: "Task 5",
          status: TaskStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 2,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
      ],
    });

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");
  });

  describe("can update task status", () => {
    it("should update 'active' task status to 'pending'", () => {
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
    });

    it("should update 'active' task status to 'completed'", () => {
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("completed").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
    });

    it("should update 'pending' task status to 'active'", () => {
      cy.getByData("task-item-2-action-menu-trigger").click();
      cy.getMenuItem("active").click();
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/active/i);
    });

    it("should send notifications when task status is updated", () => {
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);

      // check notifications
      cy.checkNotifications(0);

      // sign in as user-2
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/tasks");

      // check notifications
      cy.checkNotifications(1, [
        {
          target: "Task 1",
          actor: "John Doe",
          action: "changed the task",
        },
      ]);
    });
  });

  describe("access control (RBAC)", () => {
    it("allows a user with 'owner' role to open the edit modal", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
    });

    it("allows a user with 'user' role to open the edit modal", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
    });

    it("shows a restriction modal when a 'guest' attempts to edit", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getByData("task-item-1-action-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
