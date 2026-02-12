import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("delete positions", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions: [
        ...positions,
        {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
      ],
      workspaces,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/positions");
  });

  it("can delete single position", () => {
    cy.getByData("position-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-position-modal")
      .should("be.visible")
      .contains("Position 1");

    cy.getByData("delete-position-modal-confirm-button").click();
    cy.getByData("position-list-item", "1").should("not.exist");
  });

  it("can delete multiple positions", () => {
    cy.getByData("position-checkbox", "1").click();
    cy.getByData("position-checkbox", "3").click();

    cy.getByData("position-toolbar-actions-button-desktop")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-positions-modal")
      .should("be.visible")
      .contains("2 positions");

    cy.getByData("delete-positions-modal-confirm-button").click();
    cy.getByData("position-list-item").should("not.exist");
  });
});
