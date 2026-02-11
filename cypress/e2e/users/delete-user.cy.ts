import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("deletes an user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {
      workspaces,
      users,
      accounts,
      positions,
    });
  });

  it("can deletes an another user", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/team");

    // open user action menu and click delete menu item
    cy.getByData("user-item-action-menu-trigger", "user-2").click();
    cy.getMenuItem("delete").click();

    // click confirm button in the delete user modal
    cy.getByData("delete-user-modal").should("be.visible");
    cy.getByData("delete-user-modal-confirm-button").click();

    // the user item should be removed from the list
    cy.getByData("user-item-action-menu-trigger", "user-2").should("not.exist");
  });
});
