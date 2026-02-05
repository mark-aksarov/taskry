describe("change password of user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {});
  });

  it("updates password and logs back in", () => {
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/profile");

    cy.getByData("change-password-button").filter(":visible").click();

    // fill form
    cy.get('input[name="password"]').clear().type("new-password");

    // submit
    cy.get('button[type="submit"]').click();

    // try to sign out with new password
    cy.getByData("sign-out-btn").click();
    cy.url().should("include", "/sign-in");

    cy.get("input[name=email]").type("owner@example.com");
    cy.get("input[name=password]").type("new-password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
  });

  describe("access control (RBAC) in profile page", () => {
    it("allows a user with 'owner' role to change password", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/profile");

      cy.getByData("change-password-button").filter(":visible").click();

      // fill form
      cy.get('input[name="password"]').clear().type("new-password");

      // submit
      cy.get('button[type="submit"]').click();

      // modal should be closed after password change
      cy.getByData("change-password-modal").should("not.exist");
    });

    it("allows a user with 'user' role to change password", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/profile");

      cy.getByData("change-password-button").filter(":visible").click();

      // fill form
      cy.get('input[name="password"]').clear().type("new-password");

      // submit
      cy.get('button[type="submit"]').click();

      // modal should be closed after password change
      cy.getByData("change-password-modal").should("not.exist");
    });

    it("shows a restriction modal when a 'guest' attempts to change password", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/profile");

      cy.getByData("change-password-button").filter(":visible").click();

      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });

  describe("access control (RBAC) in team/[id] page ", () => {
    it("allows a user with 'owner' role to change password of another user", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/team/user-2");

      cy.getByData("change-password-button").filter(":visible").click();

      // fill form
      cy.get('input[name="password"]').clear().type("new-password");

      // submit
      cy.get('button[type="submit"]').click();

      // modal should be closed after password change
      cy.getByData("change-password-modal").should("not.exist");
    });

    it("user with 'user' role can't change password", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/team/user-1");

      cy.getByData("profile-actions").should("not.exist");
    });

    it("shows a restriction modal when a 'guest' attempts to change password", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/profile");

      cy.getByData("change-password-button").filter(":visible").click();

      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
