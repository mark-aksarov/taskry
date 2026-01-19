import { E2ESeedPayload } from "@/prisma/e2e/types";
import { NotificationType, TaskStatus } from "@/generated/prisma/enums";

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
};

describe("mark notifications as read", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  describe("mark single notification as read", () => {
    it("can mark notification as read", () => {
      setup({
        notifications: [
          {
            id: 1,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: "user-1",
          },
        ],
      });

      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en");

      cy.checkNotifications(1, [
        {
          target: "Task 1",
          actor: "Michael Chen",
          action: "deleted the task",
        },
      ]);

      cy.getMenuItem(
        "notification-item-action-menu-trigger",
        "markAsRead",
      ).click();

      cy.getByData("unread-notification-button")
        .contains(0)
        .should("be.disabled");
    });

    it("should show GuestModeModal for guest user", () => {
      setup({
        notifications: [
          {
            id: 1,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: "user-3",
          },
        ],
      });

      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en");

      cy.checkNotifications(1, [
        {
          target: "Task 1",
          actor: "Michael Chen",
          action: "deleted the task",
        },
      ]);

      cy.getMenuItem("notification-item-action-menu-trigger", "delete").click();

      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });

  describe("mark multiple notifications as read", () => {
    it("can mark all notifications as read", () => {
      setup({
        notifications: [
          {
            id: 1,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: "user-1",
          },
          {
            id: 2,
            type: NotificationType.taskChanged,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: "user-1",
          },
        ],
      });

      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en");

      cy.checkNotifications(2, [
        {
          target: "Task 1",
          actor: "Michael Chen",
          action: "deleted the task",
        },
        {
          target: "Task 1",
          actor: "Michael Chen",
          action: "changed the task",
        },
      ]);

      cy.getByData("mark-all-as-read-button").click();

      cy.getByData("unread-notification-button")
        .contains(0)
        .should("be.disabled");
    });

    it("should show GuestModeModal for guest user", () => {
      setup({
        notifications: [
          {
            id: 1,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: "user-3",
          },
        ],
      });

      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en");

      cy.checkNotifications(1, [
        {
          target: "Task 1",
          actor: "Michael Chen",
          action: "deleted the task",
        },
      ]);

      cy.getByData("mark-all-as-read-button").click();

      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
