import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User full name updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/profile");
  });

  it("updates a user full name successfully", () => {
    cy.getByData("update-user-full-name-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-full-name-field").within(() =>
      cy.get("input").should("have.value", "User 1"),
    );
    cy.getByData("user-full-name-field").clear().type("Updated User Full Name");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-full-name-detail-info").contains(
      "Updated User Full Name",
    );
  });

  it("shows validation error and prevents submission with empty full name", () => {
    cy.getByData("update-user-full-name-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-full-name-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-full-name-field").contains(/full name is required/i);
  });
});
