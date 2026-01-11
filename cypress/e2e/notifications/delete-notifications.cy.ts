import { E2ESeedPayload } from "@/prisma/e2e/types";
import { NotificationType } from "@/generated/prisma/enums";

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
};

describe("deletes a notification", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("can delete a notification", () => {
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
        actor: "Sarah Jenkins",
        action: "deleted the task",
      },
    ]);

    cy.getMenuItem("notification-item-action-menu-trigger", "delete").click();

    cy.getByData("notification-empty-section").should(
      "contain",
      "No new notifications",
    );
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
          recipientId: "user-4",
        },
      ],
    });

    cy.signIn("guest@example.com", "12345abc");
    cy.visit("/en");

    cy.checkNotifications(1, [
      {
        target: "Task 1",
        actor: "Sarah Jenkins",
        action: "deleted the task",
      },
    ]);

    cy.getMenuItem("notification-item-action-menu-trigger", "delete").click();

    cy.getByData("guest-mode-modal").should("be.visible");
  });
});
