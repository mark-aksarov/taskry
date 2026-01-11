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
        // 1. Verify the total count
        cy.getByData("notification-list-item").should(
          "have.length",
          expectedCount,
        );

        // 2. Loop through each piece of data you EXPECT to find
        expectedNotifications?.forEach((notif) => {
          cy.getByData("notification-list-item")
            .filter((i, el) => {
              // Check if this specific element contains ALL the required strings
              const text = el.innerText;
              const hasActor = text.includes(notif.actor);
              const hasAction = text.includes(notif.action);
              const hasTarget = text.includes(notif.target);
              const hasContent = notif.content
                ? text.includes(notif.content)
                : true;

              return hasActor && hasAction && hasTarget && hasContent;
            })
            .should("have.length.at.least", 1) // Ensure at least one matching row exists
            .first()
            .should("be.visible");
        });
      });
  },
);
