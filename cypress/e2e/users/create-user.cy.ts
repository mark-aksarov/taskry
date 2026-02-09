import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("creates a new project", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    cy.task("db:reset");
    cy.task("db:seed", {
      workspaces,
      users,
      accounts,
      positions,
    });
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/team");
  });

  it("can create an user", () => {
    cy.getByData("user-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("user").click();

    // fill form
    cy.get('input[name="fullName"]').clear().type("Created User Name");
    cy.get('input[name="email"]').clear().type("created-user@test.com");
    cy.get('input[name="password"]').clear().type("12345abc");

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("users-list").within(() => {
      cy.contains("Created User Name");
      cy.contains("created-user@test.com");
    });

    // sign in as Created User
    cy.signIn("created-user@test.com", "12345abc");
    cy.visit("/en/profile");
    cy.getByData("verify-email-card").should(
      "contain",
      "created-user@test.com",
    );
  });

  describe("access control (RBAC)", () => {
    it("allows a user with 'owner' role to open the create user modal", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/team");

      cy.getByData("user-toolbar-create-new-menu-trigger")
        .filter(":visible")
        .click();
      cy.getMenuItem("user").should("be.visible").click();
      cy.getByData("new-user-modal").should("be.visible");
    });

    it("hides the 'user' menu item for a user with 'user' role", () => {
      cy.signIn("user-2@test.com", "12345abc");
      cy.visit("/en/team");

      cy.getByData("user-toolbar-create-new-menu-trigger")
        .filter(":visible")
        .click();

      // Verify the 'user' option does not exist or is not visible
      cy.getMenuItem("user").should("not.exist");
    });

    it("shows a restriction modal when a 'guest' attempts to edit", () => {
      cy.signIn("user-3@test.com", "12345abc");
      cy.visit("/en/team");

      cy.getByData("user-toolbar-create-new-menu-trigger")
        .filter(":visible")
        .click();

      cy.getMenuItem("user").click();
      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
