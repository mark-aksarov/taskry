describe("change password of user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {});
  });

  describe("profile page", () => {
    it("updates password and sign-in with new password", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/profile");

      cy.changePassword("new-password");

      // sign in with new password
      cy.signOutViaUI();
      cy.signIn("owner@example.com", "new-password");
    });

    describe("access control (RBAC)", () => {
      it("allows a user with 'owner' role to change password", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("change-password-modal").should("be.visible");
      });

      it("allows a user with 'user' role to change password", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("change-password-modal").should("be.visible");
      });

      it("shows a restriction modal when a 'guest' attempts to change password", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("team/[id] page", () => {
    it("updates password of another user and sign-in with new password", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/team/user-2");

      cy.changePassword("new-password");

      // sign in with new password
      cy.signOutViaUI();
      cy.signIn("user@example.com", "new-password");
    });

    describe("access control (RBAC)", () => {
      it("user with 'owner' role can change  password of another user", () => {
        cy.signIn("owner@example.com", "12345abc");
        cy.visit("/en/team/user-2");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("change-password-modal").should("be.visible");
      });

      it("user with 'user' role can change his password", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/team/user-2");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("change-password-modal").should("be.visible");
      });

      it("user with 'user' role can't change password of another user", () => {
        cy.signIn("user@example.com", "12345abc");
        cy.visit("/en/team/user-1");
        cy.getByData("profile-actions").should("not.exist");
      });

      it("shows a restriction modal when a 'guest' attempts to change password", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/team/user-1");
        cy.getByData("change-password-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
