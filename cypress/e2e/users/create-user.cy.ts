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

  it("can create an user and sign in", () => {
    cy.getByData("user-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("user").click();

    // fill form
    cy.fillCreateUserForm({
      fullName: "Created User Name",
      email: "created-user@test.com",
      password: "12345abc",
    });

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("users-list").within(() => {
      cy.contains("Created User Name");
      cy.contains("created-user@test.com");
    });

    // sign in as Created User
    cy.signIn("created-user@test.com", "12345abc");
    cy.visit("/en");
    cy.getByData("verify-email-card").should(
      "contain",
      "created-user@test.com",
    );
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("user-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("user").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i);
    cy.contains(/email is required/i);
    cy.contains(/password is required/i);

    cy.getByData("user-email-field").type("invalid email");
    cy.get('button[type="submit"]').click();

    cy.contains(/enter a valid email address/i);
  });

  it("cannot create an user with an existing email", () => {
    cy.getByData("user-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("user").click();

    // fill form
    cy.fillCreateUserForm({
      fullName: "Created User Name",
      email: "user-1@test.com",
      password: "12345abc",
    });

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.contains(/user already exists/i);
  });
});
