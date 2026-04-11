import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User public link updating", () => {
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

  it("updates a user public link successfully", () => {
    cy.getByData("update-user-public-link-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-public-link-field").within(() =>
      cy.get("input").should("have.value", "https://example.com/user-1"),
    );
    cy.getByData("user-public-link-field")
      .clear()
      .type("https://example.com/updated-public-link");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-public-link-detail-info").contains(
      "https://example.com/updated-public-link",
    );
  });

  it("shows empty public link message when public link is cleared", () => {
    cy.getByData("update-user-public-link-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-public-link-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-public-link-detail-info").contains("No public link");
  });
});
