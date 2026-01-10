interface NotificationCheck {
  actor: string;
  action: string;
  target: string;
  content?: string;
}

Cypress.Commands.add(
  "checkNotifications",
  (expectedCount: number, expectedNotifications?: NotificationCheck[]) => {
    cy.getByData("notification-modal-trigger").first().click();

    cy.getByData("notification-modal")
      .should("be.visible")
      .within(() => {
        // 1. Verify the total count first
        if (expectedCount === 0) {
          cy.getByData("notification-list-item").should("not.exist");
        } else {
          cy.getByData("notification-list-item").should(
            "have.length",
            expectedCount,
          );
        }

        // 2. Iterate through each expected notification object
        if (expectedNotifications && expectedNotifications.length > 0) {
          expectedNotifications.forEach((notif) => {
            cy.getByData("notification-list-item")
              .contains(notif.target)
              .parents('[data-test="notification-list-item"]')
              .within(() => {
                cy.contains(notif.actor).should("be.visible");
                cy.contains(notif.action).should("be.visible");
                if (notif.content) {
                  cy.contains(notif.content).should("be.visible");
                }
              });
          });
        }
      });
  },
);
