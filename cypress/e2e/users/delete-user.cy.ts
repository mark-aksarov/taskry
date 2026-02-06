describe("deletes an user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {});
  });

  describe("team page", () => {
    it("deletes an another user", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/team");

      // open user action menu and click delete menu item
      cy.getByData("user-item-user-2-action-menu-trigger").click();
      cy.getMenuItem("delete").click();

      // click confirm button in the delete user modal
      cy.getByData("delete-user-modal").should("be.visible");
      cy.getByData("delete-user-modal-confirm-button").click();

      // the user item should be removed from the list
      cy.getByData("user-item-user-2-action-menu-trigger").should("not.exist");
    });

    describe("access control (RBAC)", () => {
      it("user with 'owner' role can delete another user", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-2-action-menu-trigger").click();
        cy.getMenuItem("delete").click();
      });

      it("user with 'owner' role can't delete himself", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("user with 'user' role can't delete user", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-3-action-menu-trigger").should(
          "not.exist",
        );
      });

      it("show a restriction modal when a 'guest' attempts to delete user", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-2-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
